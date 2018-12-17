angular.module('quizApp').service('quizHelper'['Question', 'Quiz', function (Quiz, Question) {

    var self = this;
    var questionArray = [];
    this.quiz = {};
    var count = 0;


    var addQuiz = function (quiz) {
        self.quiz = quiz;
    };


    var sendQuestion = function (question) {
        self.question = question;
        if(count <= self.quiz.questionLength){
            pushQuestionToArray(self.question);
            count++;

        }else{
            console.log("Question Limit Exceeded");
        }
    };
    
    
    var pushQuestionToArray = function (question) {
        questionArray.push(question);
    };

    
    var addQuestionToQuiz = function (quiz) {
        questionArray.forEach(function (choice) {
            var choices = choice;
            quiz.questions.push(choices);
        })
    };


    var jsonToParse = function () {
        return questionArray;
    };


    var checkValidQuestion = function (question) {
        var validQuestion = false;
        _.forIn(question, function (value, key) {
            if(value !==""){
                validQuestion = true;
            }else {
                validQuestion = false;
            }
        });
        return validQuestion;
    }

    var saveQuizToJson = function (quiz) {
        var data = JSON.stringify(quiz);
        var blob = new Blob([data], {
            type: 'text/json;charset=utf-8'
        })
    };
    
    var loadQuiz = function (quiz) {
        quizAppScope.quiz = new Quiz();
        quizAppScope.quiz = JSON.parse(quiz);
        if(quizAppScope.quiz.quizName !== ""){
            quizAppScope.quizLoaded = true;
        }
    };



    this.addQuiz = addQuiz;
    this.sendQuestion = sendQuestion;
    this.checkValidQuestion = checkValidQuestion;
    this.pushQuestionToArray = pushQuestionToArray;
    this.jsonToParse = jsonToParse;
    this.addQuestionToQuiz = addQuestionToQuiz;
    this.saveQuizToJson = saveQuizToJson;
    this.loadQuiz = loadQuiz;

}]);