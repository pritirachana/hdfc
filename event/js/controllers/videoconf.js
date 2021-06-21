app.controller("videoConfController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout, $stateParams, $http, $sce,gratification) {
	var apiKey = '46963874';
    console.log($stateParams);
    var room_id = $stateParams.publisher;
    gratification.sendPoints('user_self_activity','networking_zone_video_connect');
    var url = "https://tokbox.com/embed/embed/ot-embed.js?embedId=667df4f8-7422-4893-9ea7-88033c2367a8&room="+room_id+"&iframe=true";
    // url = 'https://tokbox.com/embed/embed/ot-embed.js?embedId=667df4f8-7422-4893-9ea7-88033c2367a8&room=' + room_id;
    $scope.video_url = $sce.trustAsResourceUrl(url);
    // if ($stateParams.publisher == 1) {
    //     $http({
    //         method: "POST",
    //         url : 'https://avayaapis.virtex.in/apiavaya/video/generatepublishertoken',
    //         data : {"session_id" : $stateParams.session_id}
    //     }).then(function successCallback (response) {
    //         if (OT.checkSystemRequirements() == 1) {
    //             console.log(apiKey);
    //             var session = OT.initSession(apiKey, response.data.data.session_id);
    //             // session.connect(response.data.data.token, function(error) {
    //             //         if (error) {
    //             //             console.log("Error connecting: ", error.name, error.message);
    //             //         } else {
    //             //             console.log("Connected to the session.");
    //             //             if (session.capabilities.publish == 1) {
    //             //                 var publisher;
    //             //                 var targetElement = 'publisher';
    //             //                 publisher = OT.initPublisher(targetElement, null, function(error) {
    //             //             if (error) {
    //             //                 // The client cannot publish.
    //             //                 // You may want to notify the user.
    //             //             } else {
    //             //                 console.log('Publisher initialized.');
    //             //             }
    //             //             });
    //             //             }
    //             //         }
    //             //     });
    //           } else {
    //             // The client does not support WebRTC.
    //             // You can display your own message.
    //           }
        
            
    //     }, function errorCallback () {
    
    //     });
    // } else if ($stateParams.publisher == 0) {
    //     console.log($stateParams.publisher);
    //     $http({
    //         method: "POST",
    //         url : 'https://avayaapis.virtex.in/apiavaya/video/generatesubscribertoken',
    //         data : {"session_id" : $stateParams.session_id}
    //     }).then(function successCallback (response) {
    //         console.log(response);
    //         if (OT.checkSystemRequirements() == 1) {
    //             console.log(apiKey);
    //             var session = OT.initSession(apiKey, response.data.data.session_id);
    //             session.connect(response.data.data.token, function(error) {
    //                     // if (error) {
    //                     //     console.log("Error connecting: ", error.name, error.message);
    //                     // } else {
    //                     //     console.log("Connected to the session.");
    //                     //     if (session.capabilities.publish == 1) {
    //                     //         var publisher;
    //                     //         var targetElement = 'subscriber';
    //                     //         publisher = OT.initPublisher(targetElement, null, function(error) {
    //                     //         if (error) {
    //                     //             console.log(error);
    //                     //             // The client cannot publish.
    //                     //             // You may want to notify the user.
    //                     //         } else {
    //                     //             console.log('Subscriber initialized.');
    //                     //         }
    //                     //         });
    //                     //     }
    //                     // }
    //                 });
    //           } else {
    //             // The client does not support WebRTC.
    //             // You can display your own message.
    //           }
        
            
    //     }, function errorCallback () {
    
    //     });
    // }

    // $scope.destroyConf = function() {
    //     session.unsubscribe(subscriber);
    //     session.disconnect();
    //     $state.go('reception');
    // }

    // Handling all of our errors here by alerting them
    
    // function handleError(error) {
    //     if (error) {
    //         alert(error.message);
    //     }
    // }
    // (optional) add server code here

    // var session = OT.initSession(apiKey, sessionId);

    // var name = $rootScope.currentUser.first_name + " " + $rootScope.currentUser.last_name;
    // var publisherOptions = {
    //     fitMode: "cover",
    //     width: '62vh',
    //     height: '62vh',
    //     name: name,
    //     style: { nameDisplayMode: "off" },
    //     style: { buttonDisplayMode: 'on' },
    // }
    // var publisher = OT.initPublisher('publisher', publisherOptions);
    // session.publish(publisher);
    // Subscribe to a newly created stream
    // var name = $rootScope.currentUser.first_name + " " + $rootScope.currentUser.last_name;
    // session.on('streamCreated', function(event) {
    //     session.subscribe(event.stream, 'subscriber', {
    //         fitMode: "cover",
    //         width: '62vh',
    //         height: '62vh',
    //         name: name,
    //         style: { nameDisplayMode: "off" },
    //         style: { buttonDisplayMode: 'on' },
    //     });
    // });
    // // Create a publisher


    // // Connect to the session
    // session.connect(token, function(error) {
    //     // If the connection is successful, initialize a publisher and publish to the session
    //     if (error) {
    //         handleError(error);
    //     } else {
    //         session.publish(publisher, handleError);
    //     }
    // });
    });