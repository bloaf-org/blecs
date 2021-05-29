
class System {

    entities : Set<number>;
    handler : CallableFunction;

    constructor(handler : CallableFunction) {
        this.entities = new Set();
        this.handler = handler;
    }

    update(dt : number) {
        this.handler({entities: this.entities, dt: dt});
    }

}

export default System;
