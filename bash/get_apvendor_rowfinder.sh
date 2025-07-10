#!/bin/bash
# name:    get_apvendor.sh
# process: Search for vendors using the "ApVendorFinder" row finder
#          TODO: More work needed here. I want to select by "BpvenCompCode" but
#          the endpint doesn't let me do that 
#          GET /ap-rest-api/rest/1/apvendor?finder=ApVendorFinder;CompCode=0002&limit=1

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
#  --data-urlencode "finder=ApVendorFinder;BpvenCompCode=0002&limit=1" \
#

curl -u "${CMIC_USERNAME}:${CMIC_PASSWORD}" \
  --get \
  --data-urlencode "finder=ApVendorFinder;CompCode=0002&limit=1" \
  --url "${CMIC_BASE_URL}/ap-rest-api/rest/1/apvendor" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
