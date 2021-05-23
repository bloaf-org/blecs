import Object3DComponent from "./object3d";

export interface ComponentDefinition {
    stringId: string;
    default: any;
}

const componentDefinitions : Array<ComponentDefinition> = [
    Object3DComponent
];

export default componentDefinitions;
