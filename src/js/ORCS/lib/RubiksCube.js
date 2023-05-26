import * as THREE from "three";

import Face from "./Face";
import {CenterPiece, CornerPiece, EdgePiece} from "./Cublet";

export default class RubiksCube {
    scene;
    camera;
    renderer;
    orbitControls;
    faceU;
    faceD;
    faceL;
    faceR;
    faceF;
    faceB;
    faces;
    edgePieces;
    cornerPieces;
    mainGroup;
    mesh;
    isAnimating;

    constructor(graphics) {
        this.scene = graphics.scene;
        this.camera = graphics.camera;
        this.renderer = graphics.renderer;
        this.orbitControls = graphics.orbitControls;

        // instantiate the 6 cube faces - with their corresponding centerpiece
        this.faceU = new Face("U", this);
        this.faceD = new Face("D", this);
        this.faceL = new Face("L", this);
        this.faceR = new Face("R", this);
        this.faceF = new Face("F", this);
        this.faceB = new Face("B", this);
        this.faces = [this.faceU, this.faceD, this.faceL, this.faceR, this.faceF, this.faceB];

        // instantiate the 6 centerpieces - passing in their 1 initial face
        this.centerPieces = [];
        this.centerPieces[0] = new CenterPiece(this, this.faceU);
        this.centerPieces[1] = new CenterPiece(this, this.faceD);
        this.centerPieces[2] = new CenterPiece(this, this.faceL);
        this.centerPieces[3] = new CenterPiece(this, this.faceR);
        this.centerPieces[4] = new CenterPiece(this, this.faceF);
        this.centerPieces[5] = new CenterPiece(this, this.faceB);

        // instantiate the 12 edge pieces - passing in their 2 initial faces
        this.edgePieces = [];
        this.edgePieces[0] = new EdgePiece(this, this.faceU, this.faceB);
        this.edgePieces[1] = new EdgePiece(this, this.faceU, this.faceR);
        this.edgePieces[2] = new EdgePiece(this, this.faceU, this.faceF);
        this.edgePieces[3] = new EdgePiece(this, this.faceU, this.faceL);
        this.edgePieces[4] = new EdgePiece(this, this.faceB, this.faceR);
        this.edgePieces[5] = new EdgePiece(this, this.faceR, this.faceF);
        this.edgePieces[6] = new EdgePiece(this, this.faceF, this.faceL);
        this.edgePieces[7] = new EdgePiece(this, this.faceL, this.faceB);
        this.edgePieces[8] = new EdgePiece(this, this.faceD, this.faceB);
        this.edgePieces[9] = new EdgePiece(this, this.faceD, this.faceR);
        this.edgePieces[10] = new EdgePiece(this, this.faceD, this.faceF);
        this.edgePieces[11] = new EdgePiece(this, this.faceD, this.faceL);

        // instantiate the 8 corner pieces - passing in their 3 initial faces
        this.cornerPieces = [];
        this.cornerPieces[0] = new CornerPiece(this, this.faceU, this.faceL, this.faceB);
        this.cornerPieces[1] = new CornerPiece(this, this.faceU, this.faceB, this.faceR);
        this.cornerPieces[2] = new CornerPiece(this, this.faceU, this.faceR, this.faceF);
        this.cornerPieces[3] = new CornerPiece(this, this.faceU, this.faceF, this.faceL);
        this.cornerPieces[4] = new CornerPiece(this, this.faceD, this.faceL, this.faceB);
        this.cornerPieces[5] = new CornerPiece(this, this.faceD, this.faceB, this.faceR);
        this.cornerPieces[6] = new CornerPiece(this, this.faceD, this.faceR, this.faceF);
        this.cornerPieces[7] = new CornerPiece(this, this.faceD, this.faceF, this.faceL);

        console.log(this.faceU.mesh.position);
        console.log(this.faceU.centerPiece.mesh.position.multiply(this.faceU.direction))

        // instantiate the main Group which will be added to the scene
        this.mainGroup = new THREE.Group();

        // add the 6 faces
        this.faces.forEach((face) => {
            face.updateEdgePieces();
            this.mainGroup.add(face.mesh);
        })

        // add the 6 centerpieces
        this.centerPieces.forEach((centerPiece) => {
            this.mainGroup.add(centerPiece.mesh);
        })

        // add the 12 edge pieces
        this.edgePieces.forEach((edgePiece) => {
            this.mainGroup.add(edgePiece.mesh);
        })

        // add the 8 corner pieces
        this.cornerPieces.forEach((cornerPiece) => {
            this.mainGroup.add(cornerPiece.mesh);
        })

        this.mesh = this.mainGroup;

        this.addKeyboardControls(this.orbitControls);
        this.isAnimating = false;
    }

    addKeyboardControls() {
        document.onkeydown = (e) => {
            if (this.isAnimating) {
                return;
            }
            switch (e.key) {
                case " ":
                    this.camera.position.set(3, 3, 3);
                    this.orbitControls.update();
                    break;
                case "u": // U
                    this.faceU.rotateClockwise();
                    break;
                case "U": // U'
                    this.faceU.rotateCounterClockwise();
                    break;
                case "d": // D
                    this.faceD.rotateClockwise();
                    break;
                case "D": // D'
                    this.faceD.rotateCounterClockwise();
                    break;
                case "f": // F
                    this.faceF.rotateClockwise();
                    break;
                case "F": // F'
                    this.faceF.rotateCounterClockwise();
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
                    this.faceR.rotateClockwise();
                    break;
                case "R": // R'
                    this.faceR.rotateCounterClockwise();
                    break;
            }
        }
    }
}