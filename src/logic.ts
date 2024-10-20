import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Riverbed } from '~/meshes/riverbed'

export default class Logic {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  orbitControls: OrbitControls

  constructor() {
    this.scene = new Scene
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight)
    this.camera.position.set(-2, 2, 5)
    
    this.renderer = new WebGLRenderer
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    
    const riverbed = new Riverbed
    this.scene.add(riverbed.object)

    this.tick()
  }

  tick() {
    this.orbitControls.update()
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(() => { this.tick() })
  }
}