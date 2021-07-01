import { Teaser } from '../src/Teaser'
import React from 'react'
import BuildService from '../../../.storybook/build-service'

const dependencies = {
	'o-date': '^4.2.0',
	'o-labels': '^5.2.0',
	'o-normalise': '^2.0.0',
	'o-teaser': '^5.2.3',
	'o-typography': '^6.0.0',
	'o-video': '^6.0.0'
}

const { argTypes } = require('./argTypes')

export default {
	title: 'x-teaser'
}

export const Article = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<Teaser {...args} />
		</div>
	)
}

Article.args = require('./article').args
Article.argTypes = argTypes

export const Podcast = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<Teaser {...args} />
		</div>
	)
}
Podcast.args = require('./podcast').args
Podcast.argTypes = argTypes

export const Opinion = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<Teaser {...args} />
		</div>
	)
}
Opinion.args = require('./opinion').args
Opinion.argTypes = argTypes

export const ContentPackage = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<Teaser {...args} />
		</div>
	)
}

ContentPackage.storyName = 'ContentPackage'
ContentPackage.args = require('./content-package').args
ContentPackage.argTypes = argTypes

export const PackageItem = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<Teaser {...args} />
		</div>
	)
}

PackageItem.storyName = 'PackageItem'
PackageItem.args = require('./package-item').args
PackageItem.argTypes = argTypes

export const Promoted = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<Teaser {...args} />
		</div>
	)
}

Promoted.args = require('./promoted').args
Promoted.argTypes = argTypes

export const TopStory = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<Teaser {...args} />
		</div>
	)
}

TopStory.storyName = 'TopStory'
TopStory.args = require('./top-story').args
TopStory.argTypes = argTypes

export const Video = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			<Teaser {...args} />
		</div>
	)
}
Video.args = require('./video').args
Video.argTypes = argTypes
