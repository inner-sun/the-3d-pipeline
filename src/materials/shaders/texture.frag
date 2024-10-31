varying vec2 vUv;
uniform sampler2D u_texture;

void main(){
  float tiles = 16.;
  vec2 tiledUVs = fract(vUv * tiles);
  vec4 color = texture2D(u_texture, tiledUVs);
  gl_FragColor = color;
}