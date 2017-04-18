import * as THREE from 'three';

//Set up the scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Render something
let geometry = new THREE.BoxGeometry(1, 1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 3;

//Render loop
function render(): void {
    requestAnimationFrame(render);


    cube.rotation.x += 0.01;
    cube.rotation.y += 0.05;

    renderer.render(scene, camera);
}

render();