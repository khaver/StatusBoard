var myApp = angular.module('app', []);

myApp.controller('MainController', ['$scope','$http', function($scope, $http){
    var vm = this;
    vm.title = 'Status Board';
    $http.get('http://localhost:3000/Statuses').success(function(data){
        console.log(data);
        vm.statuses = data;  
    });
}]);