import { Mesh, PlaneGeometry } from 'three'
import { mx_perlin_noise_float } from 'three/src/nodes/materialx/lib/mx_noise.js'
import { atan2, Fn, length, MeshBasicNodeMaterial, mix, mx_noise_float, positionLocal, sin, smoothstep, texture, uniform, uv, vec2, vec3, vec4 } from 'three/webgpu'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'

export default class RadialUV extends GameObject{
  material: MeshBasicNodeMaterial
  time = uniform(0)

  constructor(){
    super()

    const plane = new PlaneGeometry()
    this.material = new MeshBasicNodeMaterial()

    // TSL Fragment shader
    this.material.colorNode = Fn(() => {
      const centeredUV = uv().sub(vec2(0.5)) // Shift UVs to center

      const angle = atan2(centeredUV.y, centeredUV.x) // Polar angle
      const normalizedAngle = angle.div(Math.PI * 2).add(0.5)

      const radius = length(centeredUV) // Distance from center
      const polarUV = vec2(normalizedAngle.sub(0.5).abs(), radius)
      const carthesianNoise = mx_noise_float(centeredUV.mul(10).add(this.time))
      const radialNoise = mx_noise_float(polarUV.mul(10).add(carthesianNoise))
      
      return radialNoise
    })()

    const mesh = new Mesh(plane, this.material)
    this.meshGroup.add(mesh)
  }

  tick(engine: GameEngine){
    this.time.value = engine.clock.getElapsedTime()
  }
}