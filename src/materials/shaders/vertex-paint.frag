varying vec4 vColor;

void main(){
  vec3 plainColor = vec3(0, 1, 0);
  vec3 riverColor = vec3(0, 0, 1);
  vec3 color = mix(plainColor, riverColor, vColor.b);
  gl_FragColor = vec4(color, 1);
}