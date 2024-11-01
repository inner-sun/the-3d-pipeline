varying vec2 vUv;
uniform sampler2D u_texture;
uniform float u_tiles;

void main(){
  vec2 tiledUVs = fract(vUv * u_tiles);
  vec4 color = texture2D(u_texture, tiledUVs);
  gl_FragColor = color;
}