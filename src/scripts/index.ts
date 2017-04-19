import { Utils } from './utils';
import { App } from './app';
import { Scene3d } from './scene3d';
import * as Leap from 'leapjs';

//Initiailise the app
let app = new App();
app.Init();

//Kick off the main loop
app.StartLoop((scene, leapController) => {

    let leapFrame = leapController.frame();

    if (!scene.model) return;

    switch (leapFrame.hands.length) {
        case 0: noHands(scene);
            break;
        case 1: oneHands(scene, leapFrame.hands[0]);
            break;
        case 2:

            let leftHand = leapFrame.hands[0].type == 'left' ? leapFrame.hands[0] : leapFrame.hands[1];
            let rightHand = leapFrame.hands[1].type == 'right' ? leapFrame.hands[1] : leapFrame.hands[0];

            twoHands(scene, leftHand, rightHand);
            break;
    }
});

function noHands(scene: Scene3d): void {

    //Rotate the model slowly
    scene.model.rotation.z += 0.005;
}


function oneHands(scene: Scene3d, hand: any): void {

    noHands(scene);
    //Set the object rotation according to the position of the hand
    // let palmPosX = hand.palmPosition[0];
    // let palmPosY = hand.palmPosition[1];
    // let rotationZ = Utils.Map(palmPosX, -300, 300, 3, 9);
    // let rotationX = Utils.Map(-palmPosY, -300, 300, 0, 3) - 2;

    // scene.model.rotation.z = rotationZ;
    // scene.model.rotation.x = rotationX;
}

function twoHands(scene: Scene3d, leftHand: any, rightHand: any) {

    //Figure out how far appart the hands are    
    let leftHandPos = Leap.vec3.fromValues(leftHand.palmPosition[0], leftHand.palmPosition[1], leftHand.palmPosition[2]);
    let rightHandPos = Leap.vec3.fromValues(rightHand.palmPosition[0], rightHand.palmPosition[1], rightHand.palmPosition[2]);
    let dist: number = Leap.vec3.dist(leftHandPos, rightHandPos);

    //Set the camera location accordingly
    scene.camera.position.z = Utils.Map(dist, 500, 10, 5, 70);

    //Get the vector between the hands and set rotation from that
    let vector = Leap.vec3.create();
    Leap.vec3.sub(vector, leftHandPos, rightHandPos);

    let rotationZ = Utils.Map(vector[2], -300, 300, 3, 9);
    let rotationY = Utils.Map(vector[1], -300, 300, 3, 9);
    scene.model.rotation.z = rotationZ;
    scene.model.rotation.y = rotationY;
}