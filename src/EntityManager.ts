import Signature from "./Signature";

export const MAX_ENTITIES = 100;

/*
The EntityManager is in charge of distributing
ids and keeping track of what is in use or not
*/
class EntityManager {

    livingEntityCount : number;
    entities : Uint32Array;
    availableEntities : Array<number>;
    signatures : Array<Signature>;

    constructor() {
        this.livingEntityCount = 0;
        this.entities = new Uint32Array(MAX_ENTITIES);
        this.signatures = [];

        // Initialize the queue with all possible entities 
        this.availableEntities = [];
        for (let entity = 0; entity < MAX_ENTITIES; entity++) {
            this.availableEntities.push(entity);
            this.signatures.push(new Signature());
        }

    }

    CreateEntity() : number {

        if ( this.livingEntityCount >= MAX_ENTITIES ) {
            // TODO: Rework this situation
            throw new Error("Max # of entities reached!");
        }

        let id = this.availableEntities.shift();
        this.livingEntityCount++;

        if (id !== undefined) {
            return id;
        } else {
            throw new Error("Entity Manager: id is undefined")
        }

    }

    DestroyEntity( id : number ) {

        if (id >= MAX_ENTITIES) {
            throw Error("Entity Manager: id out of range, cannot delete");
        }

        this.signatures[id].reset();

        this.availableEntities.push( id );
        this.livingEntityCount--;

    }

    SetSignature( id : number, signature : Signature) : void {
        if (id >= MAX_ENTITIES) {
            throw Error("Entity Manager: id out of range, cannot set signature");
        }

        this.signatures[id] = signature;
    }

    GetSignature( id : number, ) : Signature {
        if (id >= MAX_ENTITIES) {
            throw Error("Entity Manager: id out of range, cannot get signature");
        }

        return this.signatures[id];
    }

}

export default EntityManager;
