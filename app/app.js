var myApp = angular.module('app', []);

myApp.controller('MainController', ['$scope','$http', '$interval', function($scope, $http, $interval){
    var vm = this;
    $scope.title = 'Status Board';
    
    var updateStatuses = function() {
      $http.get('http://khaver.mynetgear.com:3000/Statuses').success(function(res) {
        console.log("Response: " + JSON.stringify(res));
        $scope.statuses = res;
      })
    };
    updateStatuses()
//    $interval(updateStatuses(), 3000);
}]);
