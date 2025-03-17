#!/usr/bin/env bash

echo "Notifying Coolify via Webhook..."
curl -v --http1.1 --fail-with-body "${COOLIFY_WEBHOOK}" --header "Authorization: Bearer ${COOLIFY_API_TOKEN}"