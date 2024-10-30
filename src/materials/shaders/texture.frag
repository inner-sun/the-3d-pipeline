varying vec2 vUv;
uniform sampler2D u_texture;

void main(){
  vec4 color = texture2D(u_texture, vUv);
  // vec3 color = vec3((vUv.x + vUv.y) / 2.);
  gl_FragColor = color;
}