import * as THREE from "three";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import * as UTILS from "./functions";

// creating a scene, a camera and a renderer and setting the correct parameters
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// moving out the camera because the cube will spawn in 0, 0 ,0
camera.position.set(0, 0, 5);

// mouse camera controls - three.js addon
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// creating a cube and adding it to the scene - the cube is made of a geometry, material and mesh to bind the two
const cublet1 = UTILS.newCublet();
const cublet2 = UTILS.newCublet();
const cublet3 = UTILS.newCublet();
cublet1.position.set(0, 0, 0);
cublet2.position.set(1.1, 0, 0);
cublet3.position.set(-1.1, 0, 0);

let group1 = new THREE.Group();
group1.add(cublet1);
group1.add(cublet2);
group1.add(cublet3);

let group2 = group1.clone();
let group3 = group1.clone();

group1.position.set(0, 0, 0);
group2.position.set(0, 0, 1.1);
group3.position.set(0, 0, -1.1);

let bigGroup1 = new THREE.Group();
bigGroup1.add(group1);
bigGroup1.add(group2);
bigGroup1.add(group3);

let bigGroup2 = bigGroup1.clone();
let bigGroup3 = bigGroup1.clone();

bigGroup1.position.set(0, 0, 0);
bigGroup2.position.set(0, 1.1, 0);
bigGroup3.position.set(0, -1.1, 0);

scene.add(bigGroup1);
scene.add(bigGroup2);
scene.add(bigGroup3);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

// animate only if webGL is supported on current browser
if (WebGL.isWebGLAvailable()) {
	animate();
} else {
	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById('container').appendChild(warning);
}