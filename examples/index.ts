import ecs, {Signature} from "../src/index";

import RoomsSystem from "./exampleSystem";
import Room from "./exampleComponent";

let entities = [];

for (let i = 0; i < 10; i++) {
    entities.push(ecs.CreateEntity());
}

ecs.RegisterComponent("room");


ecs.RegisterSystem("roomSystem", RoomsSystem);

// subscribe to entities with the room component
let sig = new Signature();
sig.set(ecs.GetComponentType("room"), 1);
ecs.SetSystemSignature("roomSystem", sig);




for (let i = 0; i < entities.length; i++) {
    ecs.AddComponent(entities[i], "room", Room);
}


for ( let step = 0; step < 100; step++ ) {
    RoomsSystem.update();
}

