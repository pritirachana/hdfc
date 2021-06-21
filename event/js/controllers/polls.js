app.controller("pollsController", function($scope, $rootScope, $state, $socket, $compile, $window) {

    $scope.poll_title = "What is your favorite animal?";
    $scope.isButton = true;
    $scope.options = [
      {name: "Panda", votes: 0, pct: 0},
      {name: "Iguana", votes: 0, pct: 0},
      {name: "Grizzly Bear", votes:0, pct: 0},
      {name: "Ostrich", votes: 0, pct: 0},
      {name: "Leopard", votes: 0, pct: 0},
      {name: "Fox", votes: 0, pct: 0}
    ];
    $scope.totalVotes = sumVotes();
  
    $scope.addVote = function(opt, index){
      if($scope.isButton){
        $scope.isButton = false;
        opt.votes += 1;
        $scope.totalVotes = sumVotes();
        updateRowVotes();
        closeBooth(index);
      }
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
});