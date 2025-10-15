#!/usr/bin/env node
import {exec} from 'child_process';
import path from 'node:path';
import {promisify} from 'util';
import SlackAnnouncer from './lib/slack-announcer.js';
const execAsync = promisify(exec);

// Helper to run shell commands without adding external libraries. Returns an
// object with stdout and stderr; on error it throws an Error that includes
// stdout and stderr properties so retry logging can print useful diagnostics.
async function runCmd(command, options = {}) {
	const execOptions = {maxBuffer: 10 * 1024 * 1024, ...options};
	try {
		const {stdout, stderr} = await execAsync(command, execOptions);
		return {stdout, stderr};
	} catch (error) {
		// Preserve stdout/stderr on the thrown object for diagnostics. Use
		// bracket notation so linters that check TypeScript-like typings do not
		// complain about assigning unknown properties to Error.
		const wrapped = new Error(error.message || String(error));
		wrapped['stdout'] = error.stdout || '';
		wrapped['stderr'] = error.stderr || '';
		throw wrapped;
	}
}

// Defensive publish script: adds retries and more logging for network/external failures.
// We parse the action outputs, then iterate each released workspace and publish it.
// Retries are used for transient network or registry errors to reduce brittle CI failures.
const rawArg = process.argv[2] || '{}';
let outputs = {};
try {
	outputs = JSON.parse(rawArg);
} catch (error) {
	// Fail fast with a clear message if GitHub Actions did not pass valid JSON.
	console.error(
		'Failed to parse publish outputs JSON:',
		error && error.message
	);
	console.error('Raw argument:', rawArg);
	process.exitCode = 2;
	process.exit();
}

const pathsReleased = (() => {
	try {
		return JSON.parse(outputs['paths_released'] || '[]');
	} catch (error) {
		// If this parsing fails, continue with an empty list so we do not accidentally publish.
		console.error(
			'Failed to parse outputs.paths_released:',
			error && error.message
		);
		return [];
	}
})();

// Slack announcer instance used to post release messages.
const honker = new SlackAnnouncer({
	authToken: process.env.SLACK_ANNOUNCER_AUTH_TOKEN,
	channelId: process.env.SLACK_ANNOUNCER_CHANNEL_ID,
	log: console,
});

// Simple retry helper with exponential backoff
async function retry(
	fn,
	attempts = 3,
	baseDelayMs = 2000,
	label = 'operation'
) {
	// Simple retry helper with exponential backoff. It logs each attempt and any
	// captured stdout/stderr from zx commands to aid diagnostics when CI runs fail.
	let lastError;
	for (let attempt = 1; attempt <= attempts; attempt++) {
		try {
			if (attempt > 1)
				console.log(`${label}: retry attempt ${attempt}/${attempts}`);
			return await fn();
		} catch (error) {
			lastError = error;
			const isLast = attempt === attempts;
			console.error(
				`${label}: attempt ${attempt} failed:`,
				error && error.message ? error.message : error
			);
			// If zx thrown error has stdout/stderr, print for diagnostics
			if (error && typeof error === 'object') {
				if ('stdout' in error)
					console.error(
						`${label} stdout:\n`,
						error.stdout && error.stdout.toString()
					);
				if ('stderr' in error)
					console.error(
						`${label} stderr:\n`,
						error.stderr && error.stderr.toString()
					);
			}
			if (isLast) break;
			const wait = baseDelayMs * Math.pow(2, attempt - 1);
			console.log(`${label}: waiting ${wait}ms before next attempt`);
			await new Promise(res => setTimeout(res, wait));
		}
	}
	// Final throw with last captured error so callers can decide how to proceed.
	throw lastError;
}

async function run() {
	console.log('Publish script starting. Debug info:');
	console.log('ENV NPM token present:', !!process.env.NODE_AUTH_TOKEN);
	console.log(
		'ENV SLACK token present:',
		!!process.env.SLACK_ANNOUNCER_AUTH_TOKEN
	);
	console.log('Paths released (count):', pathsReleased.length);

	for (const workspace of pathsReleased) {
		// Confirm release please created a release.
		const releaseCreated = outputs[`${workspace}--release_created`];
		if (!releaseCreated) {
			console.log(`Skipping ${workspace} — no release created`);
			continue;
		}

		try {
			// Build when needed (retry transient failures)
			if (workspace.startsWith('components/o3-')) {
				console.log(`Running build for ${workspace}`);
				await retry(
					() => runCmd(`npm run build -w ${workspace} --if-present`),
					3,
					2000,
					`build ${workspace}`
				);
				console.log(`Build succeeded for ${workspace}`);
			}

			// Publish to NPM with retries
			console.log(`Publishing ${workspace} to npm`);
			await retry(
				() => runCmd(`npm publish -w ${workspace} --access public`),
				3,
				2000,
				`npm-publish ${workspace}`
			);
			console.log(`Publish succeeded for ${workspace}`);

			// Announce to Slack — Slack is considered best-effort. We retry transient failures
			// but do not let a Slack outage block the overall publish.
			const name = path.basename(workspace);
			const versionNumber = outputs[`${workspace}--version`];
			const url = outputs[`${workspace}--html_url`];
			try {
				await retry(
					() => honker.announce({url, name, versionNumber}),
					3,
					1500,
					`slack-announce ${workspace}`
				);
				console.log(`Slack announce succeeded for ${workspace}`);
			} catch (slackError) {
				// Slack failures are logged but do not cause the script to fail.
				console.error(
					`Slack announce failed for ${workspace}:`,
					slackError && slackError.message ? slackError.message : slackError
				);
			}
		} catch (err) {
			// Log the error using full-word variable names for clarity.
			console.error(
				`Failed to publish ${workspace}:`,
				err && err.message ? err.message : err
			);
			// Keep going to attempt remaining publishes, but set non-zero exit code
			process.exitCode = 1;
		}
	}
}

run().catch(error => {
	// Catch any unexpected errors at the top level and surface a clear message.
	console.error(
		'Publish script encountered an unexpected error:',
		error && error.message ? error.message : error
	);
	process.exitCode = 2;
});
