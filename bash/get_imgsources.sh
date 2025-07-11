#!/bin/bash
# name:    get_apvendor.sh
# process: Retrieve a list of up to 3 image sources
#          GET /ecm-rest-api/rest/v1/ImgSourceDocTypeV?limit=3&offset=0

#
# Load configuration
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "${SCRIPT_DIR}/config"

if [[ -z "$CMIC_USERNAME" || -z "$CMIC_PASSWORD" ]]; then
    echo "Error: Configuration not loaded. Please copy config.template to config and set your credentials."
    exit 1
fi

#
# Run endpoint
#

curl -u "${CMIC_USERNAME}:${CMIC_PASSWORD}" \
  --url "${CMIC_BASE_URL}/ecm-rest-api/rest/v1/ImgSources?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
