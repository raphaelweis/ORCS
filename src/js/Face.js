import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

const _90Degrees = Math.PI / 2;

export class Face {
    geometry;
    material;
    mesh;
    rubiksCube;
    #faceAxis;
    #initialPosition;
    #initialRotation;

    constructor(faceID, rubiksCube) {
        this.geometry = new THREE.BoxGeometry(3, 3, 0.05);
        this.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.rubiksCube = rubiksCube;
        this.#positionFace(faceID);
    }

    #positionFace(faceID) {
        switch (faceID) {
            case "U":
                this.#initialRotation = [_90Degrees, 0, 0];
                this.#initialPosition = [0, 0.5, 0];
                this.#faceAxis = "y";
                this.reset();
                break;
            case "D":
                this.#initialRotation = [_90Degrees, 0, 0];
                this.#initialPosition = [0, -0.5, 0];
                this.#faceAxis = "y";
                this.reset();
                break;
            case "L":
                this.#initialRotation = [0, _90Degrees, 0];
                this.#initialPosition = [-0.5, 0, 0];
                this.#faceAxis = "x";
                this.reset();
                break;
            case "R":
                this.#initialRotation = [0, _90Degrees, 0];
                this.#initialPosition = [0.5, 0, 0];
                this.#faceAxis = "x";
                this.reset();
                break;
            case "F":
                this.#initialRotation = [0, 0, 0];
                this.#initialPosition = [0, 0, 0.5];
                this.#faceAxis = "y";
                this.reset();
                break;
            case "B":
                this.#initialRotation = [0, 0, 0];
                this.#initialPosition = [0, 0, -0.5];
                this.#faceAxis = "y";
                this.reset();
                break;
        }
    }

    reset() {
        this.mesh.position.set(this.#initialPosition[0], this.#initialPosition[1], this.#initialPosition[2]);
        this.mesh.rotation.set(this.#initialRotation[0], this.#initialRotation[1], this.#initialRotation[2]);
    }

    rotateClockwise() {
        this.rubiksCube.isAnimating = true;
        let targetPosition;
        switch (this.#faceAxis) {
            case "x":
                targetPosition = {x: this.mesh.rotation.x + Math.PI / 2};
                break;
            case "y":
                targetPosition = {z: this.mesh.rotation.z + Math.PI / 2};
                break;
            case "z":
                targetPosition = {y: this.mesh.rotation.y + Math.PI / 2};
                break;
        }
        new TWEEN.Tween(this.mesh.rotation)
            .to(targetPosition, 100)
            .onComplete(() => {
                this.rubiksCube.isAnimating = false;
            })
            .start();
    }

    rotateCounterClockwise() {
        this.rubiksCube.isAnimating = true;
        let targetPosition;
        switch (this.#faceAxis) {
            case "x":
                targetPosition = {x: this.mesh.rotation.x - Math.PI / 2};
                break;
            case "y":
                targetPosition = {z: this.mesh.rotation.z - Math.PI / 2};
                break;
            case "z":
                targetPosition = {y: this.mesh.rotation.y - Math.PI / 2};
                break;
        }
        new TWEEN.Tween(this.mesh.rotation)
            .to(targetPosition, 100)
            .onComplete(() => {
                this.rubiksCube.isAnimating = false;
            })
            .start();
    }
}