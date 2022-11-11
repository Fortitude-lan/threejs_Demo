/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-11-09 11:37:40
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-11-10 14:27:53
 */
import * as THREE from 'three'
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

export default class World {
    constructor(_options) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setDummy()

        this.resources.on('ready', () => {
            //Setup
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    setDummy() {

    }

    resize() {
    }

    update() {
        if (this.fox)
            this.fox.update()
    }

    destroy() {
    }
}