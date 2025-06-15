import { Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import GameEngine from '~/game-engine'
import Clouds from '~/game-objects/clouds'
import GameObject from '~/game-objects/game-object'
import RainbowBridge from '~/game-objects/rainbow-bridge'

export default class Ascension extends GameObject{
  rainbowBridge = new RainbowBridge
  clouds = new Clouds

  constructor(){
    super()

    // Rainbow Bridge
    this.rainbowBridge.meshGroup.position.set(0, 0, 0)
    this.meshGroup.add(this.rainbowBridge.meshGroup)

    // Clouds
    this.clouds.meshGroup.position.set(0, 0, -0.5)
    this.meshGroup.add(this.clouds.meshGroup)

    // debug geometry
    const groundGeometry = new PlaneGeometry(10, 10, 10, 10)
    groundGeometry.rotateX(-Math.PI / 2)
    const ground = new Mesh(groundGeometry, new MeshBasicMaterial({ wireframe: true }))
    this.meshGroup.add(ground)
  }

  tick(engine: GameEngine){
    this.rainbowBridge.tick(engine)
    this.clouds.tick(engine)
  }
}