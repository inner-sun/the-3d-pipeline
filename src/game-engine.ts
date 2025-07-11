import { Scene, PerspectiveCamera, Color, Clock } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GameObject from '~/game-objects/game-object'
import { globalUniforms } from '~/uniforms'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { WebGPURenderer } from 'three/webgpu'
import PortalScene from '~/game-objects/portal-scene'

export default class GameEngine {
  clock: Clock
  deltaTime: number = 0
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGPURenderer
  orbitControls: OrbitControls
  entities: GameObject[]
  uniforms: typeof globalUniforms
  stats: Stats

  constructor() {
    this.clock = new Clock
    this.scene = new Scene
    this.scene.background = new Color(0x000000)
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight)
    this.camera.position.set(0, 0, 2)
    this.entities = []
    this.uniforms = globalUniforms
    
    this.renderer = new WebGPURenderer({
      stencil: true
    })
    document.body.appendChild(this.renderer.domElement)
    this.setView()
    
    this.registerEventListeners()
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)

    this.addEntity(new PortalScene)

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.renderer.setAnimationLoop(() => { this.tick() })
  }

  addEntity(entity: GameObject) {
    this.entities.push(entity)
    this.scene.add(entity.meshGroup)
  }

  setView() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  registerEventListeners() {
    window.onresize = () => { this.setView() }
  }

  tick() {
    this.deltaTime = this.clock.getDelta()
    this.uniforms.time = this.clock.getElapsedTime()
    this.entities.forEach(entry => entry.tick(this))
    this.orbitControls.update()
    this.renderer.render(this.scene, this.camera)
    this.stats.update()
  }
}