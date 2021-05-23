import { MAX_ENTITIES } from './EntityManager';

class System {

    entities : Uint32Array;

    constructor() {
        this.entities = new Uint32Array(MAX_ENTITIES);
    }

    

}

export default System;
