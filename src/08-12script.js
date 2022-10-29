/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-10-17 14:25:41
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-10-26 11:05:01
 */
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'
import { set } from 'lodash'
import { CubeTextureLoader } from 'three'

/**
 * Debug
 */
const gui = new dat.GUI({ closed: true })
// gui.hide()

const parameters = {
    color: 0xdc234f,
    spin: () => {
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + 5 })
    }
}
/**
 * texture
 */

const textureLoader = new THREE.TextureLoader()
const cubetextureLoader = new THREE.CubeTextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')
gradientTexture.minFilter = THREE.NearestFilter
gradientTexture.magFilter = THREE.NearestFilter
gradientTexture.generateMipmaps = false



const environmentMapTexture = cubetextureLoader.load([
    '/textures/environmentMaps/4/px.png',
    '/textures/environmentMaps/4/nx.png',
    '/textures/environmentMaps/4/py.png',
    '/textures/environmentMaps/4/ny.png',
    '/textures/environmentMaps/4/pz.png',
    '/textures/environmentMaps/4/nz.png',
])
/**
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
// const material = new THREE.MeshBasicMaterial({
//     map:doorColorTexture,
//     // color:0x00ff00,
//     // wireframe:true,
//     // opacity:0.5,
//     // transparent:true,
//     // alphaMap:doorAlphaTexture,
//     // side:THREE.DoubleSide
// })

// const material = new THREE.MeshNormalMaterial({
//     // flatShading:true
// })

// const material = new THREE.MeshMatcapMaterial({
//     matcap: matcapTexture
// })

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial({
//     shininess: 100,
//     specular:new THREE.Color(0x1188ff)
// })

// const material = new THREE.MeshToonMaterial({
//     gradientMap:gradientTexture
// })

// const material = new THREE.MeshStandardMaterial({
//     metalness: 0.45,
//     roughness: 0.65,
//     map: doorColorTexture,
//     aoMap: doorAmbientOcclusionTexture,
//     aoMapIntensity: 1,
//     displacementMap: doorHeightTexture,
//     displacementScale: 0.05,
//     metalnessMap: doorMetalnessTexture,
//     roughnessMap: doorRoughnessTexture,
//     normalMap: doorNormalTexture,
//     normalScale: new THREE.Vector2(0.5, 0.5),
//     transparent: true,
//     alphaMap: doorAlphaTexture
// })

const material = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.2,
    envMap: environmentMapTexture
})

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.0001)
gui.add(material, 'displacementScale').min(0).max(1).step(0.0001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5

console.log(plane.geometry.attributes.uv);
sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
)
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
)
torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
)

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({
//     color: parameters.color,
//     // wireframe: true
// })
// const mesh = new THREE.Mesh(geometry, material)

// mesh.visible=false
scene.add(sphere)
scene.add(plane)
scene.add(torus)

// //Debug
// gui.add(mesh.position, 'y', -3, 3, 0.01)
// gui
//     .add(mesh.position, 'y')
//     .min(-3)
//     .max(3)
//     .step(0.01)
//     .name('cube y')

// gui.add(mesh, 'visible')
// gui.add(material || mesh.material, 'wireframe')
// gui.addColor(parameters, 'color')
//     .onChange(() => {
//         material.color.set(parameters.color)
//     })
// gui.add(parameters, 'spin')


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    //update size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})
//DBLCLICK
// window.addEventListener('f', () => {
//     const fullScreenElement = document.fullscreenElement || document.webkitFullscreenElement
//     if (!fullScreenElement) {
//         if (canvas.requestFullscreen()) {
//             canvas.requestFullscreen()
//         } else if (canvas.webkitFullscreenElement) {
//             canvas.webkitFullscreenElement()
//         }
//     } else {
//         if (document.exitFullscreen()) {
//             document.exitFullscreen()
//         } else if (document.webkitExitFullscreen()) {
//             document.webkitExitFullscreen()
//         }
//     }
// })

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enabled=false
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    //update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime
    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()