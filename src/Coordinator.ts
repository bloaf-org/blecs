import EntityManager from "./EntityManager";
import ComponentManager from "./ComponentManager";
import {ComponentDefinition} from "./components";
import SystemManager from "./SystemManager"; 
import Signature from "./Signature";
import System from "./System";

class Coordinator {

    entityManager : EntityManager;
    componentManager : ComponentManager;
    systemManager : SystemManager;

    constructor() {
        console.log("starting up ecs");
        this.entityManager = new EntityManager();
        this.componentManager = new ComponentManager();
        this.systemManager = new SystemManager();
    }

    CreateEntity() : number {
        return this.entityManager.CreateEntity();
    }

    DestroyEntity(entityId : number) : void {
        this.entityManager.DestroyEntity(entityId);
        this.componentManager.EntityDestroyed(entityId);
        // this.systemManager
    }

    RegisterComponent(typeName : string) {
        this.componentManager.RegisterComponent(typeName);
    }

    AddComponent(entityID : number, componentType : string, component : any) {
        this.componentManager.AddComponent(entityID, componentType, component);

        // Since we are adding this component, make sure the entity's 
        // signature marks the component as being present
        let signature : Signature = this.entityManager.GetSignature(entityID);
        signature.set(this.componentManager.GetComponentType(componentType), 1);
        this.entityManager.SetSignature(entityID, signature);

        this.systemManager.EntitySignatureHasChanged(entityID, signature);
    }

    RemoveComponent(entityID : number, componentType : string) {
        this.componentManager.RemoveComponent(entityID, componentType);

        // remove the component from the signature
        let signature : Signature = this.entityManager.GetSignature(entityID);
        signature.set(this.componentManager.GetComponentType(componentType), 0);
        this.entityManager.SetSignature(entityID, signature);

        this.systemManager.EntitySignatureHasChanged(entityID, signature);
    }

    GetComponent(entityID : number, componentType : string) : any {
        return this.componentManager.GetComponent(entityID, componentType);
    }

    GetComponentType(componentType : string) : number {
        return this.componentManager.GetComponentType(componentType);
    }

    RegisterSystem(systemName : string, system : System) {
        this.systemManager.RegisterSystem(systemName, system);
    }

    SetSystemSignature(systemName : string, signature : Signature) {
        this.systemManager.SetSignature(systemName, signature);
    }

}

export default Coordinator;
