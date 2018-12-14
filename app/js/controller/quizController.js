angular.module('quizApp').controller('quizController', ['$scope','Quiz','Question','appMode','appInformation','takeQuizMode', '$window', function (
    $scope,
    Quiz,
    Question,
    appMode,
    appInformation,
    takeQuizMode,
    $window
) {


    windows.quizAppScope = $scope;

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
    $scope.validQiuestion = true;


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
    $scope.clearFields = () {
        $scope.quiz - new Quiz();
        $scope.question = new Question();
    }



}]);