import { BoxGeometry, Mesh, MeshNormalMaterial, Object3D } from 'three'

export class Cube{
  mesh: Object3D

  constructor(){
    const cubeGeometry = new BoxGeometry(1, 1, 1)
    const cubeMaterial = new MeshNormalMaterial()
    const mesh = new Mesh(cubeGeometry, cubeMaterial)
    this.mesh = mesh
  }
}