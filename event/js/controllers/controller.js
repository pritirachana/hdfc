app.controller("mainController", function($sce, $location, gratification, $timeout, $scope, $http, $state, $stateParams, $rootScope, $window, $socket, $localStorage, $compile, $filter,$interval,analytics ) {
    // analytics.auto();
    analytics.auto();
    // localStorage.setItem('currentUrl',$location.absUrl());
    // alert(localStorage.getItem('currentUrl'));
    $interval(function(){
        analytics.auto(); 
    },30000);
    var CREDENTIALS = {
        appId: 89233,
        authKey: 'ASDmrbbsNmDpDUG',
        authSecret: 'XrpffA64vLyOuS8',
        accountKey: 'bu5K4seieUMBZqssfCYb'
    };
    var opponentName;
    console.log($rootScope.currentUser);
    const config_webrtc = {
        debug: true,
        webrtc: {
            answerTimeInterval: 60,
            dialingTimeInterval: 5,
            disconnectTimeInterval: 35,
            statsReportTimeInterval: 5
        }
    }; 
    $interval(function(){   
        if ($location.path() == "/sessions") {
            $("#sidebar").css('display','none');
            $("#navbar").css('display','none');
        }
        else{
            $("#sidebar").css('display','flex');
            $("#navbar").css('display','flex');
        }
    },500);

    $scope.introMessage = function(){
        introJs().setOption('showButtons', false).oncomplete(function() {
            console.log('come complete');
            $localStorage.tourtooltip = 1;
            $('.tourguidehomepage').remove();
            return true;
        }).onexit(function () {
            console.log('come exit');
            $localStorage.tourtooltip = 1;
            $('.tourguidehomepage').remove();
            return true;
        }).start();
    }


    if(localStorage.getItem('tourtooltip') != 1){
        introJs().setOption('showButtons', false).oncomplete(function() {
            console.log('come complete');
            // $localStorage.tourtooltip = 1;
            localStorage.setItem('tourtooltip','1');
            $('.tourguidehomepage').remove();
            return true;
        }).onexit(function () {
            console.log('come exit');
            // $localStorage.tourtooltip = 1;
            localStorage.setItem('tourtooltip','1');
            $('.tourguidehomepage').remove();
            return true;
        }).start();
    }

    var dateResponse;
	var chatTime;
	var chatDate;
	var chatDateTime;
    var loggedin_userid;

    console.log($rootScope.currentUser);
    QB.init(CREDENTIALS.appId, CREDENTIALS.authKey, CREDENTIALS.authSecret, CREDENTIALS.accountKey);
    QB.createSession(function(err, result) {
        console.log(err);
        console.log(result.id);
        var name = $rootScope.currentUser.email;
        var login = name;
        var params = {
            login: login,
            password: "someSecret",
            full_name: $rootScope.currentUser.name  
        };
        console.log(params);
        console.log($rootScope.currentUser);

        QB.users.create(params, function(err, result) {
            console.log(err);
            console.log(result);
            if(result != null){
                $rootScope.userChatID2 = result.id;
                $rootScope.qid = result.id;
                console.log($rootScope.qid);
                var req = {
                    method: 'POST',
                    url: 'https://devapi.virtex.in/api/cii-bio/deligates-update',
                    data: {"userId": $rootScope.currentUser.id,"qId":result.id}
                }
                $http(req).then(function(data){
                    console.log(data);
                });

            }
            // $rootScope.userChatID2 = result.id;
            // console.log($rootScope.userChatID2);
            // loggedin_userid = result.id;
            if (err) {
                if (err.message.errors.login[0] == "has already been taken") {
                    console.log(params);
                    var name = $rootScope.currentUser.email;
                    var login = name;
                    var params = {
                        login: login,
                        password: "someSecret",
                        full_name: $rootScope.currentUser.name
                    };
                    QB.login(params, function(err, result) {
                        console.log("test chat");
                        console.log(err);
                        console.log(result);
                        // await result;
                        $rootScope.userChatID = result.id;
                        $rootScope.qid = result.id;
                        console.log($rootScope.qid);
                        let logUserData = {
                            "pageUrl": $location.absUrl(),
                            "pageName": $location.path(),
                            "userId": $rootScope.currentUser.id,
                            "userName": $rootScope.currentUser.name,
                            "userEmail": $rootScope.currentUser.email,
                            "q_id": $rootScope.qid,
                            "mobile":$rootScope.currentUser.phone_number,
                            "event_id":3,
                            "stall_id":$stateParams.id
                        }
                        console.log(logUserData);
                        $socket.emit('logUserData', logUserData);
                        var req = {
                            method: 'POST',
                            url: 'https://devapi.virtex.in/api/cii-bio/deligates-update',
                            data: {"userId": $rootScope.currentUser.id,"qId":result.id}
                        }
                        $http(req).then(function(data){
                            console.log(data);
                        });
                        $rootScope.delegateData = {"data":$rootScope.currentUser,"q_id":$rootScope.userChatID};
                        var userCredentials = {
                            userId: result.id,
                            password: "someSecret"
                        };
                        console.log(userCredentials);
                        loggedin_userid = userCredentials.userId;
                        console.log(loggedin_userid);

                        // var updatedUserProfile = {
                        //     login: name,
                        //     full_name: $rootScope.currentUser.first_name + ' ' + $rootScope.currentUser.last_name
                        // };

                        // QB.users.update($rootScope.userChatID, updatedUserProfile, function(error, user) {});

                        QB.chat.connect(userCredentials, function(error, contactList) {
                            console.log(error);
                            console.log(contactList);
                            var params = {
                              type: 1,
                              name: "CloudBazaar"
                            };

                            QB.chat.dialog.create(params, function(error, conversation) {});
                        });
                	});
                }
            }
        });

        var params = {
            "page" : 1,
            "per_page" : 100
        };
        

        QB.users.listUsers(params, function (error, response) { 
            // $rootScope.listUser = response.items;
            $rootScope.listUser = response.items;
        });    
              
    });  


    $timeout(function () {
        
    }, 3000);

    $scope.searchqbUsers = function (searchtext) {
        console.log(searchtext);
        var searchParams = {full_name: searchtext};
    
        QB.users.get(searchParams, function(error, result){
            console.log(result);
            $rootScope.listUser = result.items;
        });
    }

    $scope.showuserslist = function(){
        $(".video_icons").css('display', 'none');
        $(".chat_input").css('display','none');
        $(".chat_bg").css('display','block');
        $(".chat_name").empty();
        $('.main-chat').empty().append(`<div class="chat_bg" style="text-align: center;">
            <img src="images/chat_icon.png" style="max-width: 30%;margin-top: 30px;">
            <h2>Select user to start chatting</h2></div>`
        );
        
        var params = {
            "page" : 1,
            "per_page" : 100
        };
        
        QB.users.listUsers(params, function (error, response) { 
            $rootScope.listUser = response.items;
        });
    };

    $scope.clearChat = function(){
        // $('.main-chat').empty();
        $(".chat_input").css('display','none');
        $(".chat_bg").css('display','block');
        $(".chat_name").empty();
        $('.main-chat').empty().append(`<div class="chat_bg" style="text-align: center;">
            <img src="images/chat_icon.png" style="max-width: 30%;margin-top: 30px;">
            <h2>Select user to start chatting</h2></div>`
        );
        var elements = document.getElementsByClassName('currentChat');
        while(elements.length > 0){
            elements[0].classList.remove('currentChat');
        }
    }

    
    QB.chat.onMessageListener = onMessage;

    $scope.organiserChat = function(index){
        $(".chat_input").css('display','none');
        $(".chat_bg").css('display','block');
        $(".chat_name").empty();
        $('.main-chat').empty().append(`<div class="chat_bg" style="text-align: center;">
            <img src="images/chat_icon.png" style="max-width: 30%;margin-top: 30px;">
            <h2>Select user to start chatting</h2></div>`
        );
        var orgUser = [[{'user':{'full_name': 'Minal Agarwal (Cloud Bazaar)','id':124786406}}], [{'user':{'full_name': 'Simran Mehta (Cloud Bazaar)','id':124786976}}], [{'user':{'full_name': 'Tanya Noronha (Cloud Bazaar)','id':124787029}}], [{'user':{'full_name': 'Viraj Shetty (Cloud Bazaar)','id':124787321}}], [{'user':{'full_name': 'Siddharth Pereira (Cloud Bazaar)','id':124787358}}], [{'user':{'full_name': 'Priyank Limbachiya (Cloud Bazaar)','id':124787433}}]];
        console.log(orgUser);
        $rootScope.listUser = orgUser[index];
        console.log(orgUser[index][0].user.id);
        // $('#username'+orgUser[index][0].user.id).trigger('click');
    }
    
    
    function onMessage(userId, message) {
        var senderName;
        console.log(userId);
        console.log(message);
        var user_id = $('#user_id').text();
        console.log(user_id);
        // $(".removeuser"+userId).css('color','#fff');
        // $(".removeuser".userId).remove();
        // var contentToRemove = document.querySelectorAll(".removeuser"+userId);
        // $(contentToRemove).remove();
        // document.querySelectorAll(".removeuser"+userId).forEach(e => e.remove());
        var searchParams = {filter: { field: 'id', param: 'in', value: [userId] }};
        QB.users.listUsers(searchParams, function(error, result){
            senderName = result.items[0].user.full_name;
            console.log(senderName);
            if(userId != $rootScope.qid){
                var getExhiId = {
                    method: 'POST',
                    url: 'https://devapi.virtex.in/api/cii-bio/get-exhibitor-by-qbolock',
                    data: {
                        "eventId":3,
                        "qId": userId
                    }
                };
                // alert(userId);
            
                $http(getExhiId).then(function(data){
                    console.log(data.data.data[0].id);
                    $rootScope.new_notification_alert = "new-notification-alert";
                    var notiElement = angular.element(document.querySelector('.notification-text-box'));
                    var exhi_url = 'https://direct.proptiger.com/event/#!/expomain2/'+data.data.data[0].id+'?chat=true';
                    let notification = angular.element('<a href="'+ exhi_url +'"><div class="notification-box"><div class="notification-chat"><div class="notificationchat-text"><span class="notification-chat-name">'+senderName+' says Hi! Click to Chat!</span><span class="notification-chat-time"></span></div><div class="notification-chat-para"><p></p></div></div></div></a>');
                    $.notify({
                        message: senderName+' says Hi! Click to Chat !',
                        url: exhi_url,
                        target: '_self',
                        timeout: 10000
                    });
                    notiElement.prepend(notification);
                    $compile(notiElement)($scope);
                });
                
            }
            
            // console.log(".removeuser"+userId);
            // $("#username"+userId).css('color', 'red');
            // console.log("#username"+userId);
            // $("#username"+userId).removeClass('active-green');
            // $("#username"+userId).addClass('currentChat');
            // $('.text-green').css('color', '#ffeb3b !important');
            //  var removeelements = document.getElementById('removeuser'+userId);
            //  while (removeelements.length > 0){
            //      removeelements[0].remove();
            //  }
             var elements = document.getElementsByClassName('currentChat');
             while(elements.length > 0){
                elements[0].classList.remove('currentChat');
             }
            
            // $('.removeuser'+userId).each(function() {
            //     $('.removeuser'+userId).remove();
            // });

            // var chatElement = angular.element(document.querySelector('#chatUsers'));
            // chatElement.prepend($compile('<div class="user-icon"><i class="fas fa-user-circle"></i></div><div ng-click="" id="'+userId+'" class="people-text "><div class="people-name active-green" id="username'+userId+'">Static Name</div></div>')($scope));
            // chatElement.prepend($compile('<div class="people-expo '+userId+' removeuser'+userId+'"><div class="user-icon"><i class="fas fa-user-circle"></i></div><div ng-click="showchat(\''+userId+'\',\''+senderName+'\')" id="'+userId+'" class="people-text "><div class="people-name active-green" id="username'+userId+'">'+senderName+'</div></div><div class="chat-icons"></div>')($scope));

            // $rootScope.listUser.unshift({'user':{'full_name':senderName,'id':userId}});

            if (user_id == userId) {
                console.log(senderName);
                dateResponse = new Date();
                chatTime = dateResponse.toLocaleTimeString();
                chatDate = dateResponse.toLocaleDateString();
                chatDateTime = chatDate +' '+ chatTime;
                var notiElement = angular.element(document.querySelector('.main-chat'));
                let notification = angular.element('<div class="chat-msg left-chat"><div class="chat-name"><p>'+senderName+' - Property Expert</p><div class="chat-time"><p>'+chatDateTime+'</p></div></div><div class="chat-text"><p>' + message.body +'</p></div></div>');
                notiElement.append(notification);
                $compile(notiElement)($scope);  
            }
            $(".main-chat").scrollTop($(".main-chat").prop("scrollHeight"));
        });
        // angular.element(document.querySelector("#username"+userId)).removeClass("active-green");
        // angular.element(document.querySelector("#username"+userId)).addClass("currentChat");
        // $("#username"+userId).addClass("currentChat");
        // $("#username"+userId).click();
        // $('#username'+user_id).addClass('currentChat');
        // if ($location.path() == "/me") {
        //     $('.main-chat').empty();
        //     var req = {
        //         method: 'POST',
        //         url: $rootScope.urlprefix + '/exebitor',
        //         data: {"stallId":"4"}
        //     }

        //     $http(req).then(function(data){
        //         $rootScope.listUser = data.data.data[0]['items'];
        //     });
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        // } else if ($location.path() == "/bluehost") {
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        //     var req = {
        //         method: 'POST',
        //         url: $rootScope.urlprefix + '/exebitor',
        //         data: {"stallId":"8"}
        //     }

        //     $http(req).then(function(data){
        //         console.log(data.data.data[0]);
        //         $rootScope.listUser = data.data.data[0]['items'];
        //         console.log($rootScope.listUser);
        //     });
        // } else if ($location.path() == "/sedo") {
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        //     var req = {
        //         method: 'POST',
        //         url: $rootScope.urlprefix + '/exebitor',
        //         data: {"stallId":"5"}
        //     };

        //     $http(req).then(function(data){
        //         $rootScope.listUser = data.data.data[0]['items'];
        //     });
        // } else if ($location.path() == "/web") {
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        //     var req = {
        //     method: 'POST',
        //     url: $rootScope.urlprefix + '/exebitor',
        //     data: {"stallId":"7"}
        // }

        // $http(req).then(function(data){
        //     console.log(data.data.data[0]);
        //     $rootScope.listUser = data.data.data[0]['items'];
        //     console.log($rootScope.listUser);
        // });
        // } else if ($location.path() == "/neo") {
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        //     $('.main-chat').empty();
        //     var req = {
        //         method: 'POST',
        //         url: $rootScope.urlprefix + '/exebitor',
        //         data: {"stallId":"6"}
        //     }

        //     $http(req).then(function(data){
        //         $rootScope.listUser = data.data.data[0]['items'];
        //     });
        // } else if ($location.path() == "/fresh") {
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        //     var req = {
        //         method: 'POST',
        //         url: $rootScope.urlprefix + '/exebitor',
        //         data: {"stallId":"3"}
        //     }

        //     $http(req).then(function(data){
        //         $rootScope.listUser = data.data.data[0]['items'];
        //     });
        // } else if ($location.path() == "/google") {
        //     var req = {
        //         method: 'POST',
        //         url: $rootScope.urlprefix + '/exebitor',
        //         data: {"stallId":"2"}
        //     }

        //     $http(req).then(function(data){
        //         console.log(data.data.data[0]);
        //         $rootScope.listUser = data.data.data[0]['items'];
        //         console.log($rootScope.listUser);
        //     });
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        // } else if ($location.path() == "/hg") {
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        //     var req = {
        //         method: 'POST',
        //         url: $rootScope.urlprefix + '/exebitor',
        //         data: {"stallId":"9"}
        //     }

        //     $http(req).then(function(data){
        //         $rootScope.listUser = data.data.data[0]['items'];
        //     });
        // } else if ($location.path() == "/org") {
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        //     var req = {
        //         method: 'POST',
        //         url: '$rootScope.urlprefix + '/exebitor,
        //         data: {"stallId":"1"}
        //     }

        //     $http(req).then(function(data){
        //         $rootScope.listUser = data.data.data[0]['items'];
        //     });
        // } else if ($location.path() == "/rc") {
        //     var alert = angular.element("#chatModal");
        //     alert.modal('show');
        //     var req = {
        //         method: 'POST',
        //         url: $rootScope.urlprefix + '/exebitor',
        //         data: {"stallId":"10"}
        //     }

        //     $http(req).then(function(data){
        //         // console.log(data.data.data[0].items[0].user.message);
        //         // $scope.booth_message = data.data.data[0].items[0].user.message;
        //         $rootScope.listUser = data.data.data[0]['items'];
        //         // console.log($rootScope.listUser);
        //     }); 
        // }
    }

    $("#chat-input").keyup(function (event) {
	    if (event.keyCode === 13) {
            // alert('test');
	        $(".send_msg").click();
	        $(".main-chat").scrollTop($(".main-chat").prop("scrollHeight"));
	        $("#chat-input").val('');
	    }
	});



    $scope.showchat = function (obj,opponent_name) {
        $('.video_icons').css('display', 'block');
        console.log(obj);
        $(".chat_input").css('display','contents');
        $(".chat_bg").css('display','none');
        opponentName = opponent_name;
        $('.chat_name').empty().append(opponent_name);
    	$('.main-chat').empty();
        if (obj == "event") {
            $('#user_id').text("");
            $('.main-chat').css('display','block');
            $('.modal-footer').css('display','flex');
            $('.video-chat').css('display','none');
            var notiElement = angular.element(document.querySelector('.main-chat'));
            notiElement.empty();
            var params = {
                chat_dialog_id: "5fb4f767a0eb476617fc5a2f",
                sort_desc: 'date_sent',
                limit: 100,
                skip: 0
            };
 
            QB.chat.message.list(params, function(error, messages) {
                if (error) {
                    console.log(error);
                } else {  
                    console.log(messages);
                    angular.forEach(messages.items, function(value, key) {
                        if ($rootScope.userChatID == value.sender_id) {                                  
                            let notification = angular.element('<div class="chat-msg left-chat"><div class="chat-name"><p>'+opponent_name+' - Property Expert</p><div class="chat-time"><p>11:00 AM</p></div></div><div class="chat-text"><p>'+value.message+'</p></div></div>');
                            notiElement.append(notification);
                            $compile(notiElement)($scope);
                        } else {
                            let notification = angular.element('<div class="chat-msg right-chat"><div class="chat-name"><p>'+$rootScope.currentUser.name+'</p><div class="chat-time"><p>11:00 AM</p></div></div><div class="chat-text"><p>'+value.message+'</p></div></div>');
                            notiElement.append(notification);
                            $compile(notiElement)($scope);
                        }
                    });
                }
            });
        } else {
            // var element = angular.element(obj);
            // console.log(element);
           
            // var user_id = element[0].item.user.id;
            var element = angular.element(obj);
            console.log(element);
            console.log(obj.item);
            var user_id;
            if(obj.item != undefined) {
                user_id = element[0].item.user.id;
            }        
            else{
                user_id = obj;
            }
            $(".chatloader").css('display','block');
            $(".main-chat").append('<div class="chatloader"></div>');
            $('.people-expo').removeClass('currentChat'); 
            $('#username'+user_id).parent().parent().addClass('currentChat');

            var notiElement = angular.element(document.querySelector('.main-chat'));
            // console.log(user_id);
            // console.log(opponent_name);
            // console.log($rootScope.currentUser.name);
            $('#user_id').text(user_id);
            $('.main-chat').css('display','block');
            $('.modal-footer').css('display','flex');
            $('.video-chat').css('display','none');
            var filters = {};
            QB.chat.dialog.list(filters, function(error, dialogs) {
            	console.log(dialogs);
                angular.forEach(dialogs.items, function(value, key) {
                	// console.log(value.type == 3);
                    if (value.type == 3) {
                        // console.log(user_id);
                        // console.log(value.occupants_ids[0]);
                        // console.log(user_id == value.occupants_ids[0]);
                        // console.log(user_id == value.occupants_ids[1]);
                        if ((user_id == value.occupants_ids[0]) 
                            || (user_id == value.occupants_ids[1])) {
                            var params = {
                                chat_dialog_id: value._id,
                                sort_asc: 'date_sent',
                                limit: 100,
                                skip: 0
                            };

                            QB.chat.message.list(params, function(error, messages) {
                                console.log(messages);
                                if (error) {
                                    console.log(error);
                                } else {
                                    // alert("test");
                                    $(".chatloader").css('display','none');
                                    angular.forEach(messages.items, function(value, key) {
                                    	dateResponse = new Date(value.created_at);
										chatTime = dateResponse.toLocaleTimeString();
										chatDate = dateResponse.toLocaleDateString();
										chatDateTime = chatDate +' '+ chatTime;
                                        // console.log(chatDateTime);
                                        if (user_id == value.sender_id) {
                                        	var notiElement = angular.element(document.querySelector('.main-chat'));
                                            let notification = angular.element('<div class="chat-msg left-chat"><div class="chat-name"><p>'+opponent_name+' - Property Expert</p><div class="chat-time"><p>'+chatDateTime+'</p></div></div><div class="chat-text"><p>'+value.message+'</p></div></div>');
                                            notiElement.append(notification);
                                            $compile(notiElement)($scope);
                                        } else if ($rootScope.userChatID == value.sender_id) {
                                            var notiElement = angular.element(document.querySelector('.main-chat'));
                                            let notification = angular.element('<div class="chat-msg right-chat"><div class="chat-name"><p>'+$rootScope.currentUser.name+'</p><div class="chat-time"><p>'+chatDateTime+'</p></div></div><div class="chat-text"><p>'+value.message+'</p></div></div>');
                                            notiElement.append(notification);
                                            $compile(notiElement)($scope);
                                        }
                                    });
                                    $(".main-chat").scrollTop($(".main-chat").prop("scrollHeight"));
                                }  
                            });
                        }
                        else{
                            $(".chatloader").css('display','none');
                        }
                    }
                    else{
                        $(".chatloader").css('display','none');
                    }
                });
            });
        }
    }

    console.log($rootScope.currentUser);
    console.log($location.path());

    $scope.userSendMessage = function (message) {
            $scope.message = message;
            $("#chat-input").val('');
            if (message != "" && message != undefined) {
                var user_id = $('#user_id').text();
                console.log(user_id);
                if (user_id != "") {
                    var userChatid = $scope.userChatID;
                    var userCredentials = {
                        userId: userChatid,
                        password: "someSecret"
                    };
                    QB.chat.connect(userCredentials, function (error, contactList) {
                        var params = {
                            type: 3,
                            occupants_ids: user_id
                        };

                        QB.chat.dialog.create(params, function (error, conversation) {
                            console.log(error);
                            console.log(conversation);
                            console.log($scope.message);
                            var message = {
                                type: "chat",
                                body: $scope.message,
                                extension: {
                                    save_to_history: 1
                                },
                                markable: 1
                            };
                            console.log(message);
                            var opponentId = parseInt(user_id);
                            console.log(typeof opponentId);
                            QB.chat.send(opponentId, message);
                            dateResponse = new Date();
							chatTime = dateResponse.toLocaleTimeString();
							chatDate = dateResponse.toLocaleDateString();
							chatDateTime = chatDate +' '+ chatTime;
                            var notiElement = angular.element(document.querySelector('.main-chat'));
                            let notification = angular.element('<div class="chat-msg right-chat"><div class="chat-name"><p>'+$rootScope.currentUser.name+'</p><div class="chat-time"><p>'+chatDateTime+'</p></div></div><div class="chat-text"><p>'+$scope.message+'</p></div></div>');
                            notiElement.append(notification);
                            $compile(notiElement)($scope); 
                            $(".main-chat").scrollTop($(".main-chat").prop("scrollHeight"));                            
                        });                        
                    });

                    // var slug = "";

                    // if ($location.path() == "/me") {
                    //     slug = "booth_c_1";
                    // } else if ($location.path() == "/bluehost") {
                    //     slug = "booth_c_2";
                    // } else if ($location.path() == "/sedo") {
                    //     slug = "booth_c_3";
                    // } else if ($location.path() == "/web") {
                    //     slug = "booth_c_4";
                    // } else if ($location.path() == "/neo") {
                    //     slug = "booth_c_5";
                    // } else if ($location.path() == "/fresh") {
                    //     slug = "booth_c_6";
                    // } else if ($location.path() == "/google") {
                    //     slug = "booth_c_7";
                    // } else if ($location.path() == "/hg") {
                    //     slug = "booth_c_8";
                    // } else if ($location.path() == "/org") {
                    //     slug = "booth_c_9";
                    // } else if ($location.path() == "/rc") {
                    //     slug = "booth_c_10";
                    // }

                    // gratification.sendPoints('user_self_activity', slug);
                } else {
                    console.log(message);
                    console.log(user_id);
                    var message = {
                        type: "groupchat",
                        body: message,
                        extension: {
                            save_to_history: 1,
                            dialog_id: "5fb4f767a0eb476617fc5a2f"
                        },
                        markable: 1
                    };
                    console.log(message);
                    var dialogJid = QB.chat.helpers.getRoomJidFromDialogId("5fb4f767a0eb476617fc5a2f");
                    console.log(dialogJid);
                    QB.chat.send(dialogJid, message);
                    var notiElement = angular.element(document.querySelector('.main-chat'));
                    let notification = angular.element('<div class="chat-msg right-chat"><div class="chat-name"><p>'+$rootScope.currentUser.name+'</p><div class="chat-time"><p>11:00 AM</p></div></div><div class="chat-text"><p>'+$scope.message+'</p></div></div>');
                    notiElement.append(notification);
                    $compile(notiElement)($scope);
                    
                    $("#chat-input").val('');
                }

            }
            // $scope.message = "message";
        } 

        var localStream;
        // var session = QB.webrtc.createNewSession(calleesIds, sessionType, null, additionalOptions);
        $scope.videochat = function (obj) {
            var element = angular.element(obj);
            var user_id = document.getElementById("user_id").innerHTML;
            $('.main-chat').css('display','none');
            $('.modal-footer').css('display','none');
            $('.video-chat').css('display','block');
            $('.close_dropdown').click();
            var mediaParams = {
                audio: true,
                video: true,
                options: {
                    muted: true,
                    mirror: true,
                },
                elemId: "local_video",
            };

            var calleesIds = [user_id]; // Users' ids
            var sessionType = QB.webrtc.CallType.VIDEO; // AUDIO is also possible
            var additionalOptions = {};
            var session = QB.webrtc.createNewSession(calleesIds, sessionType, null, additionalOptions);
            $scope.session_variable = session;
            var extension = {};
            // setViewState('calling');
            session.getUserMedia(mediaParams, function (err, stream) {
                localStream = stream;
                session.call(extension, function (error) {
                    console.log(error);
                });
                console.log(stream);
            });
        }

        QB.webrtc.onCallListener = function(session, extension) {
            var noti_popup = angular.element("#income_call");
            noti_popup.modal('show');
            console.log(session.initiatorID);
            var searchParams = {filter: { field: 'id', param: 'in', value: [session.initiatorID] }};
            QB.users.listUsers(searchParams, function(error, result){                 
                console.log(result.items[0].user.full_name);
                $('.j-ic_initiator').empty().append(result.items[0].user.full_name);
                // console.log(error);
            });
            $scope.session_variable = session;
            // alert($scope.session_variable);
            $scope.session_extension = extension;           
            console.log(session);
            console.log(extension);
        };

        $scope.decline_call = function(){
            var noti_popup = angular.element("#income_call");
            var chat_popup = angular.element("#chatModal");
            noti_popup.modal('hide');
            chat_popup.modal('show');
            var extension = {};
            $scope.session_variable.reject(extension);
        }

        $scope.accept_call = function () {
                var noti_popup = angular.element("#income_call");
                var chat_popup = angular.element("#chatModal");
                noti_popup.modal('hide');
                chat_popup.modal('show');
                $('.main-chat').css('display','none');
                $('.modal-footer').css('display','none');
                $('.video-chat').css('display','block');
                var mediaParams = {};
                navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                }).then(function(stream) {
                    const constraints = {
                            video: true,
                        };
                        const video = document.getElementById("local_video");
                        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                                video.srcObject = stream;                                

                            });
                                stream.getTracks().forEach(function(track) {
                                track.stop();
                        });
                        
                        
                    QB.webrtc.getMediaDevices('videoinput').then(function(devices) {
                        
                        if (devices.length) {
                            for (var i = 0; i !== devices.length; ++i) {
                                var deviceInfo = devices[i];
                                console.log(deviceInfo.deviceId);
                                mediaParams.video = {
                                    deviceId: deviceInfo.deviceId
                                }
                            }
                        }

                        QB.webrtc.getMediaDevices('audioinput').then(function(devices) {
                        
                            if (devices.length) {
                                for (var i = 0; i !== devices.length; ++i) {
                                    var deviceInfo = devices[i];
                                    console.log(deviceInfo.deviceId);
                                    mediaParams.audio = {
                                        deviceId: deviceInfo.deviceId
                                    }
                                }
                            }

                            mediaParams.elemId = 'opponent_video';
                            mediaParams.options = {
                                muted: false,
                                mirror: true
                            };

                            console.log(mediaParams);
                                    
                            $scope.session_variable.getUserMedia(mediaParams, function (err, stream) {
                                if (err) {
                                    console.log(err);
                                } else {
            						localStream = stream;
                                    //session.call(extension, function(error) {});
                                    var extension = {};
                                    $scope.session_variable.accept(extension);   
                                }
                                
                            });
                        });
                    });
                }).catch(function(error) {
                    console.warn('Video devices were shown without names (getUserMedia error)', error);
                });
            }

        $scope.endCall = function(){
            $('.main-chat').css('display','block');
            $('.modal-footer').css('display','block');
            $('.video-chat').css('display','none');  
            localStream.getTracks().forEach(function(track) {
              track.stop();
            });
            $scope.session_variable.detachMediaStream('opponent_video');
            // $scope.session_variable.detachMediaStream('localVideo');
            var oppVideoPlayer = document.getElementById("opponent_video");
            var localVideoPlayer = document.getElementById("local_video");
            var mediaStream = localVideoPlayer.srcObject;
            var mediaTracks = mediaStream.getTracks();
            mediaTracks[0].stop(); 
            localVideoPlayer.pause();
            localVideoPlayer.src = ""; 
            $scope.session_variable.stop({});
        }

        var runScreenSharing = function () {
            navigator.mediaDevices
              .getDisplayMedia({
                video: true,
              })
              .then((stream) => {
                var videoTrack = stream.getVideoTracks()[0];
                videoTrack.onended = stopScreenSharing;
                switchMediaTrack(videoTrack);
              });
          },
          stopScreenSharing = function () {
            navigator.mediaDevices
              .getUserMedia({
                video: true,
              })
              .then((stream) => { 
                switchMediaTrack(stream.getVideoTracks()[0]);
              });
          },
          switchMediaTrack = function (track) {
            localStream.getVideoTracks()[0].stop();
            var stream = localStream.clone();
            console.log(stream);
            stream.removeTrack(stream.getVideoTracks()[0]);
            stream.addTrack(track);
            localStream.getAudioTracks()[0].stop();
            console.log($scope.session_variable);
            $scope.session_variable._replaceTracks(stream);
            localStream = stream;
            return true;
          };

        $scope.disableCamera = function(){
            $scope.session_variable.mute('video');
            $('.enableCamera').css('display', 'inline');
            $('.disableCamera').css('display', 'none');
        }

        $scope.enableCamera = function(){
            $scope.session_variable.unmute('video');
            $('.disableCamera').css('display', 'inline');
            $('.enableCamera').css('display', 'none');
        }

        $scope.muteCall = function(){
            $scope.session_variable.mute('audio');  
            $('.muteCall').css('display', 'none');
            $('.unmuteCall').css('display', 'inline');
        }

        $scope.unmuteCall = function(){
            $scope.session_variable.unmute('audio');  
            $('.unmuteCall').css('display', 'none');
            $('.muteCall').css('display', 'inline');
        }

        $scope.shareScreen = function(){
            runScreenSharing(); 
            $('.stopShareScreen').css('display', 'inline');
            $('.shareScreen').css('display', 'none');
        }

        $scope.stopShareScreen = function(){
            stopScreenSharing();
            $('.stopShareScreen').css('display', 'none');
            $('.shareScreen').css('display', 'inline');
        }

        QB.webrtc.onAcceptCallListener = function(session, userId, extension) {
            // console.log("accepted");
            // console.log(session);
            
            // var extension = {};
            console.log(session);
            console.log(userId);
            console.log(extension);
            // var extension = {};
            if ($location.path() == "/me") {
                        slug = "booth_v_1";
                    } else if ($location.path() == "/bluehost") {
                        slug = "booth_v_2";
                    } else if ($location.path() == "/sedo") {
                        slug = "booth_v_3";
                    } else if ($location.path() == "/web") {
                        slug = "booth_v4";
                    } else if ($location.path() == "/neo") {
                        slug = "booth_v_5";
                    } else if ($location.path() == "/fresh") {
                        slug = "booth_v_6";
                    } else if ($location.path() == "/google") {
                        slug = "booth_v_7";
                    } else if ($location.path() == "/hg") {
                        slug = "booth_v_8";
                    } else if ($location.path() == "/org") {
                        slug = "booth_v_9";
                    } else if ($location.path() == "/rc") {
                        slug = "booth_v_10";
                    }

                    gratification.sendPoints('user_self_activity', slug);         
        };

        QB.webrtc.onRemoteStreamListener = function(session, userId, remoteStream) {
            // attach the remote stream to DOM element
            console.log(session);
            console.log(userId);
            console.log(remoteStream);
            session.attachMediaStream("opponent_video", remoteStream);
        }

        QB.webrtc.onStopCallListener = function(session, userId, extension){
            $('.main-chat').css('display','block');
            $('.modal-footer').css('display','block');
            $('.video-chat').css('display','none');  
            localStream.getTracks().forEach(function(track) {
              track.stop();
            });
            $scope.session_variable.detachMediaStream('opponent_video');
            // $scope.session_variable.detachMediaStream('localVideo');
            var oppVideoPlayer = document.getElementById("opponent_video");
            var localVideoPlayer = document.getElementById("local_video");
            var mediaStream = localVideoPlayer.srcObject;
            var mediaTracks = mediaStream.getTracks();
            mediaTracks[0].stop(); 
            localVideoPlayer.pause();
            localVideoPlayer.src = ""; 
            session.stop({});
        }

        QB.webrtc.onRejectCallListener = function(session, userId, extension) {
            $('.main-chat').css('display','block');
            $('.modal-footer').css('display','block');
            $('.video-chat').css('display','none');  
            localStream.getTracks().forEach(function(track) {
              track.stop();
            });
            $scope.session_variable.detachMediaStream('opponent_video');
            // $scope.session_variable.detachMediaStream('localVideo');
            var oppVideoPlayer = document.getElementById("opponent_video");
            var localVideoPlayer = document.getElementById("local_video");
            var mediaStream = localVideoPlayer.srcObject;
            var mediaTracks = mediaStream.getTracks();
            mediaTracks[0].stop(); 
            localVideoPlayer.pause();
            localVideoPlayer.src = ""; 
            session.stop({});
        };

        console.log(typeof $scope.session_variable);
 
        if (typeof $scope.session_variable != 'undefined') {
            extension = {};
            $scope.session_variable.stop(extension);
        }




    
    $rootScope.concert_started = 0;
    $rootScope.showscrolling = false;
    $scope.checkscrollingright = false;
    $scope.showscrollingupright = false;
    $rootScope.showscrollingup = false;
    $rootScope.userwelcomefirst = 0;
    $rootScope.new_notification_alert = 0;
    $rootScope.urlprefix = 'https://avayaapis.virtex.in/apicb';
    $scope.checkscrolling = angular.element(document.querySelector('#nav-menu'));
    $scope.checkscrollingrightval = angular.element(document.querySelector('#sidebarright'));
    if ($scope.checkscrolling[0]['clientHeight'] < $scope.checkscrolling[0]['scrollHeight']) {
        $rootScope.showscrolling = true;

    }
    if ($scope.checkscrollingrightval[0]['clientHeight'] < $scope.checkscrollingrightval[0]['scrollHeight']) {
        $rootScope.checkscrollingright = true;

    }

    $scope.removeAlertClass = function () {
        $rootScope.new_notification_alert = 0;
    }

    $socket.on('new_msgs_from_exhibitor_online', function(data) {
        console.log(data);
        
        if (data.user_id == $rootScope.currentUser.id) {

            $rootScope.new_notification_alert = "new-notification-alert";
            var notiElement = angular.element(document.querySelector('.notification-text-box'));
            let notification = angular.element('<div class="notification-box"><div class="notification-chat"><div class="notificationchat-text"><a href="#"><span class="notification-chat-name">'+data.exhibitor_name+' wants to talk to you, please visit Networking Zone!</span></a><span class="notification-chat-time"></span></div><div class="notification-chat-para"><p></p></div></div></div>');
            notiElement.prepend(notification);
            $compile(notiElement)($scope);
            var divElement = angular.element(document.querySelector('.message-container'));
            
            if (!document.getElementById(data.exhibitor_name + data.exhibitor_id)) {
                console.log("test");
                var divElement = angular.element(document.querySelector('#people-text'));
                divElement.append($compile(angular.element('<a href="javascript:void(0)" onclick="view20(\'' + data.exhibitor_name + '\', \'' + data.exhibitor_id + '\')" id="' + data.exhibitor_name + data.exhibitor_id + '"><div class="people-data"><span class="people-name">' + data.exhibitor_name + '</span><span class="active-chat-icon"> <i class="green-circle" class="fas fa-circle" id="new_message" style="display:none;"></i></span></div></a>'))($scope));
            } 
            else {
                if ($('#user_socket_id').text() == data.exhibitor_id) {
                    console.log("test");
                    var divElement = angular.element(document.querySelector('#people-chat'));
                    var today = new Date();
                    var time = today.getHours() + ":" + today.getMinutes();
                    let comment = angular.element('<div id="people-chat-text"><div class="chat-text2"><a href="#"><span class="people-chat-name">' + data.exhibitor_name + '</span></a><span class="people-chat-time">' + time + '</span></div><div class="people-chat-para"><p>' + data.message + '</p></div></div>');
                    divElement.append(comment);
                    $compile(divElement)($scope);
                    angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
                }
            }
            
        }

    });


    $socket.on('exhi_user_chat_history_online', function(data) {

        console.log(data);
        var divElement = angular.element(document.querySelector('#people-chat'));
        if (data.data.user_id == $rootScope.currentUser.id) {
            // if ($('#user_socket_id').text() == data.exhibitor_id) {
                
            // }

            divElement.empty();
                angular.forEach(data.msg, function (value, key) {
                    var value = JSON.parse(value);
                    let comment = angular.element('<div id="people-chat-text"><div class="chat-text2"><a href="#"><span class="people-chat-name">' + value.name + '</span></a><span class="people-chat-time">' + value.time + '</span></div><div class="people-chat-para"><p>' + value.message + '</p></div></div>');
                    divElement.append(comment);
                    $compile(divElement)($scope);
                    angular.element(divElement)[0]['scrollTop'] = divElement[0]['scrollHeight'];
                });
            
        }
        // if (data.user_id == $rootScope.currentUser.id) {
        //     var divElement = angular.element(document.querySelector('#people-text'));
        //     divElement.append($compile(angular.element('<a href="javascript:void(0)" onclick="view20(\'' + data.exhibitor_name + '\', \'' + data.exhibitor_id + '\')" id="' + data.exhibitor_id + '"><div class="people-data"><span class="people-name">' + data.exhibitor_name + '</span><span class="active-chat-icon"> <i class="green-circle" class="fas fa-circle" id="new_message" style="display:none;"></i></span></div></a>'))($scope));
        // }
    });



    $rootScope.downscroll = function(id) {
        var newscroll = angular.element(document.querySelector('#' + id));
        newscroll[0]['scrollTop'] = newscroll[0]['scrollHeight'];
        // if($scope.checkscrolling[0]['clientHeight'] < $scope.checkscrolling[0]['scrollHeight']){
        $rootScope.showscrolling = false;
        $rootScope.showscrollingup = true;
        // }
    }

    $rootScope.upscroll = function(id) { 
        var newscroll = angular.element(document.querySelector('#' + id));
        newscroll[0]['scrollTop'] = 0;
        // if($scope.checkscrolling[0]['clientHeight'] < $scope.checkscrolling[0]['scrollHeight']){
        $rootScope.showscrolling = true;
        $rootScope.showscrollingup = false;
        // }
    }

    $rootScope.downscrollright = function(id) {
        var newscroll = angular.element(document.querySelector('#' + id));
        newscroll[0]['scrollTop'] = newscroll[0]['scrollHeight'];
        // if($scope.checkscrolling[0]['clientHeight'] < $scope.checkscrolling[0]['scrollHeight']){
        $rootScope.checkscrollingright = false;
        $rootScope.showscrollingupright = true;
        // }
    }

    $rootScope.upscrollright = function(id) {
        var newscroll = angular.element(document.querySelector('#' + id));
        newscroll[0]['scrollTop'] = 0;
        // if($scope.checkscrolling[0]['clientHeight'] < $scope.checkscrolling[0]['scrollHeight']){
        $rootScope.checkscrollingright = true;
        $rootScope.showscrollingupright = false;
        // }
    }
    

    // $http.get("https://devapi.virtex.in/api/cii-bio/fetch-notifications")
    //     .then(function(response) {
    //         console.log(response);
    //         $scope.mynotification = response.data.data;
    // });

    var fetchNotifications = {
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/fetch-notifications',
        data: {
            eventId: 3
        }
    };

    $http(fetchNotifications).then(function(data){
        console.log(data);
        $scope.mynotification = data.data.data;
    });

    // $rootScope.getUserName = function(firstName,  lastName) {
    //     return firstName.charAt(0).toLowerCase();
    // }


    // $rootScope.user_name = $rootScope.getUserName($rootScope.currentUser.firstName, $rootScope.currentUser. lastName);

    // var localdata = JSON.parse(localStorage.getItem("ngStorage-currentUser"));
    // localdata.socket_id = 
    // console.log(localdata);

    // console.log($socket.socketId());

    $socket.on("notification_data", function (data) {
        console.log(data.type);
        if (data.type == "alert") {
            $rootScope.new_notification_alert = "new-notification-alert";
            var notiElement = angular.element(document.querySelector('.notification-text-box'));
            let notification = angular.element('<div class="notification-box"><div class="notification-chat"><div class="notificationchat-text"><a href="#"><span class="notification-chat-name">'+data.title+'</span></a><span class="notification-chat-time">'+data.date+'</span></div><div class="notification-chat-para">' + data.description + '</div></div></div>');
            notiElement.prepend(notification);
            notiElement.prepend($compile(notification)($scope));
        } else if (data.type == "popup") {
            $scope.alert_data = data;
            var noti_popup = angular.element("#alertModal");
            noti_popup.modal('show');
            $rootScope.new_notification_alert = "new-notification-alert";
            var notiElement = angular.element(document.querySelector('.notification-text-box'));
            let notification = angular.element('<div class="notification-box"><div class="notification-chat"><div class="notificationchat-text"><a href="#"><span class="notification-chat-name">'+data.title+'</span></a><span class="notification-chat-time">'+data.date+'</span></div><div class="notification-chat-para">' + data.description + '</div></div></div>');
            notiElement.prepend(notification);
            notiElement.prepend($compile(notification)($scope));
        }
        // $compile(notiElement)($scope);
    });

    $socket.on('onlineusers', function(data) {
        $scope.total_online_users = data;
    });

    $rootScope.logout = function() {
        // console.log(JSON.parse($localStorage));
        Notiflix.Confirm.Show(
            'Do you really want to logout?','','Yes','No',
            function(){ 
                delete $localStorage.currentUser;
                $window.location.replace("../index.html");
            },
            function(){         
        });
        let page_url2 = $location.absUrl();
        let page_name2 = $location.path();
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId": $rootScope.currentUser.id,
                "eventName":"proptiger",
                "userName": $rootScope.currentUser.name,
                "userEmail": $rootScope.currentUser.email,
                "userPhone": $rootScope.currentUser.phone_number,
                "userCountry": 'India',
                "userCountryCode":"+91",
                "userDesignation": $rootScope.currentUser.designation,
                "userOrganization": $rootScope.currentUser.organization,
                "eventType":"click",
                "eventValue":"logout",
                "pageName": page_name2,
                "url": page_url2,  
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });
    }


    $scope.startchat = function() {
        console.log("start chat");
    };


    // $socket.emit('showonlineusers', $rootScope.currentUser);

    $scope.startVideosChat = function() {
        $state.go('videoconf');
        console.log("start chat");

    }



    $socket.on("showquestionsanswerdata", function (data) {
        console.log(data);
        $scope.poll_id = data.id;
        $scope.options = [
            {name: data.first_option, votes: 0, pct: 0},
            {name: data.second_option, votes: 0, pct: 0},
            {name: data.third_option, votes:0, pct: 0},
            {name: data.fourth_option, votes: 0, pct: 0},
        ];
        var polls = angular.element("#pollsModal");
        polls.modal('show');
    });


    $socket.on("responce_delegate_account", function (data) {
        console.log(data);
        logout();
    });
    // $socket.on('notification_data', function (data) {
    //         var divElement = angular.element(document.querySelector('.notification-text-box'));       
    //         let comment = angular.element('div class="notification-box"><div class="notification-chat"><div class="notificationchat-text"><a href="#"><span class="notification-chat-name">{{notis.notification_title}}</span></a><span class="notification-chat-time">{{notis.created_at | date:"dd/MM/yyyy 'at' h:mma"}}</span></div><div class="notification-chat-para"><p>{{notis.notification_description}}</p></div></div></div>');
    //         divElement.append(comment);
    //         $compile(divElement)($scope);
    // });

    // $socket.on('returnonlineusers', function(data) {
    //     var divElement = angular.element(document.querySelector('#people-text'));
    //     divElement.empty();
    //     var divNetElement = angular.element(document.querySelector('#net-contact-box'));
    //     // console.log(data);
    //     divNetElement.empty();
    //     console.log(data);
    //     for (const [key, value] of Object.entries(data)) {
    //         var user = JSON.parse(value);
    //         var user_name = user.firstName;
    //         // var first_val = $rootScope.getUserName(user.first_name, user.last_name);
    //         divElement.append($compile(angular.element('<a href="javascript:void(0)" onclick="view20(\'' + user_name + '\', \'' + key + '\', \'' + user.country + '\')" id="' + key + '"><div class="people-data"><img class="people-img" src="images/flags/' + user.country + '.svg" alt="Avatar" ><span class="people-name">' + user_name + '</span><span class="active-chat-icon"> <i class="green-circle" class="fas fa-circle" id="new_message" style="display:none;"></i></span></div></a>'))($scope));
    //         divNetElement.append($compile(angular.element('<div id="net-people-data3"><img class="net-people-img3" src="images/flags/' + user.country + '.svg"  alt="Avatar" ><p class="net-people-name3">' + user.firstName + '</p><p class="net-people-name3">' + user. lastName + '</p><button id="people-chat-button" ng-click=startVideosChat()><i class="fas fa-video">&nbsp; &nbsp; </i>Invite to call</button></div>'))($scope));
    //     }
    // });
    $scope.poll_title = "What is your favorite animal?";
    $scope.isButton = true;

    $scope.totalVotes = sumVotes();

    $scope.addVote = function(opt, index){
        if($scope.isButton){
            $scope.isButton = false;
            opt.votes += 1;
            $scope.totalVotes = sumVotes();
            updateRowVotes();
            closeBooth(index);
        }
        var req = {
            method: 'POST',
            url: $rootScope.urlprefix + '/pollsubmit',
            data: {"pollId":$scope.poll_id,"userId":$rootScope.currentUser.id,"optionAns":opt.name}
        }

        $http(req).then(function(data){
            console.log(data);
            $rootScope.workshopchat = data.data.data;
        });
    }

