class QuestionsDeck {

    questions = new Map();

    addQuestion(category, label) {
        if (!this.questions.has(category)) {
            this.questions.set(category, []);
        }

        this.questions.forEach(
            function (questions) {
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

    getNextQuestion(category) {
        if (!this.questions.has(category) || this.questions.get(category).length <= 0) {
            throw new Error("no more question");
        }
        return this.questions.get(category).shift();
    }
}

module.exports = QuestionsDeck;