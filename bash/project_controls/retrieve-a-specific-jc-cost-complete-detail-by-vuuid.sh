#!/bin/bash
# name:    retrieve-a-specific-jc-cost-complete-detail-by-vuuid.sh
# process: Retrieve a Specific JC Cost Complete Detail By VUUID
#          GET /jc-rest-api/rest/1/jccostcompletedetail?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-a-specific-jc-cost-complete-detail-by-vuuid

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
  --url "${CMIC_BASE_URL}/jc-rest-api/rest/1/jccostcompletedetail?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
