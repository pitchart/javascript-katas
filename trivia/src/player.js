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
    addCoin() {
        this.#purse++;
    }
    goToPenaltyBox() {
        this.#isInPenaltyBox = true;
    }
    leavePenaltyBox() {
        this.#isInPenaltyBox = false;
    }

    moveTo(place) {
        this.#place=place;
    }
}

module.exports= Player;