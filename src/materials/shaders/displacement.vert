float random (vec2 st) {
  return fract(sin(dot(st.xy,
    vec2(12.9898,78.233)))*
  43758.5453123);
}

void main(){
  float randomOffset = (random(uv) - 0.5) * 1.;
  vec3 displacedPosition = vec3(position.x, position.y + randomOffset, position.z);
  vec4 modelViewPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}