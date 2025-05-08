import { BoxGeometry, Mesh, MeshPhysicalMaterial, NearestFilter, PointLight, ShaderMaterial, TextureLoader } from 'three'
import CustomShaderMaterial from "three-custom-shader-material/vanilla"
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import vertexShader from '~/materials/csm-shaders/basic.vert?raw'
import fragmentShader from '~/materials/csm-shaders/texture.frag?raw'
import grassTextureA from '~/assets/grass-a.png'

export default class DebugObject extends GameObject{
  constructor(){
    super()

    const textureA = new TextureLoader().load(grassTextureA)
    textureA.magFilter = textureA.minFilter = NearestFilter
    const geometry = new BoxGeometry
    const material = new CustomShaderMaterial({
      baseMaterial: MeshPhysicalMaterial,
      vertexShader,
      fragmentShader,
      uniforms: {
        u_texture: { value: textureA },
        u_tiles: { value: 4 },
      },
    })

    const mesh = new Mesh(geometry, material)
    this.meshGroup.add(mesh)

    const light = new PointLight(0xffffff, 60)
    light.position.set(2, 2, 2)
    this.meshGroup.add(light)
  }

  tick(engine: GameEngine){

  }
}