
class ComponentArray {

    size : number;

    components : Array<any>;
    entityToIndexMap : Record<number, number>;
    indexToEntityMap : Record<number, number>;

    constructor() {

        this.size = 0;

        this.components = [];

        this.entityToIndexMap = {};
        this.indexToEntityMap = {};
    }

    AddComponent(entityID : number, component : any) {

        if (entityID in this.entityToIndexMap) {
            throw new Error("Component Array: Entity added twice.");
        }

        let newIndex : number = this.size;
        this.entityToIndexMap[entityID] = newIndex;
        this.indexToEntityMap[newIndex] = entityID;

        this.components[newIndex] = component;

        this.size++;

    }

    /*
    Instead of actually deleting the data we simply 
    keep an array of components and when we "delete"
    something we actually just take the last element 
    in the array and move it into the slot to be deleted 
    then decrement the size of the array so other actors 
    don't accidentaly loop over stale data. 
    */
    DeleteComponent(entityID : number) {
        if ( !(entityID in this.entityToIndexMap) ) {
            throw new Error("Removing non-existent component");
        }

        // swap last element in for comp to be deleted
        let indexOfEntityToBeDeleted = this.entityToIndexMap[entityID];
        let indexOfLast = this.size -1;
        this.components[indexOfEntityToBeDeleted] = this.components[indexOfLast];

        // update mapping
        let entityOfLast = this.indexToEntityMap[indexOfLast];
        this.entityToIndexMap[entityOfLast] = indexOfEntityToBeDeleted;
        this.indexToEntityMap[indexOfEntityToBeDeleted] = entityOfLast;

        delete this.entityToIndexMap[entityID];
        delete this.indexToEntityMap[indexOfLast];

        this.size--;

    }

    GetData(entityID : number) : any {
        if (!(entityID in this.entityToIndexMap)) {
            throw Error("ComponentArray: GetData failed, entityID not found.");
        }

        return this.components[this.entityToIndexMap[entityID]];
    }

    EntityDestroyed(entityID : number) : void {
        if (entityID in this.entityToIndexMap) {
            this.DeleteComponent(entityID);
        }
    }

}

export default ComponentArray;
