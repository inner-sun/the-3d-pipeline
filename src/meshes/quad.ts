import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial, Object3D, PointsMaterial, ShaderMaterial } from 'three'
import vertexShader from '../shaders/basic.vert?raw'
import fragmentShader from '../shaders/basic.frag?raw'

export class Quad {
  mesh: Object3D

  constructor() {
    const geometry = new BufferGeometry

    const vertices = new Float32Array([
      //x  , y  , z
      -1.0, -1.0, 0,
      1.0, -1.0, 0,
      1.0, 1.0, 0,
      -1.0, 1.0, 0,
    ])
    const indices = [
      0, 1, 2,
      2, 3, 0,
    ]
    geometry.setIndex(indices);
    geometry.setAttribute('position', new BufferAttribute(vertices, 3))

    const material = new ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })
    const mesh = new Mesh(geometry, material)

    this.mesh = mesh
  }
}