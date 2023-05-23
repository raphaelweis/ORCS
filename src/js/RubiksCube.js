import * as THREE from "three";

import {MainCublet} from "./MainCublet";
import {Face} from "./Face";

export class RubiksCube {
    camera;
    mainCublet
    isAnimating;
    faceU;
    faceD;
    faceL;
    faceR;
    faceF;
    faceB;
    mainGroup;
    mesh;

    constructor(scene, camera, renderer, orbitControls) {
        this.camera = camera;
        this.mainCublet = new MainCublet(scene, renderer);
        this.isAnimating = false;

        this.faceU = new Face("U", this);
        this.faceD = new Face("D", this);
        this.faceL = new Face("L", this);
        this.faceR = new Face("R", this);
        this.faceF = new Face("F", this);
        this.faceB = new Face("B", this);

        this.mainGroup = new THREE.Group();

        this.mainGroup.add(this.faceU.mesh);
        this.mainGroup.add(this.faceD.mesh);
        this.mainGroup.add(this.faceL.mesh);
        this.mainGroup.add(this.faceR.mesh);
        this.mainGroup.add(this.faceF.mesh);
        this.mainGroup.add(this.faceB.mesh);

        this.mainGroup.add(this.mainCublet.mesh);

        this.mesh = this.mainGroup;

        this.addKeyboardControls(orbitControls);
    }

    addKeyboardControls(orbitControls) {
        document.onkeydown = (e) => {
            if (this.isAnimating) {
                return;
            }
            switch (e.key) {
                case " ":
                    this.camera.position.set(0, 0, 10);
                    this.reset();
                    orbitControls.update();
                    break;
                case "u": // U
                    this.faceU.rotateClockwise();
                    break;
                case "U": // U'
                    this.faceU.rotateCounterClockwise();
                    break;
                case "f": // F
                    this.faceF.rotateCounterClockwise();
                    break;
                case "F": // F'
                    this.faceF.rotateClockwise();
                    break;
                case "d": // D
                    this.faceD.rotateCounterClockwise();
                    break;
                case "D": // D'
                    this.faceD.rotateClockwise();
                    break;
                case "b": // B
                    this.faceB.rotateClockwise();
                    break;
                case "B": // B'
                    this.faceB.rotateCounterClockwise();
                    break;
                case "l": // L
                    this.faceL.rotateClockwise();
                    break;
                case "L": // L'
                    this.faceL.rotateCounterClockwise();
                    break;
                case "r": // R
                    this.faceR.rotateCounterClockwise();
                    break;
                case "R": // R'
                    this.faceR.rotateClockwise();
                    break;
            }
        }
    }

    reset() {
        this.faceU.reset();
        this.faceD.reset();
        this.faceL.reset();
        this.faceR.reset();
        this.faceF.reset();
        this.faceB.reset();
    }
}