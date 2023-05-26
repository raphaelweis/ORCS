import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {CenterPiece} from "./Cublet";

const _90Degrees = Math.PI / 2;

export default class Face {
    geometry;
    material;
    mesh;

    faceID;
    direction;

    rubiksCube;
    centerPiece;
    edgePieces;

    constructor(faceID, rubiksCube) {
        this.geometry = new THREE.PlaneGeometry(2.9, 2.9);
        this.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.faceID = faceID;
        this.rubiksCube = rubiksCube;
        this.centerPiece = undefined;
        this.edgePieces = [];

        this.setFacePosition(faceID);
    }

    setFacePosition() {
        switch (this.faceID) {
            case "U":
                this.direction = new THREE.Vector3(0, 1, 0);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "D":
                this.direction = new THREE.Vector3(0, -1, 0);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "L":
                this.direction = new THREE.Vector3(-1, 0, 0);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "R":
                this.direction = new THREE.Vector3(1, 0, 0);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "F":
                this.direction = new THREE.Vector3(0, 0, 1);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "B":
                this.direction = new THREE.Vector3(0, 0, -1);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
        }
    }

    updateEdgePieces() {
        let edgePieces = this.rubiksCube.edgePieces;
        for (let i = 0; i < edgePieces.length; i++) {
            let isOnFaceVector = new THREE.Vector3().multiplyVectors(edgePieces[i].mesh.position, this.direction);
            if (isOnFaceVector.equals(this.mesh.position)) {
                this.edgePieces[i] = edgePieces[i];
            }
        }
    }

    #rotate(start, prev, end) {
        this.rubiksCube.isAnimating = true;
        new TWEEN.Tween(start)
            .to(end, 100)
            .onUpdate(({rotation}) => {
                this.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                this.centerPiece.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                this.edgePieces.forEach((edgePiece) => {
                    edgePiece.mesh.position.applyAxisAngle(this.direction, rotation - prev.rotation);
                    edgePiece.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                })
                prev.rotation = rotation;
            })
            .onComplete(() => {
                this.rubiksCube.isAnimating = false

                this.rubiksCube.edgePieces.forEach((edgePiece) => {
                    edgePiece.mesh.position.set(
                        Math.round(edgePiece.mesh.position.x),
                        Math.round(edgePiece.mesh.position.y),
                        Math.round(edgePiece.mesh.position.z)
                    )
                })

                this.rubiksCube.faces.forEach((face) => {
                    face.updateEdgePieces();
                })
            })
            .start();
    }

    rotateClockwise() {
        const start = {rotation: 0};
        const prev = {rotation: 0};
        const end = {rotation: -_90Degrees};

        this.#rotate(start, prev, end);
    }

    rotateCounterClockwise() {
        const start = {rotation: 0};
        const prev = {rotation: 0};
        const end = {rotation: _90Degrees};

        this.#rotate(start, prev, end);
    }
}