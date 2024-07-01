import * as BABYLON from '@babylonjs/core'

export class World {
    constructor(scene: BABYLON.Scene) {
        this.createWorld(scene)
    }
    private createWorld(scene: BABYLON.Scene) {
        //Create Village ground
        const groundMat = new BABYLON.StandardMaterial("groundMat");
        groundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/villagegreen.png");
        groundMat.diffuseTexture.hasAlpha = true;

        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 },scene);
        ground.material = groundMat;
        // 接收阴影
        ground.receiveShadows = true;
    }
}