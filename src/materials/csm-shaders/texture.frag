varying vec2 vUv;
uniform sampler2D u_texture;
uniform float u_tiles;

void main(){
  // Boucle sur les UVs pour dupliquer la texture
  vec2 tiledUVs = fract(vUv * u_tiles);
  // Récupère la couleur de la texture
  vec4 color = texture2D(u_texture, tiledUVs);
  // Remplace gl_FragColor par csm_DiffuseColor
  // pour fonctionner avec CustomShaderMaterial
  csm_DiffuseColor = color;
}