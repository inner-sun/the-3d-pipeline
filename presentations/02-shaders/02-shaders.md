---
marp: true
theme: uncover
class: invert
---

<!-- _footer: "three.js | thebookofshaders | blender | shadertoy" -->
![bg](02-shaders.png)

# Shaders
### Textures, Lumières et Ombres

---

# Shader

| Variables | Usage |
| --- | --- |
| `Uniforms` | Valeurs passées aux shaders (textures, etc.) |
| `Attributes` | Valeurs reliées au vertex, généralement venant modèle 3D : position d'un vertex, vertex color, etc. |
| `Varyings` | Variable calculée dans un Vertex Shader puis passée dans le Fragment Shader |


---

# Uniforms

```glsl
float     time
vec2      mouseCursor
vec3      lightPosition
sampler2D texture
```

---

# Exercice

Faire cycler la couleur d'un quad au cours du temps.

---

# Cycler la couleur

- Ajouter un `uniform` contenant le temps écoulé
- Mettre à jour le temps chaque frame

---

# UVs

Expliquer avec Blender

---

# Exercice

Animer la texture de l'eau.

---

# Composabilité des shaders

**Three.js** assemblent leur sections de code via leur système de [ShaderChunk](https://threejs.org/docs/?q=shader#api/en/renderers/shaders/ShaderChunk)

**Unity** propose leur *Universal Render Pipeline* avec les [Shaders URP](https://docs.unity3d.com/Packages/com.unity.render-pipelines.universal@8.2/manual/writing-shaders-urp-basic-unlit-structure.html).

**Blender** utilise un système de *nodes* dans l'onglet Shading, appellé [Shader Editor](https://docs.blender.org/manual/en/latest/editors/shader_editor.html).

---

# Exemples de shaders

- UV (tileset shader)
- Force Field (perlin noise)
- Particles (life cycle)
