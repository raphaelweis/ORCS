import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import WebGL from 'three/addons/capabilities/WebGL.js';
import RubiksCube from './ORCS/lib/RubiksCube'

// creating a scene, a camera and a renderer and setting the correct parameters
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// setting scene background
scene.background = new THREE.TextureLoader().load('../../scene-background.jpg');

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// moving out the camera because the cube will spawn in 0, 0 ,0
camera.position.set(3, 3, 3);

// adding orbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

// graphics info
const graphics = {
    scene: scene,
    camera: camera,
    renderer: renderer,
    orbitControls: orbitControls
};

// creating a full Rubik's Cube
const rubiksCube = new RubiksCube(graphics);
scene.add(rubiksCube.mesh);

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();

    renderer.render(scene, camera);
}

// animate only if webGL is supported on current browser
if (WebGL.isWebGLAvailable()) {
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}