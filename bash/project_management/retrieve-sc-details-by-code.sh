#!/bin/bash
# name:    retrieve-sc-details-by-code.sh
# process: Retrieve SC Details By Code
#          GET /pm-rest-api/rest/1/scsched?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-sc-details-by-code

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
  --url "${CMIC_BASE_URL}/pm-rest-api/rest/1/scsched?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
