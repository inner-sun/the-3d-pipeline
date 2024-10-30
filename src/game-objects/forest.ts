import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import TiledMaterial from '~/materials/tiled-material'
import GrassTexture from '~/assets/grass.jpg'

export default class Forest extends GameObject{
  constructor(){
    super()

    const divs = 10

    const geometry = new BufferGeometry
    const vertices: number[] = []
    const uvs: number[] = []
    const indices: number[] = []

    for (let x = 0; x < divs; x++) {
      for (let y = 0; y < divs; y++) {
        // Define vertices for each cell quad (4 vertices per cell)
        vertices.push(
          x, y, 0,        // Bottom-left vertex
          x + 1, y, 0,    // Bottom-right vertex
          x, y + 1, 0,    // Top-left vertex
          x + 1, y + 1, 0 // Top-right vertex
        )

        // Define UV coordinates for each vertex
        uvs.push(
          0, 0,   // Bottom-left UV
          1, 0,   // Bottom-right UV
          0, 1,   // Top-left UV
          1, 1    // Top-right UV
        )

        // Define indices for the two triangles that make up the quad
        const baseIndex = (x * divs + y) * 4; // Base index for this cell's vertices
        indices.push(
          baseIndex, baseIndex + 1, baseIndex + 2, // First triangle
          baseIndex + 1, baseIndex + 3, baseIndex + 2 // Second triangle
        )
      }
    }
   
    const positionAttribute = new Float32Array(vertices)
    const uvAttribute = new Float32Array(uvs)
    geometry.setAttribute('position', new BufferAttribute(positionAttribute, 3))
    geometry.setAttribute('uv', new BufferAttribute(uvAttribute, 2))
    geometry.setIndex(indices)

    // Recenter
    geometry.translate(-divs/2, -divs/2, 0)
    // Flatten on horizon
    geometry.rotateX(-Math.PI / 2)

    console.log(geometry)
    // const material = new MeshBasicMaterial({
    //   color: 0x00FF00,
    //   wireframe: true
    // })
    const material = TiledMaterial({ texturePath: GrassTexture })

    this.meshGroup = new Mesh(geometry, material)
  }

  tick(engine: GameEngine){

  }
}