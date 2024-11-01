import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import ForestGround from '~/game-objects/forest-ground'
import ForestMountains from '~/game-objects/forest-mountains'

export default class Forest extends GameObject{
  constructor(){
    super()

    const ground = new ForestGround
    this.meshGroup.add(ground.meshGroup)
    const mountains = new ForestMountains
    this.meshGroup.add(mountains.meshGroup)
  }

  tick(engine: GameEngine){

  }
}