#!/usr/bin/env node
import {createReadStream} from 'fs';
import {fromMarkdown} from 'mdast-util-from-markdown';
import {visitParents as visit} from 'unist-util-visit-parents';
import {toString} from 'mdast-util-to-string';
import {toMarkdown} from 'mdast-util-to-markdown';
import {frontmatter} from 'micromark-extension-frontmatter';
import {frontmatterFromMarkdown} from 'mdast-util-frontmatter';
import YAML from 'js-yaml';

if (process.argv.length != 3) {
	console.log(
		`Usage: node ${process.argv[1]} _posts/filename.md > _emails/filename.md`
	);
	process.exit(5);
}

let postFileName = process.argv[2];

let match = postFileName.match(/(\d{4})-(\d{2})-(\d{2})-newsletter.md$/);

let postUrl = `https://origami.ft.com/blog/${match[1]}/${match[2]}/${match[3]}/newsletter/`;

const reader = createReadStream(postFileName, 'utf-8');

let md = '';

const fields = {};

for await (const chunk of reader) {
	md += chunk;
}

const tree = fromMarkdown(md, {
	extensions: [frontmatter(['yaml'])],
	mdastExtensions: [frontmatterFromMarkdown(['yaml'])],
});

class FieldMachine {
	state = 'begin';
	title = '';
	postUrl = postUrl;
	tldr = '';
	things = [];
	thanks = '';
	changelog = '';
	pending = [];

	swallow(item) {
		this.pending.push(item);
	}

	spit() {
		let content = toMarkdown({
			type: 'root',
			children: this.pending,
		});
		this.pending = [];
		return content;
	}

	createEmail() {
		return `---
title: ${this.title}
companion_post_url: ${this.postUrl}
--- 

<!-- TL;DR -->
{% capture text %}
${this.tldr}
{% endcapture %}

{% include email/tldr.html content=text %}

<!-- Top things -->
{% include email/h2.html content="Top Things" %}

{% capture text %}Some of the bigger Origami news from the last month:{% endcapture %}
{% include email/markdown.html content=text %}

${this.things
	.map(
		(thing, index) => `
<!-- Thing ${index + 1} -->
{% include email/h3.html content="${thing.title}" %}
{% capture text %}
${thing.content}
{% endcapture %} {% include email/markdown.html content=text %}
`
	)
	.join('\n')}


<!-- Special thanks -->
{% include email/h2.html content="Special Thanks" %}

{% capture text %}
${this.thanks}
{% endcapture %}
{% include email/markdown.html content=text %}


<!-- Broader update -->
{% include email/h2.html content="Broader Update" %}

{% capture text %}A digest list of other things that have happened this month:{% endcapture %}
{% include email/markdown.html content=text %}

{% capture text %}
${this.changelog}
{% endcapture %}
{% include email/markdown-list.html content=text %}
`;
	}
}

let machine = new FieldMachine();

visit(
	tree,
	() => true,
	function (node, parents) {
		if (machine.state == 'begin') {
			if (node.type == 'root') {
				return 'SKIP';
			} else if (node.type == 'yaml') {
				const frontmatter = YAML.load(node.value);
				for (const key in frontmatter) {
					machine[key] = frontmatter[key];
				}
				machine.state = 'outside';
			} else {
				throw new Error(
					'expected document to start with yaml frontmatter block'
				);
			}
		} else if (machine.state == 'outside') {
			if (node.type == 'heading' && node.depth == 2) {
				machine.state = 'top-things';
				machine.things = [];
			} else {
				return 'SKIP';
			}
		} else if (machine.state == 'top-things') {
			// consider grabbing content between here and the first h3
			if (node.type == 'heading') {
				if (node.depth == 3) {
					machine.things[0] = {
						title: toString(node),
					};
					machine.state = 'thing-1';
				} else {
					throw new Error('expected an h3 after the top things h2');
				}
			}
		} else if (machine.state == 'thing-1') {
			if (node.type == 'heading' && node.depth == 3) {
				machine.things[0].content = machine.spit();
				machine.things[1] = {
					title: toString(node),
				};
				machine.state = 'thing-2';
			} else if (parents.length == 1) {
				machine.swallow(node);
			}
		} else if (machine.state == 'thing-2') {
			if (node.type == 'heading' && node.depth == 3) {
				machine.things[1].content = machine.spit();
				machine.things[2] = {
					title: toString(node),
				};
				machine.state = 'thing-3';
			} else if (parents.length == 1) {
				machine.swallow(node);
			}
		} else if (machine.state == 'thing-3') {
			if (node.type == 'heading' && node.depth == 2) {
				machine.things[2].content = machine.spit();
				machine.state = 'thanks';
			} else if (parents.length == 1) {
				machine.swallow(node);
			}
		} else if (machine.state == 'thanks') {
			if (node.type == 'heading' && node.depth == 2) {
				machine.thanks = machine.spit();
				machine.state = 'changelog';
			} else if (parents.length == 1) {
				machine.swallow(node);
			}
		} else if (machine.state == 'changelog' && parents.length == 1) {
			machine.swallow(node);
		}
	}
);

machine.changelog = machine.spit();

process.stdout.write(machine.createEmail());
