app.controller("expocategoryController", function($scope, $rootScope,$http, $state, $compile, $window, $socket, $timeout,$stateParams) {
    console.log($stateParams.id);
    var req = {
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/get-expo-by-id',
        data: {"eventId":1,"accessId":$stateParams.id}
    }

    $http(req).then(function(data){
        console.log(data);
        $rootScope.expobyCategory = data.data.data;
    });
});