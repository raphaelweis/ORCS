import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import {CenterPiece} from "./Cublet";

const _90Degrees = Math.PI / 2;

export default class Face {
    geometry;
    material;
    mesh;
    boudingBox;
    plane;

    faceID;
    rotationID;
    direction;

    rubiksCube;
    centerPiece;
    adjacentFaces;
    edgePieces;
    cornerPieces;

    faceGroup;

    constructor(faceID, rubiksCube) {
        this.geometry = new THREE.PlaneGeometry(290, 290);
        this.material = new THREE.MeshBasicMaterial({color: 0x000000, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.boudingBox = new THREE.Box3().setFromObject(this.mesh);
        this.mesh.visible = true;

        this.faceID = faceID;

        this.adjacentFaces = [];
        this.edgePieces = [];
        this.cornerPieces = [];
        this.rubiksCube = rubiksCube;

        this.setFacePosition(faceID);
        this.plane = new THREE.Plane(this.direction, 100);

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

    setAdjacentFaces() {
        switch (this.faceID) {
            case "U":
                this.adjacentFaces.push(
                    this.rubiksCube.faceB,
                    this.rubiksCube.faceR,
                    this.rubiksCube.faceF,
                    this.rubiksCube.faceL
                );
                this.rotationID = 0;

                break;
            case "D":
                this.adjacentFaces.push(
                    this.rubiksCube.faceB,
                    this.rubiksCube.faceR,
                    this.rubiksCube.faceF,
                    this.rubiksCube.faceL
                );
                this.rotationID = 2;

                break;
            case "L":
                this.adjacentFaces.push(
                    this.rubiksCube.faceU,
                    this.rubiksCube.faceF,
                    this.rubiksCube.faceD,
                    this.rubiksCube.faceB
                );
                this.rotationID = 3;

                break;
            case "R":
                this.adjacentFaces.push(
                    this.rubiksCube.faceU,
                    this.rubiksCube.faceB,
                    this.rubiksCube.faceD,
                    this.rubiksCube.faceF
                );
                this.rotationID = 1;

                break;
            case "F":
                this.adjacentFaces.push(
                    this.rubiksCube.faceU,
                    this.rubiksCube.faceR,
                    this.rubiksCube.faceD,
                    this.rubiksCube.faceL
                );
                this.rotationID = 2;

                break;
            case "B":
                this.adjacentFaces.push(
                    this.rubiksCube.faceU,
                    this.rubiksCube.faceL,
                    this.rubiksCube.faceD,
                    this.rubiksCube.faceR,
                );
                this.rotationID = 0;

                break;
        }
    }

    setEdgePieces() {
        switch (this.faceID) {
            case "U":
                this.edgePieces.push(
                    this.rubiksCube.edgePieces.get("UB"),
                    this.rubiksCube.edgePieces.get("UR"),
                    this.rubiksCube.edgePieces.get("UF"),
                    this.rubiksCube.edgePieces.get("UL"),
                );
                break;
            case "D":
                this.edgePieces.push(
                    this.rubiksCube.edgePieces.get("DB"),
                    this.rubiksCube.edgePieces.get("DR"),
                    this.rubiksCube.edgePieces.get("DF"),
                    this.rubiksCube.edgePieces.get("DL"),
                );

                break;
            case "L":
                this.edgePieces.push(
                    this.rubiksCube.edgePieces.get("UL"),
                    this.rubiksCube.edgePieces.get("FL"),
                    this.rubiksCube.edgePieces.get("DL"),
                    this.rubiksCube.edgePieces.get("LB"),
                );

                break;
            case "R":
                this.edgePieces.push(
                    this.rubiksCube.edgePieces.get("UR"),
                    this.rubiksCube.edgePieces.get("BR"),
                    this.rubiksCube.edgePieces.get("DR"),
                    this.rubiksCube.edgePieces.get("RF"),
                );

                break;
            case "F":
                this.edgePieces.push(
                    this.rubiksCube.edgePieces.get("UF"),
                    this.rubiksCube.edgePieces.get("RF"),
                    this.rubiksCube.edgePieces.get("DF"),
                    this.rubiksCube.edgePieces.get("FL"),
                );

                break;
            case "B":
                this.edgePieces.push(
                    this.rubiksCube.edgePieces.get("UB"),
                    this.rubiksCube.edgePieces.get("LB"),
                    this.rubiksCube.edgePieces.get("DB"),
                    this.rubiksCube.edgePieces.get("BR"),
                );

                break;
        }
    }

    #shiftArrayRight(array) {
        let lastValue = array[array.length - 1];
        for (let i = 0; i < array.length; i++) {
            let lastCurrentValue = array.length - 1 - i
            array[array.length - i] = array[lastCurrentValue];
        }
        array[0] = lastValue;
        array.pop();
    }

    #shiftArrayLeft(array) {
        let firstValue = array[0];
        for (let i = 0; i < array.length; i++) {
            let firstCurrentValue = array[i + 1];
            array[i] = firstCurrentValue;
        }
        array[array.length - 1] = firstValue;
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
                    edgePiece.geometry.computeBoundingBox();
                })
                this.cornerPieces.forEach((cornerPiece) => {
                    cornerPiece.mesh.position.applyAxisAngle(this.direction, rotation - prev.rotation);
                    cornerPiece.mesh.rotateOnWorldAxis(this.direction, rotation - prev.rotation);
                })
                prev.rotation = rotation;
            })
            .onComplete(() => {
                this.rubiksCube.isAnimating = false
            })
            .start();
    }

    rotateClockwise() {
        const start = {rotation: 0};
        const prev = {rotation: 0};
        const end = {rotation: -_90Degrees};

        this.#rotate(start, prev, end);

        this.adjacentFaces.forEach((face) => {
            face.edgePieces.length = 0;
            this.rubiksCube.edgePieces.forEach((edgePiece) => {
                console.log("intersects");
                if (edgePiece.geometry.boudingBox.intersectsPlane(face.plane)) {
                    face.edgePieces.push(edgePiece);
                }
            })
        })

    }

    rotateCounterClockwise() {
        const start = {rotation: 0};
        const prev = {rotation: 0};
        const end = {rotation: _90Degrees};

        this.#rotate(start, prev, end);

        this.adjacentFaces.forEach((face) => {
            face.edgePieces.length = 0;
            this.rubiksCube.edgePieces.forEach((edgePiece) => {
                if (edgePiece.geometry.boundingBox.intersectsPlane(face.plane)) {
                    face.edgePieces.push(edgePiece);
                }
            })
        })
    }
}