import { AmbientLight, PointLight, Vector3 } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import PhysicsEngine from '~/game-objects/physics-engine'
import PhysicsPlaygroundCharacter from '~/game-objects/physics-playground-character'
import PhysicsPlaygroundPlatform from '~/game-objects/physics-playground-platform'

export default class PhysicsPlayground extends GameObject{
  player: PhysicsPlaygroundCharacter
  platforms: PhysicsPlaygroundPlatform[]
  physicsEngine: PhysicsEngine

  constructor(engine: GameEngine){
    super()

    // Player
    this.player = new PhysicsPlaygroundCharacter
    this.player.meshGroup.position.set(0, 2, 0)
    this.meshGroup.add(this.player.meshGroup)

    // Platforms
    this.platforms = []
    const platform = new PhysicsPlaygroundPlatform({
      position: new Vector3(0, 0, 0),
      size: new Vector3(32, 1, 32)
    })
    this.platforms.push(platform)
    this.meshGroup.add(platform.meshGroup)

    // Lights
    this.meshGroup.add(new AmbientLight(0xffffff, 0.5))
    const pointLight = new PointLight(0xffffff, 0.5, 100, 0.5)
    pointLight.position.set(0, 10, 0)
    this.meshGroup.add(pointLight)

    // Physics
    this.physicsEngine = new PhysicsEngine(this, engine)
  }

  tick(engine: GameEngine){
    this.physicsEngine.tick(engine)
  }
}