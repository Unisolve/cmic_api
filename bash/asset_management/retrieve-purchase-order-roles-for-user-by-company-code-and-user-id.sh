#!/bin/bash
# name:    retrieve-purchase-order-roles-for-user-by-company-code-and-user-id.sh
# process: Retrieve Purchase Order Roles for User By Company Code and User ID
#          GET /po-rest-api/rest/1/poRoles?limit=3&offset=0
# docs:    https://developers.cmicglobal.com/apidocs/retrieve-purchase-order-roles-for-user-by-company-code-and-user-id

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
  --url "${CMIC_BASE_URL}/po-rest-api/rest/1/poRoles?limit=3&offset=0" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
