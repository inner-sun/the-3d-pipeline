import { BatchedMesh, BufferGeometry, Group, InstancedMesh, Material, Matrix4, Mesh, MeshBasicMaterial, Object3D, PlaneGeometry, ShaderMaterial, TextureLoader } from 'three'
import GameEngine from '~/game-engine'
import GameObject from '~/game-objects/game-object'
import grassTexture from '~/assets/grass.png'
import noiseTexture from '~/assets/perlin.png'
import vertexShader from '~/materials/shaders/billboard.vert?raw'
import fragmentShader from '~/materials/shaders/grass.frag?raw'

const basicVersion = (geometry: BufferGeometry, material: Material, instances: number) => {
  const grass = new Mesh(geometry, material)
  const grassGroup = new Group
  for(let i=0; i<instances; i++){
    const entry = grass.clone()
    const x = Math.random() - 0.5
    const z = Math.random() - 0.5
    entry.position.set(x, 0, z)
    grassGroup.add(entry)
  }
  return grassGroup
}

const instancedVersion = (geometry: BufferGeometry, material: Material, instances: number) => {
  const grassArray = new InstancedMesh(geometry, material, instances)
  for (let i = 0; i < instances; i++) {
    const object = new Object3D
    object.position.set(Math.random() - 0.5, 0, Math.random() - 0.5)
    object.updateMatrix()
    grassArray.setMatrixAt(i, object.matrix)
  }
  grassArray.instanceMatrix.needsUpdate = true
  return grassArray
}

const batchedVersion = (geometry: BufferGeometry, material: Material, instances: number) => {
  const maxVertices = instances * 4
  const maxIndices = instances * 6
  const grassArray = new BatchedMesh(instances, maxVertices, maxIndices, material)
  for (let i = 0; i < instances; i++) {
    const object = new Object3D
    object.position.set(Math.random() - 0.5, 0, Math.random() - 0.5)
    object.updateMatrix()
    const geometryId = grassArray.addGeometry(geometry)
    const instanceId = grassArray.addInstance(geometryId)
    grassArray.setMatrixAt(instanceId, object.matrix)
  }
  return grassArray
}

export default class Plain extends GameObject {
  constructor() {
    super()

    // Ground
    const groundGeometry = new PlaneGeometry
    groundGeometry.rotateX(-Math.PI/2) 
    const groundMaterial = new MeshBasicMaterial({ color: 0x3e8b37 })
    const ground = new Mesh(groundGeometry, groundMaterial)
    this.meshGroup.add(ground)

    // Grass Billboards
    const instances = Math.pow(2, 12)
    const scale = 0.05

    const plane = new PlaneGeometry
    plane.scale(scale, scale, scale)
    const offset = 1 * scale / 2
    plane.translate(0, offset, 0)

    const grassMask = new TextureLoader().load(grassTexture)
    const noise = new TextureLoader().load(noiseTexture)
    const grassMaterial = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_texture: { value: grassMask },
        u_noise: { value: noise },
        u_scale: { value: scale }
      },
      transparent: true
    })

    const testMaterial = new MeshBasicMaterial
    
    // const grassArray = basicVersion(plane, grassMaterial, instances)
    // const grassArray = instancedVersion(plane, grassMaterial, instances)
    const grassArray = batchedVersion(plane, grassMaterial, instances)

    this.meshGroup.add(grassArray)
  }

  tick(engine: GameEngine) {

  }
}