(function() {
  /*jshint newcap: false */
  'use strict';
  /**
   * @ngdoc directive
   * @name codeEditor
   * @module humansized.directives.iframePreview
   * @restrict E
   *
   * @description
   *
   * A directive that takes a htmlString and writes it to an iframe
   * @usage
   *
   * HAML example:
   * %iframe(iframe-preview data-str='str' flex)
   */
  var iframePreview = function() {
    return {
      restrict: 'A',
      scope: {
        str:'='
      },
      link: function($scope, $element){
        $scope.renderIframe = function(str){
          $scope.document.open();
          $scope.document.writeln(str);
          $scope.document.close();
        };

        $scope.$watch('str', function(newer){
          if(angular.isDefined(newer)){
            $scope.renderIframe(newer);
          }
        });

        $scope.getDocument = function(iframe) {
          switch (true) {
            case iframe.contentDocument !== undefined:
              return iframe.contentDocument;
            case iframe.contentWindow !== undefined:
              return iframe.contentDocument;
            case iframe.document !== undefined:
              return iframe.document;
          }
        };
        $scope.document = $scope.getDocument(angular.element($element)[0]);
      }
    };
};

  angular.module('humansized.directives')
    .directive('iframePreview',iframePreview);
})();
