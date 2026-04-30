#!/bin/bash
# name:    retrieve-a-unique-ap-manual-cheque-by-chq-seq-number.sh
# process: Retrieve a Unique AP Manual Cheque by Chq Seq Number
#          GET /ap-rest-api/rest/1/manualcheck?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-a-unique-ap-manual-cheque-by-chq-seq-number

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
  --url "${CMIC_BASE_URL}/ap-rest-api/rest/1/manualcheck?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
