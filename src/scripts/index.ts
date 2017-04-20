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

    if (!leapFrame.valid || !scene.model) {
        console.log('INVALID FRAME');
        return;
    }

    if (leapFrame.hands.length == 2) {

        console.log('TWO HANDS');
        twoHands(scene, leapFrame);
    }
    else {
        scene.model.rotation.z += 0.005;
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


let avgDist :number; 
function twoHands(scene: Scene3d, leapFrame :any) {

    let leftHandIndex = leapFrame.hands[0].type == 'left' ? 0 : 1;
    let rightHandIndex = 1-leftHandIndex;

    let leftHand = leapFrame.hands[leftHandIndex];
    let rightHand = leapFrame.hands[rightHandIndex];

    //Figure out how far appart the hands are    
    let leftHandPos = Leap.vec3.fromValues(leftHand.palmPosition[0], leftHand.palmPosition[1], leftHand.palmPosition[2]);
    let rightHandPos = Leap.vec3.fromValues(rightHand.palmPosition[0], rightHand.palmPosition[1], rightHand.palmPosition[2]);
    let dist: number = Leap.vec3.dist(leftHandPos, rightHandPos);


    //Set the camera location accordingly
    scene.camera.position.z = Utils.Map((dist + avgDist)/2, 500, 10, 5, 70);

    avgDist = dist;

    //Get the vector between the hands and set rotation from that
    //let vector = Leap.vec3.create();
    //Leap.vec3.sub(vector, leftHandPos, rightHandPos);

    let rotationZ = Utils.Map(rightHandPos[2], 300, -300, -3, 6);
    //let rotationY = Utils.Map(rightHandPos[1], -1000, 3000, -3, 9);
    scene.model.rotation.z = (scene.model.rotation.z + rotationZ) /2;
    //scene.model.rotation.y = (scene.model.rotation.y + rotationY) /2;
}