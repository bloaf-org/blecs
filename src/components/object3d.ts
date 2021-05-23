import * as THREE from "three";
import {ComponentDefinition} from "./index";

/**
 * Builds on the built in THREE.js Object3D
 */
const Object3DComponent : ComponentDefinition = {
    stringId: "object3d",
    default: () => new THREE.Object3D()
}

export default Object3DComponent;
