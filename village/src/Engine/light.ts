import * as BABYLON from '@babylonjs/core'

export class Light {

    constructor(scene: BABYLON.Scene, shadowGenerator: BABYLON.ShadowGenerator) {
        this.createLight(scene, shadowGenerator)
    }
    private createLight(scene: BABYLON.Scene, shadowGenerator: BABYLON.ShadowGenerator) {

        const lampLight = new BABYLON.SpotLight("lampLight", BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, -1, 0), Math.PI, 1, scene);
        lampLight.diffuse = BABYLON.Color3.Yellow();

        //shape to extrude
        const lampShape = [];
        for (let i = 0; i < 20; i++) {
            lampShape.push(new BABYLON.Vector3(Math.cos(i * Math.PI / 10), Math.sin(i * Math.PI / 10), 0));
        }
        lampShape.push(lampShape[0]); //close shape

        //extrusion path
        const lampPath = [];
        lampPath.push(new BABYLON.Vector3(0, 0, 0));
        lampPath.push(new BABYLON.Vector3(0, 10, 0));
        for (let i = 0; i < 20; i++) {
            lampPath.push(new BABYLON.Vector3(1 + Math.cos(Math.PI - i * Math.PI / 40), 10 + Math.sin(Math.PI - i * Math.PI / 40), 0));
        }
        lampPath.push(new BABYLON.Vector3(3, 11, 0));

        const yellowMat = new BABYLON.StandardMaterial("yellowMat");
        yellowMat.emissiveColor = BABYLON.Color3.Yellow();

        //extrude lamp
        const lamp = BABYLON.MeshBuilder.ExtrudeShape("lamp", { cap: BABYLON.Mesh.CAP_END, shape: lampShape, path: lampPath, scale: 0.5 });
        lamp.position = new BABYLON.Vector3(2, 0, 2);
        lamp.rotation = BABYLON.Vector3.Zero();
        lamp.rotation.y = -Math.PI / 4;

        
        //add bulb
        const bulb = BABYLON.MeshBuilder.CreateSphere("bulb", { diameterX: 1.5, diameterZ: 0.8 });

        bulb.material = yellowMat;
        bulb.parent = lamp;
        bulb.position.x = 2;
        bulb.position.y = 10.5;
        lamp.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1)

        lampLight.parent = bulb;

        const lamp3 = lamp.clone("lamp3");
        lamp3.position.z = -8;

        const lamp1 = lamp.clone("lamp1");
        lamp1.position.x = -8;
        lamp1.position.z = 1.2;
        lamp1.rotation.y = Math.PI / 2;

        const lamp2 = lamp1.clone("lamp2");
        lamp2.position.x = -2.7;
        lamp2.position.z = 0.8;
        lamp2.rotation.y = -Math.PI / 2;

        shadowGenerator.addShadowCaster(lamp, true);
        shadowGenerator.addShadowCaster(lamp1, true);
        shadowGenerator.addShadowCaster(lamp2, true);
        shadowGenerator.addShadowCaster(lamp3, true);

    }
}