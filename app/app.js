var myApp = angular.module('app', []);

myApp.controller('MainController', ['$scope','$http', function($scope, $http){
    var vm = this;
    vm.title = 'Status Board';
//    vm.statuses = angular.fromJson('[{"name":"stratum-adp jenkins-test","status":"SUCCESS","shamer":"Kyle Haver"}]');
//    vm.statuses =
//      $http.get('127.0.0.1:3000/Statuses', {'headers': {'Access-Control-Allow-Origin':'*'}}).then(function(res) {
//        console.log('Response: ' + res);
//      }, function(err) {
//        console.log('Error! ' + err);
//      });
    $http.get('http://localhost:3000/Statuses').success(function(data){
        console.log(data);
        vm.statuses = data;  
    });
}]);