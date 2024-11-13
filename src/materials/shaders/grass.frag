varying vec2 vUv;
varying vec3 vWorldPosition;
uniform sampler2D u_texture;
uniform sampler2D u_noise;

vec3 brightnessContrast(vec3 v, float b, float c) {
  return ( v - 0.5 ) * c + 0.5 + b;
}

void main(){
  vec3 black = vec3(0., 0., 0.);
  vec3 colorA = vec3(0.49, 0.7, 0.27);
  vec3 colorB = vec3(0.87, 0.83, 0.28);
  vec2 noiseUv = fract(vWorldPosition.xz);
  float baseColorMix = brightnessContrast(texture2D(u_noise, noiseUv).rgb, 0., 4.).r;
  vec3 baseColor = mix(colorA, colorB, baseColorMix);

  vec3 gradientStart = mix(baseColor, black, 0.75);
  vec3 gradientEnd = baseColor;
  float gradientMix = pow(vUv.y, 2.);
  vec3 color = mix(gradientStart, gradientEnd, gradientMix);
  
  float opacity = texture2D(u_texture, vUv).r;

  gl_FragColor = vec4(vec3(color), opacity);
}