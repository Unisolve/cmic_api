#!/bin/bash
# name:    get_apvendor_fields.sh
# process: Display selected fields for a vendor
#          Note the query parameter fields functionality is only available
#          if you are using a row finder. We use the "By UUID" finder here
#          GET /ap-rest-api/rest/1/apvendor/{id}?fields=fld1,fld2,fldn

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
  --data-urlencode "fields=BpvenBpCode,BpvenBpName,BpvenPayAdd1,BpvenPayAdd2,BpvenPayAdd3,BpvenPayRegionCode,BpvenPayPostalCode,BpvenPayPhone" \
  --url "${CMIC_BASE_URL}/ap-rest-api/rest/1/apvendor/C3E332DA373644E9E05322041DAC714A" \
  --header "accept: ${CMIC_ACCEPT_HEADER}"
