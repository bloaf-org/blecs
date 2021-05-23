import {componentMgr, entityMgr} from "../src/index";
import * as THREE from "three";

class GameObject {

    id : number;

    constructor() {
        this.id = entityMgr.createEntity();
    }
    
    addComponent(componentType : string) {
        componentMgr.AddComponent(this.id, componentType);
    }


}



let g = new GameObject();
g.addComponent("object3d");

console.log(componentMgr.componentArrays[0]);

// Implementing systems might kinda look like this?
// this system would be overly broad but interact on 
// the object3d component. Usually I think object3d
// would always be part of the signature somehow


function MySystem() {
    let components = componentMgr.componentArrays[0];
    for (let i = 0; i < components.size; i++) {
        console.log(components.components[i]);
    }
}

MySystem();
