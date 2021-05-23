import ComponentArray from "./ComponentArray";

/*
The component manager is in charge of talking to all
the different component arrays when a component needs
to be added or removed.
*/
class ComponentManager {

    componentTypes : Record<string, number>;
    componentArrays : Record<string, ComponentArray<any>>;

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
    RegisterComponentType<T>(componentType : string) {
        if (componentType in this.componentTypes) {
            throw Error(`Component Manager: component type ${componentType} already registered.`);
        }

        this.componentTypes[componentType] = this.nextComponentType;
        this.componentArrays[this.nextComponentType] = new ComponentArray<T>();

        this.nextComponentType++;

    }

    AddComponent<T>(entityID : number, componentType : string, component : T) : void {
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
