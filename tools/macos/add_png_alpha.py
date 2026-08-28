#!/usr/bin/env python3
"""Convert an 8-bit RGB PNG to RGBA without changing its color pixels."""

from pathlib import Path
import binascii
import struct
import sys
import zlib


PNG_SIGNATURE = b"\x89PNG\r\n\x1a\n"


def paeth(left: int, above: int, upper_left: int) -> int:
    estimate = left + above - upper_left
    left_distance = abs(estimate - left)
    above_distance = abs(estimate - above)
    upper_left_distance = abs(estimate - upper_left)
    if left_distance <= above_distance and left_distance <= upper_left_distance:
        return left
    if above_distance <= upper_left_distance:
        return above
    return upper_left


def decode_rows(data: bytes, width: int, height: int) -> list[bytes]:
    stride = width * 3
    rows = []
    offset = 0
    previous = bytes(stride)
    for _ in range(height):
        filter_type = data[offset]
        filtered = data[offset + 1 : offset + 1 + stride]
        offset += stride + 1
        row = bytearray(stride)
        for index, value in enumerate(filtered):
            left = row[index - 3] if index >= 3 else 0
            above = previous[index]
            upper_left = previous[index - 3] if index >= 3 else 0
            predictors = {
                0: 0,
                1: left,
                2: above,
                3: (left + above) // 2,
                4: paeth(left, above, upper_left),
            }
            if filter_type not in predictors:
                raise ValueError(f"unsupported PNG filter: {filter_type}")
            row[index] = (value + predictors[filter_type]) & 0xFF
        rows.append(bytes(row))
        previous = row
    return rows


def chunk(kind: bytes, payload: bytes) -> bytes:
    checksum = binascii.crc32(kind + payload) & 0xFFFFFFFF
    return struct.pack(">I", len(payload)) + kind + payload + struct.pack(">I", checksum)


def convert(path: Path) -> None:
    raw = path.read_bytes()
    if not raw.startswith(PNG_SIGNATURE):
        raise ValueError("not a PNG")

    offset = len(PNG_SIGNATURE)
    width = height = 0
    image_data = bytearray()
    while offset < len(raw):
        length = struct.unpack(">I", raw[offset : offset + 4])[0]
        kind = raw[offset + 4 : offset + 8]
        payload = raw[offset + 8 : offset + 8 + length]
        offset += length + 12
        if kind == b"IHDR":
            width, height, bit_depth, color_type, compression, filtering, interlace = struct.unpack(">IIBBBBB", payload)
            if (bit_depth, color_type, compression, filtering, interlace) != (8, 2, 0, 0, 0):
                raise ValueError("expected a non-interlaced 8-bit RGB PNG")
        elif kind == b"IDAT":
            image_data.extend(payload)
        elif kind == b"IEND":
            break

    rows = decode_rows(zlib.decompress(image_data), width, height)
    rgba = bytearray()
    for row in rows:
        rgba.append(0)
        for index in range(0, len(row), 3):
            rgba.extend(row[index : index + 3])
            rgba.append(255)

    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    path.write_bytes(
        PNG_SIGNATURE
        + chunk(b"IHDR", ihdr)
        + chunk(b"IDAT", zlib.compress(bytes(rgba), 9))
        + chunk(b"IEND", b"")
    )


if __name__ == "__main__":
    if len(sys.argv) < 2:
        raise SystemExit("usage: add_png_alpha.py IMAGE.png [IMAGE.png ...]")
    for filename in sys.argv[1:]:
        convert(Path(filename))
