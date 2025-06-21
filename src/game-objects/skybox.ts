import { BoxGeometry, Mesh } from 'three'
import { MeshBasicNodeMaterial } from 'three/webgpu'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'

export default class Skybox extends GameObject{
  constructor(){
    super()

    const skyboxGeometry = new BoxGeometry(1000, 1000, 1)
    const skyboxMaterial = new MeshBasicNodeMaterial({ color: 0xFFFFFF })
    const skybox = new Mesh(skyboxGeometry, skyboxMaterial)
    skybox.translateZ(-100)
    this.meshGroup.add(skybox)
  }

  tick(engine: GameEngine){
  }
}