var myApp = angular.module('app', []);

myApp.controller('MainController', ['$scope','$http', function($scope, $http, $interval){
    var vm = this;
    vm.title = 'Status Board';
    function updateStatuses() {
      $http.get("http://khaver.mynetgear.com:3000/Statuses", {"headers": {"Access-Control-Allow-Origin":"*"}}).then(function(res) {
        console.log("Response: " + JSON.stringify(res));
        return res.body;
      })
    }
    vm.statuses = updateStatuses();//$interval(updateStatuses, 3000);
}]);
