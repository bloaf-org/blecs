

class Signature {

    buffer : Uint8Array;
    length : number;

    constructor(length : number = 10) {
        this.length = length;
        this.buffer = new Uint8Array(this.length);
    }

    resize(newSize : number) {
        let prev = this.buffer;
        this.buffer = new Uint8Array(newSize);

        for (let i = 0; i < prev.length; i++) {
            this.buffer[i] = prev[i];
        }
    }

    // get a particular bit
    get() {

    }

}

export default Signature;
