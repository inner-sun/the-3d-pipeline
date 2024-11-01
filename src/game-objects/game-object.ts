import { Group } from 'three'
import GameEngine from '~/game-engine'

export default class GameObject{
  meshGroup: Group

  constructor(){
    this.meshGroup = new Group
  }

  tick(engine: GameEngine){
    
  }
}