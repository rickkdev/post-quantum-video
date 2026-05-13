# ManimGL Clips

This folder contains 3Blue1Brown-style math animation clips using ManimGL, Grant Sanderson's current Manim package.

## Setup

The local virtual environment is in `.venv/`.

```bash
cd manim
source .venv/bin/activate
```

## Commands

Render the sample scene:

```bash
manimgl scenes/ecc_intro.py ECCIntro -w --uhd
```

Fast preview render:

```bash
manimgl scenes/ecc_intro.py ECCIntro -w -l
```

## Notes

- Use `from manimlib import *` for ManimGL scenes.
- Use this folder for math-heavy clips that are easier to express with Manim than Remotion.
- Exported media is written under `videos/`.
