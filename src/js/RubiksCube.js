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

}