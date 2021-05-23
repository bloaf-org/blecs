import ComponentManager from "./ComponentManager";
import componentDefinitions from "./components";
import EntityManager from "./EntityManager";

export interface initReturn {
    entityMgr: EntityManager;
    componentMgr: ComponentManager;
}

function init() : initReturn {

    let entityMgr = new EntityManager();
    let componentMgr = new ComponentManager();

    // Register all the default / base
    // blecs component types
    componentDefinitions.forEach(cdef => {
        componentMgr.RegisterComponentType(cdef);
    });
    
    return {
        entityMgr: entityMgr,
        componentMgr: componentMgr
    }
}

export default init;
