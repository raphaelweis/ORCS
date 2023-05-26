import * as THREE from "three";

export class Cublet {
    //color palette
    #colors = ["red", "orange", "white", "yellow", "green", "blue",];

    // box geometry (cube)
    geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);

    // adding mesh to each set of 2 vertices, essentially adding a different mesh per cube face (cube = 2 triangles per face)
    #face1Mesh = new THREE.MeshBasicMaterial({color: this.#colors[0]});
    #face2Mesh = new THREE.MeshBasicMaterial({color: this.#colors[1]});
    #face3Mesh = new THREE.MeshBasicMaterial({color: this.#colors[2]});
    #face4Mesh = new THREE.MeshBasicMaterial({color: this.#colors[3]});
    #face5Mesh = new THREE.MeshBasicMaterial({color: this.#colors[4]});
    #face6Mesh = new THREE.MeshBasicMaterial({color: this.#colors[5]});
    #materials = [this.#face1Mesh, this.#face2Mesh, this.#face3Mesh, this.#face4Mesh, this.#face5Mesh, this.#face6Mesh];

    rubiksCube;
    location;

    constructor(rubiksCube) {
        //push the meshes to the cube faces
        this.geometry.groups.push({start: 0, count: 2, materialIndex: 0});
        this.geometry.groups.push({start: 2, count: 2, materialIndex: 1});
        this.geometry.groups.push({start: 4, count: 2, materialIndex: 2});
        this.geometry.groups.push({start: 6, count: 2, materialIndex: 3});
        this.geometry.groups.push({start: 8, count: 2, materialIndex: 4});
        this.geometry.groups.push({start: 10, count: 2, materialIndex: 5});

        this.mesh = new THREE.Mesh(this.geometry, this.#materials);
        this.location = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9));

        this.rubiksCube = rubiksCube;
    }
}

export class CenterPiece extends Cublet {
    face;
    direction;

    constructor(rubiksCube, face) {
        super(rubiksCube);
        this.face = face;
        this.direction = this.face.direction;
        this.mesh.position.addScaledVector(this.direction, 1);
        this.location.position.addScaledVector(this.direction, 1);
    }
}

export class EdgePiece extends Cublet {
    faces;

    constructor(rubiksCube, face1, face2) {
        super(rubiksCube);
        this.faces = [face1, face2];
        let direction = this.#calculateDirection();
        this.mesh.position.addScaledVector(direction, 1);
        this.location.position.addScaledVector(direction, 1);
    }

    #calculateDirection() {
        return new THREE.Vector3()
            .add(this.faces[0].direction)
            .add(this.faces[1].direction);
    }

    updateFaces() {
        this.rubiksCube.edgePieces.forEach((edgePiece) => {
            if (this.mesh.position.equals(edgePiece.location.position)) {
                console.log("found a face match");
                let face1 = edgePiece.faces[0];
                let face2 = edgePiece.faces[1];
                this.faces[0] = face1;
                this.faces[1] = face2;
            }
        })
    }
}

export class CornerPiece extends Cublet {
    faces;

    constructor(rubiksCube, face1, face2, face3) {
        super(rubiksCube);
        this.faces = [face1, face2, face3];
        let direction = this.#calculateDirection();
        this.mesh.position.addScaledVector(direction, 1);
        this.location.position.addScaledVector(direction, 1);
    }

    #calculateDirection() {
        return new THREE.Vector3()
            .add(this.faces[0].direction)
            .add(this.faces[1].direction)
            .add(this.faces[2].direction);
    }

    updateFaces() {
        this.rubiksCube.cornerPieces.forEach((cornerPiece) => {
            if (this.mesh.position.equals(cornerPiece.location.position)) {
                let face1 = cornerPiece.faces[0];
                let face2 = cornerPiece.faces[1];
                let face3 = cornerPiece.faces[3];
                this.faces[0] = face1;
                this.faces[1] = face2;
                this.faces[2] = face3;
            }
        })
    }
}