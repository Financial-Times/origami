# Review how we manage and deploy component specifc assets
Review how we build components with unique static assets such as images.

**Background:**

At the time of writing (May 2020) the vast majority of our components pull their images from our shared icon or logo [image sets](https://registry.origami.ft.com/components?imageset=true&active=true&maintained=true). 

However [o-comments](https://github.com/Financial-Times/o-comments/pull/164) has a unique image asset that is hosted in an s3 bucket (somewhere) and served through the [Image Service](https://www.ft.com/__origami/service/image/v2/). It's the best approach we have at the moment but it's not ideal: It relies on a component author having a secure and reliable way to host their own assets; the asset could be deleted accidentally as there's no explicit connection; the asset isn't within version control for restoring and history of the component; and it reduces our ability to develop offline (although along with fonts, polyfill.io requests, and potential build service requests in demos we can't really anyway).

We used to use [o-assets](https://github.com/Financial-Times/o-assets) to manage individual component assets as required [in the spec](https://origami.ft.com/spec/v1/components/#subresources), but it has a few problems:
- For local development, assumes assets are in `bower_components` by default, but: Origami components are also published to npm now and the asset directory cannot be changed to `node_modules` because the component directory has a `@financial-times` namespace; the asset directory may or may not be included in the npm bundle by [occ](https://github.com/Financial-Times/origami-component-converter/); and
- Requires apps in development and production to serve `bower_components/node_modules` source code so requests can be made for the assets (potentially with a url mapping behind a router by configuring o-assets variables).

**Quick brain bump of requirements:**
We need a way to include unique component assets (let's assume any static file be it images, videos, json blobs, font files) which:
- work for the Origami Build Service
- work for bower and npm users in development
- allows users to self host component assets; and or
- doesn't require projects to include an asset build step (Origami hosted assets) 
