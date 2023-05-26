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
        this.centerPieces[0] = new CenterPiece(this, RubiksCube.centerColors[0], this.faceU);
        this.centerPieces[1] = new CenterPiece(this, RubiksCube.centerColors[1], this.faceD);
        this.centerPieces[2] = new CenterPiece(this, RubiksCube.centerColors[2], this.faceL);
        this.centerPieces[3] = new CenterPiece(this, RubiksCube.centerColors[3], this.faceR);
        this.centerPieces[4] = new CenterPiece(this, RubiksCube.centerColors[4], this.faceF);
        this.centerPieces[5] = new CenterPiece(this, RubiksCube.centerColors[5], this.faceB);

        // instantiate the 12 edge pieces - passing in their 2 initial faces
        this.edgePieces = [];
        this.edgePieces[0] = new EdgePiece(this, RubiksCube.edgeColors[0], this.faceU, this.faceB);
        this.edgePieces[1] = new EdgePiece(this, RubiksCube.edgeColors[1], this.faceU, this.faceR);
        this.edgePieces[2] = new EdgePiece(this, RubiksCube.edgeColors[2], this.faceU, this.faceF);
        this.edgePieces[3] = new EdgePiece(this, RubiksCube.edgeColors[3], this.faceU, this.faceL);
        this.edgePieces[4] = new EdgePiece(this, RubiksCube.edgeColors[4], this.faceB, this.faceR);
        this.edgePieces[5] = new EdgePiece(this, RubiksCube.edgeColors[5], this.faceR, this.faceF);
        this.edgePieces[6] = new EdgePiece(this, RubiksCube.edgeColors[6], this.faceF, this.faceL);
        this.edgePieces[7] = new EdgePiece(this, RubiksCube.edgeColors[7], this.faceL, this.faceB);
        this.edgePieces[8] = new EdgePiece(this, RubiksCube.edgeColors[8], this.faceD, this.faceB);
        this.edgePieces[9] = new EdgePiece(this, RubiksCube.edgeColors[9], this.faceD, this.faceR);
        this.edgePieces[10] = new EdgePiece(this, RubiksCube.edgeColors[10], this.faceD, this.faceF);
        this.edgePieces[11] = new EdgePiece(this, RubiksCube.edgeColors[11], this.faceD, this.faceL);

        // instantiate the 8 corner pieces - passing in their 3 initial faces
        this.cornerPieces = [];
        this.cornerPieces[0] = new CornerPiece(this, RubiksCube.cornerColors[0], this.faceU, this.faceL, this.faceB);
        this.cornerPieces[1] = new CornerPiece(this, RubiksCube.cornerColors[1], this.faceU, this.faceB, this.faceR);
        this.cornerPieces[2] = new CornerPiece(this, RubiksCube.cornerColors[2], this.faceU, this.faceR, this.faceF);
        this.cornerPieces[3] = new CornerPiece(this, RubiksCube.cornerColors[3], this.faceU, this.faceF, this.faceL);
        this.cornerPieces[4] = new CornerPiece(this, RubiksCube.cornerColors[4], this.faceD, this.faceL, this.faceB);
        this.cornerPieces[5] = new CornerPiece(this, RubiksCube.cornerColors[5], this.faceD, this.faceB, this.faceR);
        this.cornerPieces[6] = new CornerPiece(this, RubiksCube.cornerColors[6], this.faceD, this.faceR, this.faceF);
        this.cornerPieces[7] = new CornerPiece(this, RubiksCube.cornerColors[7], this.faceD, this.faceF, this.faceL);

        // instantiate the main Group which will be added to the scene
        this.mainGroup = new THREE.Group();

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

    static centerColors = [
        ["black", "black", "white", "black", "black", "black"],
        ["black", "black", "black", "yellow", "black", "black"],
        ["black", "orange", "black", "black", "black", "black"],
        ["red", "black", "black", "black", "black", "black"],
        ["black", "black", "black", "black", "green", "black"],
        ["black", "black", "black", "black", "black", "blue"],
    ];

    static edgeColors = [
        ["black", "black", "white", "black", "black", "blue"],
        ["red", "black", "white", "black", "black", "black"],
        ["black", "black", "white", "black", "green", "black"],
        ["black", "orange", "white", "black", "black", "black"],
        ["red", "black", "black", "black", "black", "blue"],
        ["red", "black", "black", "black", "green", "black"],
        ["black", "orange", "black", "black", "green", "black"],
        ["black", "orange", "black", "black", "black", "blue"],
        ["black", "black", "black", "yellow", "black", "blue"],
        ["red", "black", "black", "yellow", "black", "black"],
        ["black", "black", "black", "yellow", "green", "black"],
        ["black", "orange", "black", "yellow", "black", "black"],
    ]

    static cornerColors = [
        ["black", "orange", "white", "black", "black", "blue"],
        ["red", "black", "white", "black", "black", "blue"],
        ["red", "black", "white", "black", "green", "black"],
        ["black", "orange", "white", "black", "green", "black"],
        ["black", "orange", "black", "yellow", "black", "blue"],
        ["red", "black", "black", "yellow", "black", "blue"],
        ["red", "black", "black", "yellow", "green", "black"],
        ["black", "orange", "black", "yellow", "green", "black"],
    ]
}