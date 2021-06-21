app.controller("peopleController", function($http, $scope, $rootScope, $state, $socket, $compile, $window) {
    // console.log($rootScope.currentUser.first_name);

    $scope.startchat = function() {
        console.log("start chat");
    };


    $scope.sendMsg = function(message) {
        var exhibitor_id = $('#user_socket_id').text();
        console.log(exhibitor_id);
        // console.log(user_id);
        var msg = $('#people-chat-input-text').val();
        $('#people-chat-input-text').val("");
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        if (message != '') {
                var divElement = angular.element(document.querySelector('#people-chat'));
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes();
                $socket.emitIndividualExhibitionChat("avaya_new_msgs_user_online", {"user_data": $rootScope.currentUser, "exhibitor_id" : exhibitor_id, "message" : message});

                let comment = angular.element('<div id="people-chat-text"><div class="chat-text2"><a href="#"><span class="people-chat-name">' + $rootScope.currentUser.name +  '</span></a><span class="people-chat-time">' + time + '</span></div><div class="people-chat-para"><p>' + message + '</p></div></div>');
                divElement.append(comment);
                $compile(divElement)($scope);
                // var objDiv = document.getElementById("#people-chat");
                // objDiv.scrollTop = objDiv.scrollHeight;
                // angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
            }
            $scope.message = '';
    };

    $scope.startVideoChat = function() {
        $state.go('videoconf');
        console.log("start chat");
    }

    $socket.on("avaya_new_msgs_from_user_online", function (data) {
        console.log(data);
    });


    // $socket.onIndividualChat("new_msg", function(data) {
    //     var today = new Date();
    //     var time = today.getHours() + ":" + today.getMinutes();
    //     console.log("new message recieved : " + data.message);
    //     $('#' + data.socket_id).children('i').show();
    //     var divElement = angular.element(document.querySelector('#people-chat'));
    //     let comment = angular.element('<div id="people-chat-text"><div class="chat-text2"><a href="#"><span class="people-chat-name">' + data.user_name + '</span></a><span class="people-chat-time">'+time+'</span></div><div class="people-chat-para"><span>' + data.message + '</span></div></div>');
    //     divElement.append(comment);
    //     $compile(divElement)($scope);
    //     $socket.emit("send_personal_msg", { "user_socket_id": user_socket_id, "message": data.message });
    // });

    $socket.onIndividualChat("new_msg", function(data) {
        console.log(data);
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        // $('#' + data.socket_id).children('i').show();
        // var divElement = angular.element(document.querySelector('#people-chat'));
        // let comment = angular.element('<div id="people-chat-text"><div class="chat-text2"><a href="#"><span class="people-chat-name">' + data.user_name + '</span></a><span class="people-chat-time">'+time+'</span></div><div class="people-chat-para"><span>' + data.message + '</span></div></div>');
        // divElement.append(comment);
        // $compile(divElement)($scope);
        // $socket.emit("send_personal_msg", { "user_socket_id": user_socket_id, "message": data.message });
    });

     $socket.onIndividualExhibitionChat("chat_message_send_data", function(data) {
        console.log(data);
        // var today = new Date();
        // var time = today.getHours() + ":" + today.getMinutes();
        // console.log("new message recieved : " + data.message);
        // $('#' + data.socket_id).children('i').show();
        // var divElement = angular.element(document.querySelector('#people-chat'));
        // let comment = angular.element('<div id="people-chat-text"><div class="chat-text2"><a href="#"><span class="people-chat-name">' + data.user_name + '</span></a><span class="people-chat-time">'+time+'</span></div><div class="people-chat-para"><span>' + data.message + '</span></div></div>');
        // divElement.append(comment);
        // $compile(divElement)($scope);
        // $socket.emit("send_personal_msg", { "user_socket_id": user_socket_id, "message": data.message });
    });

    $socket.emitEventGroupChat("event_join", $rootScope.currentUser);

    // $socket.emitEventGroupChat("showonlineusers");

    // $socket.onEventGroupChat("returnonlineusers", function (data) {

        
    //     angular.forEach(data, function (value, key) {
                
    //             value = JSON.parse(value);
    //             var divElement = angular.element(document.querySelector('#people-text'));
    //             let comment = angular.element('<a href="#" onclick="view20(\''+value.id+'\', \''+value.name+'\')"><div class="people-data"><img class="people-img" src="images/ap.svg" alt="Avatar" ><span class="people-name">'+ value.firstName + ' ' + value.lastName +'</span><span class="active-chat-icon"> <i class="green-circle" class="fas fa-circle"></i></span></div></a>  ');
    //             divElement.append(comment);
    //             $compile(divElement)($scope);
    //         });
    // });


    // $scope.inviteToVideo = function() {
    //     var user_socket_id = $('#user_socket_id').text();
    //     var msg = $('#people-chat-input-text').val();
    //     $('#people-chat-input-text').val("");
    //     // console.log(msg);
    //     $http({
    //         method: "POST",
    //         url : 'https://avayaapis.virtex.in/apiavaya/video/generatesession'
    //     }).then(function successCallback (response) {
    //         var msg = 'I would like to invite you to a video chat, please <a href="https://avaya.virtex.in/event/#!/videoconf/0/'+response.data.session_id+'" id="people-chat-button" type="button"><i class="fas fa-video">&nbsp; &nbsp;</i>Join</a>';
    //         var divElement = angular.element(document.querySelector('#people-chat'));
    //         let comment = angular.element('<div id="people-chat-text"><div class="chat-text2"><a href="#"><span class="people-chat-name">' + $rootScope.currentUser.firstName + ' ' + $rootScope.currentUser.lastName + '</span></a><span class="people-chat-time">11:00</span></div><div class="people-chat-para"><p>' + msg + '</p></div></div>');
    //         divElement.append(comment);
    //         $compile(divElement)($scope);
    //         var user_name = $rootScope.currentUser.first_name + " " + $rootScope.currentUser.last_name;
    //         $socket.emit("send_personal_msg", { "user_name": user_name, "user_socket_id": user_socket_id, "message": msg });
    //         $state.go('https://avaya.virtex.in/event/#!/videoconf/1/'+response.data.session_id);
    //         // var targetElement = 'publisher';
    //         //     publisher = OT.initPublisher(targetElement, null, function(error) {
    //         //     if (error) {
    //         //         // The client cannot publish.
    //         //         // You may want to notify the user.
    //         //         alert("You cannot your stream");
    //         //     } else {
    //         //         console.log('Publisher initialized.');
    //         //     }
    //         // });
            
    //     }, function errorCallback () {

    //     });
    // };

});
