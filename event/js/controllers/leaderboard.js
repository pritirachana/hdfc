app.controller("leaderboardController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout,$http) {

    console.log($rootScope.urlprefix+'/leaderboard');
   
    $scope.fetchLeaderboard = function(){
        $http({
            method: 'POST',
            url: $rootScope.urlprefix+'/leaderboard'
        }).then(function(data){
            console.log(data);
            if(data.data.success == true){

                if(data.data.data.length > 0){

                    $scope.leaderboard = data.data.data;
                    
                }else{
                    $scope.leaderboard = data.data.data;
                }
                
            }else{
                $scope.leaderboard =[];
            }
        }, function(error){
            console.log(error);
        });
    }


    $scope.fetchLeaderboard();
})