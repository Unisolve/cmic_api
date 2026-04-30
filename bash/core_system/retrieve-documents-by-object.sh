#!/bin/bash
# name:    retrieve-documents-by-object.sh
# process: Retrieve Documents by Object
#          GET /sys-rest-api/rest/1/sysrelateddocquery?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-documents-by-object

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
  --url "${CMIC_BASE_URL}/sys-rest-api/rest/1/sysrelateddocquery?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
