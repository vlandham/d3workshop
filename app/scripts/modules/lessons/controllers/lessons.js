(function() {
  'use strict';
  angular.module('humansized.lessons')
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/modules/lessons/controllers/lessons.html',
          controller: 'LessonsCtrl'
        })
        .when('/lessons/', {
          templateUrl: 'views/modules/lessons/controllers/lessons.html',
          controller: 'LessonsCtrl'
        })
        .when('/lessons/:id', {
          templateUrl: 'views/modules/lessons/controllers/lesson.html',
          controller: 'LessonCtrl'
        });
    }
  ])
  .run(['$templateCache','$http', function($templateCache, $http){
    $http.get('/views/modules/lessons/layout.html', {cache:$templateCache});
  }])
  .controller('LessonsCtrl', [function() {}])
  .controller('LessonCtrl', ['$scope','$routeParams','$interpolate','$templateCache','$http',
    function($scope, $routeParams, $interpolate,$templateCache, $http) {
      $scope.content = {
        description:'',
        html: '',
        css:'',
        javascript:'',
        javascriptAnswer:'',
        data:''
      };

      var fragmentFromString = function(str) {
        var parser = new DOMParser();
        return parser.parseFromString(str, 'text/html');
      };

      var assignVariables = function(fragment, content) {
        angular.forEach(content, function(k,v){
          var result = fragment.querySelector('#' + v);
          content[v] = angular.element(result).html();
        });
      };

      var getLessonTemplate = function(id){
        $scope.error = false;
        $http({
          method: 'GET',
          url: '/views/modules/lessons/' + id + '.html'
        }).then(
          function successCallback(response) {
            assignVariables(fragmentFromString(response.data), $scope.content);
          },
          function errorCallback(){
            $scope.error = true;
          }
        );
      };

      if(angular.isDefined($routeParams.id)){
        $scope.selectedId = $routeParams.id;
        getLessonTemplate($scope.selectedId);
        angular.forEach($scope.content, function(k,v){
          $scope.$watch('content.'+v, function(newer){
            if(angular.isDefined(newer)){
              $scope.str = $interpolate($templateCache.get('/views/modules/lessons/layout.html')[1])($scope.content);
            }
          });
        });
      }

      $scope.nextLesson = function(){
        $scope.$emit('requestNextLesson', { message: $routeParams.id });
      };
    }
  ]);
})();
