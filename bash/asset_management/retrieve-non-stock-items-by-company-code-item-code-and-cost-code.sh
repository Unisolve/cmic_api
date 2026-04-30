#!/bin/bash
# name:    retrieve-non-stock-items-by-company-code-item-code-and-cost-code.sh
# process: Retrieve Non-Stock Items By Company Code, Item Code and Cost Code
#          GET /po-rest-api/rest/1/poNonStockItem?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-non-stock-items-by-company-code-item-code-and-cost-code

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
  --url "${CMIC_BASE_URL}/po-rest-api/rest/1/poNonStockItem?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
