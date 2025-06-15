import { Mesh, PlaneGeometry, Uniform } from 'three'
import { color, Fn, fract, hue, MeshBasicNodeMaterial, mix, mx_noise_float, Node, saturate, smoothstep, uniform, UniformNode, uv, vec2, vec3 } from 'three/webgpu'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'

export default class RainbowBridge extends GameObject{
  material: MeshBasicNodeMaterial
  time = uniform(0)

  constructor(){
    super()

    const width = 2
    const height = 10
    const plane = new PlaneGeometry(width, height)
    plane.translate(0, 5, 0)
    this.material = new MeshBasicNodeMaterial

    // TSL Fragment shader
    this.material.colorNode = Fn(() => {
      // UVs scale corrected to match the plane geometry
      let scaledUV = uv().mul(vec2(width/height, 1))
      // Scale up the UVs to make the noise denser
      scaledUV = scaledUV.mul(6)
      // Scale the UVs on X to stretch noise
      scaledUV.x = scaledUV.x.mul(20)
      // Animate with time uniform
      scaledUV.y = scaledUV.y.add(this.time)

      // Random Color, using a random hue with noise
      const noise = mx_noise_float(scaledUV)
      const randomColor = hue(vec3(0, 1, 0), noise.mul(Math.PI))
      const white = vec3(1, 1, 1)
      
      // Color Mask, using a similar noise but 2x slower
      let maskUV = uv().mul(vec2(width / height, 1)).mul(6)
      maskUV.x = maskUV.x.mul(20)
      // Animate with time uniform
      maskUV.y = maskUV.y.add(this.time.mul(0.5))
      const maskNoise = mx_noise_float(maskUV)
      const mask = saturate(maskNoise.mul(10))

      /*
        Layers
          - randomColor
          - white (masked with noise)
          - add 50% luminosity
      */
      const colorRain = saturate(mix(white, randomColor, mask).add(vec3(0.5)))
      const mirroredGradient = smoothstep(0, 1, uv().x.mul(2).sub(1).abs())
      const fragment = mix(white, colorRain, mirroredGradient)
      
      return fragment
    })()

    const mesh = new Mesh(plane, this.material)
    this.meshGroup.add(mesh)
  }

  tick(engine: GameEngine){
    this.time.value = engine.clock.getElapsedTime()
  }
}