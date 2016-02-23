var myApp = angular.module('app', []);

myApp.controller('MainController', ['$scope','$http', '$interval', function($scope, $http, $interval){
    var vm = this;
    $scope.title = 'Status Board';
    $scope.statuses = [];
    var resetInterval = 300000;
    $scope.countDown = resetInterval * 0.001;

    var updateStatuses = function() {
      $http.get('http://khaver.mynetgear.com:3000/Statuses').success(function(data, headers, config) {
        console.log("Response: " + JSON.stringify(data));
        var successStatuses = [];
        $scope.statuses = [];
        
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
    
    $scope.clock = { time: "", interval: 1000 };

    $interval(function () { 
      $scope.clock.time = Date.now();
      $scope.countDown -= 1}, 
      $scope.clock.interval);
    
    updateStatuses();
    $interval(updateStatuses, resetInterval);
}]);

myApp.filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])
