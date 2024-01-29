<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import * as THREE from 'three';
	import { initThree } from './utils/threejs';

	let container: HTMLDivElement;
	const threeBase = initThree({ onRender });
	const { scene, light } = threeBase;

	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const cubes = [
		makeInstance(geometry, 0x44aa88, 0),
		makeInstance(geometry, 0x8844aa, 1),
		makeInstance(geometry, 0xaa8844, 2)
	];

	cubes.forEach(cube => scene.add(cube));

	cubes[0].attach(cubes[1]);
	cubes[1].attach(cubes[2]);

	function onRender(time: number) {
		time *= 0.001; // convert time to seconds
		console.log(light.localToWorld(new THREE.Vector3(0, 0, 0)));
		cubes.forEach((cube, ndx) => {
			const speed = 1 + ndx * 0.1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;
		});
	}

	function makeInstance(geometry: THREE.BufferGeometry, color: number, x: number) {
		const material = new THREE.MeshPhongMaterial({ color });
		const cube = new THREE.Mesh(geometry, material);
		cube.position.x = x;
		return cube;
	}

	onMount(() => threeBase.attach(container));
	onDestroy(() => threeBase.destroy());
</script>

<div bind:this={container} class="container" />

<style>
	.container {
		display: contents;
	}
</style>
