import * as THREE from "three";

export class Cublet {
    #geometry;
    #materials
    rubiksCube;

    constructor(rubiksCube, colors) {
        this.#geometry = new THREE.BoxGeometry(0.9, 0.9, 0.9);
        this.#materials = [];

        for (let i = 0; i < colors.length; i++) {
            this.#materials[i] = new THREE.MeshBasicMaterial({color: colors[i]});
        }

        this.#geometry.groups.push({start: 0, count: 2, materialIndex: 0});
        this.#geometry.groups.push({start: 2, count: 2, materialIndex: 1});
        this.#geometry.groups.push({start: 4, count: 2, materialIndex: 2});
        this.#geometry.groups.push({start: 6, count: 2, materialIndex: 3});
        this.#geometry.groups.push({start: 8, count: 2, materialIndex: 4});
        this.#geometry.groups.push({start: 10, count: 2, materialIndex: 5});

        this.mesh = new THREE.Mesh(this.#geometry, this.#materials);

        this.rubiksCube = rubiksCube;
    }
}

export class CenterPiece extends Cublet {
    face;
    direction;

    constructor(rubiksCube, colors, face) {
        super(rubiksCube, colors);
        this.face = face;
        this.face.centerPiece = this;
        this.direction = this.face.direction;
        this.mesh.position.addScaledVector(this.direction, 1);
    }
}

export class EdgePiece extends Cublet {
    faces;

    constructor(rubiksCube, colors,face1, face2) {
        super(rubiksCube, colors);
        this.faces = [face1, face2];
        let direction = this.#calculateDirection();
        this.mesh.position.addScaledVector(direction, 1);
    }

    #calculateDirection() {
        return new THREE.Vector3()
            .add(this.faces[0].direction)
            .add(this.faces[1].direction);
    }
}

export class CornerPiece extends Cublet {
    faces;

    constructor(rubiksCube, colors, face1, face2, face3) {
        super(rubiksCube, colors);
        this.faces = [face1, face2, face3];
        let direction = this.#calculateDirection();
        this.mesh.position.addScaledVector(direction, 1);
    }

    #calculateDirection() {
        return new THREE.Vector3()
            .add(this.faces[0].direction)
            .add(this.faces[1].direction)
            .add(this.faces[2].direction);
    }
}