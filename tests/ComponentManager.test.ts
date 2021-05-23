import * as blecs from "../src/index";
import * as THREE from "three";

test("Registering component types", () => {

    let cm : blecs.ComponentManager = new blecs.ComponentManager();

    cm.RegisterComponentType("pos");

    cm.AddComponent<THREE.Vector3>(0, "pos", new THREE.Vector3());

});
