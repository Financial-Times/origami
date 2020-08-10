// To ensure that component stories do not need to depend on Storybook themselves we return a
// function that may be passed the required dependencies.
module.exports = (data, { object, text, number, boolean, date, select }) => {
	const Groups = {
		Meta: 'Meta',
		Title: 'Title',
		Standfirst: 'Standfirst',
		Status: 'Status',
		Image: 'Image',
		Headshot: 'Headshot',
		Video: 'Video',
		RelatedLinks: 'Related Links',
		Indicators: 'Indicators',
		Context: 'Context',
		Variant: 'Variant'
	};

	const Features = {
		showMeta() {
			return boolean('Show meta', data.showMeta, Groups.Meta);
		},
		showTitle() {
			return boolean('Show title', data.showTitle, Groups.Title);
		},
		showStandfirst() {
			return boolean('Show standfirst', data.showStandfirst, Groups.Standfirst);
		},
		showStatus() {
			return boolean('Show status', data.showStatus, Groups.Status);
		},
		showImage() {
			return boolean('Show image', data.showImage, Groups.Image);
		},
		showHeadshot() {
			return boolean('Show headshot', data.showHeadshot, Groups.Headshot);
		},
		showVideo() {
			return boolean('Show video', data.showVideo, Groups.Video);
		},
		showRelatedLinks() {
			return boolean('Show related links', data.showRelatedLinks, Groups.RelatedLinks);
		}
	};

	const Meta = {
		metaPrefixText() {
			return text('Meta prefix text', data.metaPrefixText, Groups.Meta);
		},
		metaSuffixText() {
			return text('Meta suffix text', data.metaSuffixText, Groups.Meta);
		},
		metaLink() {
			return {
				url: data.metaLink.url,
				prefLabel: text('Meta link', data.metaLink.prefLabel, Groups.Meta)
			};
		},
		metaAltLink() {
			return {
				url: data.metaAltLink.url,
				prefLabel: text('Alt meta link', data.metaAltLink.prefLabel, Groups.Meta)
			};
		},
		promotedPrefixText() {
			return text('Promoted prefix text', data.promotedPrefixText, Groups.Meta);
		},
		promotedSuffixText() {
			return text('Promoted suffix text', data.promotedSuffixText, Groups.Meta);
		},
		dataTrackable() {
			return text('Tracking data', data.dataTrackable, Groups.Meta);
		}
	};

	const Title = {
		title() {
			return text('Title', data.title, Groups.Title);
		},
		altTitle() {
			return text('Alt title', data.altTitle, Groups.Title);
		}
	};

	const Standfirst = {
		standfirst() {
			return text('Standfirst', data.standfirst, Groups.Standfirst);
		},
		altStandfirst() {
			return text('Alt standfirst', data.altStandfirst, Groups.Standfirst);
		}
	};

	const Status = {
		publishedDate() {
			return date('Published date', new Date(data.publishedDate), Groups.Status);
		},
		firstPublishedDate() {
			return date('First published date', new Date(data.firstPublishedDate), Groups.Status);
		},
		useRelativeTime() {
			return boolean('Use relative time', data.useRelativeTime, Groups.Status);
		},
		status() {
			return select(
				'Live blog status',
				{
					None: '',
					'Coming soon': 'comingsoon',
					'In progress': 'inprogress',
					Closed: 'closed'
				},
				'',
				Groups.Status
			);
		}
	};

	const Image = {
		image() {
			return {
				url: text('Image URL', data.image.url, Groups.Image),
				width: number('Image width', data.image.width, {}, Groups.Image),
				height: number('Image height', data.image.height, {}, Groups.Image)
			};
		},
		imageSize() {
			return select('Image size', ['XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'], data.imageSize, Groups.Image);
		}
	};

	const Headshot = {
		headshot() {
			return text('Headshot', data.headshot, Groups.Headshot);
		},
		headshotTint() {
			return select('Headshot tint', { 'Default': '' }, 'Default', Groups.Headshot);
		}
	};

	const Video = {
		video() {
			return {
				url: text('Video URL', data.video.url, Groups.Video),
				width: number('Video width', data.video.width, {}, Groups.Video),
				height: number('Video height', data.video.height, {}, Groups.Video),
				mediaType: data.video.mediaType,
				codec: data.video.codec
			};
		}
	};

	const RelatedLinks = {
		relatedLinks() {
			return object('Related links', data.relatedLinks, Groups.RelatedLinks);
		}
	};

	const Indicators = {
		indicators() {
			return {
				accessLevel: select('Access level', ['free', 'registered', 'subscribed', 'premium'], data.indicators.accessLevel || 'free', Groups.Indicators),
				isOpinion: boolean('Is opinion', data.indicators.isOpinion, Groups.Indicators),
				isColumn: boolean('Is column', data.indicators.isColumn, Groups.Indicators),
				isPodcast: boolean('Is podcast', data.indicators.isPodcast, Groups.Indicators),
				isEditorsChoice: boolean('Is editor\'s choice', data.indicators.isEditorsChoice, Groups.Indicators),
				isExclusive: boolean('Is exclusive', data.indicators.isExclusive, Groups.Indicators),
				isScoop: boolean('Is scoop', data.indicators.isScoop, Groups.Indicators)
			};
		}
	};

	const Context = {
		headlineTesting() {
			return boolean('Headline testing', false, Groups.Context);
		},
		parentId() {
			return text('Parent ID', data.context.parentId, Groups.Context);
		},
		parentLabel() {
			return text('Parent Label', data.context.parentLabel, Groups.Context);
		}
	};

	const Variant = {
		layout() {
			return select('Layout', ['small', 'large', 'hero', 'top-story'], data.layout, Groups.Variant);
		},
		theme() {
			return select('Theme', { 'None': '', 'Extra': 'extra-article', 'Special Report': 'highlight' }, data.theme, Groups.Variant);
		},
		parentTheme() {
			return select('Parent theme', { 'None': '', 'Extra': 'extra-article', 'Special Report': 'highlight' }, data.parentTheme, Groups.Variant);
		},
		modifiers() {
			return select(
				'Modifiers',
				{
					// Currently no support for optgroups or multiple selections
					'None': '',
					'Small stacked': 'stacked',
					'Small image on right': 'image-on-right',
					'Large portrait': 'large-portrait',
					'Large landscape': 'large-landscape',
					'Hero centre': 'centre',
					'Hero image': 'hero-image',
					'Top story landscape': 'landscape',
					'Top story big': 'big-story'
				},
				data.modifiers || '',
				Groups.Variant
			);
		}
	};

	return Object.assign({}, Features, Meta, Title, Standfirst, Status, Video, Headshot, Image, RelatedLinks, Indicators, Context, Variant);
};
