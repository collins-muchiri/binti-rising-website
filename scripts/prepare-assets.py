#!/usr/bin/env python3
"""
prepare-assets.py: builds the optimized web assets for the Binti Rising site.

Outputs (into /home/z/my-project):
  public/binti-mark.png      square crop of the Binti logo artwork (face + sun + flower)
                             used as the round brand mark in nav / cover / footer.
  public/partners/path-logo.png      official PATH wordmark, auto-cropped (media.path.org).
  public/partners/shuga-global.png   official "shuga GLOBAL" wordmark, brown background
                                     chroma-keyed to transparency (official YouTube avatar).
  public/partners/shujaaz-logo.png   authentic "Shujaaz" comic masthead cropped from the
                                     official Shujaaz magazine cover, background flattened
                                     to white.
  src/app/icon.png           512x512 favicon (Next.js file convention).
  src/app/apple-icon.png     180x180 Apple touch icon.

All source images are the organizations' own published materials.
"""
from PIL import Image
import os

SRC = "/tmp/logos"
OUT = "/home/z/my-project"
os.makedirs(f"{OUT}/public/partners", exist_ok=True)


# ─────────────────────────── helpers ───────────────────────────
def autocrop(im, tol=18):
    """Trim borders that are within `tol` of the corner background color."""
    w, h = im.size
    bg = im.getpixel((0, 0))
    px = im.load()

    def is_bg(x, y):
        p = px[x, y]
        d = sum((a - b) ** 2 for a, b in zip(p[:3], bg[:3])) ** 0.5
        return d <= tol

    left, right, top, bottom = 0, w - 1, 0, h - 1
    while left < right and all(is_bg(left, y) for y in range(0, h, max(1, h // 40))):
        left += 1
    while right > left and all(is_bg(right, y) for y in range(0, h, max(1, h // 40))):
        right -= 1
    while top < bottom and all(is_bg(x, top) for x in range(0, w, max(1, w // 40))):
        top += 1
    while bottom > top and all(is_bg(x, bottom) for x in range(0, w, max(1, w // 40))):
        bottom -= 1
    return im.crop((left, top, right + 1, bottom + 1))


# ───────────────────── 1. Binti brand mark + favicons ─────────────────────
binti = Image.open(f"{SRC}/uploaded_logo.jpg").convert("RGB")
# Artwork square: the sun, flower and face cluster (script wordmark excluded;
# the left/bottom bounds stay clear of the script lettering fragments).
mark = binti.crop((265, 85, 810, 630))          # 545x545
mark = mark.resize((480, 480), Image.LANCZOS)
mark.save(f"{OUT}/public/binti-mark.png", optimize=True)
mark.resize((512, 512), Image.LANCZOS).save(f"{OUT}/src/app/icon.png", optimize=True)
mark.resize((180, 180), Image.LANCZOS).save(f"{OUT}/src/app/apple-icon.png", optimize=True)
print("binti-mark.png + icon.png + apple-icon.png done", mark.size)

# ─────────────────────────── 2. PATH logo ───────────────────────────
path_im = Image.open(f"{SRC}/path-official.png").convert("RGB")
path_im = autocrop(path_im, tol=12)
if path_im.width > 640:  # 640px wide is plenty for a 5x-retina 40px-tall strip
    path_im = path_im.resize((640, round(path_im.height * 640 / path_im.width)), Image.LANCZOS)
path_im.save(f"{OUT}/public/partners/path-logo.png", optimize=True)
print("path-logo.png", path_im.size)

# ─────────────────── 3. Shuga Global (chroma-key brown) ───────────────────
shuga = Image.open(f"{SRC}/shuga-5.jpg").convert("RGB")
w, h = shuga.size
bg = shuga.getpixel((8, 8))  # brown field color
out = Image.new("RGBA", (w, h))
sp, op = shuga.load(), out.load()
for y in range(h):
    for x in range(w):
        r, g, b = sp[x, y]
        d = ((r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2) ** 0.5
        # Feather the alpha ramp so edges stay smooth when composited.
        a = 0 if d < 38 else (255 if d > 92 else int((d - 38) / (92 - 38) * 255))
        op[x, y] = (r, g, b, a)
bbox = out.getbbox()
shuga_out = out.crop(bbox)
if shuga_out.width > 560:
    shuga_out = shuga_out.resize((560, round(shuga_out.height * 560 / shuga_out.width)), Image.LANCZOS)
shuga_out.save(f"{OUT}/public/partners/shuga-global.png", optimize=True)
print("shuga-global.png", shuga_out.size)

# ─────────────── 4. Shujaaz masthead (flood-fill background removal) ───────────────
# The masthead is comic lettering (orange fill + purple outline + white stroke)
# printed straight onto a photo-collage page, so a plain color key cannot work.
# Instead: flood-fill from the borders eats every smooth page background (peach
# tint, ghost art) and stops at the sharp lettering edges, leaving the lettering
# itself on transparency.
from collections import deque

shj = Image.open(f"{SRC}/shujaaz-1.jpg").convert("RGB")
# Keep only the "www.Shujaaz.fm" lettering row; the tagline below sits directly
# on the collage and turns to confetti under the flood-fill, so it is excluded.
mh = shj.crop((25, 40, 1040, 290)).convert("RGBA")
W, H = mh.size
px = mh.load()
visited = bytearray(W * H)
q = deque()
for x in range(W):
    q.append((x, 0))
    q.append((x, H - 1))
for y in range(H):
    q.append((0, y))
    q.append((W - 1, y))
LOCAL_TOL = 22  # max color distance to the pixel we are growing from
while q:
    x, y = q.popleft()
    if x < 0 or y < 0 or x >= W or y >= H or visited[y * W + x]:
        continue
    visited[y * W + x] = 1
    r, g, b, _ = px[x, y]
    px[x, y] = (r, g, b, 0)
    for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
        if 0 <= nx < W and 0 <= ny < H and not visited[ny * W + nx]:
            nr, ng, nb, _ = px[nx, ny]
            if (nr - r) ** 2 + (ng - g) ** 2 + (nb - b) ** 2 <= LOCAL_TOL ** 2:
                q.append((nx, ny))

# The "wts:" speech bubble sits in the top-left corner of the crop; drop it so
# only the Shujaaz wordmark remains.
for y in range(0, 130):
    for x in range(0, 185):
        r, g, b, a = px[x, y]
        px[x, y] = (r, g, b, 0)

# Clean stray specks: any small opaque island left by collage noise that is not
# part of the lettering body gets cleared. Simple pass: pixels with low alpha
# after flood remain only in tiny clusters; drop pixels whose saturated color is
# neither lettering orange/red nor outline purple/violet nor white.
for y in range(H):
    for x in range(W):
        r, g, b, a = px[x, y]
        if not a:
            continue
        mx, mn = max(r, g, b), min(r, g, b)
        chroma = mx - mn
        is_white = mn > 205
        is_warm = r > 150 and r > b + 40          # orange/red fills and shadows
        is_violet = b > 90 and r > 90 and g < min(r, b)  # purple outlines
        is_dark = mx < 110                        # deep comic shadows
        if not (is_white or is_warm or is_violet or is_dark):
            px[x, y] = (r, g, b, 0)

bbox = mh.getbbox()
mh = mh.crop(bbox)
if mh.width > 680:
    mh = mh.resize((680, round(mh.height * 680 / mh.width)), Image.LANCZOS)
mh.save(f"{OUT}/public/partners/shujaaz-logo.png", optimize=True)
print("shujaaz-logo.png", mh.size)
