declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"about/faq.md": {
	id: "about/faq.md";
  slug: "about/faq";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"about/index.md": {
	id: "about/index.md";
  slug: "about";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"about/what-is-new.md": {
	id: "about/what-is-new.md";
  slug: "about/what-is-new";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"components/Forms/checkbox.mdx": {
	id: "components/Forms/checkbox.mdx";
  slug: "components/forms/checkbox";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"components/Forms/error-summary.mdx": {
	id: "components/Forms/error-summary.mdx";
  slug: "components/forms/error-summary";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"components/Forms/index.mdx": {
	id: "components/Forms/index.mdx";
  slug: "components/forms";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"components/Forms/password-input.mdx": {
	id: "components/Forms/password-input.mdx";
  slug: "components/forms/password-input";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"components/Forms/radio-button.mdx": {
	id: "components/Forms/radio-button.mdx";
  slug: "components/forms/radio-button";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"components/Forms/text-input.mdx": {
	id: "components/Forms/text-input.mdx";
  slug: "components/forms/text-input";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"components/buttons.mdx": {
	id: "components/buttons.mdx";
  slug: "components/buttons";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"components/index.md": {
	id: "components/index.md";
  slug: "components";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"components/tooltip.mdx": {
	id: "components/tooltip.mdx";
  slug: "components/tooltip";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"contribution/brands.mdx": {
	id: "contribution/brands.mdx";
  slug: "contribution/brands";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"contribution/index.md": {
	id: "contribution/index.md";
  slug: "contribution";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"contribution/tone-and-language.md": {
	id: "contribution/tone-and-language.md";
  slug: "contribution/tone-and-language";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"foundations/colours.mdx": {
	id: "foundations/colours.mdx";
  slug: "foundations/colours";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"foundations/grid.mdx": {
	id: "foundations/grid.mdx";
  slug: "foundations/grid";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"foundations/icons.mdx": {
	id: "foundations/icons.mdx";
  slug: "foundations/icons";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"foundations/images.mdx": {
	id: "foundations/images.mdx";
  slug: "foundations/images";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"foundations/index.md": {
	id: "foundations/index.md";
  slug: "foundations";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"foundations/spacing.mdx": {
	id: "foundations/spacing.mdx";
  slug: "foundations/spacing";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"foundations/typography.mdx": {
	id: "foundations/typography.mdx";
  slug: "foundations/typography";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"getting-started/customisation.md": {
	id: "getting-started/customisation.md";
  slug: "getting-started/customisation";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"getting-started/design-guide.md": {
	id: "getting-started/design-guide.md";
  slug: "getting-started/design-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"getting-started/index.md": {
	id: "getting-started/index.md";
  slug: "getting-started";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"getting-started/support.md": {
	id: "getting-started/support.md";
  slug: "getting-started/support";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"getting-started/technical-guide.mdx": {
	id: "getting-started/technical-guide.mdx";
  slug: "getting-started/technical-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"getting-started/technical-guide/o3-specification.md": {
	id: "getting-started/technical-guide/o3-specification.md";
  slug: "getting-started/technical-guide/o3-specification";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"getting-started/technical-guide/package-manager-npm.md": {
	id: "getting-started/technical-guide/package-manager-npm.md";
  slug: "getting-started/technical-guide/package-manager-npm";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"o2-components/design-guide.md": {
	id: "o2-components/design-guide.md";
  slug: "o2-components/design-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"o2-components/index.md": {
	id: "o2-components/index.md";
  slug: "o2-components";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"o2-components/technical-guide.md": {
	id: "o2-components/technical-guide.md";
  slug: "o2-components/technical-guide";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"o2-components/technical-guide/origami-build-service.md": {
	id: "o2-components/technical-guide/origami-build-service.md";
  slug: "o2-components/technical-guide/origami-build-service";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"o2-components/technical-guide/origami-json.md": {
	id: "o2-components/technical-guide/origami-json.md";
  slug: "o2-components/technical-guide/origami-json";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"o2-components/technical-guide/package-manager-npm.md": {
	id: "o2-components/technical-guide/package-manager-npm.md";
  slug: "o2-components/technical-guide/package-manager-npm";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"patterns/index.md": {
	id: "patterns/index.md";
  slug: "patterns";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"patterns/pagination.mdx": {
	id: "patterns/pagination.mdx";
  slug: "patterns/pagination";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
};
"posts": {
"2019-01-30-newsletter.md": {
	id: "2019-01-30-newsletter.md";
  slug: "2019-01-30-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2019-02-28-newsletter.md": {
	id: "2019-02-28-newsletter.md";
  slug: "2019-02-28-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2019-03-11-site-update.md": {
	id: "2019-03-11-site-update.md";
  slug: "2019-03-11-site-update";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2019-03-29-newsletter.md": {
	id: "2019-03-29-newsletter.md";
  slug: "2019-03-29-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2019-04-30-newsletter.md": {
	id: "2019-04-30-newsletter.md";
  slug: "2019-04-30-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2019-05-31-newsletter.md": {
	id: "2019-05-31-newsletter.md";
  slug: "2019-05-31-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2019-06-28-newsletter.md": {
	id: "2019-06-28-newsletter.md";
  slug: "2019-06-28-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2019-07-31-newsletter.md": {
	id: "2019-07-31-newsletter.md";
  slug: "2019-07-31-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2019-10-31-major-cascade.md": {
	id: "2019-10-31-major-cascade.md";
  slug: "2019-10-31-major-cascade";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2019-10-31-newsletter.md": {
	id: "2019-10-31-newsletter.md";
  slug: "2019-10-31-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-01-31-newsletter.md": {
	id: "2020-01-31-newsletter.md";
  slug: "2020-01-31-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-02-17-o-layout-chrome-80.md": {
	id: "2020-02-17-o-layout-chrome-80.md";
  slug: "2020-02-17-o-layout-chrome-80";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-03-02-newsletter.md": {
	id: "2020-03-02-newsletter.md";
  slug: "2020-03-02-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-04-01-newsletter.md": {
	id: "2020-04-01-newsletter.md";
  slug: "2020-04-01-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-04-20-origami-survey-results.mdx": {
	id: "2020-04-20-origami-survey-results.mdx";
  slug: "2020-04-20-origami-survey-results";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".mdx"] };
"2020-05-01-newsletter.md": {
	id: "2020-05-01-newsletter.md";
  slug: "2020-05-01-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-06-01-newsletter.md": {
	id: "2020-06-01-newsletter.md";
  slug: "2020-06-01-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-07-01-newsletter.md": {
	id: "2020-07-01-newsletter.md";
  slug: "2020-07-01-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-08-01-newsletter.md": {
	id: "2020-08-01-newsletter.md";
  slug: "2020-08-01-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-09-04-newsletter.md": {
	id: "2020-09-04-newsletter.md";
  slug: "2020-09-04-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-10-01-newsletter.md": {
	id: "2020-10-01-newsletter.md";
  slug: "2020-10-01-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-10-28-newsletter.md": {
	id: "2020-10-28-newsletter.md";
  slug: "2020-10-28-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-12-01-newsletter.md": {
	id: "2020-12-01-newsletter.md";
  slug: "2020-12-01-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2020-12-29-newsletter.md": {
	id: "2020-12-29-newsletter.md";
  slug: "2020-12-29-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2021-01-18-deprecating-bower-and-origami-via-npm.md": {
	id: "2021-01-18-deprecating-bower-and-origami-via-npm.md";
  slug: "2021-01-18-deprecating-bower-and-origami-via-npm";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2021-03-02-newsletter.md": {
	id: "2021-03-02-newsletter.md";
  slug: "2021-03-02-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2021-04-12-newsletter.md": {
	id: "2021-04-12-newsletter.md";
  slug: "2021-04-12-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2021-06-01-newsletter.md": {
	id: "2021-06-01-newsletter.md";
  slug: "2021-06-01-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2021-06-30-newsletter.md": {
	id: "2021-06-30-newsletter.md";
  slug: "2021-06-30-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2021-07-01-origami-on-npm-and-how-to-migrate.md": {
	id: "2021-07-01-origami-on-npm-and-how-to-migrate.md";
  slug: "2021-07-01-origami-on-npm-and-how-to-migrate";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2021-08-09-newsletter.md": {
	id: "2021-08-09-newsletter.md";
  slug: "2021-08-09-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2021-10-05-newsletter.md": {
	id: "2021-10-05-newsletter.md";
  slug: "2021-10-05-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2021-11-05-newsletter.md": {
	id: "2021-11-05-newsletter.md";
  slug: "2021-11-05-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2022-01-28-newsletter.md": {
	id: "2022-01-28-newsletter.md";
  slug: "2022-01-28-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2022-03-30-newsletter.md": {
	id: "2022-03-30-newsletter.md";
  slug: "2022-03-30-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2022-12-14-focus-styles.md": {
	id: "2022-12-14-focus-styles.md";
  slug: "2022-12-14-focus-styles";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2023-01-30-newsletter.md": {
	id: "2023-01-30-newsletter.md";
  slug: "2023-01-30-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2023-03-03-newsletter.md": {
	id: "2023-03-03-newsletter.md";
  slug: "2023-03-03-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2023-03-29-newsletter.md": {
	id: "2023-03-29-newsletter.md";
  slug: "2023-03-29-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2023-05-31-newsletter.md": {
	id: "2023-05-31-newsletter.md";
  slug: "2023-05-31-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2023-06-21-sass.md": {
	id: "2023-06-21-sass.md";
  slug: "2023-06-21-sass";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2023-08-02-data-vis.mdx": {
	id: "2023-08-02-data-vis.mdx";
  slug: "2023-08-02-data-vis";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".mdx"] };
"2023-08-14-origami-for-everyone.md": {
	id: "2023-08-14-origami-for-everyone.md";
  slug: "2023-08-14-origami-for-everyone";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2023-11-30-newsletter.md": {
	id: "2023-11-30-newsletter.md";
  slug: "2023-11-30-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2024-01-24-sass-build-times.md": {
	id: "2024-01-24-sass-build-times.md";
  slug: "2024-01-24-sass-build-times";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2024-02-12-newsletter.md": {
	id: "2024-02-12-newsletter.md";
  slug: "2024-02-12-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2024-05-29-newsletter.md": {
	id: "2024-05-29-newsletter.md";
  slug: "2024-05-29-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
"2024-07-15-newsletter.md": {
	id: "2024-07-15-newsletter.md";
  slug: "2024-07-15-newsletter";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"i18n": {
"en": {
	id: "en";
  collection: "i18n";
  data: InferEntrySchema<"i18n">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
