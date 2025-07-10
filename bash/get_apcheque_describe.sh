#!/bin/bash
# name:    get_apcheque.sh
# process: Describe the apcheque endpoint
#          GET /ap-rest-api/rest/1/apcheque/describe

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
  --url "${CMIC_BASE_URL}/ap-rest-api/rest/1/apcheque/describe" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
