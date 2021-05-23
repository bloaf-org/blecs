export const MAX_ENTITIES = 100;

/*
The EntityManager is in charge of distributing
ids and keeping track of what is in use or not
*/
class EntityManager {

    livingEntityCount : number;
    entities : Uint32Array;
    availableEntities : Array<number>;
    

    constructor() {
        this.livingEntityCount = 0;
        this.entities = new Uint32Array(MAX_ENTITIES);

        // Initialize the queue with all possible entities 
        this.availableEntities = [];
        for (let entity = 0; entity < MAX_ENTITIES; entity++) {
            this.availableEntities.push(entity);
        }

    }

    createEntity() : number {

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

    destroyEntity( id : number ) {

        if (id >= MAX_ENTITIES) {
            throw Error("Entity Manager: id out of range, cannot delete");
        }

        this.availableEntities.push( id );
        this.livingEntityCount--;

    }

}

export default EntityManager;
