var myApp = angular.module('app', []);

myApp.controller('MainController', ['$scope','$http', '$interval', function($scope, $http, $interval){
    var vm = this;
    $scope.title = 'Status Board';

    var updateStatuses = function() {
      $http.get('http://khaver.mynetgear.com:3000/Statuses').success(function(data, status, headers, config) {
        console.log("Response: " + JSON.stringify(data));
        $scope.statuses = data;
        $scope.allBuildsPass = $scope.statuses.some(function(record){
          if(record.status !== 'SUCCESS'){
            return true;   
          }
        });
      })
    };
    updateStatuses();
    $interval(updateStatuses, 300000);
}]);
