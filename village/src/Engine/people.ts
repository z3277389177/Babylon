import * as BABYLON from '@babylonjs/core'
import * as loaders from '@babylonjs/loaders'
export class People {
    constructor(scene: BABYLON.Scene, shadowGenerator: BABYLON.ShadowGenerator) {
        this.createPeople(scene, shadowGenerator)
    }
    private createPeople(scene: BABYLON.Scene, shadowGenerator: BABYLON.ShadowGenerator) {

        // // This creates and initially positions a follow camera 	
        // const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(-6, 0, 0), scene);

        // //The goal distance of camera from target
        // camera.radius = 1;

        // // The goal height of camera above local oriin (centre) of target
        // camera.heightOffset = 8;

        // // The goal rotation of camera around local origin (centre) of target in x y plane
        // camera.rotationOffset = 0;

        // //Acceleration of camera in moving from current to goal position
        // camera.cameraAcceleration = 0.005

        // //The speed at which acceleration is halted 
        // camera.maxCameraSpeed = 1

        // //camera.target is set after the target's creation

        // // This attaches the camera to the canvas
        // camera.attachControl(true);



        // const camera = new BABYLON.ArcRotateCamera("camera", Math.PI / 2, Math.PI / 2.5, 150, new BABYLON.Vector3(0, 60, 0), scene);

        // camera.attachControl(true)
        // camera.upperBetaLimit = Math.PI / 2.2
        

        // 定义 Walk 接口
        interface Walk {
            turn: number
            dist: number
        }

        // 定义 walk 构造函数
        function createWalk(turn: number, dist: number): Walk {
            return { turn, dist }
        }

        // 创建 track 数组
        const track: Walk[] = []
        track.push(createWalk(86, -7))
        track.push(createWalk(-85, -14.8))
        track.push(createWalk(-93, -16.5))
        track.push(createWalk(48, -25.5))
        track.push(createWalk(-112, -30.5))
        track.push(createWalk(-72, -33.2))
        track.push(createWalk(42, -37.5))
        track.push(createWalk(-98, -45.2))
        track.push(createWalk(0, -47))

        // 导入网格到场景中
        BABYLON.SceneLoader.ImportMeshAsync("", "/models/", "dude.glb", scene).then((result) => {
            console.log(result)
            const dude = result.meshes[0]
            // camera.parent = dude
            // camera.lockedTarget = dude
            shadowGenerator.addShadowCaster(dude, true);
            // dude.scaling._isDirty = true
            // dude.rotation._isDirty = true
            // dude.position._isDirty = true
            console.log('dude.scaling :>> ', dude.scaling);
            dude.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)

            dude.position = new BABYLON.Vector3(-6, 0.01, 0)
            // 以y轴为中心,旋转-95度,以自身中心为中心
            dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(-95), BABYLON.Space.LOCAL)
            // 类用于存储四元数数据示例Playground -概述
            // 获取或设置旋转四元数属性:这是一个使用单位四元数定义节点旋转的四元数对象(默认情况下未定义，但可以为null)。如果设置了，那么只有rotationQuaternion被用来计算节点旋转(即。节点。旋转将被忽略)
            const startRotation: BABYLON.Quaternion = dude.rotationQuaternion!.clone()
            // 将启动给定目标的动画序列
            scene.beginAnimation(result.skeletons[0], 0, 100, true, 0.1)

            let distance: number = 0
            const step: number = -0.007
            let p: number = 0
            // 在渲染场景之前触发的事件(就在动画和物理之后)
            scene.onBeforeRenderObservable.add(() => {
                dude.movePOV(0, 0, step)
                distance += step

                if (distance < track[p].dist) {

                    dude.rotate(BABYLON.Axis.Y, BABYLON.Tools.ToRadians(track[p].turn), BABYLON.Space.LOCAL)
                    p += 1
                    p %= track.length
                    if (p === 0) {
                        distance = 0
                        dude.position = new BABYLON.Vector3(-6, 0, 0)
                        dude.rotationQuaternion = startRotation.clone()

                    }
                }
            })
        })
            .catch((error) => {
                // 处理加载失败的情况
                console.error("Error loading mesh:", error)
            });


    }
}