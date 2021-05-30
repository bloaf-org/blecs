# blecs

An entity component system implementation for three.js webapps. 

## Basic overview

* entities are simply integer IDs
* components are pieces of data (there are currently no restrictions on what a component can be)
* systems are behaviour which operates on components

A system "subscribes" to a set of components and will operate on any entity which includes all these components. Note, an entity can have more components then a system and still be operated on as a system only requires that all of its component requirements are met.

![image](https://user-images.githubusercontent.com/24901494/120112282-2acd4f80-c143-11eb-8d15-5caeb25bc279.png)

### Signatures

Signatures are used to match systems to entities. They are simply an array of integers which act as a record for which components an entity contains and for systems, which components a system requires entities to have in order to be operated on. 

![image](https://user-images.githubusercontent.com/24901494/120112997-77fef080-c146-11eb-9318-dfe76a7c9972.png)

![image](https://user-images.githubusercontent.com/24901494/120113001-80572b80-c146-11eb-884b-045413fad053.png)


## Quick start

### Installation

```bash
npm install blecs
```

### Usage

```typescript
import * as THREE from "three";
import ecs, {Signature, System} from "blecs";

ecs.RegisterComponent("position");
ecs.RegisterComponent("name");

// create a set of entities with names and positions

for ( let i = 0; i < 100; i++) {
  let entityID : number = ecs.CreateEntity();
  // attach position component
  ecs.AddComponent(entityID, "position", new THREE.Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10));
  // attach name component
  ecs.AddComponent(entityID, "name", `physicsObject${i}`); // add name
}

// example physics system

const physics = ({dt, entities}) => {
  entities.forEach((entityID : number) => {
    let position = ecs.GetComponent(entityID, "position");
    
    // gravity
    if (position.y > 0) {
      position.y -= -9.8 * dt;
    }
  );
}
const PhysicsSystem = System(physics);

let sig = new Signature();
// "subscribe" to entities which have a position component
renderSig.set(ecs.GetComponentType("position"), 1);
ecs.RegisterSystem("physicsSystem", PhysicsSystem);
ecs.SetSystemSignature("physicsSystem", sig);

const clock : THREE.Clock = new THREE.Clock();
function update() {
    requestAnimationFrame( () => update() );

    let dt : number = clock.getDelta();

    Physics.update(dt);

};

update();

```
