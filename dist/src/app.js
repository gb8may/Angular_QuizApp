var quizApp = angular.module('quizApp', []);

quizApp.constant('appInformation', {
    appName: 'Quiz Home',
    version: '1.0'
});

quizApp.constant('appMode',{
    STARTAPP: '0',
    CREATEQUIZ: '1',
    ADDQUESTION: '2',
    SUCCESSQUIZ: '3',
    RESULTQUIZ: '4',
    TAKEQUIZ: '5'
});

quizApp.constant('takeQuizMode',{
    SELECTQUIZ: '6',
    TAKEQUESTION: '7',
    SHOWRESULTS: '8'
});
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
angular.module('quizApp').directive('takeQuizContainer', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/Modal/takeQuizContainer.html'
    }
});
angular.module('quizApp').directive('quizSuccessContainer', function () {
    return{
        restrict: 'E',
        templateUrl: 'app/templates/Modal/quizSuccessContainer.html'
    }
});
angular.module('quizApp').directive('quizContainer', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/Modal/quizContainer.html'
    }
})
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
angular.module('quizApp').factory('Question', function (){

    var Question = function () {
        var self = this;
        this.question = '';
        this.choices = {
            choice1: '',
            choice2: '',
            choice3: '',
            choice4: ''
        };
        this.answer = '';
    };

    return Question;

});
angular.module('quizApp').controller('quizController', ['$scope','Quiz', 'Question','appMode','appInformation', 'takeQuizMode', '$window','quizHelper', function (
    $scope,
    Quiz,
    Question,
    appMode,
    appInformation,
    takeQuizMode,
    $window,
    quizHelper
) {


    window.quizAppScope = $scope;

    // These are application modes
    $scope.appMode = appMode;
    $scope.takeQuizMode = takeQuizMode;
    $scope.appInformation = appInformation;


    $scope.quizMode = appMode.STARTAPP;
    $scope.quizLoaded = false;
    $scope.startQuiz = false;


    // Using factories
    $scope.quiz = new Quiz();
    $scope.question = new Question();


    // Helper variable
    $scope.potentialQuestion = null;
    $scope.count = 0;
    $scope.countQuestion = 1;
    $scope.questionLimitExceeded = false;


    // Validation variable
    $scope.validQuestion = true;


    //Checking question variable
    $scope.currentQuestion = null;
    $scope.questionAnswered = false;
    $scope.correctAnswer = [];


    $scope.changeAppMode = function (mode) {
        $scope.question = new Question();
        $scope.quizMode = mode;
        $scope.quizLoaded = false;
    };


    // This function will clear the forms
    $scope.clearField = function () {
        $scope.quiz = new Quiz();
        $scope.question = new Question();
    };


    //This function will create a quiz for US
    $scope.addQuiz = function () {
        quizHelper.addQuiz($scope.quiz);
        if (appMode.CREATEQUIZ){
            $scope.changeAppMode(appMode.ADDQUESTION);
        }
    };


    $scope.addQuestion = function () {
        $scope.validQuestion = quizHelper.checkValidQuestion($scope.question);
        if (!$scope.validQuestion){
            return;
        }

        if ($scope.question.answer === 0){
            $scope.validQuestion = false;
            return;
        }

        quizHelper.sendQuestion($scope.question);
        if($scope.countQuestion < $scope.quiz.questionLength){
            $scope.countQuestion++;
            $scope.question = new Question();
        }else {
            $scope.questionLimitExceeded = true;
            quizHelper.addQuestionToQuiz($scope.quiz);
            $scope.changeAppMode(appMode.SUCCESSQUIZ);
        }
    };

    $scope.buildQuiz = function () {
        quizHelper.saveQuizToJson($scope.quiz);
    }

}]);



angular.module('quizApp').directive('questionForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/forms/questionForm.html'
    }
})
angular.module('quizApp').directive('openQuiz', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/forms/openQuiz.html'
    }
})
angular.module('quizApp').directive('createQuizForm', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/forms/createQuizForm.html'
    }
});