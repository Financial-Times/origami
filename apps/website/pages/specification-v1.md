---
title: Origami Specification
description: The Origami Specification outlines the requirements for Origami-compatible components and services, helping others contribute back.
permalink: /spec/v1/
layout: spec-v1
collection_id: specification-v1

# Redirect from legacy URLs
redirect_from:
  - /spec/
  - /docs/component-spec/

# Navigation config
nav_display: false
nav_label: Spec
nav_order: 20
---


# {{page.title}}

The Origami specification outlines the requirements for Origami-compatible components and services. This is a <a href="https://www.w3.org/TR/qaframe-spec/" class="o-typography-link--external">normative</a> specification; non-normative (informative) sections are indicated explicitly or by inset and boxed asides. The words **MUST**, **MUST NOT**, **SHOULD**, **SHOULD NOT**, and **MAY** have the meaning given to them in <a href="http://www.ietf.org/rfc/rfc2119.txt" class="o-typography-link--external">RFC 2119</a>.

<aside>
	This section of the site is meant for people who are building Origami components or services. To use Origami, see the <a href="/docs/components/">components documentation</a> and <a href="/docs/services/">services documentation</a>.
</aside>


## Overview

_This section is non-normative._

Conforming to the Origami specification when building components or services is beneficial for a number of reasons:

  - Your code will be easier for other teams who use Origami to understand
  - Switching support of your code over to the Origami team will be smoother
  - Your component or service will be discoverable, appearing in the <a href="https://registry.origami.ft.com/components">Origami Registry</a>


## Naming

The name **repository** refers to a collection of files and folders which are stored in version control (such as <a class="o-typography-link--external" href="https://git-scm.com/">Git</a>.

The name **component** refers to a repository that:

  - Provides front end code which can be used as part of a web page
  - Complies with the [component specification](/spec/v1/components/)

The name **service** refers to a repository that:

  - Provides code for a web service which can be interacted with over HTTPS
  - Complies with the [service specification](/spec/v1/services/)

The name **manifest** refers to a file in a repository that:

  - Has the name `origami.json`
  - Sits at the top of the repository's directory structure
  - Complies with the [`origami.json` manifest specification](/spec/v1/manifest/)
