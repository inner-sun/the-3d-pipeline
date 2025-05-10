import RAPIER from '@dimforge/rapier3d-compat'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import PhysicsEngineRapierDebug from '~/game-objects/physics-engine-rapier-debug'
import PhysicsPlayground from '~/game-objects/physics-playground'

export default class PhysicsEngine extends GameObject{
  world?: RAPIER.World
  debugger?: PhysicsEngineRapierDebug

  constructor(physicsPlayground: PhysicsPlayground, gameEngine: GameEngine){
    super()

    RAPIER.init().then(() => {
      this.world = new RAPIER.World({ x: 0.0, y: -9.81, z: 0.0 })
      physicsPlayground.platforms.forEach(platform => {
        if (platform.colliderDesc) {
          platform.collider = this.world?.createCollider(platform.colliderDesc)
        }
      })

      this.debugger = new PhysicsEngineRapierDebug(gameEngine.scene, this.world)
    })
  }

  tick(engine: GameEngine){
    this.world?.step()
    this.debugger?.tick()
  }
}