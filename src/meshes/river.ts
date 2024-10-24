import { Group, Mesh, Object3D, PlaneGeometry } from 'three'
import TiledMaterial from '~/materials/tiled-material'
import waterTexture from '~/assets/water.jpg'

export class Riverbed{
  object: Object3D

  constructor(){
    const riverGeometry = new PlaneGeometry
    const riverMaterial = TiledMaterial({
      texturePath: waterTexture,
      tiles: 5
    })

    const river = new Mesh(riverGeometry, riverMaterial)

    this.object = new Group
    this.object.add(river)
    this.object.rotateX(-Math.PI/2)
  }
}