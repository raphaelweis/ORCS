import * as THREE from "three";
import WebGL from 'three/addons/capabilities/WebGL.js';
import {MainCublet} from "./MainCublet";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from "@tweenjs/tween.js"
import {texture} from "three/nodes";

// creating a scene, a camera and a renderer and setting the correct parameters
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// setting scene background
scene.background = new THREE.TextureLoader().load('../../scene-background.jpg');

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// moving out the camera because the cube will spawn in 0, 0 ,0
camera.position.set(0, 0, 10);

// adding orbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();


// creating a cublet
let mainCublet = new MainCublet(scene, camera, renderer);
scene.add(mainCublet.mesh);
mainCublet.addKeyboardControls(orbitControls);

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