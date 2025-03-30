import { Vector3 } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import GravityPuzzleCube from '~/game-objects/gravity-puzzle-cube'
import GravityPuzzlePlatform from '~/game-objects/gravity-puzzle-platform'

export default class GravityPuzzle extends GameObject {
  obstacles: GravityPuzzleCube[] = []
  gravity: Vector3 = new Vector3(0, -1, 0)
  platform: GravityPuzzlePlatform
  speed: number = 10

  constructor() {
    super()

    // Obstacles
    for (let i = -5; i < 5; i++) {
      const cube = new GravityPuzzleCube
      cube.meshGroup.position.set(i, 5, 0)
      this.obstacles.push(cube)
      this.meshGroup.add(cube.meshGroup)
    }
    for (let i = -5; i < 5; i++) {
      const cube = new GravityPuzzleCube
      cube.meshGroup.position.set(i, -5, 0)
      this.obstacles.push(cube)
      this.meshGroup.add(cube.meshGroup)
    }
    for (let i = -5; i <= 5; i++) {
      const cube = new GravityPuzzleCube
      cube.meshGroup.position.set(5, i, 0)
      this.obstacles.push(cube)
      this.meshGroup.add(cube.meshGroup)
    }
    for (let i = -4; i <= 4; i++) {
      const cube = new GravityPuzzleCube
      cube.meshGroup.position.set(-5, i, 0)
      this.obstacles.push(cube)
      this.meshGroup.add(cube.meshGroup)
    }
    const cube = new GravityPuzzleCube
    cube.meshGroup.position.set(4, 0, 0)
    this.obstacles.push(cube)
    this.meshGroup.add(cube.meshGroup)

    // Platform
    this.platform = new GravityPuzzlePlatform
    this.platform.meshGroup.position.set(0, 0, 0)
    this.meshGroup.add(this.platform.meshGroup)

    // Event listeners
    this.registerEventListeners()
  }

  updatePlatform(deltaTime: number) {
    if(this.platform.isGrounded) return

    // Apply gravity vector to platform using delta time
    const gravityVector = this.gravity.clone().multiplyScalar(deltaTime * this.speed)
    this.platform.meshGroup.position.add(gravityVector)

    // Check for collisions with obstacles
    for (const obstacle of this.obstacles) {
      const intersection = obstacle.getBoundingBox().intersect(this.platform.getBoundingBox())
      if(!intersection.isEmpty()) {
        const correctionDirection = this.gravity.clone().normalize().negate()
        const correctionOffset = intersection.getSize(new Vector3()).multiply(correctionDirection)
        const plateformSize = this.platform.getBoundingBox().getSize(new Vector3()).multiply(correctionDirection).divideScalar(2)
        this.platform.meshGroup.position.add(correctionOffset).add(plateformSize)
        this.platform.isGrounded = true
      }
    }
  }

  onKeyUp(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
      this.gravity.set(0, 1, 0)
      console.log('up')
    } else if (e.key === 'ArrowDown') {
      this.gravity.set(0, -1, 0)
      console.log('down')
    } else if (e.key === 'ArrowLeft') {
      this.gravity.set(-1, 0, 0)
      console.log('left')
    } else if (e.key === 'ArrowRight') {
      this.gravity.set(1, 0, 0)
      console.log('right')
    }
    this.platform.isGrounded = false
  }

  registerEventListeners(){
    window.addEventListener('keyup', (e) => this.onKeyUp(e))
  }

  tick(engine: GameEngine) {
    this.updatePlatform(engine.deltaTime)
  }
}