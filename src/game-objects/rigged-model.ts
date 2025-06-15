import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import model from '~/assets/character-rig.glb?url'
import { AnimationMixer, Mesh, MeshNormalMaterial } from 'three'

export default class RiggedModel extends GameObject{
  animationMixer?: AnimationMixer

  constructor(){
    super()

    const loader = new GLTFLoader()
    loader.load(model, (mesh) => {
      // Load model and set debug material
      mesh.scene.traverse((child) => {
        if (child.type === "Mesh") {
          (child as Mesh).material = new MeshNormalMaterial()
        }
      })
      this.meshGroup.add(mesh.scene)
      this.meshGroup.rotateY(Math.PI/2)
      this.meshGroup.translateY(-1)

      // Set up animation mixer
      console.log(mesh.animations[0])
      this.animationMixer = new AnimationMixer(mesh.scene)
      this.animationMixer.clipAction(mesh.animations[0]).play()
    })
  }

  tick(engine: GameEngine){
    this.animationMixer?.update(engine.deltaTime)
  }
}