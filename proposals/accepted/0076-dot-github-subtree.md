# Table of Contents

-   [Share component github config via git subtree](#share-component-github-config-via-git-subtree)
	-   [motivation](#motivation)
	-   [explanation](#explanation)
	-   [work required](#work-required)
	-   [alternatives](#alternatives)
		-   [nothing](#nothing)
		-   [a generator](#a-generator)
		-   [only sharing `.github/workflows`](#only-sharing-~-github-workflows~)
		-   [no modifications](#no-modifications)
			-   [git submodule](#git-submodule)
			-   [git read-tree](#git-read-tree)
	-   [supporting examples](#supporting-examples)
	-   [notes](#notes)


<a id="share-component-github-config-via-git-subtree"></a>

# Share component github config via git subtree

Create a repository that contains the \`.github\` configuration used by every
component, and use \`[git subtree](https://git-scm.com/book/en/v2/Git-Tools-Advanced-Merging#_subtree_merge)\` to keep it up to date.


<a id="motivation"></a>

## motivation

we currently have the same `.github` directory in all of our components. when we create or update actions, issue templates &c we to update them across all our components.

our current process is to make the change in one component, file a PR, and then run a shell script on our local machines to update the rest of them.

having a single source of truth for this directory—and a single command that's the same for every kind of change—would make it easier to automate that.


<a id="explanation"></a>

## explanation

we move `.github/` to a branch of a new repository (`origami-dot-github#component`), and use `git subtree` in the component to keep them up to date.

I think we should use a branch for this for the following reasons:

1.  it lets us keep the `.github` directory clean, leaving the `README.md` for the `dot-github` project on its main branch.
2.  if we like it for components, maybe we'll want to use it for services and our other projects. they could live in the same repo, in different branches, and we can share changes between them. the `components` branch can branch off the `project` branch.

once there is a single source of truth, we should also retire `origami-ci-tools`, and start running parts of our build in parallel (bower and npm builds are good candidates). but that's for another proposal.


<a id="work-required"></a>

## work required

1.  Create `github.com/Financial-Times/origami-dot-github`
2.  Copy the `.github` from one of our components to it.
3.  Use the config as a subtree in one of our components.
4.  Write a README that describes how to update the subtree
5.  Write a script to update components (maybe this goes in obt?)
6.  Use it across all of our components


<a id="alternatives"></a>

## alternatives


<a id="nothing"></a>

### nothing

continue as we were, making changes across all the repos with shell scripts.

this feels fragile, and requires us to manually review every pull request in case something got accidentally added from a dirty tree or whatever.

it requires us writing a good shell script, it requires knowledge of writing shell scripts of that kind for Origami team members which is true now will not be true forever.


<a id="a-generator"></a>

### a generator

instead of a repo that is subtree'd in, we create a command-line computer program that can be run in a repo to <span class="underline">generate</span> the origami `.github` directory for a particular project type. this is essentially the same as the proposal except the templates would all be kept on the project's main branch.
for users who are diverging from our `.github` directory, they would see the changes in their `git diff` and could decide to keep them or not. we can also provide flags such as `--codeowner="origami-core"`, or `--without-issue-template` to let them generate the right one for their project.

now that i'm typing it, this seems like it might actually be a better idea and maybe i should be proposing that instead?


<a id="only-sharing-~-github-workflows~"></a>

### only sharing `.github/workflows`

make a shared `workflows` project instead of shared `.github` directory.
we'd no longer have to think about divergence on `CODEOWNERS` and `ISSUE_TEMPLATE`, but the issue of divergence  would still crop up when a component builder needs to add their own github actions or change a couple of details about one of ours.


<a id="no-modifications"></a>

### no modifications

these two options wouldn't allow for a component to make its own modifications to the files tracked in the shared repository.

this might actually be desirable for our own components, to make them all have the same `.github` directory, but it would likely not be desirable for other projects where you want some, but not all, of the same files.

it would also not be desirable for component creators outside the origami team, who would want to diverge on at least CODEOWNERS.


<a id="git-submodule"></a>

#### git submodule

git [submodule](https://git-scm.com/docs/git-submodule) is probably a more straight-forward concept and we could configure dependabot to keep it up to date for us. but, no consumer-level modifications could be made.

it also makes cloning a repository less straightforward (people need to clone with `--recursive` or use `submodule init` and `submodule update`).

it used to be hard to work with different branches in a submodule, but that got cleaned up in git v1.8


<a id="git-read-tree"></a>

#### git read-tree

[read-tree](https://git-scm.com/docs/git-read-tree) would allow us to use a subdirectory instead of a branch, but it wouldn't allow a component to apply its own modifications on top.


<a id="supporting-examples"></a>

## supporting examples

-   customer products uses a subtree for [their read-only wiki](https://github.com/Financial-Times/customer-products#developing)
-   i did some exploration of adding modifications as a consumer over here: <https://chee.xo.snoot.club/subtree-test/>


<a id="notes"></a>

## notes

we should ensure we update `origami-component-template` too when we're updating our other repositories. `origami-component-template` should maybe have a setup script you can run after you've checked it out?
