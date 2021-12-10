'use strict';

const updateNotifier = require('update-notifier');
const pkg = require('../../package.json');

// check if a new version is available and print an update notification
updateNotifier({pkg: pkg})
	.notify({ defer: false });
