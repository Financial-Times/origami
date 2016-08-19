# Warning, don't edit this file, it's maintained on GitHub and updated by running `make update-tools`
# Submit PR's here: https://www.github.com/Financial-Times/n-makefile


# Setup environment variables
sinclude .env
export $(shell [ -f .env ] && sed 's/=.*//' .env)

# ./node_modules/.bin on the PATH
export PATH := ./node_modules/.bin:$(PATH)

# Use bash not sh
SHELL := /bin/bash

# Some handy utilities
GLOB = git ls-files -z $1 | tr '\0' '\n' | xargs -I {} find {} ! -type l
NPM_INSTALL = npm prune --production=false && npm install
BOWER_INSTALL = bower prune && bower install --config.registry.search=http://registry.origami.ft.com --config.registry.search=https://bower.herokuapp.com
JSON_GET_VALUE = grep $1 | head -n 1 | sed 's/[," ]//g' | cut -d : -f 2
IS_GIT_IGNORED = grep -q $(if $1, $1, $@) .gitignore
VERSION = v1.4.4
APP_NAME = $(shell cat package.json 2>/dev/null | $(call JSON_GET_VALUE,name))
DONE = echo ✓ $@ done
CONFIG_VARS = curl -fsL https://ft-next-config-vars.herokuapp.com/$1/$(call APP_NAME)$(if $2,.$2,) -H "Authorization: `heroku config:get APIKEY --app ft-next-config-vars`"

#
# META TASKS
#

.PHONY: test

#
# COMMON TASKS
#

# clean
clea%:
# HACK: Can't use -e option here because it's not supported by our Jenkins
	@git clean -fxd
	@$(DONE)

