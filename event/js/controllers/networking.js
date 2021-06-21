app.controller("networkingController", function($scope, $rootScope, $state, $compile, $window, $socket) {

    $rootScope.loggedin = true;
    $scope.startVideosChat = function() {
        $state.go('videoconf');
        console.log("start chat");

    }


    // $socket.emit('showonlineusers', $rootScope.currentUser);

    
    $socket.onIndividualExhibitionChat('new_msgs_from_exhibitor_online', function(data) {
        console.log(data);
        // var divNetElement = angular.element(document.querySelector('#net-contact-box'));
        // // console.log(data);
        // divNetElement.empty();
        // for (const [key, value] of Object.entries(data)) {
        //     var user = JSON.parse(value);
        //     console.log(user.country);
        //     var user_name = user.firstName;

        //     // var first_val = $rootScope.getUserName(user.first_name, user.last_name);
        //     divNetElement.append($compile(angular.element('<div id="net-people-data3"><img class="net-people-img3" src="images/flags/' + user.country + '.svg"  alt="Avatar" ><p class="net-people-name3">' + user.firstName + '</p><button id="people-chat-button" ng-click=startVideosChat()><i class="fas fa-video">&nbsp; &nbsp; </i>Invite to call</button></div>'))($scope));
        // }
    });

    $scope.PresenceNetworkingPoints = function (table) {
        console.log(table);
                var slug = "";
        if (table == 1) {
            slug = "presence_1";
        } else if (table == 2) {
            slug = "presence_2";
        } else if (table == 3) {
            slug = "presence_3";
        } else if (table == 4) {
            slug = "presence_4";
        } else if (table == 5) {
            slug = "presence_5";
        }

        gratification.sendPoints('user_self_activity', slug);
    }

});