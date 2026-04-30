#!/bin/bash
# name:    retrieve-pm-meeting-tracks-by-code.sh
# process: Retrieve PM Meeting Tracks By Code
#          GET /pm-rest-api/rest/1/pmmeetingtrack?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-pm-meeting-tracks-by-code

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

curl -sS -u "${CMIC_USERNAME}:${CMIC_PASSWORD}" \
  --url "${CMIC_BASE_URL}/pm-rest-api/rest/1/pmmeetingtrack?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