function sumVotes(){
    var votes = 0;
    for (var key in $scope.options) {
        if ($scope.options.hasOwnProperty(key)) {
            votes += $scope.options[key].votes;
        }
    }
    return votes;
}


$scope.sendSocialPoints = function () {
    gratification.sendPoints('user_self_activity','socia_media_all');
}

function updateRowVotes(){
for (var key in $scope.options) {
if ($scope.options.hasOwnProperty(key)) {
var obj = $scope.options[key];
console.log($scope.totalVotes);
obj.pct = (obj.votes / $scope.totalVotes)*100;
}
}
}

function closeBooth(clicked){
$(".vote-row").each(function(index) {
if(clicked !== index){
$(this).find("button.vote-btn").css("transform", "scale(0)");
$(this).find("button.vote-btn").text("");
}else{
$(this).find("button.vote-btn").text("");
$(this).find("button.vote-btn").css({"border-radius": "100%", "padding": "7px 10px"});
$(this).find("button.vote-btn").append("<i class='checkup fa fa-check' aria-hidden='true'></i>");
}
});
}


$scope.goBack = function(){
    $window.history.back();
}

});





            //     var divElement = angular.element(document.querySelector('#people-text'));
//         divElement.append($compile(angular.element('<a href="javascript:void(0)" onclick="view20(\'' + user_name + '\', \'' + key + '\', \'' + user.country + '\')" id="' + key + '"><div class="people-data"><img class="people-img" src="images/flags/' + user.country + '.svg" alt="Avatar" ><span class="people-name">' + user_name + '</span><span class="active-chat-icon"> <i class="green-circle" class="fas fa-circle" id="new_message" style="display:none;"></i></span></div></a>'))($scope));