#!/bin/sh
# Zip the contents of site/ for upload to cPanel. The zip unpacks straight into the folder you extract it in.
set -e
cd "$(dirname "$0")/.."
mkdir -p dist
rm -f dist/pathways-site.zip
(cd site && zip -r -q -X ../dist/pathways-site.zip . -x '.DS_Store' '*/.DS_Store')
echo "Created dist/pathways-site.zip"
unzip -l dist/pathways-site.zip | tail -1
