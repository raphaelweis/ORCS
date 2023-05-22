import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

import {MainCublet} from "./MainCublet";
import {Face} from "./Face";

export class RubiksCube {
    camera;
    mainCublet
    faceL;
    faceR;
    faceU;
    faceD;
    faceF;
    faceB;
    mainGroup;
    mesh;

    constructor(scene, camera, renderer, orbitControls) {
        this.camera = camera;
        this.mainCublet = new MainCublet(scene, renderer);

        this.faceL = new Face("L");
        this.faceR = new Face("R");
        this.faceU = new Face("U");
        this.faceD = new Face("D");
        this.faceF = new Face("F");
        this.faceB = new Face("B");

        this.mainGroup = new THREE.Group();

        this.mainGroup.add(this.faceL.mesh);
        this.mainGroup.add(this.faceR.mesh);
        this.mainGroup.add(this.faceU.mesh);
        this.mainGroup.add(this.faceD.mesh);
        this.mainGroup.add(this.faceF.mesh);
        this.mainGroup.add(this.faceB.mesh);

        this.mainGroup.add(this.mainCublet.mesh);
        this.mesh = this.mainGroup;
        this.addKeyboardControls(orbitControls);
    }

    #faceInitialRotation(face) {
        return {
            x: face.mesh.rotation.x,
            y: face.mesh.rotation.y,
            z: face.mesh.rotation.z
        }
    }
    #facePositiveRotation(face) {
        return {
            x: face.mesh.rotation.x + Math.PI / 2,
            y: face.mesh.rotation.y + Math.PI / 2,
            z: face.mesh.rotation.z + Math.PI / 2
        }
    }
    #faceNegativeRotation(face) {
        return {
            x: face.mesh.rotation.x - Math.PI / 2,
            y: face.mesh.rotation.y - Math.PI / 2,
            z: face.mesh.rotation.z - Math.PI / 2
        }
    }

    addKeyboardControls(orbitControls) {
        document.onkeydown = (e) => {
            console.log(e);
            if (this.animating) {
                return;
            }
            switch (e.key) {
                case " ":
                    this.camera.position.set(0, 0, 10);
                    orbitControls.update();
                    break;
                case "u": // U
                    this.animateRotationY(this.#faceInitialRotation(this.faceU), this.#faceNegativeRotation(this.faceU));
                    break;
                case "U": // U'
                    this.animateRotationY(this.#faceInitialRotation(this.faceU), this.#facePositiveRotation(this.faceU));
                    break;
                case "f": // F
                    this.animateRotationZ(this.#faceInitialRotation(this.faceF), this.#facePositiveRotation(this.faceF));
                    break;
                case "F": // F'
                    this.animateRotationZ(this.#faceInitialRotation(this.faceF), this.#faceNegativeRotation(this.faceF));
                    break;
                case "d": // D
                    this.animateRotationY(this.#faceInitialRotation(this.faceD), this.#facePositiveRotation(this.faceD));
                    break;
                case "D": // D'
                    this.animateRotationY(this.#faceInitialRotation(this.faceD), this.#faceNegativeRotation(this.faceD));
                    break;
                case "b": // B
                    this.animateRotationZ(this.#faceInitialRotation(this.faceB), this.#faceNegativeRotation(this.faceB));
                    break;
                case "B": // B'
                    this.animateRotationZ(this.#faceInitialRotation(this.faceB), this.#facePositiveRotation(this.faceB));
                    break;
                case "l": // L
                    this.animateRotation(this.#faceInitialRotation(this.faceL), this.#faceNegativeRotation(this.faceL), this.faceL);
                    break;
                case "L": // L'
                    this.animateRotation(this.#faceInitialRotation(this.faceL), this.#facePositiveRotation(this.faceL), this.faceL);
                    break;
                case "r": // R
                    this.animateRotation(this.#faceInitialRotation(this.faceR), this.#facePositiveRotation(this.faceR), this.faceR);
                    break;
                case "R": // R'
                    this.animateRotation(this.#faceInitialRotation(this.faceR), this.#faceNegativeRotation(this.faceR), this.faceR);
                    break;
            }
        }
    }

    animateRotation(initialRotation, targetRotation, face) {
        this.animating = true;
        new TWEEN.Tween(initialRotation)
            .to(targetRotation, 50)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                face.mesh.rotation.z = initialRotation.z;
            })
            .onComplete(() => {
                this.animating = false;
            })
            .start();
    }

    animateRotationY(initialRotation, targetRotation) {
        this.animating = true;
        new TWEEN.Tween(initialRotation)
            .to(targetRotation, 100)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this.mesh.rotation.y = initialRotation.y;
            })
            .onComplete(() => {
                this.animating = false;
            })
            .start();
    }

    animateRotationZ(initialRotation, targetRotation) {
        this.animating = true;
        new TWEEN.Tween(initialRotation)
            .to(targetRotation, 100)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this.mesh.rotation.z = initialRotation.z;
            })
            .onComplete(() => {
                this.animating = false;
            })
            .start();
    }
}