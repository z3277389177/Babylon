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

        const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 24, height: 24 },scene);
        ground.material = groundMat;
        // 接收阴影
        ground.receiveShadows = true;

        //large ground
        const largeGroundMat = new BABYLON.StandardMaterial("largeGroundMat");
        largeGroundMat.diffuseTexture = new BABYLON.Texture("https://assets.babylonjs.com/environments/valleygrass.png");

        const largeGround = BABYLON.MeshBuilder.CreateGroundFromHeightMap("largeGround", "https://assets.babylonjs.com/environments/villageheightmap.png", { width: 150, height: 150, subdivisions: 20, minHeight: 0, maxHeight: 10 },scene);
        largeGround.material = largeGroundMat;
        largeGround.position.y = -0.01;
    }
}