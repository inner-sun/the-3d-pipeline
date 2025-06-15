import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { BoxGeometry, Mesh } from 'three'
import { MeshNormalNodeMaterial } from 'three/webgpu'
import { uv, positionLocal, sin, dot, vec2, vec3, fract, Fn } from 'three/tsl'

export default class TSLDisplacedCube extends GameObject {
  material: MeshNormalNodeMaterial

  constructor() {
    super()

    const geometry = new BoxGeometry(1, 1, 1, 32, 32, 32)
    this.material = new MeshNormalNodeMaterial({
      
    })
    
    // Apply the displacement to the geometry using TSL nodes
    // Recreating the random function from the original shader using Fn
    const random = Fn(([uv]) => {
      return fract(sin(dot(uv, vec2(12.9898, 78.233))).mul(43758.5453123))
    })

    // Apply displacement in the vertex position using Fn
    const displacedPosition = Fn<{ position: typeof positionLocal }>(({ position }) => {
      // Calculate random offset based on UV coordinates
      const randomOffset = random(uv()).sub(0.5).mul(1.0)

      // Create a displacement vector with y component only
      const displacement = vec3(randomOffset.mul(0.2))

      // Add the displacement to the position
      return position.add(displacement)
    })

    // Set the position node by passing positionLocal as a parameter
    this.material.positionNode = displacedPosition({ position: positionLocal })
    
    const mesh = new Mesh(geometry, this.material)
    this.meshGroup.add(mesh)
  }

  tick(engine: GameEngine) {
  }
}