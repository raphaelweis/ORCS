import * as THREE from "three";

export class Face {
    constructor(faceID) {
        this.geometry = new THREE.PlaneGeometry(3, 3);
        this.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.#identifyFaceID(faceID);
    }

    #identifyFaceID(faceID) {
        switch (faceID) {
            case "L":
                this.mesh.rotation.set(0, Math.PI / 2, 0);
                this.mesh.position.set(-0.5, 0, 0);
                break;
            case "R":
                this.mesh.rotation.set(0, Math.PI / 2, 0);
                this.mesh.position.set(0.5, 0, 0);
                break;
            case "U":
                this.mesh.rotation.set(Math.PI / 2, 0, 0);
                this.mesh.position.set(0, 0.5, 0);
                break;
            case "D":
                this.mesh.rotation.set(Math.PI / 2, 0, 0);
                this.mesh.position.set(0, -0.5, 0);
                break;
            case "F":
                this.mesh.rotation.set(0, 0, Math.PI / 2);
                this.mesh.position.set(0, 0, 0.5);
                break;
            case "B":
                this.mesh.rotation.set(0, 0, Math.PI / 2);
                this.mesh.position.set(0, 0, -0.5);
                break;
        }
    }
}