const QuestionsDeck = require('./questionsDeck');
const Category = require("./category");

class QuestionsDeckFactory {

    static create() {
        const deck = new QuestionsDeck();
        for (let category in Category) {
            let categoryElement = Category[category];
            for (let i = 0; i < 50; i++) {
                deck.addQuestion(categoryElement, `${categoryElement} Question ${i}`);
            }
        }
        return deck;
    }
}
module.exports = QuestionsDeckFactory;