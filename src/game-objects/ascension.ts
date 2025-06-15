import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import RainbowBridge from '~/game-objects/rainbow-bridge'

export default class Ascension extends GameObject{
  rainbowBridge = new RainbowBridge

  constructor(){
    super()

    this.rainbowBridge.meshGroup.position.set(0, 0, -2)
    this.meshGroup.add(this.rainbowBridge.meshGroup)

    // debug geometry
    const groundGeometry = new PlaneGeometry(10, 10, 10, 10)
    groundGeometry.rotateX(-Math.PI / 2)
    const ground = new Mesh(groundGeometry, new MeshBasicMaterial({ wireframe: true }))
    this.meshGroup.add(ground)
  }

  tick(engine: GameEngine){
    this.rainbowBridge.tick(engine)
  }
}