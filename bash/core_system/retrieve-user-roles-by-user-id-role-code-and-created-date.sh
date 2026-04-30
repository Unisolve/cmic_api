#!/bin/bash
# name:    retrieve-user-roles-by-user-id-role-code-and-created-date.sh
# process: Retrieve User Roles By User ID, Role Code and Created Date
#          GET /sys-rest-api/rest/1/sduserroles?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-user-roles-by-user-id-role-code-and-created-date

#
# Load configuration
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/../config"

if [[ -z "$CMIC_USERNAME" || -z "$CMIC_PASSWORD" ]]; then
    echo "Error: Configuration not loaded. Please copy config.template to config and set your credentials."
    exit 1
fi

#
# Run endpoint
#

curl -u "${CMIC_USERNAME}:${CMIC_PASSWORD}" \
  --url "${CMIC_BASE_URL}/sys-rest-api/rest/1/sduserroles?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
