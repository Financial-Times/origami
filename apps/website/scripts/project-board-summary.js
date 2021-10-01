#!/usr/bin/env node
'use strict';

// A gross little script to generate a markdown summary of tasks in the
// completed column of the Origami Project board. A useful reference for writing
// a broader update in the email newsletter.
//
// `GIT_TOKEN=abc ./scripts/project-board-summary.js | tee  ~/Desktop/board-summary.md`
//
// A DATE environment variable can be used to include only cards which have been
// updated on or since since the given date.
// `DATE="29 September 2020" GIT_TOKEN=abc ./scripts/project-board-summary.js | tee  ~/Desktop/board-summary.md`
//
// // https://github.com/orgs/Financial-Times/projects/83

const { Octokit } = require("@octokit/rest");
const token = process.env['GIT_TOKEN'];
const updatedFromDate = process.env['DATE'] || Date.now().toString();

const octokit = new Octokit({
    auth: token
});

// Ignore any issues for pull requests from these.
const ignoredUserLogins = ['snyk-bot', 'origamiserviceuser'];
const ignoredContributorTypes = ['Bot'];

(async () => {

    console.log('## Logs');

    // Get all the cards from the complete column.
    console.log('- Getting all cards from the project board\'s complete column...\n');
    const cards = [];
    for await (const response of octokit.paginate.iterator(
        octokit.projects.listCards,
        {
            column_id: 7751138,
            per_page: 100
        }
    )) {
        cards.push(...response.data);
    }

    // For any card that references content (e.g. an issue or pr),
    // get the details of that content.
    console.log('- Getting details for cards...\n');
    const cardContentPromises = cards
        .filter(c => Boolean(c.content_url))
        .filter(c => new Date(c.updated_at) >= new Date(updatedFromDate))
        .map(c => new Promise(async resolve => {
            try {
                const content = await octokit.request(`GET ${c.content_url}`);
                resolve(content.data);
            } catch (error) {
                console.log(`- Error for ${c.content_url}: ${error.message} \n`);
            }
            resolve();
        }));

    const paginatedCardsContent = await Promise.all(cardContentPromises);


    // Filter for card content that wasn't created by ignored users, like bots.
    console.log('- Filtering for useful information...\n');
    const cardsContent = paginatedCardsContent.flat().filter(c => Boolean(c));
    const processedContent = cardsContent
        .filter(c => !ignoredContributorTypes.includes(c.user.type) && !ignoredUserLogins.includes(c.user.login))
        .map(c => {
            return {
                title: c.title,
                repository_url: c.repository_url,
                author_association: c.author_association,
                closed_at: c.closed_at,
                updated_at: c.updated_at,
                opened_by: c.user.login,
                closed_by: c.closed_by.login,
                is_pull_request: Boolean(c.pull_request),
            }
        });

    // Use the unique titles of issues/prs to find where the same title
    // is used repeatedly. It's likely an automated PR to many Origami
    // projects which we can summaries more easily.
    const uniqueContentTitles = new Set(processedContent.map(c => c.title));
    const crossProjectContentTitles = new Set();
    const singleProjectContent = {};
    [...uniqueContentTitles].forEach(uniqueTitle => {
        const matchedContent = processedContent.filter(c => c.title === uniqueTitle);
        if (matchedContent.length === 1) {
            const repoUrl = matchedContent[0].repository_url
            singleProjectContent[repoUrl] =
                Array.isArray(singleProjectContent[repoUrl]) ?
                    [...singleProjectContent[repoUrl], ...matchedContent] :
                    matchedContent;
        }
        if (matchedContent.length > 1) {
            crossProjectContentTitles.add(uniqueTitle);
        }
    });

    // Log what has been found.
    console.log('## Results\n');
    // Each issue/pr in the done column per repo.
    console.log('\n### Per Repo\n');
    for (let [repoUrl, content] of Object.entries(singleProjectContent)) {
        const repoId = repoUrl.replace('https://api.github.com/repos/', '');
        const url = repoUrl.replace('https://api.github.com/repos/', 'https://github.com/');
        console.log(`- [${repoId}](${url})\n`);
        content.forEach(c => {
            console.log(`   - ${c.title} (opened by: ${c.opened_by}, closed by: ${c.closed_by}, updated at ${c.updated_at})\n`);
        })
    }
    // Any issue/pr which shares a title with another issue/PR,
    // which is likely to be automated across many repos.
    console.log('\n### Duplicates\n');
    console.log('These titles were matched in one or more PRs/issues. Either the issue has the same name as a PR or the work was done over multiple projects.\n');
    crossProjectContentTitles.forEach(title => {
        console.log(
            `- ${title}`
        );
    });
})();
