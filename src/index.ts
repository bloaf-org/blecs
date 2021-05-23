import EntityManager, {MAX_ENTITIES} from "./EntityManager"; 
import ComponentArray from "./ComponentArray";
import ComponentManager from "./ComponentManager";

import init, {initReturn} from "./init";

// for now, if you import blecs
// it will initialize itself globally

let ecs : initReturn = init();

let entityMgr = ecs.entityMgr;
let componentMgr = ecs.componentMgr;

export {
    MAX_ENTITIES,
    EntityManager,
    ComponentArray,
    ComponentManager,
    entityMgr,
    componentMgr
};
