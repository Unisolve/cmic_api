#!/bin/bash
# name:    retrieve-pm-project-item-phase-segment-sums-by-code.sh
# process: Retrieve PM Project Item Phase Segment Sums By Code
#          GET /pm-rest-api/rest/1/pmprojectitemphssegmsum?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-pm-project-item-phase-segment-sums-by-code

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
  --url "${CMIC_BASE_URL}/pm-rest-api/rest/1/pmprojectitemphssegmsum?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
