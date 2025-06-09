import { ShaderMaterial } from 'three'
import vertexShader from '~/materials/shaders/vertex-paint.vert?raw'
import fragmentShader from '~/materials/shaders/vertex-paint.frag?raw'

const VertexPaintMaterial = () => {
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    vertexColors: true
  })
  
  return material
}

export default VertexPaintMaterial