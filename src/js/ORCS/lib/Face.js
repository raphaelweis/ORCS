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
    adjacentFaces;
    edgePieces;
    cornerPieces;

    faceGroup;

    #initialPosition;
    #initialRotation;

    constructor(faceID, rubiksCube) {
        this.geometry = new THREE.PlaneGeometry(300, 300);
        this.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.visible = false;

        this.faceID = faceID;

        this.#positionFace(faceID);

        this.rubiksCube = rubiksCube;
        this.centerPiece = new CenterPiece(this.rubiksCube, this);
        this.adjacentFaces = [];
        this.edgePieces = [];
        this.cornerPieces = [];

        this.faceGroup = new THREE.Group();
        this.faceGroup.add(this.mesh);
        this.faceGroup.add(this.centerPiece.mesh);
    }

    #positionFace() {
        switch (this.faceID) {
            case "U":
                this.#initialRotation = [_90Degrees, 0, 0];
                this.#initialPosition = [0, 50, 0];
                this.direction = new THREE.Vector3(0, 1, 0);
                this.reset();
                break;
            case "D":
                this.#initialRotation = [_90Degrees, 0, 0];
                this.#initialPosition = [0, -50, 0];
                this.direction = new THREE.Vector3(0, -1, 0);
                this.reset();
                break;
            case "L":
                this.#initialRotation = [0, _90Degrees, 0];
                this.#initialPosition = [-50, 0, 0];
                this.direction = new THREE.Vector3(-1, 0, 0);
                this.reset();
                break;
            case "R":
                this.#initialRotation = [0, _90Degrees, 0];
                this.#initialPosition = [50, 0, 0];
                this.direction = new THREE.Vector3(1, 0, 0);
                this.reset();
                break;
            case "F":
                this.#initialRotation = [0, 0, 0];
                this.#initialPosition = [0, 0, 50];
                this.direction = new THREE.Vector3(0, 0, 1);
                this.reset();
                break;
            case "B":
                this.#initialRotation = [0, 0, 0];
                this.#initialPosition = [0, 0, -50];
                this.direction = new THREE.Vector3(0, 0, -1);
                this.reset();
                break;
        }
    }

    findAdjacentFaces() {
        switch (this.faceID) {
            case "U":
                this.adjacentFaces.push(this.rubiksCube.faceB, this.rubiksCube.faceR, this.rubiksCube.faceF, this.rubiksCube.faceL);
                break;
            case "D":
                this.adjacentFaces.push(this.rubiksCube.faceB, this.rubiksCube.faceR, this.rubiksCube.faceF, this.rubiksCube.faceL);
                break;
            case "L":
                this.adjacentFaces.push(this.rubiksCube.faceU, this.rubiksCube.faceF, this.rubiksCube.faceD, this.rubiksCube.faceB);
                break;
            case "R":
                this.adjacentFaces.push(this.rubiksCube.faceU, this.rubiksCube.faceF, this.rubiksCube.faceD, this.rubiksCube.faceB);
                break;
            case "F":
                this.adjacentFaces.push(this.rubiksCube.faceU, this.rubiksCube.faceR, this.rubiksCube.faceD, this.rubiksCube.faceL);
                break;
            case "B":
                this.adjacentFaces.push(this.rubiksCube.faceU, this.rubiksCube.faceR, this.rubiksCube.faceD, this.rubiksCube.faceL);
                break;
        }
    }

    reset() {
        this.mesh.position.set(this.#initialPosition[0], this.#initialPosition[1], this.#initialPosition[2]);
        this.mesh.rotation.set(this.#initialRotation[0], this.#initialRotation[1], this.#initialRotation[2]);
    }

    updatePieces() {
        /*
        To update the face pieces, we know that:
            - The face that rotated will not see any change in the pieces it's carrying
            - each adjacent face to the face that rotated will have 1 new edge piece, and 2 new corner pieces
            - for the new edge piece, it will be the piece that:
                - was on the face that just rotated
                - was on the adjacent face that was on the PREVIOUS position in the adjacent face list for the face that rotated
            - for the 2 new corner pieces, the rules are the same, but for 2 pieces instead of 1;
        Each face has 4 adjacent faces. For a given face turn, it boils down to this:
            - each adjacent face will receive 3 new pieces, which are going to replace the 3 pieces that went to the next face.
            - We can use a Circular Singly Linked List to shift every group of 3 pieces to the next adjacent face
         */
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
                this.updatePieces();
            })
            .start();
    }

    rotateClockwise() {
        const start = {rotation: 0};
        const prev = {rotation: 0};
        const end = {rotation: _90Degrees};

        this.#rotate(start, prev, end);
    }

    rotateCounterClockwise() {
        const start = {rotation: 0};
        const prev = {rotation: 0};
        const end = {rotation: -_90Degrees};

        this.#rotate(start, prev, end);
    }
}