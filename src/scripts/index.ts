import { App } from './app';
import * as THREE from 'three';
import * as Leap from 'leapjs';
import { Utils } from './utils';
import { Scene3d } from './scene3d'

//Initiailise the app
let app = new App();
app.Init();

//Kick off the main loop
app.StartLoop((scene, leapController) => {

    let leapFrame = leapController.frame();

    if(!scene.model) return;

    switch (leapFrame.hands.length) {
        case 0:
            scene.model.rotation.z += 0.005; 
            break;
        case 1:
            //Set the object rotation according to the position of the hand
            let palmPosX = leapFrame.hands[0].palmPosition[0];
            let palmPosY = leapFrame.hands[0].palmPosition[1];
            let rotationZ = Utils.Map(palmPosX, -300, 300, 3, 9);
            let rotationX = Utils.Map(-palmPosY, -300, 300, 0, 3) - 2;

            scene.model.rotation.z = rotationZ;
            scene.model.rotation.x = rotationX;

            break;
        case 2:
            console.log('TWO HANDS');
            break;
    }
});