
class Signature {

    buffer : Uint8Array;
    length : number;

    constructor(length : number = 50) {
        this.length = length;
        this.buffer = new Uint8Array(this.length);
    }

    resize(newSize : number) {
        let prev = this.buffer;
        this.buffer = new Uint8Array(newSize);

        for (let i = 0; i < prev.length; i++) {
            this.buffer[i] = prev[i];
        }

        this.length = newSize;
    }

    // get a particular bit
    get(index : number) : number {
        return this.buffer[index];
    }

    // set a particular bit
    set(index : number, value : number) : void {

        if (index >= this.length) {

            if (this.length - index > 1) {
                throw new Error(`
                    Index out of range by more than the 
                    intended resize diff of 1
                    `);
            }

            this.resize(this.length + 5);
        }

        this.buffer[index] = value;
    }

    reset() : void {
        for (let i = 0; i < this.length; i++) {
            this.buffer[i] = 0;
        }
    }

}

// hacky workaround to avoid figuring out how 
// to properly to bitwise operations with 
// javascript datatypes (easy with bitset in cpp)

export function doSignaturesMatch(siga : Signature, sigb : Signature) : boolean {
    
    if (siga.length != sigb.length) {
        throw new Error(`
            ERROR: Signature lengths do not match...
                   time to implement a global resizing
                   of signatures!
        `);
    }
    
    for (let i = 0; i < siga.length; i++) {
        if ( siga.buffer[i] != sigb.buffer[i] ) {
            return false
        }
    }

    return true;

}

export default Signature;
