import * as THREE from "three";

export class Cublet {
    //color palette
    #colors = ["red", "orange", "white", "yellow", "green", "blue",];

    // box geometry (cube)
    #geometry = new THREE.BoxGeometry(90, 90, 90);

    // adding mesh to each set of 2 vertices, essentially adding a different mesh per cube face (cube = 2 triangles per face)
    #face1Mesh = new THREE.MeshBasicMaterial({color: this.#colors[0]});
    #face2Mesh = new THREE.MeshBasicMaterial({color: this.#colors[1]});
    #face3Mesh = new THREE.MeshBasicMaterial({color: this.#colors[2]});
    #face4Mesh = new THREE.MeshBasicMaterial({color: this.#colors[3]});
    #face5Mesh = new THREE.MeshBasicMaterial({color: this.#colors[4]});
    #face6Mesh = new THREE.MeshBasicMaterial({color: this.#colors[5]});
    #materials = [this.#face1Mesh, this.#face2Mesh, this.#face3Mesh, this.#face4Mesh, this.#face5Mesh, this.#face6Mesh];

    constructor() {
        //push the meshes to the cube faces
        this.#geometry.groups.push({start: 0, count: 2, materialIndex: 0});
        this.#geometry.groups.push({start: 2, count: 2, materialIndex: 1});
        this.#geometry.groups.push({start: 4, count: 2, materialIndex: 2});
        this.#geometry.groups.push({start: 6, count: 2, materialIndex: 3});
        this.#geometry.groups.push({start: 8, count: 2, materialIndex: 4});
        this.#geometry.groups.push({start: 10, count: 2, materialIndex: 5});

        // create a new mesh
        this.mesh = new THREE.Mesh(this.#geometry, this.#materials);
    }
}

export class CenterPiece extends Cublet {
    face;

    constructor(face) {
        super();
        this.face = face;
        this.mesh.position.addScaledVector(this.face.direction, 100);
    }
}

export class EdgePiece extends Cublet {
    face;

    constructor(face1, face2) {
        super();
        this.face = [face1, face2];
        this.face.forEach((face) => {
            face.edgePieces.push(this);
        })
        this.mesh.position.addScaledVector(this.#calculateDirection(), 100);
    }

    #calculateDirection() {
        return new THREE.Vector3()
            .add(this.face[0].direction)
            .add(this.face[1].direction);
    }
}

export class CornerPiece extends Cublet {
    face;

    constructor(face1, face2, face3) {
        super();
        this.face = [face1, face2, face3];
        this.face.forEach((face) => {
            face.cornerPieces.push(this);
        })
        this.mesh.position.addScaledVector(this.#calculateDirection(), 100);
    }

    #calculateDirection() {
        return new THREE.Vector3()
            .add(this.face[0].direction)
            .add(this.face[1].direction)
            .add(this.face[2].direction);
    }
}