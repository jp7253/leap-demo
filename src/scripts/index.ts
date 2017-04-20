import { Utils } from './utils';
import { App } from './app';
import { Scene3d } from './scene3d';
import * as Leap from 'leapjs';

//Initiailise the app
let firstValidFrame :any = null;
let app = new App();
app.Init();

//Kick off the main loop
app.StartLoop((scene, leapController) => {

    let leapFrame = leapController.frame();

    if (!leapFrame.valid || !scene.model) return;

    if (!firstValidFrame) firstValidFrame = leapFrame;
    var translationVector = firstValidFrame.translation(leapFrame);

    if(leapFrame.hands.length > 1){

        setModelRotation(scene, translationVector);
        setCameraZoom(scene, leapFrame);
    }
    else{
        firstValidFrame = null;
        scene.model.rotation.z += 0.005;
    }

    updateOverlays(scene);
});

function updateOverlays(scene :Scene3d){

    let rotation =  scene.model.rotation.z;

    if(rotation < 1){
        document.getElementById("overlay1").classList.remove("hidden");
        document.getElementById("overlay2").classList.add("hidden");
    }
    else{
        document.getElementById("overlay2").classList.remove("hidden");
        document.getElementById("overlay1").classList.add("hidden");
    }
}

function setModelRotation(scene :Scene3d, translationVector :number[]){

    console.log(Utils.Map(translationVector[0], -300, 300, -3, 3));
    scene.model.rotation.z = Utils.Map(translationVector[0], -300, 300, -3, 3);
}

function setCameraZoom(scene :Scene3d, leapFrame :any){

     let leftHandIndex = leapFrame.hands[0].type == 'left' ? 0 : 1;
     let rightHandIndex = 1-leftHandIndex;

     let leftHand = leapFrame.hands[leftHandIndex];
     let rightHand = leapFrame.hands[rightHandIndex];

     //Figure out how far appart the hands are    
     let leftHandPos = Leap.vec3.fromValues(leftHand.palmPosition[0], leftHand.palmPosition[1], leftHand.palmPosition[2]);
     let rightHandPos = Leap.vec3.fromValues(rightHand.palmPosition[0], rightHand.palmPosition[1], rightHand.palmPosition[2]);
     let dist: number = Leap.vec3.dist(leftHandPos, rightHandPos);

    // //Set the camera location accordingly

    scene.camera.position.z = Utils.Map(dist, 500, 50, 10, 50);
}