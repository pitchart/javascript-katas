class Die {
    #value;

    constructor(value) {
        if (value < 1 || value > 6) {
            throw new Error("incorrect value");
        }
        this.#value = value;
    }

    isOdd() {
        return this.#value % 2 !== 0;
    }

    get value() {
        return this.#value;
    }
}

module.exports = Die;