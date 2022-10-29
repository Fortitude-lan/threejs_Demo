import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
let camera, scene, renderer, controls;
// Debug
const gui = new dat.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

initScene()
initGeomery()
initLights()
initCamera()
initRenderer()
window.addEventListener('resize', onWindowResize)
tick()




function initScene() {
    scene = new THREE.Scene()

    const fog = new THREE.Fog('#262837', 2, 15)
    scene.fog = fog
}
function initCamera() {
    // Base camera
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(4, 2, 5)
    scene.add(camera)

    // Controls
    controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
}
function initGeomery() {
    //texture
    const textureLoader = new THREE.TextureLoader()
    const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
    const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
    const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
    const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
    const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
    const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
    const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
    //Group: house
    const house = new THREE.Group()
    scene.add(house)

    //obj sizes
    const wallsSize = [4, 2.5, 4]
    const roofSize = [3.5, 1, 4]
    const doorSize = [2, 2,100,100]
    const bushSize = [1, 16, 16]
    const walls = new THREE.Mesh(
        new THREE.BoxGeometry(...wallsSize),
        new THREE.MeshStandardMaterial({ color: '#ac8e82' })
    )
    walls.position.y = wallsSize[1] / 2
    house.add(walls)
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(...roofSize),
        new THREE.MeshStandardMaterial({ color: "#b35f45" })
    )
    roof.position.y = roofSize[1] / 2 + wallsSize[1]
    roof.rotation.y = Math.PI * (1 / roofSize[2])
    house.add(roof)
    const door = new THREE.Mesh(
        new THREE.PlaneGeometry(...doorSize),
        new THREE.MeshStandardMaterial({
            map: doorColorTexture,
            transparent:true,
            alphaMap:doorAlphaTexture,
            aoMap:doorAmbientOcclusionTexture,
            displacementMap:doorHeightTexture,
            displacementScale:0.1,

        })
    )
    door.geometry.setAttribute(
        'uv2',
        new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
    )
    door.position.y = doorSize[1] / 2
    door.position.z = wallsSize[0] / 2 + 0.01
    house.add(door)
    const bushGeo = new THREE.SphereGeometry(...bushSize)
    const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" })
    const bush1 = new THREE.Mesh(bushGeo, bushMaterial)
    bush1.scale.set(0.5, 0.5, 0.5)
    bush1.position.set(bushSize[0] * 1.3, 0.2, wallsSize[0] * 0.8)

    const bush2 = new THREE.Mesh(bushGeo, bushMaterial)
    bush2.scale.set(0.25, 0.25, 0.25)
    bush2.position.set(bush1.position.x + 0.7, bush1.position.y / 2, bush1.position.z)

    const bush3 = new THREE.Mesh(bushGeo, bushMaterial)
    bush3.scale.set(0.34, 0.34, 0.34)
    bush3.position.set(-bushSize[0] * 1.3, 0.2, wallsSize[0] * 0.8)

    const bush4 = new THREE.Mesh(bushGeo, bushMaterial)
    bush4.scale.set(0.25, 0.25, 0.25)
    bush4.position.set(bush3.position.x - 0.5, bush3.position.y / 2, bush3.position.z)
    house.add(bush1, bush2, bush3, bush4)
    //Group: graves
    const graves = new THREE.Group()
    scene.add(graves)

    //size
    const graveSize = [0.6, 0.8, 0.2]
    const graveGeo = new THREE.BoxGeometry(...graveSize)
    const gravesMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" })
    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = 3 + Math.random() * 6
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        const grave = new THREE.Mesh(graveGeo, gravesMaterial)
        grave.position.set(x, graveSize[1] / 2.3, z)
        grave.rotation.y = (Math.random() - 0.5) * 4
        grave.rotation.z = (Math.random() - 0.5) * 4
        graves.add(grave)
    }


    // Temporary sphere
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshStandardMaterial({ roughness: 0.7 })
    )
    sphere.position.y = 1
    // scene.add(sphere)


    // Floor
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshStandardMaterial({ color: '#a9c388' })
    )
    floor.rotation.x = - Math.PI * 0.5
    floor.position.y = 0
    scene.add(floor)

}
function initLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
    gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
    scene.add(ambientLight)

    // Directional light
    const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
    moonLight.position.set(4, 5, - 2)
    gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
    gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
    gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
    gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
    scene.add(moonLight)

    const dorrLight = new THREE.PointLight('#ff7d46', 1, 7)
    dorrLight.position.set(0, 2.2, 2.7)
    scene.add(dorrLight)
}
function onWindowResize() {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
function initRenderer() {
    renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor('#262837')
}
function tick() {
    const clock = new THREE.Clock()
    const elapsedTime = clock.getElapsedTime()
    // Update controls
    controls.update()
    // Render
    renderer.render(scene, camera)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}