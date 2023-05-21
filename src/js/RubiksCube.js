import {MainCublet} from "./MainCublet";
import * as THREE from "three";

export class RubiksCube {
    constructor(scene, camera, renderer, orbitControls) {
        this.mainCublet = new MainCublet(scene, camera, renderer);
        this.mainCublet.addKeyboardControls(orbitControls);

        let group = new THREE.Group();
        group.add(this.mainCublet.mesh);
        group.add(this.#addPlaneX());
        this.mesh = group;
    }

    #addPlaneX() {
        const geometry = new THREE.PlaneGeometry(3, 3);
        const material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
        const plane = new THREE.Mesh(geometry, material);

        let plane1 = plane.clone();
        let plane2 = plane.clone();
        let plane3 = plane.clone();
        let plane4 = plane.clone();
        let plane5 = plane.clone();
        let plane6 = plane.clone();

        plane1.position.set(0, 0, 0);
        return plane1;

    }
}