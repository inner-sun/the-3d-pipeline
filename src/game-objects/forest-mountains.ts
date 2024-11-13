import { Mesh, NearestFilter, PlaneGeometry, ShaderMaterial, TextureLoader, Vector3 } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import taigaTexture from '~/assets/taiga.png'
import vertexShader from '~/materials/shaders/basic.vert?raw'
import fragmentShader from '~/materials/shaders/texture.frag?raw'
import Easing from '~/utilities/easing'
import ForestTree from '~/game-objects/forest-tree'

export default class ForestMountains extends GameObject{  
  constructor(){
    super()

    const treeZone = 8
    const treeSpread = 1

    const size = 32
    const geometry = new PlaneGeometry(size, size, size, size)
    geometry.rotateX(-Math.PI / 2)

    // Apply Perlin noise on each vertex Y position
    // outside of the central plain
    const maxDisplacement = 10
    const positionAttribute = geometry.getAttribute('position').clone()
    const vertices = positionAttribute.array
    const center = new Vector3
    const cornerVertex = new Vector3().fromBufferAttribute(positionAttribute, 0)
    const maxDistance = cornerVertex.distanceTo(center)

    for(let i = 0; i < vertices.length / 3; i++){
      // Apply displacement
      const vertex = new Vector3().fromBufferAttribute(positionAttribute, i)
      const distanceFromEdge = vertex.distanceTo(center) / maxDistance
      const scale = Easing.easeInCubic(distanceFromEdge)
      vertex.setY(Math.random() * maxDisplacement * scale)
      positionAttribute.setY(i, vertex.y)

      // Append a tree if we're on the edge of the central plain 
      const inTreeZone = distanceFromEdge > 0.25 && distanceFromEdge < 0.66
      const random = Math.random() > 0.5
      if (inTreeZone && random){
        const tree = new ForestTree
        const randomPosition = Math.random()
        const randomScale = (0.5 + Math.random())/2
        tree.meshGroup.position.copy(vertex)
        tree.meshGroup.translateX(randomPosition)
        tree.meshGroup.translateZ(randomPosition)
        tree.meshGroup.scale.setScalar(randomScale)
        this.meshGroup.add(tree.meshGroup)
      }
    }
    geometry.setAttribute('position', positionAttribute)

    const taiga = new TextureLoader().load(taigaTexture)
    taiga.magFilter = taiga.minFilter = NearestFilter

    const uniforms = {
      "u_texture": { value: taiga },
      "u_tiles": { value: size }
    }

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    })

    const mountains = new Mesh(geometry, material)
    this.meshGroup.add(mountains)
    this.meshGroup.translateY(-0.2)
  }

  tick(engine: GameEngine){

  }
}