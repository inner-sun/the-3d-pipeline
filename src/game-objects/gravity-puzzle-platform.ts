import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { Box3, BoxGeometry, Mesh, MeshBasicMaterial } from 'three'

export default class GravityPuzzlePlatform extends GameObject{
  isGrounded: boolean = false

  constructor(){
    super()

    const geometry = new BoxGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0xe39d12 })
    const cube = new Mesh(geometry, material)
    this.meshGroup.add(cube)
  }

  getBoundingBox() {
    return new Box3().setFromObject(this.meshGroup).applyMatrix4(this.meshGroup.matrixWorld)
  }

  tick(engine: GameEngine){

  }
}