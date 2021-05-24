import {System} from "../src/index";

const RoomsSystem = ( {entities} : any ) => {
    console.log(entities);
}

export default new System(RoomsSystem);
