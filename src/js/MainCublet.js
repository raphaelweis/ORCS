import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from "three";

export class MainCublet {
    constructor(scene, renderer) {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}