import { BoxGeometry, Mesh, MeshBasicMaterial, MeshLambertMaterial, Vector3 } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'

export interface PhysicsPlaygroundPlatformProps{
  size: Vector3
  position: Vector3
}

export default class PhysicsPlaygroundPlatform extends GameObject{
  geometry: BoxGeometry
  material: MeshLambertMaterial
  mesh: Mesh
  
  constructor({ position, size }: PhysicsPlaygroundPlatformProps){
    super()
    
    // Mesh props
    this.geometry = new BoxGeometry(size.x, size.y, size.z)
    this.material = new MeshLambertMaterial({ color: 0x0000ff })
    // Debug helpers
    const debugHelper = new Mesh(
      new BoxGeometry(size.x, size.y, size.z, size.x, size.y, size.z), 
      new MeshBasicMaterial({ wireframe: true, color: 0x0000ff })
    )
    debugHelper.scale.multiplyScalar(1.001)

    this.mesh = new Mesh(this.geometry, this.material)
    this.meshGroup.add(this.mesh)
    this.meshGroup.add(debugHelper)
    this.meshGroup.position.copy(position)
  }

  tick(engine: GameEngine){

  }
}