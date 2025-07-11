#!/bin/bash
# name:    get_ecm_describe.sh
# process: Describe all ecm endpoints
#          GET /ecm-rest-api/rest/v1/describe
#
# note:    The "/rest/" endpoint: GET /ecm-rest-api/rest/v1/describe
#          currently fails for me with:
#          oracle.security.idm.ObjectNotFoundException: please specify the object key from obj key 1 
#          to obj key 5 in finder
#
# note:    The "/jersey/" endpoint GET /ecm-rest-api/jersey/v1/describe currently fails for me with:
#          Not Found


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
  --url "${CMIC_BASE_URL}/ecm-rest-api/rest/v1/describe" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
