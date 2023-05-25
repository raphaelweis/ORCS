import * as THREE from "three";

import MainCublet from "./MainCublet";
import Face from "./Face";
import {CornerPiece, EdgePiece} from "./Cublet";

export default class RubiksCube {
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

    constructor(graphics) {
        this.scene = graphics.scene;
        this.camera = graphics.camera;
        this.renderer = graphics.renderer;
        this.orbitControls = graphics.orbitControls;
        this.mainCublet = new MainCublet();

        // instantiate the 6 cube faces - with their corresponding centerpiece
        this.faceU = new Face("U", this);
        this.faceD = new Face("D", this);
        this.faceL = new Face("L", this);
        this.faceR = new Face("R", this);
        this.faceF = new Face("F", this);
        this.faceB = new Face("B", this);
        this.faces = [this.faceU, this.faceD, this.faceL, this.faceR, this.faceF, this.faceB];

        // instantiate the 12 edge pieces - passing in their 2 initial faces
        this.edgePieces = new Map();
        this.edgePieces.set("UB", new EdgePiece(this, this.faceU, this.faceB));
        this.edgePieces.set("UR", new EdgePiece(this, this.faceU, this.faceR));
        this.edgePieces.set("UF", new EdgePiece(this, this.faceU, this.faceF));
        this.edgePieces.set("UL", new EdgePiece(this, this.faceU, this.faceL));
        this.edgePieces.set("BR", new EdgePiece(this, this.faceB, this.faceR));
        this.edgePieces.set("RF", new EdgePiece(this, this.faceR, this.faceF));
        this.edgePieces.set("FL", new EdgePiece(this, this.faceF, this.faceL));
        this.edgePieces.set("LB", new EdgePiece(this, this.faceL, this.faceB));
        this.edgePieces.set("DB", new EdgePiece(this, this.faceD, this.faceB));
        this.edgePieces.set("DR", new EdgePiece(this, this.faceD, this.faceR));
        this.edgePieces.set("DF", new EdgePiece(this, this.faceD, this.faceF));
        this.edgePieces.set("DL", new EdgePiece(this, this.faceD, this.faceL));

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

        // configure for each face: the adjacent faces array, the edge pieces array, the corner pieces array.
        this.faces.forEach((face) => {
            face.setAdjacentFaces();
            face.setEdgePieces();
        })

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
        this.edgePieces.forEach((edgePiece) => {
            this.mainGroup.add(edgePiece.mesh);
        })

        // // add the 8 corner pieces
        // for (let i = 0; i < this.cornerPieces.length; i++) {
        //     this.mainGroup.add(this.cornerPieces[i].mesh);
        // }

        this.mainGroup.add(this.mainCublet.mesh);

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
                    this.camera.position.set(0, 0, 1000);
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