const { Teaser } = require('../')
import React from 'react'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
const path = require('path')
const pkg = require('../package.json')
const name = path.basename(pkg.name)

const dependencies = {
	'o-date': '^4.0.0',
	'o-labels': '^5.0.0',
	'o-normalise': '^2.0.0',
	'o-teaser': '^4.0.0',
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
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
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
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
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
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
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
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...args} />
		</div>
	)
}

ContentPackage.story = {
	name: 'ContentPackage'
}
ContentPackage.args = require('./content-package').args
ContentPackage.argTypes = argTypes

export const PackageItem = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...args} />
		</div>
	)
}

PackageItem.story = {
	name: 'PackageItem'
}
PackageItem.args = require('./package-item').args
PackageItem.argTypes = argTypes

export const Promoted = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
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
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...args} />
		</div>
	)
}

TopStory.story = {
	name: 'TopStory'
}
TopStory.args = require('./top-story').args
TopStory.argTypes = argTypes

export const Video = (args) => {
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...args} />
		</div>
	)
}
Video.args = require('./video').args
Video.argTypes = argTypes
