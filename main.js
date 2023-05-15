import * as THREE from "three";
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import WebGL from 'three/addons/capabilities/WebGL.js';

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
function newCublet() {
	const colors = [
		"white",
		"green",
		"red",
		"blue",
		"orange",
		"yellow"
	]
	const geometry = new THREE.BoxGeometry(1, 1, 1);

	const face1Mesh = new THREE.MeshBasicMaterial({color: colors[0]});
	const face2Mesh = new THREE.MeshBasicMaterial({color: colors[1]});
	const face3Mesh = new THREE.MeshBasicMaterial({color: colors[2]});
	const face4Mesh = new THREE.MeshBasicMaterial({color: colors[3]});
	const face5Mesh = new THREE.MeshBasicMaterial({color: colors[4]});
	const face6Mesh = new THREE.MeshBasicMaterial({color: colors[5]});

	geometry.groups.push({start: 0, count: 2, materialIndex: 0});
	geometry.groups.push({start: 2, count: 2, materialIndex: 1});
	geometry.groups.push({start: 4, count: 2, materialIndex: 2});
	geometry.groups.push({start: 6, count: 2, materialIndex: 3});
	geometry.groups.push({start: 8, count: 2, materialIndex: 4});
	geometry.groups.push({start: 10, count: 2, materialIndex: 5});

	const materials = [face1Mesh, face2Mesh, face3Mesh, face4Mesh, face5Mesh, face6Mesh];

	return new THREE.Mesh(geometry, materials);
}

const cube = newCublet();
cube.position.set(0, 0, 0);
scene.add(cube);

//creating an array of cubes with different colors
// const colors = [
// 	"white",
// 	"green",
// 	"red",
// 	"blue",
// 	"orange",
// 	"yellow"
// ]
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// for (let i = 0; i < 3; i++) {
// 	const material = new THREE.MeshBasicMaterial({color: colors[i]})
// 	const cublet = new THREE.Mesh(geometry, material);
// 	cublet.position.set(i, 0, 0);
// 	scene.add(cublet);
// }

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