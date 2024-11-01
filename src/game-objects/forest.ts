import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import ForestGround from '~/game-objects/forest-ground'
import ForestMountains from '~/game-objects/forest-mountains'
import ForestTree from '~/game-objects/forest-tree'

export default class Forest extends GameObject{
  constructor(){
    super()

    const ground = new ForestGround
    this.meshGroup.add(ground.meshGroup)
    const mountains = new ForestMountains
    this.meshGroup.add(mountains.meshGroup)
    const tree = new ForestTree
    this.meshGroup.add(tree.meshGroup)
  }

  tick(engine: GameEngine){

  }
}