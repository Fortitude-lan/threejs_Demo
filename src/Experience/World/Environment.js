/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-11-09 14:08:03
 * @LastEditors: wanghexing
 * @LastEditTime: 2023-01-06 17:52:31
 */
import * as THREE from 'three'
import Experience from "../Experience";
export default class Environment {
    constructor() {
        this.exprience = new Experience
        this.scene = this.exprience.scene
        this.resources = this.exprience.resources
        this.debug = this.exprience.debug

        //Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setSunLight()
        this.setEnvironmentMap()
    }
    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLightHelper = new THREE.DirectionalLightHelper(this.sunLight, 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        // this.sunLight.position.set(3.5, 2, - 1.25)
        this.sunLight.position.set(1,5,1)
        this.scene.add(this.sunLight)
        this.scene.add(this.sunLightHelper)

        //Debug
        if (this.debug.active) {
            this.debugFolder.add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0).max(10).step(0.01)

            this.debugFolder.add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(-5).max(5).step(0.01)

            this.debugFolder.add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(-5).max(5).step(0.01)

            this.debugFolder.add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(-5).max(5).step(0.01)
        }

    }
    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding


        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterial = () => {
            this.scene.traverse(child => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterial()
        //Debug
        if (this.debug.active) {
            this.debugFolder.add(this.environmentMap, 'intensity')
                .name('environmentMapIntensity')
                .min(0).max(4).step(0.01)
                .onChange(this.environmentMap.updateMaterial)
        }
    }
}