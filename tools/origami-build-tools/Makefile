# Origami Service Makefile
# ------------------------
# This section of the Makefile should not be modified, it includes
# commands from the Origami service Makefile.
# https://github.com/Financial-Times/origami-service-makefile
include node_modules/@financial-times/origami-service-makefile/index.mk
# [edit below this line]
# ------------------------

# npm publishing tasks
# --------------------

# Publish the module to npm
npm-publish:
	npm-prepublish --verbose
	npm publish --access public

# Configuration
# -------------

INTEGRATION_TIMEOUT = 10000
INTEGRATION_SLOW = 2000

SERVICE_NAME = Origami Build Tools
SERVICE_SYSTEM_CODE = origami-build-tools
SERVICE_SALESFORCE_ID = $(SERVICE_NAME)

