import { Collider, ColliderDesc, RigidBody, RigidBodyDesc } from '@dimforge/rapier3d-compat'
import { Group } from 'three'
import GameEngine from '~/game-engine'

export default class GameObject{
  meshGroup: Group
  colliderDesc?: ColliderDesc
  rigidBodyDesc?: RigidBodyDesc
  collider?: Collider
  rigidBody?: RigidBody

  constructor(){
    this.meshGroup = new Group
  }

  tick(engine: GameEngine){
    
  }
}