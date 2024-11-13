import { Scene, PerspectiveCamera, WebGLRenderer, Vector3, Color } from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Forest from '~/game-objects/forest'
import GameObject from '~/game-objects/game-object'
import Plain from '~/game-objects/plain'
import { globalUniforms } from '~/uniforms'
import Stats from 'three/examples/jsm/libs/stats.module.js'


export default class GameEngine {
  scene: Scene
  camera: PerspectiveCamera
  renderer: WebGLRenderer
  orbitControls: OrbitControls
  entities: GameObject[]
  uniforms: typeof globalUniforms
  stats: Stats

  constructor() {
    this.scene = new Scene
    this.scene.background = new Color(0x64b6f0)
    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight)
    this.camera.position.set(-15, 5, 1)
    this.camera.lookAt(new Vector3(0, 0, 0))
    this.entities = []
    this.uniforms = globalUniforms
    
    this.renderer = new WebGLRenderer
    document.body.appendChild(this.renderer.domElement)
    this.setView()
    
    this.registerEventListeners()
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)

    this.addEntity(new Forest)

    this.stats = new Stats()
    document.body.appendChild(this.stats.dom)

    this.tick()
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
    this.uniforms.time = Date.now() / 1000
    this.entities.forEach(entry => entry.tick(this))
    this.orbitControls.update()
    this.renderer.render(this.scene, this.camera)
    this.stats.update()

    window.requestAnimationFrame(() => { this.tick() })
  }
}