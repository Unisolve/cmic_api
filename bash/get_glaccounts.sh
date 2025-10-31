#!/bin/bash
# name:    get_glaccounts.sh
# process: Retrieve a list of 3 gl accounts
#          GET /glrestapi/rest/v1/glaccounts?limit=3
# Current status is:
#          ORA-20001: <CMIC_ERR_CODE>NO-ERROR-CODE</CMIC_ERR_CODE><CMIC_ERR_MSG>You are not licensed to use this API program</CMIC_ERR_MSG>

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
  --url "${CMIC_BASE_URL}/glrestapi/rest/v1/glaccounts?limit=3" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
