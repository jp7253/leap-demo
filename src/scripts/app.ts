import * as THREE from 'three';
import * as Leap from 'leapjs';
import { Utils } from './utils';
import { Scene3d } from './scene3d'


export class App {

    private _scene: Scene3d;
    private _leapController: any;

    constructor() { }

    public Init(): void {
        console.log('Init App');

        //Initialise the scene
        this._scene = new Scene3d();
        this._scene.Init(document.body);
        this.AddLighting();
        this._scene.LoadObjectModel('./assets/rosetta_stone.json').then(() => {
            console.log('MODEL LOADED');
            this.Render();
        });

        //Initialise the Leap Motion controller
        this._leapController = new Leap.Controller()
        this._leapController.connect();
    }

    public StartLoop(renderLoop: (scene: Scene3d, leapController: any) => void): void {

        this.Render(renderLoop);
    }

    private Render(renderLoop?: (scene: Scene3d, leapController: any) => void): void {

        requestAnimationFrame(() => this.Render(renderLoop));

        if (renderLoop) renderLoop(this._scene, this._leapController);

        this._scene.Render();
    }

    private AddLighting(): void {

        var ambientLight = new THREE.AmbientLight(0x404040, .2); // soft white light
        this._scene.AddObject(ambientLight);

        let pointLight = new THREE.PointLight(0xffffff, 1, 50);
        pointLight.position.set(0, 10, 5);
        this._scene.AddObject(pointLight);
    }
}