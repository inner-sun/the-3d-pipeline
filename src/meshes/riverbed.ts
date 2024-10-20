import { BoxGeometry, Group, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from 'three'

export class Riverbed{
  object: Object3D

  constructor(){
    const length = 4
    const riverGeometry = new PlaneGeometry(1, length, 1, length)
    const banksGeometry = new BoxGeometry(1, length, 1, 1, length)

    const banksMaterial = new MeshBasicMaterial({
      color: 0x58017
    })
    const bedMaterial = new MeshBasicMaterial({
      color: 0x5e2d2d
    })
    const riverMaterial = new MeshBasicMaterial({
      color: 0x0000ff
    })

    const river = new Mesh(riverGeometry, riverMaterial)
    river.position.setZ(0.25)
    const leftBank = new Mesh(banksGeometry, banksMaterial)
    leftBank.position.setX(-1)
    const rightBank = new Mesh(banksGeometry, banksMaterial)
    rightBank.position.setX(1)

    this.object = new Group
    this.object.add(river)
    this.object.add(leftBank)
    this.object.add(rightBank)
    this.object.rotateX(-Math.PI/2)
  }
}