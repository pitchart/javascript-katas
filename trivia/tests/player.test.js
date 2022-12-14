class Player {

    #name = '';
    #place = 0;
    #purse = 0;
    #isInPenaltyBox = false;

    constructor(name) {
        this.#name = name;
    }

    getName = () => this.#name;
    getPlace = () => this.#place;
    getPurse = () => this.#purse;
    isInPenaltyBox = () => this.#isInPenaltyBox;

}

describe("Player", () => {
    it("should be initialized", () => {
        const player = new Player('Player One')

        expect(player.getName()).toBe('Player One');
        expect(player.getPlace()).toBe(0);
        expect(player.getPurse()).toBe(0);
        expect(player.isInPenaltyBox()).toBe(false);
    });
});