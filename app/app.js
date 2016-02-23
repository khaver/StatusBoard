var myApp = angular.module('app', []);

myApp.controller('MainController', ['$scope','$http', '$interval', function($scope, $http, $interval){
    var vm = this;
    $scope.title = 'Status Board';
    $scope.statuses = [];

    var updateStatuses = function() {
      $http.get('http://khaver.mynetgear.com:3000/Statuses').success(function(data, headers, config) {
        console.log("Response: " + JSON.stringify(data));
        var successStatuses = [];
        var statusArray = data;
        for(var i=0; i<data.length; i++){
          if(data[i].status === 'SUCCESS'){
            successStatuses.push(data[i]);
          } else if (data[i].status === 'FAILURE'){
            $scope.statuses.push(data[i]);
          }
        }
        $scope.statuses = $scope.statuses.concat(successStatuses);
          
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
