import { ShaderMaterial, TextureLoader } from 'three'
import vertexShader from '~/materials/shaders/basic.vert?raw'
import fragmentShader from '~/materials/shaders/texture.frag?raw'

interface TiledMaterialProps{
  texturePath: string
}

const TiledMaterial = ({
  texturePath
}: TiledMaterialProps) => {
  const texture = new TextureLoader().load(texturePath)
  const uniforms = {
    "u_texture": { value: texture }
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })
  
  return material
}

export default TiledMaterial