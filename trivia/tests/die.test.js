const Die = require("../src/die");

describe("die", () => {

    it("should not have value lower than 1", () => {
        const roll = () => new Die(0);
        expect(roll).toThrow("incorrect value");
    });


    it("should not have value greater than 6", () => {
        const roll = () => new Die(7);
        expect(roll).toThrow("incorrect value");
    });

    it.each([1, 3, 5])("should be odd when the value is %i", (value) => {
        const die = new Die(value);
        expect(die.isOdd()).toBeTruthy();
    });

    it.each([2, 4, 6])("should not be odd when the value is %i", (value) => {
        const die = new Die(value);
        expect(die.isOdd()).toBeFalsy();
    });

    it("should get value", () => {
        const die = new Die(2);
        expect(die.value).toBe(2);
    });

});