angular.module('quizApp').run(['$templateCache', function($templateCache) {$templateCache.put('app/templates/menubar.html','<nav class="navbar nav-justified">\n    <div class="nav justify-content-center">\n        <input type="button" class="btn btn-primary" value="Quiz Home" />\n        <input type="button" class="btn btn-primary" value="Create Quiz" />\n        <input type="button" class="btn btn-primary" value="Take Quiz" />\n    </div>\n</nav>');}]);