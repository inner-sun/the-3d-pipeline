import { Mesh, NearestFilter, PlaneGeometry, ShaderMaterial, TextureLoader, Vector3 } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import taigaTexture from '~/assets/taiga.png'
import vertexShader from '~/materials/shaders/basic.vert?raw'
import fragmentShader from '~/materials/shaders/texture.frag?raw'
import Easing from '~/utilities/easing'

export default class ForestMountains extends GameObject{
  constructor(){
    super()

    const size = 32
    const geometry = new PlaneGeometry(size, size, size * 2, size * 2)
    geometry.rotateX(-Math.PI / 2)

    // Apply Perlin noise on each vertex Y position
    // outside of the central plain
    const maxDisplacement = 10
    const positionAttribute = geometry.getAttribute('position').clone()
    const vertices = positionAttribute.array
    const center = new Vector3
    const cornerVertex = new Vector3().fromBufferAttribute(positionAttribute, 0)
    const maxDistance = cornerVertex.distanceTo(center)
    for(let i = 0; i < vertices.length; i++){
      const vertex = new Vector3().fromBufferAttribute(positionAttribute, i)
      const distanceFromEdge = vertex.distanceTo(center) / maxDistance
      const scale = Easing.easeInCubic(distanceFromEdge)
      const outsidePlayAreaX = (vertex.x < -size * (1/4)) || (vertex.x > size * (1/4))
      const outsidePlayAreaY = (vertex.z < -size * (1/4)) || (vertex.z > size * (1/4))
      const outsidePlayArea = outsidePlayAreaX || outsidePlayAreaY
      positionAttribute.setY(i, Math.random() * maxDisplacement * scale)
      if(outsidePlayArea){
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
    mountains.translateY(-0.2)
    this.meshGroup.add(mountains)
  }

  tick(engine: GameEngine){

  }
}