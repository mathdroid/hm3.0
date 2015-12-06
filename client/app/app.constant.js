(function(angular, undefined) {
'use strict';

angular.module('angularApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']})

;
})(angular);