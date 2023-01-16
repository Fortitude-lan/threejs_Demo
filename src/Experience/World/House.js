/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-11-10 13:59:20
 * @LastEditors: wanghexing
 * @LastEditTime: 2023-01-08 01:21:33
 */
import * as THREE from 'three'
import Experience from '../Experience'
export default class Fox {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.textureLoader = new THREE.TextureLoader()
        this.pillowTexture = this.textureLoader.load('/textures/pillow.jpg')
        this.pillowTexture.flipY = false
        this.pillowTexture.encoding = THREE.sRGBEncoding
        this.pillowMaterial = new THREE.MeshBasicMaterial({ map: this.pillowTexture })
        //Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('house')
        }

        //Setup
        this.resources = this.resources.items.houseModel
        this.setModel()
        // this.setAnimation()
    }
    setModel() {
        this.model = this.resources.scene
        this.model.scale.set(2, 2, 2)
        const pillowAMesh = this.model.children.find(child => child.name === 'pillow')
        pillowAMesh.material = this.pillowMaterial
        console.log(this.model);

        this.scene.add(this.model)
        this.model.traverse(child => {
            // console.log(child);
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }
    setAnimation() {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resources.animations[0])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resources.animations[1])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resources.animations[2])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current
            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)
            this.animation.actions.current = newAction
        }
        //Debug
        if (this.debug.active) {
            const debugObject = {
                playIdle: () => this.animation.play('idle'),
                playWalking: () => this.animation.play('walking'),
                playRunning: () => this.animation.play('running'),
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playRunning')
        }
    }
    update() {
        this.animation.mixer.update(this.time.delta * 0.001)

    }
}