---
title: Origami Survey Results, Building Components
description: 'Some charts outlining the results of our recent survey titled "Origami Survey: Building Components"'
author: Rowan Manning
hasCharts: true
---

{% assign results = site.data.survey['2020-04-20'] %}
{% assign areas = "CRM, Customer Products, Enterprise Services and Security, FT Core, FT Group Products, Internal Products, Operations and Reliability, Product" | split: ", " %}


We recently sent out an internal survey titled "Origami Survey: Building Components". The survey was designed to gather some quantititive data from our users, and the aim was to help us understand the barriers that teams have to developing their own Origami (or Origami-compatible) components. We sent the survey to engineers, and indicated that we were interested in responses from engineers of all seniorities and levels of experience with Origami.

After two weeks, we had **{{results | size}} responses** from different groups within Product and Technology. This post will explore some of the results, and what we can learn from them. (Bear in mind that while great that we've got this many responses, we should be wary of drawing too many conclusions from 27 out of all the engineers in Product and Technology).

To help segment the data, we asked each respondent which area of Product and Technology they worked in, as well as asking them to self-report their level of familiarity with using Origami components.

We'd like to say a big thanks to everyone who filled out the survey 🙂


## Familiarity

We asked the question _**"How familiar are you with using Origami components?"**_, and asked respondents to mark themselves 1 (What are origami components?) to 5 (I'm an expert). Most people responded with 3 or 4:

<table class="o-table o-table--row-stripes" data-chart-type="stacked-bar">
	<caption>How familiar are you with using Origami components? (All Areas)</caption>
	<thead>
		<tr>
			<th>Area</th>
			<th>1</th>
			<th>2</th>
			<th>3</th>
			<th>4</th>
			<th>5</th>
		</tr>
	</thead>
	<tbody>
		{% for area in areas %}
			{% assign filtered_results = results | where: "area", area %}
			<tr>
				<td>{{area}}</td>
				<td>{{ filtered_results | where: "familiarity", 1 | size }}</td>
				<td>{{ filtered_results | where: "familiarity", 2 | size }}</td>
				<td>{{ filtered_results | where: "familiarity", 3 | size }}</td>
				<td>{{ filtered_results | where: "familiarity", 4 | size }}</td>
				<td>{{ filtered_results | where: "familiarity", 5 | size }}</td>
			</tr>
		{% endfor %}
	</tbody>
</table>

When you filter this by the area that the person works in, you can see that the groups who have been using Origami for the longest (Customer Products, Internal Products) generally self-report as having more experience.


## Creating Components

We asked the question _**"Did you know that any engineer can create an Origami component?"**_, and asked respondents to answer yes or no. There ended up being a roughly 50/50 split:

<table
	class="o-table o-table--row-stripes"
	data-chart-type="pie"
>
	<caption>Did you know that any engineer can create an Origami component? (All Areas)</caption>
	<thead>
		<tr>
			<th>Response</th>
			<th>Respondents</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-slice-color="#00994D">Yes</td>
			<td>{{ results | where: "knowsThatAnyEngineerCanBuildAnOrigamiComponent", true | size }}</td>
		</tr>
		<tr>
			<td data-slice-color="#CC0000">No</td>
			<td>{{ results | where: "knowsThatAnyEngineerCanBuildAnOrigamiComponent", false | size }}</td>
		</tr>
	</tbody>
</table>

When you filter this by the area that the person works in, you can see that Customer Products leans more towards "Yes" as an answer. This aligns with some of our assumptions, as Customer Products have some of their own shared components.

<div class="chart-grid">
	{% for area in areas %}
		{% assign filtered_results = results | where: "area", area %}
		<table
			class="o-table o-table--row-stripes"
			data-chart-type="pie"
		>
			<caption>{{area}}</caption>
			<thead>
				<tr>
					<th>Response</th>
					<th>Respondents</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td data-slice-color="#00994D">Yes</td>
					<td>{{ filtered_results | where: "knowsThatAnyEngineerCanBuildAnOrigamiComponent", true | size }}</td>
				</tr>
				<tr>
					<td data-slice-color="#CC0000">No</td>
					<td>{{ filtered_results | where: "knowsThatAnyEngineerCanBuildAnOrigamiComponent", false | size }}</td>
				</tr>
			</tbody>
		</table>
	{% endfor %}
</div>


## Prior Experience

We also asked _**"Have you ever built or contributed to an Origami component?"**_, and gave respondents the ability to indicate whether they've either built a component, contributed to a component, or both. The vast majority of respondents have neither built nor contributed to the development of a component:

<table
	class="o-table o-table--row-stripes"
	data-chart-type="pie"
>
	<caption>Have you ever built or contributed to an Origami component?</caption>
	<thead>
		<tr>
			<th>Response</th>
			<th>Respondents</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td data-slice-color="#CCE6FF">Built a component</td>
			<td>{{ results | where: "hasBuiltAnOrigamiComponent", true | where: "hasContributedToAnOrigamiComponent", false | size }}</td>
		</tr>
		<tr>
			<td data-slice-color="#4E96EB">Contributed to a component</td>
			<td>{{ results | where: "hasContributedToAnOrigamiComponent", true | where: "hasBuiltAnOrigamiComponent", false | size }}</td>
		</tr>
		<tr>
			<td data-slice-color="#1470CC">Both</td>
			<td>{{ results | where: "hasContributedToAnOrigamiComponent", true | where: "hasBuiltAnOrigamiComponent", true | size }}</td>
		</tr>
		<tr>
			<td data-slice-color="#FF8833">Neither</td>
			<td>{{ results | where: "hasContributedToAnOrigamiComponent", false | where: "hasBuiltAnOrigamiComponent", false | size }}</td>
		</tr>
	</tbody>
</table>


## What if an Origami component doesn't exist?

To get an idea of how people are building their front ends, we asked _**"If there isn't an Origami component that suits your needs, how do you build that part of your website?"**_, and gave respondents the ability to select multiple options from the following, or provide their own response:

  * We build and use our own Origami components (Own Origami)
  * We build and use our own reusable non-Origami components, which are used across multiple applications (Own Non-Origami)
  * We build it directly into our application codebase (Directly Into App)
  * We never need anything other than Origami components (Only Origami)
  * We use third-party libraries and components (Third-Party)

Ignoring responses of "Other" for now, the results look like this. You can see that in the majority of cases, if an Origami component is not available then front-end code gets built directly into people's application codebase:

<table class="o-table o-table--row-stripes" data-chart-type="stacked-bar">
	<caption>If there isn't an Origami component that suits your needs, how do you build that part of your website?</caption>
	<thead>
		<tr>
			<th>Area</th>
			<th data-column-label="Own Origami">We build and use our own Origami components</th>
			<th data-column-label="Own Non-Origami">We build and use our own reusable non-Origami components, which are used across multiple applications</th>
			<th data-column-label="Directly Into App">We build it directly into our application codebase</th>
			<th data-column-label="Only Origami">We never need anything other than Origami components</th>
			<th data-column-label="Third-Party">We use third-party libraries and components</th>
		</tr>
	</thead>
	<tbody>
		{% for area in areas %}
			{% assign filtered_results = results | where: "area", area %}
			<tr>
				<td>{{area}}</td>
				<td>{{ filtered_results | where_exp: "response", "response.whatDoTheyUseInsteadOfOrigami contains 'We build and use our own Origami components'" | size }}</td>
				<td>{{ filtered_results | where_exp: "response", "response.whatDoTheyUseInsteadOfOrigami contains 'We build and use our own reusable non-Origami components, which are used across multiple applications'" | size }}</td>
				<td>{{ filtered_results | where_exp: "response", "response.whatDoTheyUseInsteadOfOrigami contains 'We build it directly into our application codebase'" | size }}</td>
				<td>{{ filtered_results | where_exp: "response", "response.whatDoTheyUseInsteadOfOrigami contains 'We never need anything other than Origami components'" | size }}</td>
				<td>{{ filtered_results | where_exp: "response", "response.whatDoTheyUseInsteadOfOrigami contains 'We use third-party libraries and components'" | size }}</td>
			</tr>
		{% endfor %}
	</tbody>
</table>

The "Other" responses to this question are as follows:

  * We beg origami to consider it for their roadmap 🙏, rally others who may benefit from it too
  * Didn't hit such case. Even if I did, would use some simple custom elements. Instead of including other third party libs
  * We copy/paste it from another repo that's done something similar
  * Sorry, I'm just not familiar with Origami components
  * I'm new :D Never had to touch an Origami component yet!
  * Talked to Origami developers who then worked with us improving existing components to meet our requirements

We can see that very few people build Origami-compatible components outside of the Origami team. Engineers are also more likely to use third-party code than build their own reusable components.

## Other Feedback

We also got a lot of useful responses in free-text fields at the end of the survey. We'll be reading and understanding these over the next few weeks. We'll keep you posted on any work that we decide to do based on the results of this survey.

Thanks again!<br/>
The Origami team
