declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
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
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"documentation": {
"components.md": {
	id: "components.md";
  slug: "components";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"components/brand-definitions.md": {
	id: "components/brand-definitions.md";
  slug: "components/brand-definitions";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"components/code.md": {
	id: "components/code.md";
  slug: "components/code";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"components/compatibility.md": {
	id: "components/compatibility.md";
  slug: "components/compatibility";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"components/contributing.md": {
	id: "components/contributing.md";
  slug: "components/contributing";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"components/customisation.md": {
	id: "components/customisation.md";
  slug: "components/customisation";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"components/getting-started.md": {
	id: "components/getting-started.md";
  slug: "components/getting-started";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"components/major-cascade.md": {
	id: "components/major-cascade.md";
  slug: "components/major-cascade";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"components/silent-mode.md": {
	id: "components/silent-mode.md";
  slug: "components/silent-mode";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"components/versioning.md": {
	id: "components/versioning.md";
  slug: "components/versioning";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"manifests.md": {
	id: "manifests.md";
  slug: "manifests";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"manifests/origami-json.md": {
	id: "manifests/origami-json.md";
  slug: "manifests/origami-json";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"principles.md": {
	id: "principles.md";
  slug: "principles";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"principles/accessibility.md": {
	id: "principles/accessibility.md";
  slug: "principles/accessibility";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"principles/design.md": {
	id: "principles/design.md";
  slug: "principles/design";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"principles/tone-and-language.md": {
	id: "principles/tone-and-language.md";
  slug: "principles/tone-and-language";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"principles/vision-and-mission.md": {
	id: "principles/vision-and-mission.md";
  slug: "principles/vision-and-mission";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"services.md": {
	id: "services.md";
  slug: "services";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"services/bower-registry.md": {
	id: "services/bower-registry.md";
  slug: "services/bower-registry";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"services/build-service.md": {
	id: "services/build-service.md";
  slug: "services/build-service";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"services/image-service.md": {
	id: "services/image-service.md";
  slug: "services/image-service";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"services/navigation-service.md": {
	id: "services/navigation-service.md";
  slug: "services/navigation-service";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"services/polyfill-service.md": {
	id: "services/polyfill-service.md";
  slug: "services/polyfill-service";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"services/repo-data.md": {
	id: "services/repo-data.md";
  slug: "services/repo-data";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials.md": {
	id: "tutorials.md";
  slug: "tutorials";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/build-service.md": {
	id: "tutorials/build-service.md";
  slug: "tutorials/build-service";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/create-a-new-component-part-1.md": {
	id: "tutorials/create-a-new-component-part-1.md";
  slug: "tutorials/create-a-new-component-part-1";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/create-a-new-component-part-2.md": {
	id: "tutorials/create-a-new-component-part-2.md";
  slug: "tutorials/create-a-new-component-part-2";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/create-a-new-component-part-3.md": {
	id: "tutorials/create-a-new-component-part-3.md";
  slug: "tutorials/create-a-new-component-part-3";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/create-a-new-component-part-4.md": {
	id: "tutorials/create-a-new-component-part-4.md";
  slug: "tutorials/create-a-new-component-part-4";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/create-a-new-component-part-5.md": {
	id: "tutorials/create-a-new-component-part-5.md";
  slug: "tutorials/create-a-new-component-part-5";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/create-a-new-component-part-6.md": {
	id: "tutorials/create-a-new-component-part-6.md";
  slug: "tutorials/create-a-new-component-part-6";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/create-a-new-component-part-7.md": {
	id: "tutorials/create-a-new-component-part-7.md";
  slug: "tutorials/create-a-new-component-part-7";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/create-a-new-component-part-8.md": {
	id: "tutorials/create-a-new-component-part-8.md";
  slug: "tutorials/create-a-new-component-part-8";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/create-a-new-component-part-9.md": {
	id: "tutorials/create-a-new-component-part-9.md";
  slug: "tutorials/create-a-new-component-part-9";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
"tutorials/manual-build.md": {
	id: "tutorials/manual-build.md";
  slug: "tutorials/manual-build";
  body: string;
  collection: "documentation";
  data: InferEntrySchema<"documentation">
} & { render(): Render[".md"] };
};
"posts": {
"2019-01-30-newsletter.md": {
	id: "2019-01-30-newsletter.md";
  slug: "2019-01-30-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2019-02-28-newsletter.md": {
	id: "2019-02-28-newsletter.md";
  slug: "2019-02-28-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2019-03-11-site-update.md": {
	id: "2019-03-11-site-update.md";
  slug: "2019-03-11-site-update";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2019-03-29-newsletter.md": {
	id: "2019-03-29-newsletter.md";
  slug: "2019-03-29-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2019-04-30-newsletter.md": {
	id: "2019-04-30-newsletter.md";
  slug: "2019-04-30-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2019-05-31-newsletter.md": {
	id: "2019-05-31-newsletter.md";
  slug: "2019-05-31-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2019-06-28-newsletter.md": {
	id: "2019-06-28-newsletter.md";
  slug: "2019-06-28-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2019-07-31-newsletter.md": {
	id: "2019-07-31-newsletter.md";
  slug: "2019-07-31-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2019-10-31-major-cascade.md": {
	id: "2019-10-31-major-cascade.md";
  slug: "2019-10-31-major-cascade";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2019-10-31-newsletter.md": {
	id: "2019-10-31-newsletter.md";
  slug: "2019-10-31-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-01-31-newsletter.md": {
	id: "2020-01-31-newsletter.md";
  slug: "2020-01-31-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-02-17-o-layout-chrome-80.md": {
	id: "2020-02-17-o-layout-chrome-80.md";
  slug: "2020-02-17-o-layout-chrome-80";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-03-02-newsletter.md": {
	id: "2020-03-02-newsletter.md";
  slug: "2020-03-02-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-04-01-newsletter.md": {
	id: "2020-04-01-newsletter.md";
  slug: "2020-04-01-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-04-20-origami-survey-results.mdx": {
	id: "2020-04-20-origami-survey-results.mdx";
  slug: "2020-04-20-origami-survey-results";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020-05-01-newsletter.md": {
	id: "2020-05-01-newsletter.md";
  slug: "2020-05-01-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-06-01-newsletter.md": {
	id: "2020-06-01-newsletter.md";
  slug: "2020-06-01-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-07-01-newsletter.md": {
	id: "2020-07-01-newsletter.md";
  slug: "2020-07-01-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-08-01-newsletter.md": {
	id: "2020-08-01-newsletter.md";
  slug: "2020-08-01-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-09-04-newsletter.md": {
	id: "2020-09-04-newsletter.md";
  slug: "2020-09-04-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-10-01-newsletter.md": {
	id: "2020-10-01-newsletter.md";
  slug: "2020-10-01-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-10-28-newsletter.md": {
	id: "2020-10-28-newsletter.md";
  slug: "2020-10-28-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-12-01-newsletter.md": {
	id: "2020-12-01-newsletter.md";
  slug: "2020-12-01-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2020-12-29-newsletter.md": {
	id: "2020-12-29-newsletter.md";
  slug: "2020-12-29-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-01-18-deprecating-bower-and-origami-via-npm.md": {
	id: "2021-01-18-deprecating-bower-and-origami-via-npm.md";
  slug: "2021-01-18-deprecating-bower-and-origami-via-npm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-03-02-newsletter.md": {
	id: "2021-03-02-newsletter.md";
  slug: "2021-03-02-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-04-12-newsletter.md": {
	id: "2021-04-12-newsletter.md";
  slug: "2021-04-12-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-06-01-newsletter.md": {
	id: "2021-06-01-newsletter.md";
  slug: "2021-06-01-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-06-30-newsletter.md": {
	id: "2021-06-30-newsletter.md";
  slug: "2021-06-30-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-07-01-origami-on-npm-and-how-to-migrate.md": {
	id: "2021-07-01-origami-on-npm-and-how-to-migrate.md";
  slug: "2021-07-01-origami-on-npm-and-how-to-migrate";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-08-09-newsletter.md": {
	id: "2021-08-09-newsletter.md";
  slug: "2021-08-09-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-10-05-newsletter.md": {
	id: "2021-10-05-newsletter.md";
  slug: "2021-10-05-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-11-05-newsletter.md": {
	id: "2021-11-05-newsletter.md";
  slug: "2021-11-05-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2022-01-28-newsletter.md": {
	id: "2022-01-28-newsletter.md";
  slug: "2022-01-28-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2022-03-30-newsletter.md": {
	id: "2022-03-30-newsletter.md";
  slug: "2022-03-30-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2022-12-14-focus-styles.md": {
	id: "2022-12-14-focus-styles.md";
  slug: "2022-12-14-focus-styles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-01-30-newsletter.md": {
	id: "2023-01-30-newsletter.md";
  slug: "2023-01-30-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-03-03-newsletter.md": {
	id: "2023-03-03-newsletter.md";
  slug: "2023-03-03-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-03-29-newsletter.md": {
	id: "2023-03-29-newsletter.md";
  slug: "2023-03-29-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-05-31-newsletter.md": {
	id: "2023-05-31-newsletter.md";
  slug: "2023-05-31-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-06-21-sass.md": {
	id: "2023-06-21-sass.md";
  slug: "2023-06-21-sass";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-08-02-data-vis.mdx": {
	id: "2023-08-02-data-vis.mdx";
  slug: "2023-08-02-data-vis";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2023-08-14-origami-for-everyone.md": {
	id: "2023-08-14-origami-for-everyone.md";
  slug: "2023-08-14-origami-for-everyone";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-11-30-newsletter.md": {
	id: "2023-11-30-newsletter.md";
  slug: "2023-11-30-newsletter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2024-01-24-sass-build-times.md": {
	id: "2024-01-24-sass-build-times.md";
  slug: "2024-01-24-sass-build-times";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"barchart-data": {
"archived-releases/g-audio": {
	id: "archived-releases/g-audio";
  collection: "barchart-data";
  data: any
};
"archived-releases/n-notification": {
	id: "archived-releases/n-notification";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-audio": {
	id: "archived-releases/o-audio";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-autocomplete": {
	id: "archived-releases/o-autocomplete";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-banner": {
	id: "archived-releases/o-banner";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-big-number": {
	id: "archived-releases/o-big-number";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-buttons": {
	id: "archived-releases/o-buttons";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-colors": {
	id: "archived-releases/o-colors";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-comments": {
	id: "archived-releases/o-comments";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-cookie-message": {
	id: "archived-releases/o-cookie-message";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-date": {
	id: "archived-releases/o-date";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-editorial-layout": {
	id: "archived-releases/o-editorial-layout";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-editorial-typography": {
	id: "archived-releases/o-editorial-typography";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-expander": {
	id: "archived-releases/o-expander";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-fonts": {
	id: "archived-releases/o-fonts";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-footer": {
	id: "archived-releases/o-footer";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-footer-services": {
	id: "archived-releases/o-footer-services";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-forms": {
	id: "archived-releases/o-forms";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-ft-affiliate-ribbon": {
	id: "archived-releases/o-ft-affiliate-ribbon";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-grid": {
	id: "archived-releases/o-grid";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-header": {
	id: "archived-releases/o-header";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-header-services": {
	id: "archived-releases/o-header-services";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-icons": {
	id: "archived-releases/o-icons";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-labels": {
	id: "archived-releases/o-labels";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-layout": {
	id: "archived-releases/o-layout";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-lazy-load": {
	id: "archived-releases/o-lazy-load";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-loading": {
	id: "archived-releases/o-loading";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-message": {
	id: "archived-releases/o-message";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-meter": {
	id: "archived-releases/o-meter";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-normalise": {
	id: "archived-releases/o-normalise";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-overlay": {
	id: "archived-releases/o-overlay";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-quote": {
	id: "archived-releases/o-quote";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-share": {
	id: "archived-releases/o-share";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-spacing": {
	id: "archived-releases/o-spacing";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-stepped-progress": {
	id: "archived-releases/o-stepped-progress";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-subs-card": {
	id: "archived-releases/o-subs-card";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-syntax-highlight": {
	id: "archived-releases/o-syntax-highlight";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-table": {
	id: "archived-releases/o-table";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-tabs": {
	id: "archived-releases/o-tabs";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-teaser": {
	id: "archived-releases/o-teaser";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-teaser-collection": {
	id: "archived-releases/o-teaser-collection";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-toggle": {
	id: "archived-releases/o-toggle";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-tooltip": {
	id: "archived-releases/o-tooltip";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-topper": {
	id: "archived-releases/o-topper";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-typography": {
	id: "archived-releases/o-typography";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-video": {
	id: "archived-releases/o-video";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-viewport": {
	id: "archived-releases/o-viewport";
  collection: "barchart-data";
  data: any
};
"archived-releases/o-visual-effects": {
	id: "archived-releases/o-visual-effects";
  collection: "barchart-data";
  data: any
};
"archived-releases/origami": {
	id: "archived-releases/origami";
  collection: "barchart-data";
  data: any
};
"component-data": {
	id: "component-data";
  collection: "barchart-data";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config.js");
}
