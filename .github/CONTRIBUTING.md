# Contributing Guide

There are several ways to contribute to this proposal process:

  - [Discuss existing proposals which are under consideration](#discuss-existing-proposals)
  - [Propose a new component or pattern](#propose-a-new-component-or-pattern)
  - [Review a proposal](#review-a-proposal) (Origami team only)


## Discuss Existing Proposals

You should feel free to discuss any existing proposals which are in the [proposal backlog], and are in the "Proposed" or "Under Consideration" columns. Some examples of useful contributions to the discussion:

  - Asking questions about a proposal
  - Answering questions from other contributors
  - Sharing research relating to the proposal
  - Sharing examples or demos of a component or pattern that's similar
  - Sharing additional use-cases or variants which would be useful to you

If the proposal is for a new component, which has been accepted and built, you should initate discussion in the repository for that component rather than here.


## Propose a New Component or Pattern

Anybody can propose a new component or pattern for inclusion in Origami. This can be a completely new component, an existing component which would benefit from being maintained by the Origami team, or a pattern that would impact multiple components. We ask that you complete the steps below:

  1. ### Check the Registry

     If proposing a new component, please check and search the [Origami Registry] so that you're sure we haven't already built a similar component. If you find something and need changes made to it, then please open an issue on the component repository.

  2. ### Check the Backlog

     Before proposing a new component or pattern, please check and search the [proposal backlog] for similar issues. If there is already a proposal that's similar to yours then you can comment on the issue and share examples or evidence that you have to support this proposal.

  3. ### Raise an Issue

     If your idea is not already proposed in the backlog, please [create a new proposal PR](#creating-a-proposal-pr). Alternatively, you can [raise a component or proposal issue] on this repository and follow the provided template. The more detail you include the better. If you don't have a GitHub account then you can also [email a proposal to the team](mailto:origami.support@ft.com?subject=Proposal).

  4. ### Request Feedback

     Once you've got a proposal, request feedback from the Origami team and feel free to share it to relevant stakeholders in the business – they may have something to add, and more evidence is always good. You can contact the Origami team via [email](mailto:origami.support@ft.com?subject=Proposal) or [Slack], alternatively assign the Origami Core GitHub team to the issue.

### Creating a proposal PR

1. Copy `proposals/0000-template.md` to `proposals/0000-my-new-proposal-title.md`
2. Edit your new file, filling in the sections of the template appropriately
3. File a pull request and add the `proposal` label, as well as the `component` or `pattern` label if applicable.

## Review a Proposal

This section is for members of the Origami team, and acts as a guide for reviewing and accepting (or not accepting) proposals. It's publicly visible here to make our component proposal process as transparent as possible.

  1. ### Mark as Under Consideration

     Once a component or pattern has been proposed, we move it to the "Under Consideration" column in order to indicate that we've seen and are considering the proposal.

  2. ### Questions

     During the proposal process it's good to ask questions which help solidify the scope of the proposal. E.g. if there are multiple variants of a new component then ask why, if any behaviour is unclear then ask for clarity, and if the component is only used in one place we should question why it needs to be maintained by Origami.

     It's useful to have _some_ design thinking up front. If there's not then it'd be good to also involve the design team at this stage.

  3. ### Acceptance

     If, after discussing the proposal, it's decided that Origami should take on the work then we should outline our reasoning in a comment on the issue. Then we move it to the "Accepted" column and add the appropriate labels.

	 If the proposal is not going to be accepted then we should also provide some reasoning and move to the "Not Accepted" column. It's important to also note that if somebody in future has a need for the same proposal then we can reopen the proposal and accept further evidence and reasoning.


[issue template]: https://github.com/Financial-Times/origami/blob/master/.github/ISSUE_TEMPLATE.md
[origami registry]: https://registry.origami.ft.com/
[proposal backlog]: https://github.com/Financial-Times/origami/projects/1
[raise a component or proposal issue]: https://github.com/Financial-Times/origami-proposals/issues/new
[slack]: https://financialtimes.slack.com/messages/origami-support
