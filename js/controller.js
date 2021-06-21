app.controller("mainController", function($scope, $http, $state, $rootScope, $window, $socket, $localStorage, $compile, $filter) {

    $rootScope.concert_started = 0;
    $rootScope.userwelcomefirst = 0;

    $rootScope.getUserName = function(first_name, last_name) {
        return first_name.charAt(0).toLowerCase() + last_name.charAt(0).toLowerCase();
    }



    $rootScope.user_name = $rootScope.getUserName($rootScope.currentUser.first_name, $rootScope.currentUser.last_name);

    // var localdata = JSON.parse(localStorage.getItem("ngStorage-currentUser"));
    // localdata.socket_id = 
    // console.log(localdata);

    // console.log($socket.socketId());


    $socket.on('onlineusers', function(data) {
        $scope.total_online_users = data;
    });

    $rootScope.logout = function() {
        // console.log(JSON.parse($localStorage));
        delete $localStorage.currentUser;
        $window.location.replace("https://ospas.virtex.in");
    }


    $scope.startchat = function() {
        console.log("start chat");
    };


    $socket.emit('showonlineusers', $rootScope.currentUser);

    $scope.startVideosChat = function() {
        $state.go('videoconf');
        console.log("start chat");

    }

    $socket.on('returnonlineusers', function(data) {
        var divElement = angular.element(document.querySelector('#people-text'));
        divElement.empty();
        var divNetElement = angular.element(document.querySelector('#net-contact-box'));
        // console.log(data);
        divNetElement.empty();
        for (const [key, value] of Object.entries(data)) {
            var user = JSON.parse(value);
            var user_name = user.first_name + ' ' + user.last_name;
            var first_val = $rootScope.getUserName(user.first_name, user.last_name);
            divElement.append($compile(angular.element('<a href="#" onclick="view20(\'' + user_name + '\', \'' + key + '\')" id="' + key + '"><div class="people-data"><img class="people-img" src="https://quiin.s3.amazonaws.com/default_images/avatars/' + first_val + '.svg" alt="Avatar" ><span class="people-name">' + user_name + '</span><span class="active-chat-icon"> <i class="green-circle" class="fas fa-circle" id="new_message" style="display:none;"></i></span></div></a>'))($scope));
            divNetElement.append($compile(angular.element('<div id="net-people-data3"><img class="net-people-img3" src="https://quiin.s3.amazonaws.com/default_images/avatars/' + first_val + '.svg"  alt="Avatar" ><p class="net-people-name3">' + user.first_name + '</p><p class="net-people-name3">' + user.last_name + '</p><button id="people-chat-button" ng-click=startVideosChat()><i class="fas fa-video">&nbsp; &nbsp; </i>Invite to call</button></div>'))($scope));
        }
    });
});

