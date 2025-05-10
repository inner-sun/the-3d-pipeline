import { BoxGeometry, CapsuleGeometry, Mesh, MeshBasicMaterial } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'

export default class PhysicsPlaygroundCharacter extends GameObject{
  geometry: CapsuleGeometry
  material: MeshBasicMaterial
  mesh: Mesh

  constructor(){
    super()
    
    this.geometry = new CapsuleGeometry(0.5, 1, 6)
    this.material = new MeshBasicMaterial({ color: 0x00ff00 })
    this.mesh = new Mesh(this.geometry, this.material)
    this.meshGroup.add(this.mesh)
  }

  tick(engine: GameEngine){

  }
}