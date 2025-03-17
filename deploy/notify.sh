#!/usr/bin/env bash

echo "Notifying Coolify via Webhook..."
curl --http1.1 --fail-with-body --request GET "${COOLIFY_WEBHOOK}" --header "\'Authorization: Bearer ${COOLIFY_API_TOKEN}\'"