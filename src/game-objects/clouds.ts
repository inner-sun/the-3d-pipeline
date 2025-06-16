import { Mesh, PlaneGeometry, RepeatWrapping, TextureLoader, } from 'three'
import { Fn, MeshBasicNodeMaterial, mix, positionLocal, sin, smoothstep, texture, uniform, uv, vec2, vec3, vec4 } from 'three/webgpu'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import skyline from '~/assets/skyline.png'

export default class Clouds extends GameObject{
  material: MeshBasicNodeMaterial
  time = uniform(0)

  constructor(){
    super()

    const width = 20
    const height = 8
    const plane = new PlaneGeometry(width, height, 64, 1)
    plane.translate(0, height/2, 0)
    this.material = new MeshBasicNodeMaterial({
      transparent: true
    })
    const textureMap = new TextureLoader().load(skyline)
    textureMap.wrapS = RepeatWrapping

    // TSL Vertex Shader
    this.material.positionNode = Fn(() => {
      const mirroredGradient = uv().x.mul(2).sub(1).abs()
      const positionZ = smoothstep(0, 1, mirroredGradient).mul(5)
      const position = vec3(positionLocal.xy, positionZ)
      return position
    })()

    const randomOffset = Math.random()

    // TSL Fragment shader
    this.material.colorNode = Fn(() => {
      const mirroredGradient = uv().x.mul(2).sub(1).abs()

      // UV used to sample the texture with a mirrored effect
      let scaledUV = vec2(mirroredGradient.x, uv().y).mul(vec2(1280/768, 2))
      scaledUV.x = scaledUV.x.sub(this.time.mul(0.1)).add(randomOffset)

      const cloudsTexture = texture(textureMap, scaledUV)
      const white = vec4(1, 1, 1, cloudsTexture.a)
      const whiteGradientStart = 0.1
      const whiteGradientSize = 0.2
      const mirroredGradientBrighter = smoothstep(whiteGradientStart, whiteGradientStart + whiteGradientSize, mirroredGradient)
      const fragment = mix(white, cloudsTexture, mirroredGradientBrighter)
      
      return fragment
    })()

    const mesh = new Mesh(plane, this.material)
    this.meshGroup.add(mesh)
  }

  tick(engine: GameEngine){
    this.time.value = engine.clock.getElapsedTime()
  }
}