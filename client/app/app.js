angular.module('sikk', ['ngRoute','firebase'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        template: '<h1>Welcome to SIKK</h1>',
    })
    .when('/signup', {
        templateUrl: 'partials/signup.html',
        controller: 'UsersController'
    })
    .when('/users', {
        templateUrl: 'partials/users.html',
        controller: 'UsersController'
    })
    .when('/cases/:id', {
        templateUrl: function(params){ return 'partials/case-detail.html/'; },
        controller: 'CaseDetailController'
    })
    .when('/cases', {
        templateUrl: 'partials/cases.html',
        controller: 'CaseListController'
    })
    .when('/corruptors/:id', {
        templateUrl: function(params){ return 'partials/corruptor-detail.html/'; },
        controller: 'CorruptorDetailController'
    })
    .when('/corruptors', {
        templateUrl: 'partials/corruptors.html',
        controller: 'CorruptorListController'
    })
    .otherwise({
        redirectTo: '/'
    });
}])

.controller('UsersController', ["$scope", "$firebaseArray", "FirebaseUrl", function($scope, $firebaseArray, FirebaseUrl) {
	var ref = new Firebase(FirebaseUrl);
    $scope.users = $firebaseArray(ref);

    $scope.addUser = function() {
	    if ($scope.email && $scope.password) {
	      $scope.users.$add({ email: $scope.email, password: $scope.password });
	      $scope.users = "";
	      // $location.path = "/";
	    }
  	}
}])

.controller('CaseDetailController', ["$scope", "$routeParams", "$firebaseArray", "FirebaseUrl",  function($scope, $routeParams, $firebaseArray, FirebaseUrl) {
	var ref = new Firebase(FirebaseUrl + "cases");
    var caseArray = $firebaseArray(ref);
	caseArray.$loaded().then(function(){
    	$scope.case = caseArray.$getRecord($routeParams.id);
    })
    .catch(function(error) {
	    console.log("Error:", error);
	});
}])

.controller('CaseListController', ["$scope", "$routeParams", "$firebaseArray", "FirebaseUrl", function($scope, $routeParams, $firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + "cases");
    $scope.cases = $firebaseArray(ref);
}])

.controller('CorruptorDetailController', ["$scope", "$routeParams", "$firebaseArray", "FirebaseUrl",  function($scope, $routeParams, $firebaseArray, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl + "corruptors");
    var corruptorArray = $firebaseArray(ref);
    corruptorArray.$loaded().then(function(){
        $scope.corruptor = corruptorArray.$getRecord($routeParams.id);
    })
    .catch(function(error) {
        console.log("Error:", error);
    });
}])

.controller('CorruptorListController', ["$scope", "$routeParams", "$firebaseArray", "FirebaseUrl", function($scope, $routeParams, $firebaseArray, FirebaseUrl) {
	var ref = new Firebase(FirebaseUrl + "corruptors");
    $scope.corruptors = $firebaseArray(ref);
}])

.constant('FirebaseUrl', 'https://shining-heat-6633.firebaseio.com/')

;