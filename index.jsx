const { Teaser } = require('../')
import React from 'react'
import { storiesOf } from '@storybook/react'
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

storiesOf('x-teaser', module)
	.addDecorator(withKnobs)
	.add('Article', () => {
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
	})
	.add('Podcast', () => {
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
	})
	.add('Opinion', () => {
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
	})
	.add('ContentPackage', () => {
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
	})
	.add('PackageItem', () => {
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
	})
	.add('Promoted', () => {
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
	})
	.add('TopStory', () => {
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
	})
	.add('Video', () => {
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
	})
