#!/usr/bin/env bash
# Convert gallery photos to WebP and delete the originals.
#
#   scripts/optimize-images.sh            # every img/img_*/<category>/ folder
#   scripts/optimize-images.sh img/img_toldos/tecido/foto.jpg   # specific files
#
# For each JPEG/PNG it writes, next to the original:
#   <name>.webp     max 1600px wide (never upscaled)
#   <name>-sm.webp  max 640px wide, only when the original is wider than 640px
# then removes the original (it stays recoverable from git history).
# Run scripts/build_manifests.py afterwards to refresh jsons/**/images.json.
#
# Requires libvips (`vips`, `vipsheader`).
set -euo pipefail

cd "$(dirname "$0")/.."

FULL_WIDTH=1600
SM_WIDTH=640
QUALITY=78

if [ "$#" -gt 0 ]; then
  files=("$@")
else
  mapfile -t files < <(find img/img_* -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | sort)
fi

for src in "${files[@]}"; do
  base="${src%.*}"
  width=$(vipsheader -f width "$src")

  # --size down: shrink to fit, never enlarge. Height bound is effectively unlimited.
  vips thumbnail "$src" "${base}.webp[Q=${QUALITY},strip]" "$FULL_WIDTH" --height 100000 --size down
  if [ "$width" -gt "$SM_WIDTH" ]; then
    vips thumbnail "$src" "${base}-sm.webp[Q=${QUALITY},strip]" "$SM_WIDTH" --height 100000 --size down
  fi

  rm -- "$src"
  echo "ok  $src"
done
