import GameEngine from '~/game-engine'
import Clouds from '~/game-objects/clouds'
import GameObject from '~/game-objects/game-object'
import MysticPuddle from '~/game-objects/mystic-puddle'
import RainbowBridge from '~/game-objects/rainbow-bridge'

export default class Ascension extends GameObject{
  gameObjects: GameObject[] = []

  constructor(){
    super()

    // Ascending particles
    const ascendingParticles = new RainbowBridge
    ascendingParticles.meshGroup.position.set(0, 0, -51)
    ascendingParticles.meshGroup.scale.set(48, 10, 1)

    // Rainbow Bridge
    const rainbowBridge = new RainbowBridge
    rainbowBridge.meshGroup.position.set(0, 0, 0)

    // Clouds
    const cloudsFront = new Clouds
    cloudsFront.meshGroup.position.set(0, 0, -0.5)

    const cloudsMiddle = new Clouds
    cloudsMiddle.meshGroup.position.set(0, 0, -10)
    cloudsMiddle.meshGroup.scale.setScalar(3)

    const cloudsBack = new Clouds
    cloudsBack.meshGroup.position.set(0, 0, -50)
    cloudsBack.meshGroup.scale.setScalar(10)

    // Mystic Puddle
    const mysticPuddle = new MysticPuddle

    this.gameObjects.push(ascendingParticles, rainbowBridge, cloudsFront, cloudsMiddle, cloudsBack, mysticPuddle)
    this.gameObjects.forEach(gameObject => this.meshGroup.add(gameObject.meshGroup))
  }

  tick(engine: GameEngine){
    this.gameObjects.forEach(gameObject => gameObject.tick(engine))
  }
}