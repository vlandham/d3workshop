'use strict';
angular.module('humansized', [
  'ngConstants',
  'ngAnimate',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngMaterial',
  'humansized.directives',
  'humansized.interceptors',
  'humansized.filters',
  'humansized.providers',
  'humansized.services',
  'humansized.lessons',
  'humansized.application',
  'humansized.boot'
])
  .config(['$routeProvider', '$locationProvider', '$httpProvider', '$mdIconProvider',
    function($routeProvider, $locationProvider, $httpProvider, $mdIconProvider) {
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
      $locationProvider.html5Mode(true).hashPrefix('!');
      $httpProvider.defaults.useXDomain = true;
      $mdIconProvider
      .defaultIconSet('/images/core-icons.svg', 24);
    }
  ]);