app.controller("receptionController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout, $localStorage) {

    $scope.hdc = {};
    $scope.showvideo = false;
    $scope.popupvideo = false;
    $scope.popupvideoalmond = false;

    if ($rootScope.userwelcomefirst == 0) {
        $rootScope.userwelcomefirst = 1;
        $scope.popupvideoalmond = true;
    }



    $scope.redirect = function(stage) {
        $scope.showvideo = false;
        $state.go(stage);
    }

    $scope.myTrigger = function(arg) {

        if (arg == 'cafe') {
            if (!$('#sidebar').hasClass('active')) {
                $('#sidebar').toggleClass('active');
            }
            console.log(arg);
            $scope.showvideo = true;
            $scope.showvideoexibition = false;
            $scope.showvideocafe = true;
            $scope.showvideosession = false;
            var videoElements = angular.element(document.querySelectorAll('#video'));
            console.log(videoElements);
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect('cafe'); //alert("The audio has ended");
            };
            //$timeout($scope.redirect, 14000);
        } else if (arg == 'exibition') {
            if (!$('#sidebar').hasClass('active')) {
                $('#sidebar').toggleClass('active');
            }
            console.log(arg);
            $scope.showvideo = true;
            $scope.showvideoexibition = true;
            $scope.showvideocafe = false;
            $scope.showvideosession = false;
            var videoElements = angular.element(document.querySelectorAll('#video2'));
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect('expo'); //alert("The audio has ended");
            };
            //$timeout($scope.redirect, 14000);
        } else if (arg == 'session') {
            if (!$('#sidebar').hasClass('active')) {
                $('#sidebar').toggleClass('active');
            }
            console.log(arg);
            $scope.showvideo = true;
            $scope.showvideoexibition = false;
            $scope.showvideocafe = false;
            $scope.showvideosession = true;
            var videoElements = angular.element(document.querySelectorAll('#video3'));
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect('stage'); //alert("The audio has ended");
            };
            // $timeout($scope.redirect, 14000);
        } else if (arg == 'newtworking') {

            $state.go('networking');
            // $timeout($scope.redirect, 14000);
        } else if (arg == 'middlevideo') {
            $scope.popupvideo = true;
            // $state.go('newtworking');
            // $timeout($scope.redirect, 14000);
        } else if (arg == 'almond') {
            $scope.popupvideoalmond = true;
            // $state.go('newtworking');
            // $timeout($scope.redirect, 14000);
        }


        // if (arg == 'session_hall_left' || arg == 'session_hall_right') {
        //     console.log(arg);
        //     $scope.showvideo = true;
        //     var videoElements = angular.element(document.querySelectorAll('#video'));
        //     videoElements[0].play();
        //     $timeout($scope.redirect, 14000);
        // } else if (arg == 'right_video' || arg == 'left_video' || arg == 'middle_video') {
        //     $scope.popupvideo = true;
        // }

    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }

    $scope.almonpopclose = function() {

        $scope.popupvideoalmond = false;
    }


    // $scope.video = function(e) {
    //     $scope.showvideo = true;
    //     var videoElements = angular.element(document.querySelectorAll('#video'));
    //     videoElements[0].play();
    //     $timeout($scope.redirect, 14000);

    // }

    $socket.emit('startconcert');

    $socket.on('startuserconcert', function(data) {

        $rootScope.concert_started = 1;

        $state.go('stage');

    });

    $socket.on('stopuserconcert', function(data) {

        $rootScope.concert_started = 0;

    });

    $socket.on('notstarted', function(data) {

        $rootScope.concert_started = 0;

    });

});

app.controller("expoController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {

    $scope.hdc = {};
    $scope.show = false;
    $scope.popupvideo = false;

    $scope.redirect = function() {
        $scope.showvideo = false;
        $state.go('expobrief');
    }

    $scope.myTrigger = function(arg) {
        if (arg == 'middle') {
            $scope.showvideo = true;
            var videoElements = angular.element(document.querySelectorAll('#video'));
            videoElements[0].play();
            videoElements[0].onended = function() {
                $scope.redirect(); //alert("The audio has ended");
            };
        }

    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }


});


app.controller("notificationController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {



});



app.controller("galleryController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {

    $scope.popupvideo = 0;

    $scope.closePopup = function() {
        $scope.popupvideo = 0;
    }



});


app.controller("gamesController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {



});

app.controller("cafeController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {

    $scope.hdc = {};
    $scope.show = false;
    $scope.popupvideo = false;

    $scope.redirect = function() {
        $scope.showvideo = false;
        $state.go('stage');
    }

    $scope.myTrigger = function(arg) {
        if (arg == 'cafe_left') {
            $scope.popupvideo = true;
        } else if (arg == 'cafe_right') {
            $scope.popupvideo = true;
        }
    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }


});


app.controller("expobriefController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {

    $scope.hdc = {};
    $scope.show = false;
    $scope.popupvideo = false;

    $scope.redirect = function() {
        $scope.showvideo = false;
        $state.go('stage');
    }

    $scope.myTrigger = function(arg) {
        if (arg == 'video') {
            $scope.popupvideo = true;
        } else if (arg == 'document') {
            var documentdown = angular.element(document.querySelectorAll('#downloaddocument'));
            console.log(documentdown);
            documentdown[0].click();
        } else if (arg == 'back') {
            $state.go('expo');
        } else if (arg == 'sociamedia') {

            $window.open('https://www.facebook.com/DettolIndia/', '_blank');

        } else if (arg == 'feedback') {
            //window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSefqOGdRRi2VOMGJzfWgftKcJ4PCx1srY2Hk_QzjGY2EdnMdg/viewform'
            $window.open('https://docs.google.com/forms/d/e/1FAIpQLSefqOGdRRi2VOMGJzfWgftKcJ4PCx1srY2Hk_QzjGY2EdnMdg/viewform', '_blank');
        }

    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }


});

