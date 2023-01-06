/** 
 * 1.gltf loader
 * 2.draco loader
 * 3.scene.environment
 * 4.animation
 */
import './style.css'
import * as dat from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * init varites 
 */
let renderer, scene, camera, controls, clock;
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const canvas = document.querySelector('canvas.webgl')
let mixer;

init()
initEnv()
loadModal()


/**
 * fun
 */
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
function init() {
    //clock
    clock = new THREE.Clock()

    //renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })//抗锯齿
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height)
    renderer.outputEncoding = THREE.sRGBEncoding//定义渲染器的输出编码

    //camera
    camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(5, 2, 8)

    //scene
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xbfe3dd)
    scene.add(new THREE.AxesHelper(1))//模拟3个坐标轴

    //controls
    controls = new OrbitControls(camera, canvas)
    controls.target.set(0, 0.5, 0)//控制器的焦点
    controls.enableDamping = true//启用阻尼（惯性）

}
function initEnv() {
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.01).texture
}
function loadModal() {
    const gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load(
        'models/gltf/LittlestTokyo.glb',
        (gltf) => {
            // console.log(gltf);
            const model = gltf.scene
            scene.add(model)
            gltf.scene.traverse((child) => {
                if (child.isMesh) {

                }
            })
            model.position.set(1, 1, 0)
            model.scale.set(0.01, 0.01, 0.01)

            //animate
            mixer = new THREE.AnimationMixer(model);
            mixer.clipAction(gltf.animations[0]).play()

            animate()
        }
    )
}
function animate() {
    const delta = clock.getDelta()
    mixer.update(delta)

    controls.update()//更新控制器
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}