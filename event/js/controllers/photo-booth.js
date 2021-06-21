app.controller("photo-boothController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout, $http) {

    $scope.constraints = {
        video: true,
      };
      var imageURL;
    $scope.photoCaptured = false;
    let user_id = $rootScope.currentUser[0].id;
    let user_name = $rootScope.currentUser[0].name;
    let user_email = $rootScope.currentUser[0].email;
    let user_phone = $rootScope.currentUser[0].phone_number;

    console.log($rootScope.currentUser[0]);
    $scope.showCamera = function(){
        $scope.videoPopup = true;
        $scope.canvas = document.querySelector("#cameraCanvas");
        $scope.video = document.querySelector("video");
        $scope.capturedImage = document.querySelector("#capturedImage");
        $scope.capturedImageWithFrame = document.querySelector("#capturedImageWithFrame");
        $scope.downloadLink = document.querySelector("#downloadImage");
        $scope.reloadImage();
        navigator.mediaDevices.getUserMedia($scope.constraints).then((stream) => {
            $scope.video.srcObject = stream;
        });

        var request = {
            method: 'POST',
            url: 'https://avayaapis.virtex.in/analyticsCount',
            data: {userId: user_id, userName: user_name, userEmail: user_email, userPhone: user_phone, eventType: "photo_click"}
        }
        
        $http(request).then(function(data){
            console.log(data);
        });

    }
      
    $scope.stopCamera = function(){
        $scope.videoPopup = false;
        $scope.video.srcObject.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    $scope.captureVideo = function(){
        $scope.video = document.querySelector("video");
        $scope.canvas.width = $scope.video.videoWidth;
        $scope.canvas.height = $scope.video.videoHeight;
        $scope.canvas.getContext("2d").drawImage($scope.video, 0, 0);
        // Other browsers will fall back to image/png
        $scope.capturedImage.src = $scope.canvas.toDataURL("image/webp");
        html2canvas(document.querySelector("#selfiephoto")).then(canvas => {
            $scope.canvas = canvas;
            $scope.capturedImageWithFrame.src = canvas.toDataURL();
            imageURL = canvas.toDataURL('image/jpeg', 1);

            // var image = new Image();
            // image.src = imageURL;
            // console.log(image);
            // document.body.appendChild(image);

            // var file = new File([canvas.toDataURL()], 'test', {
            //     type: 'image/jpeg'
            // });
            // console.log(file);
            // console.log(imageURL);
            $http({
                method: 'POST',
                url: 'https://avayaapis.virtex.in/niitaagman/photo-booth',
                data:{userId:user_id,photoBooth:imageURL,type:'profile'}
            }).then(function(data){
                if(data.data.status == true){
                    console.log('photo uploaded');
                } 
            }, function(error){
                console.log(error);
            });
            // document.querySelector("#selfiephoto").style.visibility = "hidden";
            // document.querySelector("#selfiephotos").style.visibility = "hidden";
            
        });
        $scope.photoCaptured = true;
    }

    $scope.reloadImage = function(){
        $scope.capturedImage.src = '';
        $scope.capturedImageWithFrame.src = '';
        document.querySelector("#selfiephoto").style.visibility = "block";
        document.querySelector("#selfiephotos").style.visibility = "block";
        $scope.photoCaptured = false;
    }

    $scope.downloadImage = function(){
        if($scope.photoCaptured == true){
            $scope.downloadLink.download = 'selfie.png';
            $scope.downloadLink.href = $scope.canvas.toDataURL();
            $scope.downloadLink.click();
        }
    }

    $scope.$on("$destroy", function(){
        $scope.stopCamera();
    });

});