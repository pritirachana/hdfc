app.controller("expomainController2", function($scope, $rootScope, $http, $state, $compile, $window, $socket, $timeout,$stateParams,$location) {
    
    let page_url1 = $location.absUrl();
    let page_name1 = $location.path();
    let user_id1 = $rootScope.currentUser.id;
    let user_name1 = $rootScope.currentUser.name;
    let email1 = $rootScope.currentUser.email;
    let userPhone1 = $rootScope.currentUser.phone_number;
    let country1 = 'India';
    let designation1 = $rootScope.currentUser.designation;
    let organization1 = $rootScope.currentUser.organization;

    let q_id = $rootScope.userChatID;
    console.log("quick_id" + q_id);
    let logUserData = {
        "pageUrl": $location.absUrl(),
        "pageName": $location.path(),
        "userId": $rootScope.currentUser.id,
        "userName": $rootScope.currentUser.name,
        "userEmail": $rootScope.currentUser.email,
        "q_id": $rootScope.qid,
        "mobile":$rootScope.currentUser.phone_number,
        "event_id":14,
        "stall_id":$stateParams.id
    }
    console.log(logUserData);
    $socket.emit('logUserData', logUserData);

    // console.log({user_id:user_id,page_url:page_url,page_name:page_name,type:type});
    var data = {
        "userId":user_id1,
        "eventName":"14",
        "userName":user_name1,
        "userEmail":email1,
        "userPhone":userPhone1,
        "userCountry":'India',
        "userDesignation":designation1,
        "userOrganization":organization1,
        "pageName":page_name1,
        "qId":$rootScope.qid, 
        "value":"user journey",
        "url":page_url1,
        "test": "test"
    };
    $http({
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/analytics-all-page',
        data:data
    }).then(function(data){
        if(data.data.status == true){
            console.log("test");
            console.log('Report Updated');
            console.log(data);
        }
    }, function(error){
        console.log(error);
    });
    
    let page_url = $location.absUrl();
    let page_name = $location.path();
    let user_id = $rootScope.currentUser.id;
    let user_name = $rootScope.currentUser.name;
    let email = $rootScope.currentUser.email;
    let userPhone = $rootScope.currentUser.phone_number;
    let country = 'India';
    let designation = $rootScope.currentUser.designation;
    let organization = $rootScope.currentUser.organization;
    console.log($rootScope.qid);
    console.log($stateParams.id);
    // setInterval(function () {
    //     $socket.emitIndividualExhibitionChat("avaya_on_exhibition", {"name": $rootScope.currentUser.name, "mobile": $rootScope.currentUser.phone_number, "email": $rootScope.currentUser.email, "stall_id" : $stateParams.id, "qid": $rootScope.qid, "event_id": 3});  
    // }, 10000);

    var getExpoDetail = {
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/get-expo-detail-group-by-expo-id',
        data: {
            "eventId": 14,
            "exhibitorId":$stateParams.id
        }
    };

    $http(getExpoDetail).then(function(data){
        console.log(data.data.data[0].getexhigroups);
        $scope.getExhiGroups = data.data.data[0].getexhigroups;
    });

    $scope.goBack = function(){
        $window.history.back();
    }

    var req = {
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/get-expo-detail',
        data: {"eventId":14,"exhibitorId":$stateParams.id}
    }

    $http(req).then(function(data){
        console.log(data);
        $scope.company_name = data.data.data[0].company_name;
        $scope.secondBannerImage = data.data.data[0].secondBannerImage;
        $scope.thumbnailBannerImage = data.data.data[0].thumbnailBannerImage;
        $scope.company_banners = data.data.data[0].company_banners;
        $scope.company_banners_v = data.data.data[0].logo;
        $scope.insta_link = data.data.data[0].insta_link;
        $scope.fb_link = data.data.data[0].fb_link;
        $scope.linkd_link = data.data.data[0].linkd_link;
        $scope.twitter_link = data.data.data[0].twitter_link;
        $scope.website = data.data.data[0].website;
        $scope.q_id = data.data.data[0].q_id;
        $scope.exhi_id = data.data.data[0].id;
        $scope.previous = data.data.data[0].previousId;
        $scope.next = data.data.data[0].nextId;
        $scope.videos = data.data.data[0].exhibitorVideos;
        $scope.brochures = data.data.data[0].exhiBrochures;
        $scope.products = data.data.data[0].exhiProducts;
        $scope.access_category_id = data.data.data[0].access_category_id;
        $scope.exhiRepresentatives = data.data.data[0].exhiRepresentatives;
        console.log($scope.access_category_id);
        console.log($scope.videos);

        var orgUser = [{'user':{'full_name': $scope.company_name,'id': $scope.q_id}}];
        console.log(orgUser);
        $rootScope.listUsers = orgUser;
        console.log(orgUser.id);
        // $scope.company_name = data.data
        // $rootScope.expobyCategory = data.data.data;
    });

    $("#getExhiGroupData").on('change',function(){
        // alert($("#getExhiGroupData").val());
        var group_id = $("#getExhiGroupData").val();
        if(group_id != 0){
            var getExpoDetailbyGroup = {
                method: 'POST',
                url: 'https://devapi.virtex.in/api/cii-bio/get-expo-detail-group-by-expo-id',
                data: {
                    "eventId": 14,
                    "groupId": group_id
                }
            };
        
            $http(getExpoDetailbyGroup).then(function(data){
                console.log(data);
                $scope.company_name = data.data.data[0].name;
                $scope.brochures = data.data.data[0].exhiBrochures;
                $scope.videos = data.data.data[0].exhibitorVideos;
                $scope.secondBannerImage = data.data.data[0].horizontal_image;
                $scope.thumbnailBannerImage = data.data.data[0].virteical_banner_one;
                // $scope.$apply();
            });
        }
        else{
            var req = {
                method: 'POST',
                url: 'https://devapi.virtex.in/api/cii-bio/get-expo-detail',
                data: {"eventId":14,"exhibitorId":$stateParams.id}
            }
        
            $http(req).then(function(data){
                console.log(data);
                $scope.company_name = data.data.data[0].company_name;
                $scope.secondBannerImage = data.data.data[0].secondBannerImage;
                $scope.thumbnailBannerImage = data.data.data[0].thumbnailBannerImage;
                $scope.videos = data.data.data[0].exhibitorVideos;
                $scope.brochures = data.data.data[0].exhiBrochures;
                // $scope.company_name = data.data
                // $rootScope.expobyCategory = data.data.data;
            });
        }    
    });

    // $scope.

    // function getExhiGroupData(){
    //     alert(this.val());
    // }

    $scope.scheduleCallback = function() {
        // Notiflix.Report.Success('Notiflix Success','Callback Scheduled','Click');
        
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/deligates-meeting-create',
            data: {
                "eventId": 14,
                "exhibitorId":$stateParams.id,
                "delegateId": $rootScope.currentUser.id
            }
        };

        $http(req).then(function(data){
            console.log(data);
            if(data.data.status == true){
                Notiflix.Report.Success('Notiflix Success','Callback Request Sent','Ok');
                $socket.emit('request_call_back_notification', {"userName" : $rootScope.currentUser.name, "stallId" : $stateParams.id});
            }
            else{
                Notiflix.Report.Info('Notiflix Success','Callback Request Already Sent','Ok');
            }
        });
    }

    // $('.pop_image').on('click', function() {
    //     alert("test");
    //     $('.imagepreview').attr('src', $(this).find('img').attr('src'));
    //     $('#imagemodal').modal('show');   
    // });		

    $scope.imagepop = function(src){
        // $('.').attr('src'); 
        console.log(src);
        $('.imagepreview').attr('src', src);
        $('#imagemodal').modal('show');
    }

    $scope.expolist = function(){
        $scope.currentTime = new Date().getHours() + ':' + (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes();
        if($scope.currentTime >= "19:30"){
            console.log('cleared');
            // $('#messageWallModal').modal({backdrop: false});
            $("#chatTimeOverModal").modal({backdrop: false});
        }
        else{
            $("#chatModal").modal({backdrop: false});
        }  
        var elements = document.getElementsByClassName('currentChat');
        while(elements.length > 0){
            elements[0].classList.remove('currentChat');
        }
        $(".video_icons").css('display', 'none');
        $(".chat_input").css('display','none');
        $(".chat_bg").css('display','block');
        $(".chat_name").empty();
        $('.main-chat').empty().append(`<div class="chat_bg" style="text-align: center;">
            <img src="images/chat_icon.png" style="max-width: 30%;margin-top: 30px;">
            <h2>Select user to start chatting</h2></div>`
        );
        var chatElement = "#" + $scope.q_id;
        console.log(chatElement);
        // $(chatElement).trigger("click");
        ///////////////////
        // Notiflix.Report.Info('','Thank you! for visiting us, we will be available tomorrow 10 AM','Okay');
        //////////////////
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId": user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": country,
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"chat",
                "pageName": page_name,
                "url": page_url,  
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });
    };

    var openChat= $location.search()['chat'];
    if(openChat == 'true'){
        $scope.expolist();
    }

    $scope.jitsiModal = function() {
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId": user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": 'India',
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"jitsi",
                "pageName": page_name,
                "url": page_url,
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });
    }

    $scope.instaClick = function() {
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId": user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": country,
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"instagram",
                "pageName": page_name,
                "url": page_url,
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });
    }

    $scope.productlink = function(link) {
        console.log(link);
        if(link != null){
            window.open(link,'_blank');
        }    
    }

    $scope.linkedinClick = function() {
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId": user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": country,
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"linkedin",
                "pageName": page_name,
                "url": page_url,
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });
    }

    $scope.twitterClick = function() {
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId": user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": country,
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"linkedin",
                "pageName": page_name,
                "url": page_url,
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });
    }

    $scope.fbClick = function() {
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId": user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": country,
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"facebook",
                "pageName": page_name,
                "url": page_url,
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });
    }

    $scope.websiteClick = function() {
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId": user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": country,
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"website",
                "pageName": page_name,
                "url": page_url,
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });
    }

    $scope.repClick = function() {
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId":user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": country,
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"representative",
                "pageName": page_name,
                "url": page_url,
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });
    }

    $scope.brochuress = function(src) {
        $("#brochuresModal").modal('hide');
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId":user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": 'India',
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"brochure",
                "pageName": page_name,
                "url": page_url,
                "value":"any value"
            }
        };

        $http(req).then(function(data){
        });

        $('.document_preview').attr('src', src);
        $('#documentmodal').modal('show');
    }

    $scope.videolist = function(src) {
        $("#videoModal").modal('hide');
        var req = {
            method: 'POST',
            url: 'https://devapi.virtex.in/api/cii-bio/analytics-click',
            data: {
                "userId":user_id,
                "eventName":"14",
                "userName": user_name,
                "userEmail": email,
                "userPhone": userPhone,
                "userCountry": country,
                "userCountryCode":"+91",
                "userDesignation": designation,
                "userOrganization": organization,
                "eventType":"click",
                "eventValue":"watched video",
                "pageName": page_name,
                "url": page_url,
                "value":"any value"
            }
        };

        $http(req).then(function(data){
            console.log(data);
        });

        console.log(src);
        $('.video_preview').attr('src', src+'?autoplay=1');
        $('#videomodal').modal('show');
    }

    $('.close_video_modal').on('click', function(){
        $('.video_preview').attr('src','');
    });

    // $rootScope.exponame = "test";
    // $rootScope.expo_id = 126420175;


    $scope.$on('$viewContentLoaded', function() {
        //call it here

        
    });

});