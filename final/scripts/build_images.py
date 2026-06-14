"""Generate optimized webp thumbnails for final project gallery."""
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "projects.json"
OUT = ROOT / "images"
SIZE = (400, 225)

COLORS = [
    (20, 33, 61),
    (252, 163, 17),
    (30, 64, 120),
    (15, 118, 110),
    (79, 70, 229),
    (180, 83, 9),
]


def make_image(filename: str, label: str, idx: int) -> None:
    bg = COLORS[idx % len(COLORS)]
    img = Image.new("RGB", SIZE, bg)
    draw = ImageDraw.Draw(img)
    short = label if len(label) <= 22 else label[:19] + "..."
    draw.rectangle([(0, 170), (400, 225)], fill=(0, 0, 0))
    draw.text((16, 188), short, fill=(255, 255, 255))
    img.save(OUT / filename, "WEBP", quality=80)
    print(f"Saved {filename}")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    projects = json.loads(DATA.read_text(encoding="utf-8"))
    for i, project in enumerate(projects):
        make_image(project["image"], project["name"], i)
