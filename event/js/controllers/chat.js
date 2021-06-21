app.controller("chatController", function($scope, $rootScope, $state, $socket, $compile, $window, $location) {

    if (angular.isDefined($rootScope.currentUser)) {

        $rootScope.currentEvent = '5ee0c7ff77b77ebaaaecbaab';
       
        $socket.emit('totalusers');

        $scope.total_online_users = 0;

        $rootScope.chat = true;

        console.log($location.path());
        var splitUrl = $location.path().split('/');
        console.log(splitUrl);
        console.log(splitUrl[1]);

        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();

        $scope.sendMessage = function(message) {
            var exhibitor_id = $('#user_socket_id').text();
            console.log("exhibitor_id", exhibitor_id)
            console.log($rootScope.currentUser);
            // if (message != '') {
            //     var divElement = angular.element(document.querySelector('.message-container'));
            //     var today = new Date();
            //     var time = today.getHours() + ":" + today.getMinutes();
            //     $socket.emitIndividualExhibitionChat("avaya_new_msgs_user", {"user_data": $rootScope.currentUser, "exhibitor_id" : 10, "message" : message});
            //     // $socket.emitEventGroupChat('groupchat', { event_id: $rootScope.currentEvent, message: message, user: $rootScope.currentUser });
            //     let comment = angular.element('<div class="expo-chat"><div class="name-time"><h2 class="expo-name">' + $rootScope.currentUser.name +  '</h2><h2 class="expo-time">' + time + '</h2></div><div class="expo-message"><h2>' + message + '</h2></div></div>');
            //     divElement.append(comment);
            //     $compile(divElement)($scope);
            //     angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
            // }
            // $scope.message = '';
        }

        //   $socket.onSessionGroupChat('session_chat_data',  function(message) {
        //     console.log(message);
        // });
    }
});
