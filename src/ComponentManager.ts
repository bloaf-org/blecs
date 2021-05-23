import ComponentArray from "./ComponentArray";
import {ComponentDefinition} from "./components";

/*
The component manager is in charge of talking to all
the different component arrays when a component needs
to be added or removed.
*/
class ComponentManager {

    componentTypes : Record<string, number>;
    componentDefaults : Record<string, CallableFunction>;
    componentArrays : Record<string, ComponentArray<any>>;

    nextComponentType : number;

    constructor() {
        this.componentTypes = {};
        this.componentDefaults = {};
        this.componentArrays = {};

        this.nextComponentType = 0;
    }

    /*
    Instead of hard coding ahead of time which 
    component types are valid or not we are instead
    registering component types at runtime
    */
    RegisterComponentType<T>(cdef : ComponentDefinition) {
        if (cdef.stringId in this.componentTypes) {
            throw Error(`Component Manager: component type ${cdef.stringId} already registered.`);
        }

        this.componentTypes[cdef.stringId] = this.nextComponentType;
        this.componentDefaults[cdef.stringId] = cdef.default;
        this.componentArrays[this.nextComponentType] = new ComponentArray<T>();

        this.nextComponentType++;

    }

    AddComponent(entityID : number, componentType : string, component : any = undefined) : void {
        // if no definition is provided use the default
        // given in the component definition
        if ( component === undefined || component === null ) {
            component = this.componentDefaults[componentType]();
        }
        this.componentArrays[this.componentTypes[componentType]].AddComponent(entityID, component);
    }

    RemoveComponent(entityID : number, componentType : string) : void {
        this.componentArrays[this.componentTypes[componentType]].DeleteComponent(entityID);
    }

    EntityDestroyed(entityID : number) : void {
        for( let ctype in this.componentTypes ) {
            console.log("deleting", ctype);
            this.componentArrays[this.componentTypes[ctype]].EntityDestroyed(entityID);
        }
    }

}

export default ComponentManager;
