import ComponentArray from "./ComponentArray";
import {ComponentDefinition} from "./components";

/*
The component manager is in charge of talking to all
the different component arrays when a component needs
to be added or removed.
*/
class ComponentManager {

    componentTypes : Record<string, number>;
    componentArrays : Record<string, ComponentArray>;

    nextComponentType : number;

    constructor() {
        this.componentTypes = {};
        this.componentArrays = {};

        this.nextComponentType = 0;
    }

    /*
    Instead of hard coding ahead of time which 
    component types are valid or not we are instead
    registering component types at runtime
    */
    RegisterComponent(typeName : string) {
        if (typeName in this.componentTypes) {
            throw Error(`Component Manager: component type ${typeName} already registered.`);
        }

        this.componentTypes[typeName] = this.nextComponentType;
        this.componentArrays[this.nextComponentType] = new ComponentArray();

        this.nextComponentType++;

    }

    // converts the component string name
    // to an integer to be used in the signature
    GetComponentType(typeName : string, ) : number {

        if ( !(typeName in this.componentTypes) ) {
            throw Error(`Component Manager: component type ${typeName} not registered before use.`);
        }

        return this.componentTypes[typeName];
    }

    AddComponent(entityID : number, componentType : string, component : any = undefined) : void {
        // if no definition is provided use the default
        // given in the component definition
        this.componentArrays[this.componentTypes[componentType]].AddComponent(entityID, component);
    }

    RemoveComponent(entityID : number, componentType : string) : void {
        this.componentArrays[this.componentTypes[componentType]].DeleteComponent(entityID);
    }

    private GetComponentArray(typeName : string) : ComponentArray {
        if ( !(typeName in this.componentTypes) ) {
            throw Error(`Component Manager: component type ${typeName} not registered before use.`);
        }
        return this.componentArrays[this.componentTypes[typeName]];

    }

    GetComponent(entityID : number, typeName : string ) {
        return this.GetComponentArray(typeName).GetData(entityID);
    }

    EntityDestroyed(entityID : number) : void {
        for( let ctype in this.componentTypes ) {
            console.log("deleting", ctype);
            this.componentArrays[this.componentTypes[ctype]].EntityDestroyed(entityID);
        }
    }

}

export default ComponentManager;
