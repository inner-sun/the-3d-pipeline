import { Mesh, PlaneGeometry } from 'three'
import { color, distance, Fn, MeshBasicNodeMaterial, mix, mx_noise_float, saturate, smoothstep, uniform, uv, vec2, vec3 } from 'three/webgpu'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'

export default class MysticPuddle extends GameObject{
  material: MeshBasicNodeMaterial
  time = uniform(0)

  constructor(){
    super()
    const plane = new PlaneGeometry(8, 8)
    plane.rotateX(-Math.PI / 2)
    this.material = new MeshBasicNodeMaterial

    // TSL Fragment shader
    this.material.colorNode = Fn(() => {
      const color1 = color(0xf7acac)
      const color2 = color(0x174a89)

      const radialGradient = distance(uv(), vec2(0.5)).mul(2)
      const ringInner = smoothstep(0.35, 0.5, radialGradient)
      const ringOuter = smoothstep(0.5, 0.55, radialGradient)
      const ring = ringInner.sub(ringOuter)
      const noise = mx_noise_float(radialGradient.mul(10).add(this.time))
      const ringColor = mix(color1, color2, noise)
      const fragment = mix(color('white'), ringColor, ring)
      
      return fragment
    })()

    const mesh = new Mesh(plane, this.material)
    this.meshGroup.add(mesh)
  }

  tick(engine: GameEngine){
    this.time.value = engine.clock.getElapsedTime()
  }
}