app.controller("redeemController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout,$http) {

    $scope.fetchRedeem = function(){
        $http({
            method: 'GET',
            url: $rootScope.urlprefix+'/redeemlist',
            params:{user_id:$rootScope.currentUser.id}
        }).then(function(data){
            if(data.data.status == true){

                if(data.data.data.length > 0){

                    $scope.redeems = data.data.data;
                    $scope.current_user_leaderboard = data.data.user;
                    
                }else{
                    $scope.users = [];
                    $scope.redeems = [];
                }
                
            }else{
                $scope.reedem =[];
            }
        }, function(error){
            console.log(error);
        });
    }
    $scope.fetchRedeem();

    $scope.redeemCoupon = function(redeem){
       console.log(redeem);

        $http({
            method: 'POST',
            url: $rootScope.urlprefix+'/redeempoints',
            data:{user_id:$rootScope.currentUser.id,redeem:redeem.id}
            
        }).then(function(data){
            if(data.data.status == true){

                $scope.error_mesage = '';
                $scope.fetchRedeem();
                
            }else{
                $scope.error_mesage = `You didn't have enough points to redeem`
            }
        }, function(error){
            console.log(error);
        });
    }
});