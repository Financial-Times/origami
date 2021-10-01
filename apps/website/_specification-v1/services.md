---
title: Service Specification
description: A specification which describes what is required when building Origami web services.
cta: Read the service spec

# Redirect from legacy URLs
redirect_from:
  - /docs/component-spec/web-services/

# Navigation config
nav_display: true
nav_label: Services
nav_order: 20
---

# {{page.title}}

An Origami web service is a hosted service, offered as a URL endpoint that delivers content or data services. See our [services documentation page](/docs/services/) for example services.

All services **must** adhere to the FT's <a href="https://docs.google.com/document/d/1NbgQwJKUhSJBVMWw8OVVrKyKwRieaXq7AOtioC69XKM" class="o-typography-link--external">engineering checklist</a>.

Node.js and <a href="https://github.com/Financial-Times/origami-service" class="o-typography-link--external">Origami Service</a>, which extends <a href="https://expressjs.com/" class="o-typography-link--external">Express</a>, **should** be used as a starting point to help meet service requirements.

## Naming Conventions

All of our services **should** be named in the pattern "Origami &#x3C;name&#x3E; Service", e.g. Origami Build Service, Origami Image Service. Services **may** make exceptions to this naming structure in circumstances where “Service” doesn’t effectively describe what the application does, e.g. with Origami Bower Registry. If you think that a different name might be required then discuss with the team.

Names **may** be slugified where needed (this is a lower case, hyphenated version of the name, e.g. origami-build-service, origami-image-service). For instance, a slugified name **must** be used for the service's:
  - System code.
  - Repository.
  - Heroku application, where applicable.

In addition to the slugified service name, Heroku applications **must** be suffixed with an environment identifier for non-production applications, and a region identifier for production applications. E.g. origami-build-service-qa, origami-build-service-eu.

## Domains &amp; Endpoints

Origami web services **should** exist on a path under `ft.com` if users would benefit from HTTP2 in this case. If this is not possible for some reason then a subdomain **must** be used.

When using a path, it **should** be `/__origami/service/<short-name>`. The short name in this case is the slugified service name with origami- and -service removed, E.g. `/__origami/service/build`.

When using a subdomain, it **should** be `<short-name>.ft.com`. The short name in this case is the slugified service name with -service removed, E.g. `origami-build.ft.com`.

Services **must** also include a mandatory version number for all API endpoints. This **must not** expose minor version changes and **must** be prefixed with a `v`. The only exception to this rule is when the service is replicating a third-party API. E.g. a Bower registry. Good examples include:
- `www.ft.com/__origami/service/tweet/v1/<endpoint>`
- `www.ft.com/__origami/service/most-popular/v2/<endpoint>`
- `www.ft.com/__origami/service/jobs/v3/<endpoint>`

The api endpoint which follows the service version **must** be RESTful, i.e. use the most appropriate HTTP verb and URLs that semantically describe the resource to be acted upon.

The service's root path `/` **must** redirect to the latest API version.

<table class="o-table o-table--horizontal-lines" data-o-component="o-table">
<thead>
	<tr>
		<th scope="col" role="columnheader">Service name</th>
		<th scope="col" role="columnheader">Repository</th>
		<th scope="col" role="columnheader">Heroku app</th>
		<th scope="col" role="columnheader">URL</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>Origami Tweet Service</td>
		<td>origami-tweet-service</td>
		<td>origami-tweet-service-eu</td>
		<td><code>www.ft.com/__origami/service/tweet/v1</code> or <code>origami-tweet.ft.com/v1</code></td>
	</tr>
	<tr>
		<td>Origami Most Popular Service</td>
		<td>origami-most-popular-service</td>
		<td>origami-most-popular-service-eu</td>
		<td><code>www.ft.com/__origami/service/most-popular/v1</code> or <code>origami-most-popular.ft.com/v1</code></td>
	</tr>
</tbody>
</table>

## Request Source

Services **must** require API endpoint requests to contain a `source` query string parameter to identify the requesting application, unless the service is replicating a third-party API. E.g. a Bower registry. If the `source` query parameter is missing, the service **must** return a `400 Bad Request` response status code.

Requests to non-API endpoints such as the root path or `/__about` **should not** require the source parameter.

If you are building a Node.js/Express service, we provide an <a href="https://github.com/Financial-Times/source-param-middleware" class="o-typography-link--external">Express middleware</a> to check source parameters.

## Cache Control

Services **must** include an explicit `Cache-Control` header in all HTTP responses that have a `2xx` or `3xx` status.

## CORS Response Headers

Services **must** serve permissive CORS response headers to allow the endpoints to be consumed in-browser from any origin (though consuming in-browser is discouraged). If CORS is supported, the service **must** support all potential pre-flight requests that would be required in the case of requests for HTTP methods other than GET.

## Error Responses

When an error occurs that prevents the service from returning the output requested, the HTTP response code **must** be in the `5xx` or `4xx` range.

## Versioning

A "backwards compatible change" is defined as one that, in the case of JSON output, adds a new property to an object, or adds or removes elements from an array. Any changes that remove existing properties of objects, or change the type of a value, are breaking. In the case of HTML output, any change that requires accompanying changes in a module component (CSS, JavaScript or other resources that act on the HTML) is breaking.

In the case of breaking changes, a service **must**:

- Provide a new set of API endpoints with updated version number.
- Continue to support previous versions.
- Communicate the deprecation of the previous version to the service consumers and the wider business.

To decommission a previous version you **must**:

- Give at least 6 months notice via an email notification to the service consumers and the wider business.
- Review the top referring applications identified by the `source` parameter and proactively notify their owners.
- Following the expiry of the termination date, the service **should** return either a `410 Gone`, a static copy of the last content to be generated, or redirect to the new version if the API is compatible.

## Documentation

Services **must** serve content on the bare versioned endpoints (e.g. `/v1/`) that documents the service, or links to documentation under a `docs` path (e.g. `/v1/docs/`). Documentation **should** use the [o-layout](https://registry.origami.ft.com/components/o-layout) component for formatting and layout.

## JSONP

Services **must** use the querystring parameter `callback` if JSONP is supported. JSONP support is, however, not required.
