#!/usr/bin/env node
"use strict"

import fs from "fs"
import path from "path"
import * as htmlToText from "html-to-text"
import {JSDOM} from "jsdom"
import axios from "axios"

sendNewsletter({
	recipients: process.env.EMAIL_RECIPIENTS
		? process.env.EMAIL_RECIPIENTS.split(",").map(recipient => recipient.trim())
		: ["origami.support@ft.com"],
	accessKey: process.env.EMAIL_API_KEY,
	newsletter: process.env.EMAIL_SOURCE_HTML,
	local: Boolean(process.env.EMAIL_LOCAL),
})

// Generate and send the Origami newsletter
async function sendNewsletter(options) {
	const schemeAndHost = options.local
		? "http://localhost:3000"
		: "https://origami.ft.com"
	const htmlUri = `${schemeAndHost}/emails/newsletter-${options.newsletter}`

	// Fetch the HTML content from the live URL
	let htmlContent
	try {
		const response = await axios.get(htmlUri)
		htmlContent = response.data
	} catch (error) {
		console.error("")
		console.error("There was an issue downloading the newsletter HTML at")
		console.error(htmlUri)
		console.error("")
		console.error("Status code:", error.statusCode)
		console.error("")
		console.error("Specify the newsletter HTML with an `EMAIL_SOURCE_HTML`")
		console.error("environment variable and make sure the email is live.")
		console.error("")
		process.exit(1)
	}

	// Add a max width to all images
	const imgManipulationJsdom = new JSDOM(htmlContent)
	const images = imgManipulationJsdom.window.document.querySelectorAll("img")
	images.forEach(i => (i.style["max-width"] = "100%"))
	htmlContent = imgManipulationJsdom.serialize()
	const __dirname = path.resolve()
	const emailStyles = fs.readFileSync(
		path.join(__dirname, "public/styles/email.css"),
		"utf8"
	)
	htmlContent = htmlContent.replace(
		'<link rel="stylesheet" href="/styles/email.css">',
		`<style type="text/css">${emailStyles}</style>`
	)

	// Generate the plain text content
	const plainTextContent = htmlToText.convert(htmlContent, {
		ignoreImage: true,
		wordwrap: 65,
		baseElement: ["div.email-body", "div.footer"],
	})

	// Get the subject line
	const subject = new JSDOM(htmlContent).window.document.querySelector(
		"title"
	).textContent

	// Compose the email
	const body = composeEmail({
		recipients: options.recipients,
		subject,
		htmlContent,
		plainTextContent,
	})

	if (!options.accessKey) {
		console.error("")
		console.error("Please specify an access key for the email platform")
		console.error("using an `EMAIL_API_KEY` environment variable.")
		console.error("")
		process.exit(1)
	}

	// Output the send details
	console.log("")
	console.log("Email getting ready to send...")
	console.log("==============================")
	console.log("")
	console.log(`Recipients:    ${body.to.address.join(", ")}`)
	console.log(`Subject line:  ${body.subject}`)
	console.log("")
	console.log("🐵")
	console.log("")

	// Actually send the email
	const response = await axios.post(
		"https://ep.ft.com/send-api-mailgun/send-by-address",
		body,
		{
			headers: {
				authorization: options.accessKey,
			},
		}
	)

	console.log("JSON response from service:")
	console.log({
		status: response.status,
		statusText: response.statusText,
		data: response.data,
	})
}

function composeEmail(data) {
	return Object.assign(
		{
			to: {
				address: data.recipients,
			},
			from: {
				address: "origami.support@send.ft.com",
				name: "The Origami Team",
			},
			replyTo: "origami.support@ft.com",
		},
		data
	)
}
