angular.module('app').controller("MainController", ['$scope','$http', function($scope, $http){
    var vm = this;
    vm.title = 'Status Board';
    vm.statuses =
      $http.get('127.0.0.1:3000/Statuses', {"headers": {"Access-Control-Allow-Origin":"*"}}).then(function(res) {
        console.log("Response: " + res);
      }, function(err) {
        console.log("Error! " + err);
      });
}]);