# install
instal%: node_modules bower_components _install_scss_lint .editorconfig .eslintrc.js .scss-lint.yml .env webpack.config.js heroku-cli
	@$(MAKE) $(foreach f, $(shell find functions/* -type d -maxdepth 0 2>/dev/null), $f/node_modules $f/bower_components)
	@$(DONE)

# deploy
deplo%: _deploy_apex
	@$(DONE)

# verify
verif%: _verify_lintspaces _verify_eslint _verify_scss_lint
	@$(DONE)

# assets (includes assets-production)
asset%:
	@if [ -e webpack.config.js ]; then webpack $(if $(findstring assets-production,$@),--bail,--dev); fi

# build (includes build-production)
buil%: public/__about.json
	@if [ -e webpack.config.js ]; then $(MAKE) $(subst build,assets,$@); fi
	@if [ -e Procfile ] && [ "$(findstring build-production,$@)" == "build-production" ]; then haikro build; fi
	@$(DONE)

# watch
watc%:
	@if [ -e webpack.config.js ]; then webpack --watch --dev; fi
	@$(DONE)

#
# SUB-TASKS
#

# INSTALL SUB-TASKS

# Regular npm install
node_modules: package.json
	@if [ -e package.json ]; then $(NPM_INSTALL) && $(DONE); fi

# Regular bower install
bower_components: bower.json
	@if [ -e bower.json ]; then $(BOWER_INSTALL) && $(DONE); fi

# These tasks have been intentionally left blank
package.json:
bower.json:

# node_modules for Lambda functions
functions/%/node_modules:
	@cd $(dir $@) && if [ -e package.json ]; then $(NPM_INSTALL) && $(DONE); fi

# bower_components for Lambda functions
functions/%/bower_components:
	@cd $(dir $@) && if [ -e bower.json ]; then $(BOWER_INSTALL) && $(DONE); fi

_install_scss_lint:
	@if [ ! -x "$(shell which scss-lint)" ] && [ "$(shell $(call GLOB,'*.scss'))" != "" ]; then gem install scss-lint -v 0.35.0 && $(DONE); fi

# Manage various dot/config files if they're in the .gitignore
.editorconfig .eslintrc.js .scss-lint.yml webpack.config.js: n.Makefile
	@if $(call IS_GIT_IGNORED); then curl -sL https://raw.githubusercontent.com/Financial-Times/n-makefile/$(VERSION)/config/$@ > $@ && $(DONE); fi

ENV_MSG_CANT_GET = "Cannot get config vars for this service.  Check you are added to the ft-next-config-vars service on Heroku with operate permissions.  Do that here - https://docs.google.com/spreadsheets/d/1mbJQYJOgXAH2KfgKUM1Vgxq8FUIrahumb39wzsgStu0 (or ask someone to do it for you).  Check that your package.json's name property is correct.  Check that your project has config-vars set up in models/development.js."
.env:
	@if $(call IS_GIT_IGNORED,*.env*) && [ -e package.json ]; then ($(call CONFIG_VARS,development,env) > .env && perl -pi -e 's/="(.*)"/=\1/' .env && $(DONE)) || (echo $(ENV_MSG_CANT_GET) && rm .env && exit 1); fi

MSG_HEROKU_CLI = "Please make sure the Heroku CLI toolbelt is installed - see https://toolbelt.heroku.com/. And make sure you are authenticated by running ‘heroku login’. If this is not an app, delete .env from .gitignore."
heroku-cli:
	@if [ -a Procfile ]; then heroku auth:whoami &>/dev/null || (echo $(ENV_MSG_HEROKU_CLI) && exit 1); fi


# VERIFY SUB-TASKS

_verify_eslint:
	@if [ -e .eslintrc.js ]; then $(call GLOB,'*.js') | xargs eslint && $(DONE); fi

_verify_lintspaces:
	@if [ -e .editorconfig ] && [ -e package.json ]; then $(call GLOB) | xargs lintspaces -e .editorconfig -i js-comments -i html-comments && $(DONE); fi

_verify_scss_lint:
# HACK: Use backticks rather than xargs because xargs swallow exit codes (everything becomes 1 and stoopidly scss-lint exits with 1 if warnings, 2 if errors)
	@if [ -e .scss-lint.yml ]; then { scss-lint -c ./.scss-lint.yml `$(call GLOB,'*.scss')`; if [ $$? -ne 0 -a $$? -ne 1 ]; then exit 1; fi; $(DONE); } fi

# DEPLOY SUB-TASKS

APEX_PROD_ENV_FILE = .env.prod.json
_deploy_apex:
	@if [ -e project.json ]; then $(call CONFIG_VARS,production) > $(APEX_PROD_ENV_FILE) && apex deploy --env-file $(APEX_PROD_ENV_FILE); fi
	@if [ -e $(APEX_PROD_ENV_FILE) ]; then rm $(APEX_PROD_ENV_FILE) && $(DONE); fi

npm-publis%:
	npm-prepublish --verbose
	npm publish --access public

# BUILD SUB-TASKS

# Only apply to Heroku apps for now
public/__about.json:
	@if [ -e Procfile ]; then mkdir -p public && echo '{"description":"$(call APP_NAME)","support":"next.team@ft.com","supportStatus":"active","appVersion":"$(shell git rev-parse HEAD | xargs echo -n)","buildCompletionTime":"$(shell date -u +"%Y-%m-%dT%H:%M:%SZ")"}' > $@ && $(DONE); fi

# UPDATE TASK
update-tools:
	$(eval LATEST = $(shell curl -fs https://api.github.com/repos/Financial-Times/n-makefile/tags | $(call JSON_GET_VALUE,name)))
	$(if $(filter $(LATEST), $(VERSION)), $(error Cannot update n-makefile, as it is already up to date!))
	@curl -sL https://raw.githubusercontent.com/Financial-Times/n-makefile/$(LATEST)/Makefile > n.Makefile
	@sed -i "" "s/^VERSION = master/VERSION = $(LATEST)/" n.Makefile
	@read -p "Updated tools from $(VERSION) to $(LATEST).  Do you want to commit and push? [y/N] " Y;\
	if [ $$Y == "y" ]; then git add n.Makefile && git commit -m "Updated tools to $(LATEST)" && git push origin HEAD; fi
	@$(DONE)
