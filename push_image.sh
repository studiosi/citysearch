#!/usr/bin/env bash

docker login --username "$GHCR_USERNAME" --password "$GHRC_ACCESS_TOKEN" ghcr.io
docker compose build
docker push ghcr.io/studiosi/citysearch