import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Box3, BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

export default class GravityPuzzleCube extends GameObject{
  constructor(){
    super()

    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0x1783b0, wireframe: true })
    const cube = new Mesh(geometry, material)
    this.meshGroup.add(cube)
  }

  getBoundingBox(){
    return new Box3().setFromObject(this.meshGroup).applyMatrix4(this.meshGroup.matrixWorld)
  }

  tick(engine: GameEngine){

  }
}