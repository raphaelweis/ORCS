import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

const _90Degrees = Math.PI / 2;

export default class Face {
    geometry;
    material;
    mesh;

    faceID;
    direction;
    coordinates;

    rubiksCube;
    centerPiece;

    constructor(faceID, rubiksCube) {
        this.geometry = new THREE.PlaneGeometry(2.9, 2.9);
        this.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.mesh.visible = true;

        this.faceID = faceID;
        this.rubiksCube = rubiksCube;
        this.centerPiece = undefined;

        this.setFacePosition(faceID);
    }

    setFacePosition() {
        switch (this.faceID) {
            case "U":
                this.direction = new THREE.Vector3(0, 1, 0);
                this.coordinates = {x1: -1, x2: 1, y1: 1, y2: 1, z1: -1, z2: 1};

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "D":
                this.direction = new THREE.Vector3(0, -1, 0);
                this.coordinates = {x1: -1, x2: 1, y1: -1, y2: -1, z1: -1, z2: 1};

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "R":
                this.direction = new THREE.Vector3(1, 0, 0);
                this.coordinates = {x1: 1, x2: 1, y1: -1, y2: 1, z1: -1, z2: 1};

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "L":
                this.direction = new THREE.Vector3(-1, 0, 0);
                this.coordinates = {x1: -1, x2: -1, y1: -1, y2: 1, z1: -1, z2: 1};

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "F":
                this.direction = new THREE.Vector3(0, 0, 1);
                this.coordinates = {x1: -1, x2: 1, y1: -1, y2: 1, z1: 1, z2: 1};

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
            case "B":
                this.direction = new THREE.Vector3(0, 0, -1);
                this.coordinates = {x1: -1, x2: 1, y1: -1, y2: 1, z1: -1, z2: -1};

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 1);

                break;
        }
    }

    updateEdgePieces() {
        let edgesPiecesToRotate = [];

        this.rubiksCube.edgePieces.forEach((edgePiece) => {
            let isInFaceX = this.coordinates.x1 <= edgePiece.mesh.position.x && edgePiece.mesh.position.x <= this.coordinates.x2;
            let isInFaceY = this.coordinates.y1 <= edgePiece.mesh.position.y && edgePiece.mesh.position.y <= this.coordinates.y2;
            let isInFaceZ = this.coordinates.z1 <= edgePiece.mesh.position.z && edgePiece.mesh.position.z <= this.coordinates.z2;

            if (isInFaceX && isInFaceY && isInFaceZ) {
                edgesPiecesToRotate.push(edgePiece);
            }
        })
        return edgesPiecesToRotate;
    }

    updateCornerPieces() {
        let cornerPiecesToRotate = [];

        this.rubiksCube.cornerPieces.forEach((cornerPiece) => {
            let isInFaceX = this.coordinates.x1 <= cornerPiece.mesh.position.x && cornerPiece.mesh.position.x <= this.coordinates.x2;
            let isInFaceY = this.coordinates.y1 <= cornerPiece.mesh.position.y && cornerPiece.mesh.position.y <= this.coordinates.y2;
            let isInFaceZ = this.coordinates.z1 <= cornerPiece.mesh.position.z && cornerPiece.mesh.position.z <= this.coordinates.z2;

            if (isInFaceX && isInFaceY && isInFaceZ) {
                cornerPiecesToRotate.push(cornerPiece);
            }
        })
        return cornerPiecesToRotate;
    }

    #rotate(start, prev, end, edgePieces, cornerPieces) {
        this.rubiksCube.isAnimating = true;
        new TWEEN.Tween(start)
            .to(end, 100)
            .onUpdate(({rotation}) => {
                this.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                this.centerPiece.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                edgePieces.forEach((edgePiece) => {
                    edgePiece.mesh.position.applyAxisAngle(this.direction, rotation - prev.rotation);
                    edgePiece.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                })
                cornerPieces.forEach((cornerPiece)=> {
                    cornerPiece.mesh.position.applyAxisAngle(this.direction, rotation - prev.rotation);
                    cornerPiece.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                })

                prev.rotation = rotation;
            })
            .onComplete(() => {
                this.rubiksCube.isAnimating = false

                edgePieces.forEach((edgePiece) => {
                    edgePiece.mesh.position.set(
                        Math.round(edgePiece.mesh.position.x),
                        Math.round(edgePiece.mesh.position.y),
                        Math.round(edgePiece.mesh.position.z)
                    )
                })
                cornerPieces.forEach((cornerPiece) => {
                    cornerPiece.mesh.position.set(
                        Math.round(cornerPiece.mesh.position.x),
                        Math.round(cornerPiece.mesh.position.y),
                        Math.round(cornerPiece.mesh.position.z)
                    )
                })
            })
            .start();
    }

    rotateClockwise() {
        const start = {rotation: 0};
        const prev = {rotation: 0};
        const end = {rotation: -_90Degrees};
        const edgePiecesToRotate = this.updateEdgePieces();
        const cornerPiecesToRotate = this.updateCornerPieces();

        this.#rotate(start, prev, end, edgePiecesToRotate, cornerPiecesToRotate);
    }

    rotateCounterClockwise() {
        const start = {rotation: 0};
        const prev = {rotation: 0};
        const end = {rotation: _90Degrees};
        const edgePiecesToRotate = this.updateEdgePieces();
        const cornerPiecesToRotate = this.updateCornerPieces();

        this.#rotate(start, prev, end, edgePiecesToRotate, cornerPiecesToRotate);
    }
}