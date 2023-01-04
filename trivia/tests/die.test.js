class Die {
    #value;
    constructor(value) {
        if(value < 1 || value > 6) {
            throw new Error("incorrect value");
        }
        this.#value = value;
    }
}

describe("die", () => {

    it("should not have value lower than 1", () => {
        const roll = () => new Die(0);
        expect(roll).toThrow("incorrect value");
    });


    it("should not have value greater than 6", () => {
        const roll = () => new Die(7);
        expect(roll).toThrow("incorrect value");
    });

    it.each("should be odd when the value is 1, 3, 5", () => {
       const die = new Die(1);
       expect(die.isOdd());
    });

});