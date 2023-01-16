/*
 * @Description: 
 * @Author: wanghexing
 * @Date: 2022-11-10 12:37:37
 * @LastEditors: wanghexing
 * @LastEditTime: 2023-01-08 13:30:52
 */
export default [
    {
        name: 'environmentMapTexture',
        type: "cubeTexture",
        path: [
            'textures/environmentMaps/0/px.jpg',
            'textures/environmentMaps/0/nx.jpg',
            'textures/environmentMaps/0/py.jpg',
            'textures/environmentMaps/0/ny.jpg',
            'textures/environmentMaps/0/pz.jpg',
            'textures/environmentMaps/0/nz.jpg',
        ]
    },
    {
        name: 'grassColorTexture',
        type: "texture",
        path: 'textures/dirt/color.jpg',
    },
    {
        name: 'grassNormalTexture',
        type: "texture",
        path: 'textures/dirt/normal.jpg',
    },
    {
        name: 'foxModel',
        type: "gltfModel",
        path: 'models/Fox/glTF-Fox/Fox.gltf',
    },
    {
        name: 'houseModel',
        type: "glbModel",
        path: 'models/cake.glb',

    }
]
