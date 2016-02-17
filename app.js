var myApp = angular.module('myApp', []);

Array.prototype.contains = function(obj){
    var i = this.length;
    while (i--){
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//controller
myApp.controller('mainController', ['$scope', '$filter', '$log', function($scope, $filter, $log) {

	$scope.words = ["angular","java","script","html","python","jquery","compile","code","program","error","mysql","chrome","text","bootstrap",
 "ruby","node","eclipse","firefox","microsoft","linux","apple"];
    $scope.word = $scope.words[getRandomInt(0, $scope.words.length-1)];
    $scope.lives = 5;
    $scope.letter = '';
    $scope.missed =[];
    $scope.guessed = [];
    $scope.won = false;
    $scope.lost = false;

    $scope.reset = function() {
        $scope.missed =[];
        $scope.guessed = [];
        $scope.won = false;
        $scope.lost = false;
        $scope.lives = 5;
        $scope.word = $scope.words[getRandomInt(0, $scope.words.length-1)];
    };

    $scope.guess =  function(){
        $scope.letter = $filter('uppercase')($scope.letter);
        if($scope.word.indexOf($scope.letter) !== -1){
            $scope.guessed.push($scope.letter);
        }else{
            $scope.missed.push($scope.letter);
            $scope.lives--;
        }
        if($scope.lives === 0){
            $scope.lost = true;
        }
        $scope.letter = '';
    };

    $scope.showBoard = function() {
        var board = '';
        var missing = 0;
        for(var i = 0 ; i < $scope.word.length ; i++){
            if($scope.guessed.contains($scope.word[i])){
                board += $scope.word[i];
            }else{
                board += '_';
                missing++;
            }
            board += ' ';            
        }
        if(missing === 0){
            $scope.won = true;
        }
        return board;
    };  

}]);
