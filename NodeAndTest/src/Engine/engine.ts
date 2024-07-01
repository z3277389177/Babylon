import * as BABYLON from '@babylonjs/core';
import * as GUI from '@babylonjs/gui';
import { World } from './world';
import { Skybox } from './skybox';
import { Animation } from './animation';


export class Engine {
    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;
    private shadowGenerator: BABYLON.ShadowGenerator | undefined;
    constructor(canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas, true);
        this.scene = this.createScene();

        // 渲染循环
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });

        // 监听窗口大小变化
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    private createScene(): BABYLON.Scene {
        const scene = new BABYLON.Scene(this.engine);

        // 创建相机
        const camera = new BABYLON.ArcRotateCamera('arcCamera', -Math.PI / 18, Math.PI / 3, 15, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(true);
        camera.upperBetaLimit = Math.PI / 2.2;

        const light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -1, 1), scene);
        light.position = new BABYLON.Vector3(0, 15, -20);

        // GUI
        const adt = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        const panel = new GUI.StackPanel();
        panel.width = "220px";
        panel.top = "-25px";
        panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        adt.addControl(panel);

        const header = new GUI.TextBlock();
        header.text = "Night to Day";
        header.height = "30px";
        header.color = "white";
        panel.addControl(header);

        const slider = new GUI.Slider();
        slider.minimum = 0;
        slider.maximum = 1;
        slider.borderColor = "black";
        slider.color = "gray";
        slider.background = "white";
        slider.value = 1;
        slider.height = "20px";
        slider.width = "200px";
        slider.onValueChangedObservable.add((value: number) => {
            if (light) {
                light.intensity = value;
            }
        });
        panel.addControl(slider);

        // Shadow generator
        this.shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        new World(scene);
        new Skybox(scene);
        new Animation(scene);

        return scene;
    }

    public dispose() {
        this.engine.dispose();
    }
}