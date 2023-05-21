import * as TWEEN from '@tweenjs/tween.js'
import * as THREE from "three";

export class MainCublet {
    constructor(scene, camera, renderer) {
        this.scene = scene
        this.camera = camera;
        this.renderer = renderer;

        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.animating = false; // to prevent messing up the cube if pressing the keys too fast
    }

    addKeyboardControls(orbitControls) {
        document.onkeydown = (e) => {
            console.log(e);
            if (this.animating) {
                return;
            }
            const initialRotation = {
                x: this.mesh.rotation.x,
                y: this.mesh.rotation.y,
                z: this.mesh.rotation.z
            }
            const positiveRotation = {
                x: this.mesh.rotation.x + Math.PI / 2,
                y: this.mesh.rotation.y + Math.PI / 2,
                z: this.mesh.rotation.z + Math.PI / 2
            }
            const negativeRotation = {
                x: this.mesh.rotation.x - Math.PI / 2,
                y: this.mesh.rotation.y - Math.PI / 2,
                z: this.mesh.rotation.z - Math.PI / 2
            }
            switch (e.key) {
                case " ":
                    this.camera.position.set(0, 0, 10);
                    orbitControls.update();
                    break;
                case "u": // U
                    this.animateRotationY(initialRotation, negativeRotation);
                    break;
                case "U": // U'
                    this.animateRotationY(initialRotation, positiveRotation);
                    break;
                case "f": // F
                    this.animateRotationZ(initialRotation, positiveRotation);
                    break;
                case "F": // F'
                    this.animateRotationZ(initialRotation, negativeRotation);
                    break;
                case "d": // D
                    this.animateRotationY(initialRotation, positiveRotation);
                    break;
                case "D": // D'
                    this.animateRotationY(initialRotation, negativeRotation);
                    break;
                case "b": // B
                    this.animateRotationZ(initialRotation, negativeRotation);
                    break;
                case "B": // B'
                    this.animateRotationZ(initialRotation, positiveRotation);
                    break;
                case "l": // L
                    this.animateRotationX(initialRotation, negativeRotation);
                    break;
                case "L": // L'
                    this.animateRotationX(initialRotation, positiveRotation);
                    break;
                case "r": // R
                    this.animateRotationX(initialRotation, positiveRotation);
                    break;
                case "R": // R'
                    this.animateRotationX(initialRotation, negativeRotation);
                    break;
            }
        }
    }

    animateRotationX(initialRotation, targetRotation) {
        this.animating = true;
        new TWEEN.Tween(initialRotation)
            .to(targetRotation, 100)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(() => {
                this.mesh.rotation.x = initialRotation.x;
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