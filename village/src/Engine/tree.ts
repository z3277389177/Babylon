import * as BABYLON from '@babylonjs/core'

export class Tree {
    constructor(scene: BABYLON.Scene) {
        this.createTree(scene)
    }
    private createTree(scene: BABYLON.Scene) {
        const spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "textures/palmtree.png", 2000, { width: 512, height: 1024 }, scene);

        //We create trees at random positions
        for (let i = 0; i < 500; i++) {
            const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
            tree.position.x = Math.random() * (-30);
            tree.position.z = Math.random() * 20 + 8;
            tree.position.y = 0.5;
        }
        for (let i = 0; i < 500; i++) {
            const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
            tree.position.x = Math.random() * (30);
            tree.position.z = Math.random() * 20 + 8;
            tree.position.y = 0.5;
        }

        for (let i = 0; i < 500; i++) {
            const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
            tree.position.x = Math.random() * (25) + 7;
            tree.position.z = Math.random() * -35 + 8;
            tree.position.y = 0.5;
        }
    }
}
