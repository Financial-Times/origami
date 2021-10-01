#!/usr/bin/env node
'use strict';

let stdinJSON = '';
process.stdin.on('data', chunk => stdinJSON += chunk);
process.stdin.on('end', () => {
	const repos = extractComponentMap(JSON.parse(stdinJSON));
	console.log(JSON.stringify(repos, null, '\t'));
});

function extractComponentMap(repos) {
	return repos
		.map(simplifyRepo)
		.reduce((map, repo) => {
			map[repo.name] = repo;
			return map;
		}, {})
}

function simplifyRepo(repo) {
	return {
		name: repo.name,
		version: repo.version
	};
}
