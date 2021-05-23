import * as blecs from "../src/index";
import * as THREE from "three";

test("Adding and deleting components", () => {
    let c : blecs.ComponentArray<THREE.Vector3> = new blecs.ComponentArray<THREE.Vector3>();

    c.AddComponent(0, new THREE.Vector3());
    c.DeleteComponent(0);

});

test("Make sure EntityDestroyed removes components", () => {
    let c : blecs.ComponentArray<THREE.Vector3> = new blecs.ComponentArray<THREE.Vector3>();

    c.AddComponent(0, new THREE.Vector3());
    c.EntityDestroyed(0);

});
