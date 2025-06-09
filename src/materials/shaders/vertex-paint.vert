varying vec4 vColor;

void main(){
  vColor = color;
  vec3 displacedPosition = position;
  displacedPosition.y -= color.b * 0.1;
  vec4 modelViewPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}