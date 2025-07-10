#!/bin/bash
# name:    get_apcheque_fields.sh
# process: Display selected fields for a cheque
#          Note the query parameter fields functionality is only available
#          if you are using a row finder. We use the "By UUID" finder here
#          GET /ap-rest-api/rest/1/apcheque/{id}?fields=fld1,fld2,fldn

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

curl -v -u "${CMIC_USERNAME}:${CMIC_PASSWORD}" \
  --get \
  --data-urlencode "fields=ChqAccCode,ChqAmt,ChqBankCompCode,ChqCurrCode,ChqDate,ChqNum,ChqPostDate,ChqVenCode" \
  --url "${CMIC_BASE_URL}/ap-rest-api/rest/1/apcheque/-243" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
