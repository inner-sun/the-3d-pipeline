import GameEngine from '~/game-engine'
import Ascension from '~/game-objects/ascension'
import GameObject from '~/game-objects/game-object'
import Portal from '~/game-objects/portal'
import Scenery from '~/game-objects/scenery'
import { useStencilMask } from '~/utilities/stencil'

export default class PortalScene extends GameObject{
  gameObjects: GameObject[] = []

  constructor(){
    super()

    const portal = new Portal
    this.gameObjects.push(portal)
    this.meshGroup.add(portal.meshGroup)

    const scenery = new Ascension
    this.gameObjects.push(scenery)
    scenery.meshGroup.position.set(0, -2, -20)
    scenery.forEachMaterial((material) => {
      [material].flat().forEach((entry) => {
        Object.assign(entry, useStencilMask())
      })
    })
    this.meshGroup.add(scenery.meshGroup)
  }

  tick(engine: GameEngine){
    this.gameObjects.forEach(gameObject => gameObject.tick(engine))
  }
}