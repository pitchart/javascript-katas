class QuestionsDeck {

    questions = new Map();

    addQuestion(category, label) {
        this.questions.set(category, []);
        this.questions.get(category).push(label);
    }

    count(category) {
        return this.questions.get(category).length;
    }
};

describe("questions deck", () => {

    it("should have questions for a category", () => {
        const deck = new QuestionsDeck();

        deck.addQuestion("category-name", "question-name");

        expect(deck.count("category-name")).toBe(1);
    });
    
});