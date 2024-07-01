import * as BABYLON from '@babylonjs/core'

export class Skybox {
    constructor(scene: BABYLON.Scene) {
        this.createSky(scene)
    }
    private createSky(scene: BABYLON.Scene) {
        //Skybox
        const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
        const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skybox.material = skyboxMaterial;
    }
}
