'use strict';

angular.module('humansized.boot', ['ngConstants'])
.run(['$log', '$rootScope', '$window','TIMESTAMP', 'VERSION', function($log, $rootScope, $window, TIMESTAMP, VERSION) {

  $log.log('App Initialized');
  $log.log('Last Built: ' + new Date(TIMESTAMP));
  $log.log('Version: ' + VERSION);
}]);
