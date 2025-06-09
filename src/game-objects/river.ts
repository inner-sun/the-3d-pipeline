import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import model from '~/assets/river.glb?url'
import VertexPaintMaterial from '~/materials/vertex-paint-material'
import { Mesh } from 'three'

// River stored as vertex painted values on a high poly quad

export default class River extends GameObject{
  constructor(){
    super()

    const material = VertexPaintMaterial()
    const loader = new GLTFLoader()
    loader.load(model, (mesh) => {
      mesh.scene.traverse((child) => {
        if(child.type === "Mesh"){
          (child as Mesh).material = material
        }
      })
      this.meshGroup.add(mesh.scene)
    })
  }

  tick(engine: GameEngine){

  }
}