import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import model from '~/assets/tree.glb?url'

export default class ForestTree extends GameObject{
  constructor(){
    super()

    const loader = new GLTFLoader()
    loader.load(model, (mesh) => {
      this.meshGroup.add(mesh.scene)
    })
  }

  tick(engine: GameEngine){

  }
}