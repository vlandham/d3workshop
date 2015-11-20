(function() {
  'use strict';
  angular.module('humansized.application', ['ngRoute'])
    .controller('ApplicationCtrl', ['$scope', '$rootScope','$route','$mdSidenav', '$window', '$http', '$location',
      function($scope, $rootScope, $route, $mdSidenav, $window, $http, $location) {

        var controllerName = function() {
          return $route.current && $route.current.$$route && $route.current.$$route.controller ? $route.current.$$route.controller : 'ApplicationCtrl';
        };

        var templateName = function() {
          return $route.current && $route.current.$$route && $route.current.$$route.templateUrl ? $route.current.$$route.templateUrl.split('/').pop().replace('.', '-') : '';
        };

        $scope.currentRoute = function() {
          return controllerName() + ' ' + templateName();
        };
        $scope.toggleSideNav = function(){
          $mdSidenav('left').toggle();
        };

        $scope.close = function(){
          $mdSidenav('left').close();
        };

        $scope.lessons = [
          { label: 'Introduction', slug: '/lessons/introduction'},
          { label: 'Selections & Databinding', slug: '/lessons/selections-data-binding'},
          { label: 'Update, Enter, Exit', slug: '/lessons/update-enter-exit'},
          { label: 'Working with Selections', slug: '/lessons/working-with-selections'},
          { label: 'Working with Data', slug: '/lessons/working-with-data'},
          { label: 'Domains & Ranges', slug: '/lessons/domains-and-ranges'},
          { label: 'Scales', slug: '/lessons/scales'},
          { label: 'Interpolation', slug: '/lessons/interpolation'},
          { label: 'Chart Axes', slug: '/lessons/chart-axes'},
          { label: 'Transitions', slug: '/lessons/transitions'},
          { label: 'Force Layout', slug: '/lessons/force-layout'},
          { label: 'Stack Layout', slug: '/lessons/stack-layout'},
          { label: 'D4 Introduction', slug: '/lessons/d4-introduction'},
          { label: 'D4 Brushes', slug: '/lessons/d4-brushes'},
          { label: 'D4 Features', slug: '/lessons/d4-feature'},
          { label: 'D4 After Render', slug: '/lessons/d4-after-render'},
          { label: 'Your Turn', slug: '/lessons/your-turn'}
        ];

        // go ahead and cache the lessons early to speed of the render.
        angular.forEach($scope.lessons, function(lesson){
          $http({
            method: 'GET',
            cache: true,
            url: '/views/modules/' + lesson.slug + '.html'
          });
        });

        $scope.selectLesson = function(path, index){
          $scope.selectedLesson = index;
          $scope.goTo(path);
        };

        $rootScope.$on('requestNextLesson', angular.bind(this, function(target, obj){
          var slug = obj.message;
          $scope.selectedLesson = 0;
          angular.forEach($scope.lessons, function(obj,i){
            if(obj.slug.split('/').pop() === slug){
              $scope.selectedLesson = i + 1;
            }
          });
          if($scope.selectedLesson >= $scope.lessons.length){
            $scope.selectedLesson = 0;
          }
          $scope.goTo($scope.lessons[$scope.selectedLesson].slug, $scope.selectedLesson);
        }));

        $scope.goTo = function(path){
          if(path.indexOf('http') === -1){
            $location.url(path);
            angular.element('html,body').animate({
              scrollTop: angular.element('body').offset().top
            }, 0);
            $scope.close();
          } else {
            $window.open(path);
          }
        };
      }
    ]);
})();
