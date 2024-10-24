import { ShaderMaterial, TextureLoader } from 'three'
import vertexShader from '~/shaders/basicWithUVs.vert?raw'
import fragmentShader from '~/shaders/texture.frag?raw'

interface TiledMaterialProps{
  texturePath: string
  tiles?: number
}

const TiledMaterial = ({
  texturePath,
  tiles=1
}: TiledMaterialProps) => {
  const texture = new TextureLoader().load(texturePath)
  const uniforms = {
    "u_texture": { value: texture },
    "u_tiles": { value: tiles }
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })
  
  return material
}

export default TiledMaterial