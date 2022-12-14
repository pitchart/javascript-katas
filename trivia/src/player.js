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

    moveTo(place) {
        this.#place=place;
    }
}

module.exports= Player;