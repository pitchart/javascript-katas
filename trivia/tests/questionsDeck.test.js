class QuestionsDeck {

    questions = new Map();

    addQuestion(category, label) {
        if (!this.questions.has(category)) {
            this.questions.set(category, []);
        }

        this.questions.forEach(
            function(questions){
                if (questions.includes(label)) {
                    throw new Error("Question already exists");
                }
            }
        )
        
        this.questions.get(category).push(label);
    }

    count(category) {
        return this.questions.get(category).length;
    }
};

describe("questions deck", () => {
    it("should have questions for categories", () => {
        const deck = new QuestionsDeck();

        deck.addQuestion("category-name", "question-name");
        deck.addQuestion("category-name", "question-name2");

        deck.addQuestion("category-name2", "question-name3");

        expect(deck.count("category-name")).toBe(2);
        expect(deck.count("category-name2")).toBe(1);
    });

    it("should not have two same questions for a category", () => {
        const deck = new QuestionsDeck();

        deck.addQuestion("category-name", "question-name");
        const addSecondQuestion = () => deck.addQuestion("category-name", "question-name");
        const addQuestionToOtherCategory = () => deck.addQuestion("category-name2", "question-name");

        expect(addSecondQuestion).toThrow("Question already exists");
        expect(addQuestionToOtherCategory).toThrow("Question already exists");
    });
});