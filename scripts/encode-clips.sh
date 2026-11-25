#!/bin/bash
# Encode every unique Summit clip to a web loop (960 wide, h264, 24 fps) with a poster.
# Usage: bash scripts/encode-clips.sh <unique.tsv> <out dir>
# unique.tsv columns: id, md5, duration, absolute source path (tab separated).
set -u
LIST="$1"; OUT="$2"
mkdir -p "$OUT"
n=0
while IFS=$'\t' read -r id hash dur src; do
  [ -z "$id" ] && continue
  if [ -s "$OUT/$id.mp4" ]; then continue; fi
  if ffmpeg -nostdin -v error -y -i "$src" -an -vf "scale=960:-2,fps=24" -c:v libx264 -preset medium -crf 27 -pix_fmt yuv420p -movflags +faststart "$OUT/$id.mp4"; then
    ffmpeg -nostdin -v error -y -ss 0.3 -i "$OUT/$id.mp4" -frames:v 1 -q:v 5 -vf "scale=640:-2" "$OUT/$id.jpg"
    n=$((n+1))
  else
    echo "FAILED $id $src" >&2
  fi
done < "$LIST"
echo "encoded $n new clips; total $(ls "$OUT"/*.mp4 | wc -l | tr -d ' ')"
