#!/bin/bash
# name:    retrieve-unposted-purchase-order-receipts-by-company-code-and-vendor-code.sh
# process: Retrieve Unposted Purchase Order Receipts By Company Code and Vendor Code
#          GET /po-rest-api/rest/1/unpostedporeceipt?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-unposted-purchase-order-receipts-by-company-code-and-vendor-code

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
  --url "${CMIC_BASE_URL}/po-rest-api/rest/1/unpostedporeceipt?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