app.controller("homeController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {

});

app.controller("videoConfController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {
    $scope.destroyConf = function() {

        session.unsubscribe(subscriber);
        session.disconnect();
        $state.go('reception');
    }


    var apiKey = "46771064";
    var sessionId = "1_MX40Njc3MTA2NH5-MTU5NDk3ODI2MjkxOX5aVEhsQzVicFpsaU9rUHJKaGF2N044ekF-fg";
    var token = "T1==cGFydG5lcl9pZD00Njc3MTA2NCZzaWc9OGU5NTAyMDUyNThmZTkyZmQwMzAzODc4N2E1NjMyZTM3YjVjMzE5ZTpzZXNzaW9uX2lkPTFfTVg0ME5qYzNNVEEyTkg1LU1UVTVORGszT0RJMk1qa3hPWDVhVkVoc1F6VmljRnBzYVU5clVISkthR0YyTjA0NGVrRi1mZyZjcmVhdGVfdGltZT0xNTk0OTc4NzI1Jm5vbmNlPTAuMzcxOTI3MDk4OTIyMjg5NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk3NTcwNzI1JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
    // Handling all of our errors here by alerting them
    function handleError(error) {
        if (error) {
            alert(error.message);
        }
    }
    // (optional) add server code here

    var session = OT.initSession(apiKey, sessionId);

    var name = $rootScope.currentUser.first_name + " " + $rootScope.currentUser.last_name;
    var publisherOptions = {
        fitMode: "cover",
        width: '62vh',
        height: '62vh',
        name: name,
        style: { nameDisplayMode: "off" },
        style: { buttonDisplayMode: 'on' },
    }
    var publisher = OT.initPublisher('publisher', publisherOptions);
    session.publish(publisher);
    // Subscribe to a newly created stream
    var name = $rootScope.currentUser.first_name + " " + $rootScope.currentUser.last_name;
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
            fitMode: "cover",
            width: '62vh',
            height: '62vh',
            name: name,
            style: { nameDisplayMode: "off" },
            style: { buttonDisplayMode: 'on' },
        });
    });
    // Create a publisher


    // Connect to the session
    session.connect(token, function(error) {
        // If the connection is successful, initialize a publisher and publish to the session
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });
});


app.controller("stageController", function($scope, $rootScope, $state, $compile, $window, $socket) {

    $rootScope.loggedin = true;

    $socket.emit('startconcert');

    $socket.on('startuserconcert', function(data) {

        $rootScope.concert_started = 1;

    });

    $socket.on('stopuserconcert', function(data) {

        $rootScope.concert_started = 0;

        //  $state.go('reception');

    });

    $socket.on('notstarted', function(data) {

        $rootScope.concert_started = 0;

        // $state.go('reception');

    });
});

app.controller("sessionsController", function($scope, $rootScope, $state, $compile, $window, $socket) {

    $rootScope.loggedin = true;

    $scope.myTrigger = function() {
        $scope.popupvideo = true;

    }

    $scope.closePopup = function() {
        $scope.popupvideo = false;
    }
});

app.controller("networkingController", function($scope, $rootScope, $state, $compile, $window, $socket) {

    $rootScope.loggedin = true;
    $scope.startVideosChat = function() {
        $state.go('videoconf');
        console.log("start chat");

    }


    $socket.emit('showonlineusers', $rootScope.currentUser);
    $socket.on('returnonlineusers', function(data) {
        var divNetElement = angular.element(document.querySelector('#net-contact-box'));
        // console.log(data);
        divNetElement.empty();
        for (const [key, value] of Object.entries(data)) {
            var user = JSON.parse(value);
            var user_name = user.first_name + ' ' + user.last_name;
            var first_val = $rootScope.getUserName(user.first_name, user.last_name);
            divNetElement.append($compile(angular.element('<div id="net-people-data3"><img class="net-people-img3" src="https://quiin.s3.amazonaws.com/default_images/avatars/' + first_val + '.svg"  alt="Avatar" ><p class="net-people-name3">' + user.first_name + '</p><p class="net-people-name3">' + user.last_name + '</p><button id="people-chat-button" ng-click=startVideosChat()><i class="fas fa-video">&nbsp; &nbsp; </i>Invite to call</button></div>'))($scope));
        }
    });

});

