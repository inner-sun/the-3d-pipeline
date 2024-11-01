import { Mesh, NearestFilter, PlaneGeometry, ShaderMaterial, TextureLoader } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import grassTextureA from '~/assets/grass-a.png'
import grassTextureB from '~/assets/grass-b.png'
import randomTileMap from '~/materials/maps/random'
import vertexShader from '~/materials/shaders/basic.vert?raw'
import fragmentShader from '~/materials/shaders/mixed-texture.frag?raw'

export default class ForestGround extends GameObject{
  constructor(){
    super()

    const size = 16
    const geometry = new PlaneGeometry(size, size)
    geometry.rotateX(-Math.PI / 2)

    const textureA = new TextureLoader().load(grassTextureA)
    const textureB = new TextureLoader().load(grassTextureB)
    textureA.magFilter = textureA.minFilter = NearestFilter
    textureB.magFilter = textureB.minFilter = NearestFilter
    const tilemap = randomTileMap(16)

    const uniforms = {
      "u_texture_a": { value: textureA },
      "u_texture_b": { value: textureB },
      "u_texture_tile": { value: tilemap }
    }

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    })

    const ground = new Mesh(geometry, material)
    this.meshGroup.add(ground)
  }

  tick(engine: GameEngine){

  }
}