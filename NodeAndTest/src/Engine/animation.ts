import * as BABYLON from '@babylonjs/core'

export class Animation {
    constructor(scene: BABYLON.Scene) {
        this.createAnimation(scene)
    }
    private createAnimation(scene: BABYLON.Scene) {
        const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene)
        const frameRate = 10;

        const xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        const keyFrames = [];

        keyFrames.push({
            frame: 0,
            value: 2,
        });

        keyFrames.push({
            frame: frameRate,
            value: -2,
        });

        keyFrames.push({
            frame: 2 * frameRate,
            value: 2,
        });

        xSlide.setKeys(keyFrames);
        box.animations.push(xSlide);
        // 定义动画目标序列（目标，起始帧，结束帧，是否循环，运行速度（默认 1.0），动画结束时要执行的函数）
        scene.beginAnimation(box, 0, 2 * frameRate, true);
    }
}