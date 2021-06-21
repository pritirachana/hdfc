app.controller("expomainController", function($scope, $rootScope,$http, $state, $compile, $window, $socket, $timeout,$stateParams) {
    console.log($stateParams.id);
    var req = {
        method: 'POST',
        url: 'https://devapi.virtex.in/api/cii-bio/get-expo-detail',
        data: {"eventId":1,"exhibitorId":$stateParams.id}
    }

    $http(req).then(function(data){
        console.log(data.data.data[0]);
        $scope.company_name = data.data.data[0].company_name;
        $scope.secondBannerImage = data.data.data[0].secondBannerImage;
        $scope.thumbnailBannerImage = data.data.data[0].thumbnailBannerImage;
        $scope.company_banners = data.data.data[0].company_banners;
        $scope.insta_link = data.data.data[0].insta_link;
        $scope.fb_link = data.data.data[0].fb_link;
        $scope.linkd_link = data.data.data[0].linkd_link;
        $scope.twitter_link = data.data.data[0].twitter_link;
        $scope.website = data.data.data[0].website;
        $scope.q_id = data.data.data[0].q_id;
        $scope.exhi_id = data.data.data[0].id;
        $scope.videos = data.data.data[0].exhibitorVideos;
        $scope.brochures = data.data.data[0].exhiBrochures;
        $scope.access_category_id = data.data.data[0].access_category_id;
        console.log($scope.access_category_id);
        console.log($scope.videos);

        var orgUser = [{'user':{'full_name': $scope.company_name,'id': $scope.q_id}}];
        console.log(orgUser);
        $rootScope.listUsers = orgUser;
        console.log(orgUser.id);
        // $scope.company_name = data.data
        // $rootScope.expobyCategory = data.data.data;
    });

    $scope.expolist = function(){
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
    };

    // $rootScope.exponame = "test";
    // $rootScope.expo_id = 126420175;

});