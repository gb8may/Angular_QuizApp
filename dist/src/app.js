var quizApp = angular.module('quizApp',[]);

quizApp.constant('appInformation', {
    appName: 'Quiz App',
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

angular.module('quizApp').controller('quizController', ['$scope', function ($scope) {


}]);