#!/usr/bin/env node
'use strict';

const fs = require('fs-extra');
const htmlToText = require('html-to-text');
const {JSDOM} = require('jsdom');
const path = require('path');
const axios = require('axios');

sendNewsletter({
	recipients: (
		process.env.EMAIL_RECIPIENTS ?
		process.env.EMAIL_RECIPIENTS.split(',').map(recipient => recipient.trim()) :
		['origami.support@ft.com']
	),
	accessKey: process.env.EMAIL_API_KEY,
	newsletter: process.env.EMAIL_SOURCE_HTML,
	send: process.argv.includes('--send'),
	local: Boolean(process.env.EMAIL_LOCAL)
});

// Generate and send the Origami newsletter
async function sendNewsletter(options) {

	const schemeAndHost = (
		options.local ?
		'http://localhost:4000' :
		'https://origami.ft.com'
	);
	const htmlUri = `${schemeAndHost}/emails/newsletter-${options.newsletter}`;

	// Fetch the HTML content from the live URL
	let htmlContent;
	try {
		const response = await axios.get(htmlUri);
		htmlContent = response.data;
	} catch (error) {
		console.error('');
		console.error('There was an issue downloading the newsletter HTML at');
		console.error(htmlUri);
		console.error('');
		console.error('Status code:', error.statusCode);
		console.error('');
		console.error('Specify the newsletter HTML with an `EMAIL_SOURCE_HTML`');
		console.error('environment variable and make sure the email is live.');
		console.error('');
		process.exit(1);
	}

	// Add a max width to all images
	const imgManipulationJsdom = new JSDOM(htmlContent);
	const images = imgManipulationJsdom.window.document.querySelectorAll('img');
	images.forEach(i => i.style['max-width'] = '100%');
	htmlContent = imgManipulationJsdom.serialize();

	// Generate the plain text content
	const plainTextContent = htmlToText.fromString(htmlContent, {
		ignoreImage: true,
		wordwrap: 65,
		baseElement: [
			'div.email-body',
			'div.footer'
		]
	});

	// Get the subject line
	const subject = new JSDOM(htmlContent).window.document.querySelector('title').textContent;

	// Compose the email
	const body = composeEmail({
		recipients: options.recipients,
		subject,
		htmlContent,
		plainTextContent
	});

	// If we're not sending the email...
	if (!options.send) {

		// Save files for review
		const htmlReviewFile = path.resolve(`${__dirname}/../.email-review/html-email.html`);
		const plainTextReviewFile = path.resolve(`${__dirname}/../.email-review/plain-text-email.txt`);
		await fs.mkdirs('`${__dirname}/../.email-review');
		await fs.writeFile(htmlReviewFile, htmlContent);
		await fs.writeFile(plainTextReviewFile, plainTextContent);

		// Output the review details
		console.log('');
		console.log('Email generated and ready for review');
		console.log('====================================');
		console.log('');
		console.log(`Recipients:    ${body.to.address.join(', ')}`);
		console.log(`Reply-To:      ${body.replyTo}`);
		console.log(`Subject line:  ${body.subject}`);
		console.log('');
		console.log('Review the generated plain text:');
		console.log(`file://${plainTextReviewFile}`);
		console.log('');
		console.log('Review the generated HTML:');
		console.log(`file://${htmlReviewFile}`);
		console.log('');
		return;
	}

	if (options.local) {
		console.error('');
		console.error('It is not possible to send an email using local');
		console.error('HTML as a source. Remove the `EMAIL_LOCAL`');
		console.error('environment variable and test again to send.');
		console.error('');
		process.exit(1);
	}

	if (!options.accessKey) {
		console.error('');
		console.error('Please specify an access key for the email platform');
		console.error('using an `EMAIL_API_KEY` environment variable.');
		console.error('');
		process.exit(1);
	}

	// Output the send details
	console.log('');
	console.log('Email getting ready to send...');
	console.log('==============================');
	console.log('');
	console.log(`Recipients:    ${body.to.address.join(', ')}`);
	console.log(`Subject line:  ${body.subject}`);
	console.log('');
	console.log('🐵');
	console.log('');

	// Actually send the email
	const response = await axios.post('https://ep.ft.com/send-by-address', body, {
		headers: {
			authorization: options.accessKey
		}
	});

	console.log('JSON response from service:');
	console.log({
		status: response.status,
		statusText: response.statusText,
		data: response.data,
	});

}

function composeEmail(data) {
	return Object.assign({
		to: {
			address: data.recipients
		},
		from: {
			address: 'origami.support@service.ft.com',
			name: 'The Origami Team'
		},
		replyTo: 'origami.support@ft.com'
	}, data);
}
