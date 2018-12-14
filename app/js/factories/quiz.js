angular.module('quizApp').factory('Quiz', function (){

    var Quiz = function () {
        var self = this;
        this.deep_copy_whitelist = [
            'quizName', 'author', 'questionsLength', 'questions'
        ];
        this.author = '';
        this.quizName = '';
        this.questionLength = '';
        this.questions = [];
        this.choiceslength = 4;
    }
    return Quiz;
});