varying vec2 vUv;
uniform sampler2D u_texture_a;
uniform sampler2D u_texture_b;
uniform sampler2D u_texture_tile;

void main(){
  float tiles = 16.;
  vec2 tiledUVs = fract(vUv * tiles);

  vec4 colorA = texture2D(u_texture_a, tiledUVs);
  vec4 colorB = texture2D(u_texture_b, tiledUVs);
  vec4 tile = texture2D(u_texture_tile, vUv);

  vec4 color = mix(colorA, colorB, tile.r);

  gl_FragColor = color;
}