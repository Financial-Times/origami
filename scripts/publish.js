#!/usr/bin/env node
import {$} from 'zx';
import path from 'node:path';
import SlackAnnouncer from './lib/slack-announcer.js';

const outputs = JSON.parse(process.argv[2]);
const pathsReleased = JSON.parse(outputs['paths_released']);

const honker = new SlackAnnouncer({
	authToken: process.env.SLACK_ANNOUNCER_AUTH_TOKEN,
	channelId: process.env.SLACK_ANNOUNCER_CHANNEL_ID,
	log: console,
});

for (const workspace of pathsReleased) {
	// Confirm release please created a release.
	const releaseCreated = outputs[`${workspace}--release_created`];
	if (!releaseCreated) {
		continue;
	}

	// Publish to NPM
	if (workspace.startsWith('components/o3-')) {
		await $`npm run build -w ${workspace} --if-present`;
	}
	await $`npm publish -w ${workspace} --access public`;

	// Announce to Slack
	const name = path.basename(workspace);
	const versionNumber = outputs[`${workspace}--version`];
	const url = outputs[`${workspace}--html_url`];
	honker.announce({url, name, versionNumber});
}
