#!/usr/bin/env python3
"""Build a modern PNG-backed ICNS container without third-party packages."""

from pathlib import Path
import struct
import sys


ICNS_IMAGES = (
    (b"ic07", "icon_128x128.png"),
    (b"ic08", "icon_256x256.png"),
    (b"ic09", "icon_512x512.png"),
    (b"ic10", "icon_512x512@2x.png"),
)


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: build_icns.py ICONSET_DIR OUTPUT.icns", file=sys.stderr)
        return 2

    iconset_dir = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    chunks = []
    for chunk_type, filename in ICNS_IMAGES:
        payload = (iconset_dir / filename).read_bytes()
        chunks.append(chunk_type + struct.pack(">I", len(payload) + 8) + payload)

    body = b"".join(chunks)
    output_path.write_bytes(b"icns" + struct.pack(">I", len(body) + 8) + body)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
