import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from "three";

export default class MainCublet {
    constructor() {
        this.geometry = new THREE.BoxGeometry(100, 100, 100);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}