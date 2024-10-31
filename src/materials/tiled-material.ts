import { Color, DataTexture, NearestFilter, ShaderMaterial, TextureLoader } from 'three'
import randomTileMap from '~/materials/maps/random'
import vertexShader from '~/materials/shaders/basic.vert?raw'
import fragmentShader from '~/materials/shaders/texture.frag?raw'

interface TiledMaterialProps{
  texturePath: string
}

const TiledMaterial = ({
  texturePath
}: TiledMaterialProps) => {
  const texture = new TextureLoader().load(texturePath)
  texture.magFilter = NearestFilter
  texture.minFilter = NearestFilter

  const bitmap = randomTileMap(16)
  const uniforms = {
    "u_texture": { value: bitmap }
  }

  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })
  
  return material
}

export default TiledMaterial