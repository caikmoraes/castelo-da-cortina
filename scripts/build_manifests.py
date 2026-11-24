#!/usr/bin/env python3
"""Regenerate jsons/img_<page>/<category>/images.json from the image folders.

    python3 scripts/build_manifests.py

Each manifest is a JSON array, one entry per photo:

    { "url": "/img/img_cortinas/romana/romana1CAR.webp",
      "sm":  "/img/img_cortinas/romana/romana1CAR-sm.webp",   # omitted if absent
      "w": 1600, "h": 900 }

Order: featured photos (name contains "CAR") first, then by the number in the
file name. The first entry is the model's main photo on its page.

Needs `vipsheader` (libvips) to read image sizes.
"""
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def size(path: Path) -> tuple[int, int]:
    out = subprocess.run(
        ["vipsheader", "-f", "width", str(path)], capture_output=True, text=True, check=True
    ).stdout
    w = int(out)
    out = subprocess.run(
        ["vipsheader", "-f", "height", str(path)], capture_output=True, text=True, check=True
    ).stdout
    return w, int(out)


def sort_key(path: Path):
    featured = "CAR" in path.stem
    num = re.search(r"(\d+)", path.stem)
    return (not featured, int(num.group(1)) if num else 0, path.stem)


def main() -> None:
    for category in sorted(ROOT.glob("img/img_*/*/")):
        photos = sorted(
            (p for p in category.glob("*.webp") if not p.stem.endswith("-sm")), key=sort_key
        )
        entries = []
        for p in photos:
            w, h = size(p)
            entry = {"url": "/" + p.relative_to(ROOT).as_posix()}
            sm = p.with_name(p.stem + "-sm.webp")
            if sm.exists():
                entry["sm"] = "/" + sm.relative_to(ROOT).as_posix()
            entry.update(w=w, h=h)
            entries.append(entry)

        out = ROOT / "jsons" / category.relative_to(ROOT / "img") / "images.json"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(
            "[\n" + ",\n".join("  " + json.dumps(e, ensure_ascii=False) for e in entries) + "\n]\n"
        )
        print(f"{out.relative_to(ROOT)}: {len(entries)} photos")


if __name__ == "__main__":
    main()
