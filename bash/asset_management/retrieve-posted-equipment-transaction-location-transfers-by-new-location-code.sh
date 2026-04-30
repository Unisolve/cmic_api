#!/bin/bash
# name:    retrieve-posted-equipment-transaction-location-transfers-by-new-location-code.sh
# process: Retrieve Posted Equipment Transaction Location Transfers By New Location Code
#          GET /em-rest-api/rest/1/emtranpostactloc?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-posted-equipment-transaction-location-transfers-by-new-location-code

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
  --url "${CMIC_BASE_URL}/em-rest-api/rest/1/emtranpostactloc?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
