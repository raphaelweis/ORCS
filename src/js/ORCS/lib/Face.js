import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {CenterPiece} from "./Cublet";

const _90Degrees = Math.PI / 2;

export default class Face {
    geometry;
    material;
    mesh;
    plane;

    faceID;
    direction;

    rubiksCube;
    centerPiece;
    adjacentFaces;
    edgePieces;
    cornerPieces;

    faceGroup;

    constructor(faceID, rubiksCube) {
        this.geometry = new THREE.PlaneGeometry(2.9, 2.9);
        this.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.visible = false;

        this.faceID = faceID;

        this.adjacentFaces = [];
        this.edgePieces = [];
        this.cornerPieces = [];
        this.rubiksCube = rubiksCube;

        this.setFacePosition(faceID);
        this.plane = new THREE.Plane(this.direction, 1);

        this.centerPiece = new CenterPiece(this.rubiksCube, this);

        this.faceGroup = new THREE.Group();
        this.faceGroup.add(this.mesh);
        this.faceGroup.add(this.centerPiece.mesh);
    }

    setFacePosition() {
        switch (this.faceID) {
            case "U":
                this.direction = new THREE.Vector3(0, 1, 0);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 100);

                break;
            case "D":
                this.direction = new THREE.Vector3(0, -1, 0);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 100);

                break;
            case "L":
                this.direction = new THREE.Vector3(-1, 0, 0);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 100);

                break;
            case "R":
                this.direction = new THREE.Vector3(1, 0, 0);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 100);

                break;
            case "F":
                this.direction = new THREE.Vector3(0, 0, 1);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 100);

                break;
            case "B":
                this.direction = new THREE.Vector3(0, 0, -1);

                this.mesh.lookAt(this.direction);
                this.mesh.position.addScaledVector(this.direction, 100);

                break;
        }
    }

    updateEdgePieces() {
        this.edgePieces.length = 0;
        this.rubiksCube.edgePieces.forEach((edgePiece) => {
            edgePiece.faces.forEach((face) => {
                if (face === this) {
                    console.log("found a piece match")
                    this.edgePieces.push(edgePiece);
                }
            })
        })
    }

    updateCornerPieces() {
        this.cornerPieces.length = 0;
        this.rubiksCube.cornerPieces.forEach((cornerPiece) => {
            cornerPiece.faces.forEach((face) => {
                if (face === this) {
                    console.log("found a piece match")
                    this.cornerPieces.push(cornerPiece);
                }
            })
        })
    }

    #rotate(start, prev, end) {
        this.rubiksCube.isAnimating = true;
        new TWEEN.Tween(start)
            .to(end, 100)
            .onUpdate(({rotation}) => {
                this.faceGroup.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                // for each piece apply the correct angle relative to the corresponding world axis then rotate around said axis
                this.edgePieces.forEach((edgePiece) => {
                    edgePiece.mesh.position.applyAxisAngle(this.direction, rotation - prev.rotation);
                    edgePiece.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                })
                this.cornerPieces.forEach((cornerPiece) => {
                    cornerPiece.mesh.position.applyAxisAngle(this.direction, rotation - prev.rotation);
                    cornerPiece.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                })
                prev.rotation = rotation;
            })
            .onComplete(() => {
                this.rubiksCube.isAnimating = false

                //The TWEEN result will cause rounding errors, so we make sure that the numbers are what they should be
                this.edgePieces.forEach((edgePiece) => {
                    let positionX = edgePiece.mesh.position.x;
                    let positionY = edgePiece.mesh.position.y;
                    let positionZ = edgePiece.mesh.position.z;

                    edgePiece.mesh.position.x = Math.round(positionX);
                    edgePiece.mesh.position.y = Math.round(positionY);
                    edgePiece.mesh.position.z = Math.round(positionZ);
                })
                this.cornerPieces.forEach((cornerPiece) => {
                    let positionX = cornerPiece.mesh.position.x;
                    let positionY = cornerPiece.mesh.position.y;
                    let positionZ = cornerPiece.mesh.position.z;

                    cornerPiece.mesh.position.x = Math.round(positionX);
                    cornerPiece.mesh.position.y = Math.round(positionY);
                    cornerPiece.mesh.position.z = Math.round(positionZ);
                })

                this.rubiksCube.edgePieces.forEach((edgePiece) => {
                    edgePiece.updateFaces();
                });
                this.rubiksCube.cornerPieces.forEach((cornerPiece) => {
                    cornerPiece.updateFaces();
                })
                this.rubiksCube.faces.forEach((face) => {
                    face.updateEdgePieces();
                    face.updateCornerPieces();
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