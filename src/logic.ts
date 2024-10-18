import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import { Quad } from '~/meshes/quad'

export default class Logic {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer

  constructor() {
    this.scene = new Scene
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight)
    this.camera.position.set(0, 0, 5)

    this.renderer = new WebGLRenderer
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    
    const quad = new Quad
    this.scene.add(quad.mesh)

    this.tick()
  }

  tick() {
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(() => { this.tick() })
  }
}