app.controller("chatController", function($scope, $rootScope, $state, $socket, $compile, $window) {

    if (angular.isDefined($rootScope.currentUser)) {

        $rootScope.currentEvent = '5ee0c7ff77b77ebaaaecbaab';

        $socket.emit('totalusers');

        $scope.total_online_users = 0;

        $rootScope.chat = true;

        $socket.on('comments', function(data) {
            console.log(data);
            var divElement = angular.element(document.querySelector('#chat-container'));
            if (data.user.id != $rootScope.currentUser.id) {
                var first_newval = $rootScope.getUserName(data.user.first_name, data.user.last_name);
                let comment = angular.element('<div class="chat-box"><div class="chat-img"><img id="username-image" src="https://quiin.s3.amazonaws.com/default_images/avatars/' + first_newval + '.svg" class="user-menu_avatar__1ZmG9 user-menu_border__2k_pD" alt="avatar"></div><div class="chat-text"><a href="#"><span class="chat-name">' + data.user.first_name + '</span></a><span class="chat-time">11:00</span><div class="chat-para"><p>' + data.message + '</p></div></div></div>');
                divElement.append(comment);
                $compile(divElement)($scope);
                angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
            }
        });

        $scope.sendMessage = function(message) {
            console.log(message);
            if (message != '') {
                var divElement = angular.element(document.querySelector('#chat-container'));
                $socket.emit('groupchat', { event_id: $rootScope.currentEvent, message: message, user: $rootScope.currentUser });
                let comment = angular.element('<div class="chat-box"><div class="chat-img"><img id="username-image" src="https://quiin.s3.amazonaws.com/default_images/avatars/' + $rootScope.user_name + '.svg" class="user-menu_avatar__1ZmG9 user-menu_border__2k_pD" alt="avatar"></div><div class="chat-text"><a href="#"><span class="chat-name">' + $rootScope.currentUser.first_name + '</span></a><span class="chat-time">11:00</span><div class="chat-para"><p>' + message + '</p></div></div></div>');
                divElement.append(comment);
                $compile(divElement)($scope);
                angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
            }
            $scope.message = '';
        }
    }
});

app.controller("pollsController", function($scope, $rootScope, $state, $socket, $compile, $window) {

    $rootScope.all_question_ans_data = [];

    $socket.on('showquestion', function(data) {

        var user_data = JSON.parse(data);

        console.log(user_data);

        var count = 0;

        var total_value = user_data.length;
        for (var i = 0; i < total_value; i++) {
            console.log(user_data[i]);
            $rootScope.all_question_ans_data.push(user_data[i]);
            console.log($rootScope.all_question_ans_data);
        }
        console.log($rootScope.all_question_ans_data);
        if ($rootScope.all_question_ans_data.length > 0) {
            console.log("test");
            view6();
        }

    });

    $scope.submitAnswer = function(poll, key) {
        $socket.emit('questionsanswers', poll);
        // var index = $rootScope.all_question_ans_data.indexOf(poll);
        $rootScope.all_question_ans_data.splice(key, 1);
        // delete $rootScope.all_question_ans_data[key];
    }

});

