/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-11-09 10:15:15
 * @LastEditors: wanghexing
 * @LastEditTime: 2022-11-09 11:41:53
 */
import EventEmitter from "./EventEmitter"
export default class Sizes extends EventEmitter {
    constructor() {
        super()

        //Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        //Resize event
        window.addEventListener('resize', () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            this.trigger('resize')
        })
    }
}