import Signature, {doSignaturesMatch} from "./Signature";
import System from "./System";

class SystemManager {

    signatures : Record<string, Signature>;
    systems : Record<string, System>;

    constructor() {
       this.signatures = {};
       this.systems = {}; 
    }

    RegisterSystem( systemName : string, system : System ) : void {
        if (systemName in this.systems) {
            throw Error(`System Manager: system ${systemName} already registered.`);
        }

        this.systems[systemName] = system;
    }   

    SetSignature( systemName : string, signature : Signature ) : void {
        if ( !(systemName in this.systems) ) {
            throw Error(`System Manager: system ${systemName} used before being registered.`);
        }

        this.signatures[systemName] = signature;
    }

    EntityDestroyed(entityID : number) {
        for (const key in this.systems)
		{
			this.systems[key].entities.delete(entityID);
		}
    }

    EntitySignatureHasChanged(entityID : number, entitySignature : Signature) : void {
        for (const key in this.systems) {

            if (this.signatures[key] === undefined) {
                throw Error(`System Manager: System ${key} has no signature`);
            }

            if ( doSignaturesMatch(entitySignature, this.signatures[key]) ) {
                this.systems[key].entities.add(entityID);
            } else {
                this.systems[key].entities.delete(entityID);
            }
        }
    }


}

export default SystemManager;
