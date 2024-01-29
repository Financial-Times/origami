#!/usr/bin/env node
"use strict"

import fs from "fs"
import readline from "readline/promises"
import path from "path"
import * as htmlToText from "html-to-text"
import axios from "axios"
import * as cheerio from "cheerio"

sendNewsletter({
	recipients: process.env.EMAIL_RECIPIENTS
		? process.env.EMAIL_RECIPIENTS.split(",").map(recipient => recipient.trim())
		: ["origami.support@ft.com"],
	accessKey: process.env.EMAIL_API_KEY,
	newsletter: process.env.EMAIL_SOURCE_HTML,
	local: Boolean(process.env.EMAIL_LOCAL),
	send: Boolean(process.env.EMAIL_SEND),
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

	const reviewReplies = {}
	if (options.send) {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		})

		console.log("")
		console.log("Review plain text and HTML before sending the newsletter")
		console.log("==============================")
		console.log("")
		console.log(plainTextContent)
		console.log("==============================")
		console.log("")
		console.log("==============================")
		console.log(`To review HTML go to ${htmlUri}.`)
		console.log("==============================")
		console.log("")

		const answer1 = await rl.question(
			"Does plain text look as expected? (yes/no)"
		)
		reviewReplies.plainText = answer1

		const answer2 = await rl.question("Does HTML look as expected? (yes/no)")
		reviewReplies.html = answer2

		rl.close()
	}

	const $ = cheerio.load(htmlContent)
	const $title = $("title").text()

	// Get the subject line
	const subject = $title

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
	if (!options.send) {
		console.error("")
		console.error(
			"Please set an `EMAIL_SEND=true` environment variable to send the newsletter."
		)
		console.error("")
		process.exit(1)
	}

	if (
		reviewReplies.plainText.toLowerCase() !== "yes" ||
		reviewReplies.html.toLowerCase() !== "yes"
	) {
		console.log(
			"Review and confirm that plain text and HTML look as expected before sending them to users."
		)
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
		"https://send-email-api.ft.com/send-by-address",
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
