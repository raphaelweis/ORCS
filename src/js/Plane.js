import * as THREE from "three";

export class Plane {
    constructor(mainCublet) {
        this.geometry = new THREE.PlaneGeometry(3, 3);
        this.material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mainCublet = mainCublet;
    }

    createLeftFace();
    createRightFace();
    createUpFace();
    createDownFace();
    createFrontFace();
    createBackFace();
}