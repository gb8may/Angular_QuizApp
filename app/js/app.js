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