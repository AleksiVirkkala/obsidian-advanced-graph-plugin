import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface InitThreeParams {
	/**
	 * Called every frame of the render loop
	 *
	 * @param time The time in milliseconds since the start of the render loop
	 * @returns
	 */
	onRender?: (time: number) => void;
	/**
	 * Called when the destroy function is called
	 */
	onDestroy?: () => void;
}

export const initThree = ({ onRender = () => {}, onDestroy = () => {} }: InitThreeParams) => {
	// ---------- Setup ----------

	// Contains the requestAnimationFrame ID so we can cancel it
	let renderRequestID: number = requestAnimationFrame(render);

	// Create renderer
	const renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
		premultipliedAlpha: false
	});
	const canvas = renderer.domElement;

	// Set required styles
	canvas.style.width = '100%';
	canvas.style.height = '100%';
	canvas.style.display = 'block';
	canvas.style.pointerEvents = 'all';

	// Create scene
	const scene = new THREE.Scene();

	// Create camera
	const camera = new THREE.PerspectiveCamera(75, 2, 0.1);
	camera.position.z = 4;

	// Create light
	const color = 0xffffff;
	const intensity = 3;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);

	// Create controls
	const controls = new OrbitControls(camera, canvas);
	controls.enableDamping = true;

	// --------- Main render loop ---------

	function render(time: number) {
		// Fix camera aspect ratio
		if (resizeRendererToDisplaySize(renderer)) {
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		onRender(time); // <-- Custom render code

		renderRequestID = requestAnimationFrame(render);
		controls.update();
		renderer.render(scene, camera);
	}

	// --------- Utility functions ---------

	function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}

	/**
	 * Stop the render loop and dispose of all resources
	 *
	 * @note This function is not called automatically, you must call it yourself
	 * @note You need to to implement your own destroy code in the onDestroy callback
	 */
	function destroy() {
		cancelAnimationFrame(renderRequestID);
		renderer.dispose();
		onDestroy(); // <-- Custom destroy code
	}

	/**
	 * Attach created ThreeJS canvas to given element
	 *
	 * @param el The element to attach the canvas to
	 */
	function attach(el: HTMLElement) {
		el.appendChild(canvas);
	}

	return {
		renderer,
		scene,
		camera,
		light,
		attach,
		destroy
	};
};
