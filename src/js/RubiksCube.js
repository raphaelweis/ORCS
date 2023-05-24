import * as THREE from "three";

import {MainCublet} from "./MainCublet";
import {Face} from "./Face";
import {CornerPiece, EdgePiece} from "./Cublet";

export class RubiksCube {
    scene;
    camera;
    renderer;
    orbitControls;
    mainCublet
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

    constructor(scene, camera, renderer, orbitControls) {
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.orbitControls = orbitControls;
        this.mainCublet = new MainCublet(this.scene, this.renderer);

        // instantiate the 6 cube faces - with their corresponding centerpiece
        this.faceU = new Face("U", this);
        this.faceD = new Face("D", this);
        this.faceL = new Face("L", this);
        this.faceR = new Face("R", this);
        this.faceF = new Face("F", this);
        this.faceB = new Face("B", this);
        this.faces = [this.faceU, this.faceD, this.faceL, this.faceR, this.faceF, this.faceB];

        // find each face's adjacent faces
        this.faces.forEach((face) => {
            face.findAdjacentFaces();
        })

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

        // instantiate the main Group which will be added to the scene
        this.mainGroup = new THREE.Group();

        // add the 6 faces
        this.mainGroup.add(this.faceU.faceGroup);
        this.mainGroup.add(this.faceD.faceGroup);
        this.mainGroup.add(this.faceL.faceGroup);
        this.mainGroup.add(this.faceR.faceGroup);
        this.mainGroup.add(this.faceF.faceGroup);
        this.mainGroup.add(this.faceB.faceGroup);

        // add the 12 edge pieces
        for (let i = 0; i < this.edgePieces.length; i++) {
            this.mainGroup.add(this.edgePieces[i].mesh);
        }

        // add the 8 corner pieces
        for (let i = 0; i < this.cornerPieces.length; i++) {
            this.mainGroup.add(this.cornerPieces[i].mesh);
        }

        this.mainGroup.add(this.mainCublet.mesh);

        this.mesh = this.mainGroup;

        this.addKeyboardControls(orbitControls);
        this.isAnimating = false;
    }

    addKeyboardControls() {
        document.onkeydown = (e) => {
            if (this.isAnimating) {
                return;
            }
            switch (e.key) {
                case " ":
                    this.camera.position.set(0, 0, 1000);
                    this.orbitControls.update();
                    break;
                case "u": // U
                    this.faceU.rotateCounterClockwise();
                    break;
                case "U": // U'
                    this.faceU.rotateClockwise();
                    break;
                case "d": // D
                    this.faceD.rotateCounterClockwise();
                    break;
                case "D": // D'
                    this.faceD.rotateClockwise();
                    break;
                case "f": // F
                    this.faceF.rotateCounterClockwise();
                    break;
                case "F": // F'
                    this.faceF.rotateClockwise();
                    break;
                case "b": // B
                    this.faceB.rotateCounterClockwise();
                    break;
                case "B": // B'
                    this.faceB.rotateClockwise();
                    break;
                case "l": // L
                    this.faceL.rotateCounterClockwise();
                    break;
                case "L": // L'
                    this.faceL.rotateClockwise();
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

}