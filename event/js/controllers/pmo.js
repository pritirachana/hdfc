app.controller("pmoController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {

    $scope.showpopvideo = false;

    $scope.openVideo = function() {
        $scope.showpopvideo = true;
    }

    $scope.closeVideo = function() {
        $scope.showpopvideo = false;
    }

});