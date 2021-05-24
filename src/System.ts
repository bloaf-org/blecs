
class System {

    entities : Set<number>;
    handler : CallableFunction;

    constructor(handler : CallableFunction) {
        this.entities = new Set();
        this.handler = handler;
    }

    update() {
        this.handler({entities: this.entities});
    }

}

export default System;
