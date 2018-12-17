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


