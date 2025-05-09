import { BoxGeometry, Mesh, MeshPhysicalMaterial, NearestFilter, PointLight, PointLightHelper, ShaderMaterial, TextureLoader } from 'three'
import CustomShaderMaterial from "three-custom-shader-material/vanilla"
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import vertexShader from '~/materials/csm-shaders/basic.vert?raw'
import fragmentShader from '~/materials/csm-shaders/texture.frag?raw'
import grassTextureA from '~/assets/grass-a.png'

export default class DebugObject extends GameObject{
  light: PointLight

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

    this.light = new PointLight(0xffffff, 60)
    this.light.position.set(2, 2, 2)

    this.meshGroup.add(this.light)
  }

  tick(engine: GameEngine){
    const offset = Math.sin(engine.clock.getElapsedTime()) + 2
    this.light.position.set(
      offset,
      2,
      2,
    )
  }
}