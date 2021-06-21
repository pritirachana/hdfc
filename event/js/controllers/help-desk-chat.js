app.controller("help-desk-chatController", function($scope, $rootScope, $state, $compile, $window, $socket, $timeout) {

    angular.element($window).bind('load', function() {
       
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date(); Tawk_API.embedded='tawk_5f92ffc3194f2c4cbeb877f1';
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/5f92ffc3194f2c4cbeb877f1/1elb3lb58';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);})();
      
       // $rootScope.Tawk_API.hideWidget()
    });
   
});