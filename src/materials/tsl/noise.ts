import { dot, Fn, fract, sin, vec2 } from 'three/webgpu'

export const random = Fn(([uv]) => {
  return fract(sin(dot(uv, vec2(12.9898, 78.233))).mul(43758.5453123))
})