app.controller("peopleController", function($scope, $rootScope, $state, $socket, $compile, $window) {
    // console.log($rootScope.currentUser.first_name);

    $scope.startchat = function() {
        console.log("start chat");
    };


    $scope.sendMsg = function() {
        var user_socket_id = $('#user_socket_id').text();
        var msg = $('#people-chat-input-text').val();
        $('#people-chat-input-text').val("");
        console.log(msg);
        if (msg != "" || msg != " ") {
            var divElement = angular.element(document.querySelector('#people-chat'));
            let comment = angular.element('<div id="people-chat-text"><div class="chat-text2"><a href="#"><span class="people-chat-name">' + $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name + '</span></a><span class="people-chat-time">11:00</span></div><div class="people-chat-para"><p>' + msg + '</p></div></div>');
            divElement.append(comment);
            $compile(divElement)($scope);
            var user_name = $rootScope.currentUser.first_name + " " + $rootScope.currentUser.last_name;
            $socket.emit("send_personal_msg", { "user_name": user_name, "user_socket_id": user_socket_id, "message": msg });
        }
    };

    $scope.startVideoChat = function() {
        $state.go('videoconf');
        console.log("start chat");

    }


    $socket.on("new_msg", function(data) {
        console.log("new message recieved : " + data.message);
        $('#' + data.socket_id).children('i').show();
        var divElement = angular.element(document.querySelector('#people-chat'));
        let comment = angular.element('<div id="people-chat-text"><div class="chat-text2"><a href="#"><span class="people-chat-name">' + data.user_name + '</span></a><span class="people-chat-time">11:00</span></div><div class="people-chat-para"><p>' + data.message + '</p></div></div>');
        divElement.append(comment);
        $compile(divElement)($scope);
        $socket.emit("send_personal_msg", { "user_socket_id": user_socket_id, "message": data.message });
    });

});

app.directive('chat', function($rootScope) {
    return {
        restrict: 'E',
        scope: true,
        controller: 'chatController',
        controllerAs: 'chat',
        templateUrl: 'views/chat.html'
    };
});

app.directive('polls', function($rootScope) {
    return {
        restrict: 'E',
        scope: true,
        controller: 'pollsController',
        controllerAs: 'polls',
        templateUrl: 'views/polls.html'
    };
});

app.directive('people', function($rootScope) {
    return {
        restrict: 'E',
        scope: true,
        controller: 'peopleController',
        controllerAs: 'people',
        templateUrl: 'views/peoples.html'
    };
});

app.directive('notification', function($rootScope) {
    return {
        restrict: 'E',
        scope: true,
        controller: 'notificationController',
        controllerAs: 'notification',
        templateUrl: 'views/notification.html'
    };
});

app.directive('ngEnter', function() { //a directive to 'enter key press' in elements with the "ng-enter" attribute

    return function(scope, element, attrs) {

        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.directive('schrollBottom', function() {
    return {
        scope: {
            schrollBottom: "="
        },
        link: function(scope, element) {
            scope.$watchCollection('schrollBottom', function(newValue, oldValue) {
                console.log('newvalue', newValue);
                console.log(oldValue);
                if (newValue) {
                    $(element).scrollTop($(element)[0].scrollHeight);
                }
            });
        }
    }
});

app.directive('iframeSetDimensionsOnload', function($window) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            if ($window.innerWidth < 960) {

                var contentMinWidth = $window.innerWidth;
            } else {
                var contentMinWidth = 420;
            }

            element.on('load', setSizeWithZoom());

            angular.element($window).bind('resize', function() {
                setSizeWithZoom();
                scope.$digest();
            });

            function setSize() {
                var iFrameWidth = element[0].contentWindow.parent.document.body.offsetWidth;
                var iFrameHeight = element[0].contentWindow.parent.document.body.offsetHeight;
                element.css('width', iFrameWidth + 'px');
                element.css('height', iFrameHeight + 'px');
            }

            function setSizeWithZoom() {


                // if ($window.innerWidth < 960) {

                //     var iFrameWidth = element[0].contentWindow.parent.document.body.offsetWidth;
                //     var iFrameHeight = element[0].contentWindow.parent.document.body.offsetHeight;

                //     var scale = iFrameWidth / contentMinWidth;
                //     scale = scale > 1 ? 1 : scale;
                //     var zoom = 1 / scale;

                // } else {


                //     var stageheight = angular.element(document.querySelector("#stageheight"));
                //     // var bottom_height = bottom_height_ele[0]['offsetHeight'];

                //     // var upper_height_ele = angular.element(document.querySelector(".logo-d"));
                //     var upper_height = stageheight[0]['offsetHeight'];

                //     //  var total_height = $window.innerHeight;

                //     //  var mid_height = total_height - upper_height - bottom_height - 50;

                //     //  var onethird_value = $window.innerWidth * (1 / 2);
                //     //   console.log('onethirdvalue', onethird_value);
                //     //
                //     //var iFrameWidth = $window.innerWidth - onethird_value;
                //    /// var newheight = upper_height - 30;
                //    // var iFrameWidth = newheight * 1.7778;

                //     var is_iPad = navigator.userAgent.match(/iPad/i) != null;

                //     // if (is_iPad) {
                //     //     var iFrameHeight = element[0].contentWindow.parent.document.body.offsetHeight;
                //     // } else {
                //     //     var iFrameHeight = newheight;
                //     // }
                //      var iFrameHeight = element[0].contentWindow.parent.document.body.offsetHeight;

                //     var scale = iFrameWidth / contentMinWidth;
                //     scale = scale > 1 ? 1 : scale;
                //     var zoom = 1 / scale;

                // }
                var iFrameWidth = element[0].contentWindow.parent.document.body.offsetWidth;
                var iFrameHeight = element[0].contentWindow.parent.document.body.offsetHeight;


                // element.css('width', iFrameWidth + 'px');
                // element.css('height', iFrameHeight + 'px');
                // element.css('-webkit-transform', 'scale(' + scale + ')');
                // element.css('-ms-transform', 'scale(' + scale + ')');
                // element.css('transform', 'scale(' + scale + ')');
                // element.css('zoom', zoom);
            }

        }
    }
});

