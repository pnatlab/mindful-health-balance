#!/usr/bin/env python3
"""Create the transparent in-app MHB mark from the approved launcher artwork."""

from pathlib import Path
import colorsys
from PIL import Image


ROOT_DIR = Path(__file__).resolve().parent.parent
SOURCE_PATH = ROOT_DIR / "assets/macos/mhb-app-icon-source.png"
OUTPUT_PATH = ROOT_DIR / "assets/brand/mhb-header-mark.png"
OUTPUT_SIZE = 512


def color_alpha(red: int, green: int, blue: int, existing_alpha: int) -> int:
    _, saturation, value = colorsys.rgb_to_hsv(red / 255, green / 255, blue / 255)
    if value < 0.16 or saturation < 0.12:
        return 0
    edge = min(1, max(0, (saturation - 0.12) / 0.14))
    return round(existing_alpha * edge)


def main() -> None:
    source = Image.open(SOURCE_PATH).convert("RGBA")
    pixels = [
        (red, green, blue, color_alpha(red, green, blue, alpha))
        for red, green, blue, alpha in source.get_flattened_data()
    ]
    mark = Image.new("RGBA", source.size)
    mark.putdata(pixels)
    content_bounds = mark.getbbox()
    if content_bounds is None:
        raise RuntimeError("The MHB source artwork did not contain usable color detail.")

    cropped = mark.crop(content_bounds)
    side = max(cropped.size)
    padding = round(side * 0.08)
    canvas = Image.new("RGBA", (side + padding * 2, side + padding * 2))
    canvas.alpha_composite(cropped, ((canvas.width - cropped.width) // 2, (canvas.height - cropped.height) // 2))
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    canvas.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.Resampling.LANCZOS).save(OUTPUT_PATH)


if __name__ == "__main__":
    main()
