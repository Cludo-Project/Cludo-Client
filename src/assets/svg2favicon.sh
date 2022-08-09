#!/usr/bin/env bash
# Script to generate favicon from svg icon file
#
# Usage:
#   ./svg2favicon.sh <svg-file> <output-file>
#
# Example:
#   ./svg2favicon.sh src/assets/logo.svg public/favicon.ico
#
source_icon=$1
output_icon=$2

if [[ -z "${source_icon}" ]] || [[ -z "${output_icon}" ]]; then
  echo "Usage: ./svg2favicon.sh <svg-file> <output-file>"
  exit 1
fi

if [[ ! -f "${source_icon}" ]]; then
  echo "Source file does not exist"
  exit 1
fi

convert -background none "${source_icon}" -resize 32x32 "${output_icon}"
for size in 16 32 48 64 96 128 144 152 192; do
    convert -background none "${source_icon}" -resize ${size}x${size} "${output_icon%.*}-${size}.${output_icon##*.}" &
done
# Wait for all the conversions to finish
wait
# Copy icon to directory with all other icons
cp "${source_icon}" "${output_icon%.*}.svg"