app.directive('hotspotinteraction', ['$compile', '$timeout', function($compile, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        transclude: true,
        template: '<div><div class="hotspotinteraction" data-ng-transclude><map id="{{mapId}}" name="{{mapId}}"></map></div><div class="error-message" data-ng-bind="error"></div></div>',
        controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
            $scope.mapId = "map" + new Date().getTime();
            $scope.hdc = {};

            var generateId = function(prefix) {
                var id = $scope.elemCount++;
                return prefix + id;
            }

            var areaDone;

            return {
                hotspotscope: $scope,
                responseid: $attrs.responseidentifier,
                areaDone: areaDone,
                multiple: $attrs.cardinality.toLowerCase() != "single",
                addAreaElement: function(key) {
                    var mapElement = $element.find("map");
                    mapElement.append(key);
                }
            };
        }],
        link: function(scope, element, attrs, ctrl) {
            var object = element.find("object");
            var src = object.attr("data");
            var responseid = attrs.responseidentifier;

            var minChoices = parseInt(attrs.minchoices) || 0;
            var maxChoices = parseInt(attrs.maxchoices) || Number.MAX_VALUE;
            maxChoices = (maxChoices == 0) ? Number.MAX_VALUE : maxChoices;

            var replacement = '<img src="' + src + '" usemap="#' + scope.mapId + '" id="img_' + scope.mapId + '"/><canvas id="can_' + scope.mapId + '"></canvas>';
            var compiled = $compile(replacement)(scope);
            // attach an onload() callback on the img tag...
            compiled[0].onload = function() {
                var can = compiled[1];

                // place the canvas in front of the image
                can.style.zIndex = 1;

                // position it over the image
                can.style.left = this.offsetLeft + 'px';
                can.style.top = this.offsetTop + 'px';

                // make same size as the image
                can.setAttribute('width', this.clientWidth + 'px');
                can.setAttribute('height', this.clientHeight + 'px');

                // get it's context
                var hdc = can.getContext('2d');

                // set the 'default' values for the colour/width of fill/stroke operations
                hdc.fillStyle = 'red';
                hdc.strokeStyle = 'red';
                hdc.lineWidth = 4;

                ctrl.hotspotscope.canvas = can;
                ctrl.hotspotscope.hdc = hdc;
                ctrl.hotspotscope.img = compiled[0];
            };
            object.replaceWith(compiled);
        }
    }
}]);
app.directive('hotspotchoice', ['$parse', '$timeout', function($parse, $timeout) {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        transclude: true,
        template: '<area href="#" data-ng-click="addAnswer()"></area>',
        require: "^hotspotinteraction",
        link: function(scope, element, attrs, ctrl) {
            scope.local = {
                answer: {}
            };
            ctrl.addAreaElement(element);

            scope.multiple = ctrl.multiple;

            var clicked;
            var initialStart = true

            var drawPoly = function(coordStr, hdc) {
                var mCoords = coodStr.split(',');
                var i, n;
                n = mCoords.length;

                hdc.beginPath();
                hdc.moveTo(mCoords[0], mCoords[1]);
                for (i = 2; i < n; i += 2) {
                    hdc.lineTo(mCoords[i], mCoords[i + 1]);
                }
                hdc.lineTo(mCoords[0], mCoords[1]);
                hdc.fillStyle = fillColor;
                hdc.fill();
                hdc.strokeColor = strokeColor;
                hdc.stroke();
            }
            var drawRect = function(coordStr, hdc) {
                var mCoords = coordStr.split(',');
                var left = mCoords[0] - 0;
                var top = mCoords[1] - 0;
                var right = mCoords[2] - 0;
                var bot = mCoords[3] - 0;
                hdc.strokeRect(left, top, right - left, bot - top);
                hdc.fillRect(left + 1, top + 1, right - left - 1, bot - top - 1);
            }
            var clearRect = function(canvas) {
                var hdc = canvas.getContext('2d');
                hdc.clearRect(0, 0, canvas.width, canvas.height);
            }
            var getAverageRGB = function(context, canvas, imgEl) {
                var blockSize = 5; // only visit every 5 pixels
                var defaultRGB = { r: 0, g: 0, b: 0 };
                var data, width, height,
                    i = -4,
                    length,
                    rgb = { r: 0, g: 0, b: 0 },
                    count = 0;

                if (!context) {
                    return defaultRGB;
                }

                height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
                width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

                context.drawImage(imgEl, 0, 0);

                try {
                    data = context.getImageData(0, 0, width, height);
                } catch (e) {
                    /* security error, img on diff domain */
                    return defaultRGB;
                } finally {
                    var hdc = canvas.getContext('2d');
                    hdc.clearRect(0, 0, width, height);
                }

                length = data.data.length;
                while ((i += blockSize * 4) < length) {
                    var r = data.data[i];
                    var g = data.data[i + 1];
                    var b = data.data[i + 2];
                    var a = data.data[i + 3];
                    // If pixel is mostly opaque and not white
                    if (a >= 125) {
                        if (!(r > 250 && g > 250 && b > 250)) {
                            rgb.r += data.data[i];
                            rgb.g += data.data[i + 1];
                            rgb.b += data.data[i + 2];
                            ++count;
                        }
                    }
                }

                // ~~ used to floor values
                rgb.r = ~~(rgb.r / count);
                rgb.g = ~~(rgb.g / count);
                rgb.b = ~~(rgb.b / count);

                return rgb;
            }
            var determineContrastColor = function(canvas, hdc, imgEl) {
                var rgb = getAverageRGB(hdc, canvas, imgEl);
                var hsl = tinycolor(rgb).toHsl();
                hsl.l *= 0.3;
                var c1 = tinycolor(hsl).toRgbString();
                hdc.strokeColor = c1;
                hsl.a = 0.45;
                var c2 = tinycolor(hsl).toRgbString();
                hdc.fillStyle = c2;
            }

            // Will be fired when a user clicks on the element
            // It will set the answer
            scope.addAnswer = function(e) {
                var id = attrs.identifier;

                var hdc = ctrl.hotspotscope.hdc;
                var canvas = ctrl.hotspotscope.canvas;

                determineContrastColor(canvas, hdc, ctrl.hotspotscope.img);
                clearRect(canvas, hdc);

                switch (attrs.shape) {
                    case 'polygon':
                    case 'poly':
                        drawPoly(attrs.coords, hdc);
                        break;
                    case 'rect':
                        drawRect(attrs.coords, hdc);
                        break;
                    default:
                        console.log("Unknown shape: " + attrs.shape);
                        break;
                }

                if (scope.multiple) {
                    var indexOf = scope.local.answer.indexOf(id);
                    var selected = indexOf >= 0;

                    if (selected) {
                        clicked = true;
                        scope.local.answer.splice(indexOf, 1);
                    } else {
                        initialStart = false;
                        scope.local.answer.push(id);
                    }
                } else {
                    if (scope.local.answer === id) {
                        clicked = true;
                        scope.local.answer = null;
                    } else {
                        initialStart = false;
                        scope.local.answer = id;
                    }
                }

                console.log("answer: " + scope.local.answer);
            }
        }
    }
}]);
// app.directive('disableRightClick', function() {
//     return {
//         restrict: 'A',
//         link: function(scope, element, attr) {
//             element.bind('contextmenu', function(e) {
//                 e.preventDefault();
//             })
//         }
//     }
// });