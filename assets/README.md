# Asset catalog

All runtime models use GLB. The final directory segment is the source pack; keep
its adjacent `Textures` directory because the models reference those files by a
relative path.

## Categories

- `characters`: people, animals, and fantasy characters
- `environment`: barriers, nature, paths, and terrain pieces
- `structures`: modular suburban, fantasy, and graveyard architecture
- `vehicles`: complete road vehicles
- `equipment`: carried equipment and weapons
- `landmarks`: fountains, mills, graves, crypt props, and other scene anchors
- `props`: containers, decorations, furniture, lighting, market pieces, tools,
  roadside objects, and vehicle parts
- `gameplay`: collectibles, hazards, and interactive objects

Example path:

```text
models/environment/nature/graveyard/pine.glb
models/environment/nature/graveyard/Textures/colormap.png
```

Licenses remain grouped by source pack in `licenses/`.
