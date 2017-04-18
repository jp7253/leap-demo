import * as THREE from 'three';
import * as Leap from 'leapjs';
import { Utils } from './Utils';

//Set up the scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();

camera.position.z = 30;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Render something
let light = new THREE.PointLight(0xffffff, 1, 50);

light.position.set(0, 10, 5);
scene.add(light);

let model: THREE.Object3D;
let loader = new THREE.ObjectLoader();

loader.load('./assets/rosetta_stone.json', (obj: THREE.Object3D) :void =>{
    
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    
    model = obj;
    scene.add(model);

    console.log('Model Loaded!');

    render();
});

//Set up LeapMotion
let leapController = new Leap.Controller();
leapController.connect();

//Render loop
function render(): void {
    requestAnimationFrame(render);

    let leapFrame = leapController.frame();

    switch(leapFrame.hands.length){
        case 0: 
            model.rotation.z += 0.005; 
            break;
        case 1:
            //Set the object rotation according to the position of the hand
            let palmPosX = leapFrame.hands[0].palmPosition[0];
            let palmPosY = leapFrame.hands[0].palmPosition[1];

            let rotationZ = Utils.Map(palmPosX, -300, 300, 3, 9);
            let rotationX = Utils.Map(-palmPosY, -300, 300, 0, 3) - 2;

            model.rotation.z = rotationZ;
            model.rotation.x = rotationX;

            break;
        case 2:
            console.log('TWO HANDS');
            break;
    }

    renderer.render(scene, camera);
}