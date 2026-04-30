#!/bin/bash
# name:    retrieve-pci-details-by-code.sh
# process: Retrieve PCI details By Code
#          GET /cm-rest-api/rest/1/cmdetail?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-pci-details-by-code

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
  --url "${CMIC_BASE_URL}/cm-rest-api/rest/1/cmdetail?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
