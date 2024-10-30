import { Object3D } from 'three'
import GameEngine from '~/game-engine'

export default class GameObject{
  meshGroup: Object3D

  constructor(){
    this.meshGroup = new Object3D
  }

  tick(engine: GameEngine){
    
  }
}