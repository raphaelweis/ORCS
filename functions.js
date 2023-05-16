import * as THREE from "three";

export function newCublet() {
	const colors = [
		"red",
		"orange",
		"white",
		"yellow",
		"green",
		"blue",
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