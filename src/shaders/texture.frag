precision mediump float;

varying vec2 vUv;
uniform sampler2D u_texture;
uniform float u_tiles;

void main(){
  vec2 repeatedUV;
  repeatedUV.x = fract(vUv.x * u_tiles);
  repeatedUV.y = fract(vUv.y * u_tiles);

  vec4 color = texture2D(u_texture, repeatedUV);
  gl_FragColor = vec4(color);
}