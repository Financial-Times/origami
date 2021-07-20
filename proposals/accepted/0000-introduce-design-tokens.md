# put your proposal title here

> Provide a brief one line summary of your proposal.

## motivation

Draft: this is a shopping list of motivation, which may or may not be met by different options.

- To provide a mechanism to introduce dark mode branding to Origami. The app currently implements dark mode but it’s difficult to implement at the app level in a consistent way as styles must be overridden, which would be [time consuming and unreliable](https://origami.ft.com/docs/components/customisation/#avoid-css-overrides). The app instead relies on inverting everything and then opting out some elements (images, slate backgrounds). This is limited. As Mark Limb, designer on the apps team, writes "the brand is completely lost and in some places the colours become meaningless, often distracting, [...] I believe we do need a dark variant of our FT palette".
- To make it easier to customise Origami by adding new brands or variants with brands.
    1. FT Creative use Origami components but heavily modify them, this is difficult, unsupported, and can be unreliable. There's an opportunity to work with FT Creative to meet their requirements in a global design system and add suitable component variants to Origami.
    2. Specialist Titles: Used to use Origami components more but now largely have their own design system, with some exceptions like the [o-cookie-message](https://registry.origami.ft.com/components/o-cookie-message@6.0.0) Origami component which is still in use. There's an opportunity for us to collaborate more (share code and design thinking) to reduce repeated work and improve design consistency. Where Origami components are used across specialist titles, ft.com, and internal tools (like [o-cookie-message](https://registry.origami.ft.com/components/o-cookie-message@6.0.0)), we should look to design component variants in Origami specifically for Specialist Titles to reinforce the title’s brand.
- To share platform agnostic design decisions. Currently many design decisions are encoded as Sass variables in Origami components (e.g. the spacing between 2 elements, the colour of "paper", the colour of a link, our typographic scale, size of headings). These values need to be duplicated across platforms, which increases technical complexity and introduces opportunities for error:
    1. In a component's JavaScript, or passed along in [some other non-standard means](https://css-tricks.com/making-sass-talk-to-javascript-with-json/) (since we cannot rely on CSS Custom Properties and maintain IE11 support).
    2. In native app elements. As well as being copied over they may need to be converted to a different format, too.
    3. In design tooling (e.g. Figma).
- To improve designer and engineer communication, by using the same terminology/values across developer and designer tooling more often.
- Make it easier to find and edit values which represent design decisions. Currently values are spread across multiple component repositories, with multiple formats, across platform specific Sass and JavaScript.
- Simplify component Sass by abstracting complex logic to a design token compile step. For example the complex logic used to [calculate the colour of a button](https://github.com/Financial-Times/o-buttons/blob/v7.0.0/src/scss/_functions.scss#L144), this is hard to reason about or improve in Sass.

## explanation

> Provide a detailed explanation of your proposal
> This section is required

## work required

> Add here steps required to make your proposal a reality
> Provide links to the code that would need to change if relevant
> This section isn't required to open a proposal, but is required before a proposal can be accepted

## alternatives

> Provide some alternatives to your proposal and their benefits and drawbacks
> This section is required

## supporting examples

> Include links to prior art, examples, research, or code to support your proposal, if any is available.
> If this is a component proposal, it's also useful to have links to designs if there are any.
> This section is required

## notes

> Add notes about unresolved questions or other things that don't fit well into the sections above
> This section is optional
