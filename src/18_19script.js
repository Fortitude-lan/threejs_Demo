import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Blending } from 'three'

/**
 * Base Global var
 */
const CUBE_OPEN = false
const PARTICLE_OPEN = false

// Debug
const gui = new dat.GUI()
// gui.close()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/2.png')

/**
 * Galaxy
 */
const paramsters = {}
paramsters.count = 100000
paramsters.size = 0.01
paramsters.radius = 5
paramsters.branches = 3
paramsters.spin = 1
paramsters.randomness = 0.2
paramsters.randomnessPower = 3
paramsters.insideColor = '#ff6030'
paramsters.outsideColor = '#2e62ff'

let galaxyGeo = null
let galaxyMaterial = null
let galaxyPoints = null
const generateGalaxy = () => {
    //destory old galaxy
    if (galaxyPoints !== null) {
        galaxyGeo.dispose()
        galaxyMaterial.dispose()
        scene.remove(galaxyPoints)
    }

    galaxyGeo = new THREE.BufferGeometry()

    const positions = new Float32Array(paramsters.count * 3)
    const colors = new Float32Array(paramsters.count * 3)

    const colorInside = new THREE.Color(paramsters.insideColor)
    const colorOutside = new THREE.Color(paramsters.outsideColor)

    for (let i = 0; i < paramsters.count; i++) {
        const i3 = i * 3
        const radius = Math.random() * paramsters.radius
        const branchAngle = (i % paramsters.branches) / paramsters.branches * Math.PI * 2
        const spinAngle = radius * paramsters.spin
        const randomX = Math.pow(Math.random(), paramsters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomY = Math.pow(Math.random(), paramsters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)
        const randomZ = Math.pow(Math.random(), paramsters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1)

        positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        positions[i3 + 1] = randomY
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ
        const mixColor = colorInside.clone()
        mixColor.lerp(colorOutside, radius / paramsters.radius)
        colors[i3] = mixColor.r
        colors[i3 + 1] = mixColor.g
        colors[i3 + 2] = mixColor.b

    }
    galaxyGeo.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
    )
    galaxyGeo.setAttribute(
        'color',
        new THREE.BufferAttribute(colors, 3)
    )
    galaxyMaterial = new THREE.PointsMaterial({
        size: paramsters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
    })
    galaxyPoints = new THREE.Points(galaxyGeo, galaxyMaterial)
    scene.add(galaxyPoints)
}
generateGalaxy()

gui.add(paramsters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
gui.add(paramsters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
gui.add(paramsters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
gui.add(paramsters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
gui.add(paramsters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
gui.add(paramsters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
gui.add(paramsters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
gui.addColor(paramsters, 'insideColor').onFinishChange(generateGalaxy)
gui.addColor(paramsters, 'outsideColor').onFinishChange(generateGalaxy)


/**
 * Particles_demo
 */

const particlesGeo = new THREE.BufferGeometry()
const count = 20000
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}
particlesGeo.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
)
particlesGeo.setAttribute(
    'color',
    new THREE.BufferAttribute(colors, 3)
)

const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true,
    // color: new THREE.Color('#ff88cc'), //底色
    transparent: true,
    alphaMap: particleTexture,
    // alphaTest: 0.001
    // depthTest:false 
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true
})
if (PARTICLE_OPEN) {
    const particles_demo = new THREE.Points(particlesGeo, particleMaterial)
    scene.add(particles_demo)
}
/**
 * Test cube
 */
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
)
if (CUBE_OPEN) scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    //Update particle
    if (PARTICLE_OPEN) {
        for (let i = 0; i < count; i++) {
            // console.log(particlesGeo.attributes.position.array);
            const i3 = i * 3
            const x = particlesGeo.attributes.position.array[i3]
            particlesGeo.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
        }
        particlesGeo.attributes.position.needsUpdate = true
    }

    //Update galaxy

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()