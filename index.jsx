const { Teaser } = require('../')
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs'
import { Helmet } from 'react-helmet'
import BuildService from '../../../.storybook/build-service'
import createProps from '../../../.storybook/storybook.utils'
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

const knobs = require('./knobs')

export default {
	title: 'x-teaser',
	decorators: [withKnobs]
}

export const Article = () => {
	const { data, knobs: storyKnobs } = require('./article')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...props} />
		</div>
	)
}

export const Podcast = () => {
	const { data, knobs: storyKnobs } = require('./podcast')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...props} />
		</div>
	)
}

export const Opinion = () => {
	const { data, knobs: storyKnobs } = require('./opinion')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...props} />
		</div>
	)
}

export const ContentPackage = () => {
	const { data, knobs: storyKnobs } = require('./content-package')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...props} />
		</div>
	)
}

ContentPackage.story = {
	name: 'ContentPackage'
}

export const PackageItem = () => {
	const { data, knobs: storyKnobs } = require('./package-item')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...props} />
		</div>
	)
}

PackageItem.story = {
	name: 'PackageItem'
}

export const Promoted = () => {
	const { data, knobs: storyKnobs } = require('./promoted')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...props} />
		</div>
	)
}

export const TopStory = () => {
	const { data, knobs: storyKnobs } = require('./top-story')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...props} />
		</div>
	)
}

TopStory.story = {
	name: 'TopStory'
}

export const Video = () => {
	const { data, knobs: storyKnobs } = require('./video')
	const props = createProps(data, storyKnobs, knobs)
	return (
		<div className="story-container">
			{dependencies && <BuildService dependencies={dependencies} />}
			{pkg.style && (
				<Helmet>
					<link rel="stylesheet" href={`components/${name}/${pkg.style}`} />
				</Helmet>
			)}
			<Teaser {...props} />
		</div>
	)
}
