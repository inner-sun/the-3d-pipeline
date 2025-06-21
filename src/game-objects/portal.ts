import { Mesh, NotEqualStencilFunc, PlaneGeometry } from 'three'
import { atan2, Fn, length, MeshBasicNodeMaterial, mx_noise_float, NodeUniform, uv, vec2, uniform, distance, vec4, step, smoothstep } from 'three/webgpu'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { writeToStencilBuffer } from '~/utilities/stencil'

export default class Portal extends GameObject {
  material: MeshBasicNodeMaterial
  time = uniform(0)

  constructor() {
    super()

    // Mask
    const portalGeometry = new PlaneGeometry()
    const stencilWriteMaterial = new MeshBasicNodeMaterial({
      // Write it to stencil buffer
      ...writeToStencilBuffer(),
      // Remove from rendering
      colorWrite: false,
      depthWrite: false
    })
    const mesh = new Mesh(portalGeometry, stencilWriteMaterial)
    this.meshGroup.add(mesh)

    // Glowing edges
    this.material = new MeshBasicNodeMaterial({ color: 0xFFFFFF })
    this.material.stencilWrite = true
    this.material.stencilFunc = NotEqualStencilFunc
    const portalEdges = new Mesh(portalGeometry, this.material)
    portalEdges.scale.setScalar(1.025)
    this.meshGroup.add(portalEdges)
  }

  tick(engine: GameEngine) {
    this.time.value = engine.clock.getElapsedTime()
  }
}