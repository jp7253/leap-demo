import { Promise } from 'es6-promise';
import * as THREE from 'three';
import { Utils } from './utils';

export class Scene3d {

    private readonly _scene = new THREE.Scene();
    private readonly _renderer :THREE.Renderer = new THREE.WebGLRenderer();
    private _camera :THREE.PerspectiveCamera;
    public model: THREE.Object3D;

    constructor(){}

    public Init(domRoot :HTMLElement){
        
        let winSize = Utils.GetWindowDimentions();

        this._camera = new THREE.PerspectiveCamera(45, winSize.width / winSize.height, 0.1, 1000);
        this._camera.position.z = 30;

        this._renderer.setSize(winSize.width, winSize.height);
        window.addEventListener('resize', ()=>{

            let winSize = Utils.GetWindowDimentions();
            this._camera.aspect = winSize.width / winSize.height;
            this._camera.updateProjectionMatrix();

            this._renderer.setSize(winSize.width, winSize.height);

        }, false);
        
        domRoot.appendChild(this._renderer.domElement);
    }

    public AddObject(obj :THREE.Object3D) :void{

        this._scene.add(obj);
    }

    public LoadObjectModel(path :string){

        return new Promise((resolve, reject) => {

                try{
                    let loader = new THREE.ObjectLoader();

                    loader.load(path, (obj: THREE.Object3D) :void =>{

                        this.model = obj;
                        this.AddObject(obj);
                        resolve();
                    });
                }
                catch(err){
                    reject(err);
                }
        });
    }

    public Render(): void {
        this._renderer.render(this._scene, this._camera);
    }
}