import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { EffectComposer, OutputPass, RenderPass, SSAOPass } from 'three/examples/jsm/Addons.js'

export default class RenderModule{
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
  composer: EffectComposer

  constructor(scene: Scene, camera: PerspectiveCamera) {
    this.renderer = new WebGLRenderer({ antialias: true })
    document.body.appendChild(this.renderer.domElement)

    this.camera = camera
    this.scene = scene

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.composer.addPass(new SSAOPass(this.scene, this.camera, window.innerWidth, window.innerHeight))
    this.composer.addPass(new OutputPass())

    window.addEventListener("resize", () => { this.setSize(window.innerWidth, window.innerHeight) })
    this.setSize(window.innerWidth, window.innerHeight)
  }

  setSize(width: number, height: number) {
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.composer.setSize(width, height)
  }

  render() {
    this.composer.render()
  }
}