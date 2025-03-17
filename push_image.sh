#!/usr/bin/env bash

echo "Log into registry..."
docker login --username "${GHCR_USERNAME}" --password "${GHRC_ACCESS_TOKEN}" ghcr.io
echo "Build image..."
docker compose build
echo "Push image to registry..."
docker push ghcr.io/studiosi/citysearch