app.controller("networking-zoneController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {
	$scope.ScaleNetworkingPoints = function (table) {
        console.log(table);
        var slug = "";
        if (table == 1) {
        	slug = "scale_1";
        } else if (table == 2) {
        	slug = "scale_2";
        } else if (table == 3) {
        	slug = "scale_3";
        } else if (table == 4) {
        	slug = "scale_4";
        } else if (table == 5) {
        	slug = "scale_5";
        }

        gratification.sendPoints('user_self_activity', slug);
    }


});