import { Collider, ColliderDesc, RigidBody, RigidBodyDesc } from '@dimforge/rapier3d-compat'
import { Group, Material, Mesh } from 'three'
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

  forEachMaterial(callback: (material: Material | Material[]) => void){
    this.meshGroup.traverse((child) => {
      if(child.type === "Mesh"){
        const material = (child as Mesh).material
        callback(material)
      }
    })
  }

  tick(engine: GameEngine){
    
  }
}