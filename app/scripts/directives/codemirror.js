(function() {
  /*jshint newcap: false */
  'use strict';
  /**
   * @ngdoc directive
   * @name codeEditor
   * @module humansized.directives.codeEditor
   * @restrict E
   *
   * @description
   *
   * A directive that displays the options from the more menu.
   * Based on https://github.com/codeschool/CodeEditorDirectiveExample
   * @usage
   *
   * HAML example:
   * %code-editor(syntax="javascript" theme="zenburn" ng-model="content.code" flex)
   */
  var codeEditor = function($timeout,TextUtils) {
    return {
      restrict: 'E',
      replace: true,
      require: '?ngModel',
      transclude: true,
      scope: {
        syntax: '@',
        theme: '@'
      },
      template: '<div class="code-editor"></div>',
      link: function(scope, element, attrs, ngModelCtrl, transclude){

        // Initialize Codemirror
        var editor = CodeMirror(element[0], {
          mode: scope.syntax || 'javascript',
          theme: scope.theme || 'default',
          lineNumbers: true
        });


        // Handle setting the editor when the model changes if ngModel exists
        if(angular.isDefined(ngModelCtrl)){

          // Timeout is required here to give ngModel a chance to setup. This prevents
          // a value of undefined getting passed as the view is rendered for the first
          // time, which causes CodeMirror to throw an error.
          $timeout(function(){
            ngModelCtrl.$render = function() {
              editor.setValue(ngModelCtrl.$viewValue);
            };
          });
        }
        var initialWatcher = scope.$watch(function () {
            return ngModelCtrl.$modelValue;
        }, function(newValue) {
            if(angular.isDefined(newValue) && typeof newValue === 'string' && newValue.trim().length !== 0) {
              if(editor.getValue() ===''){
                editor.setValue(newValue);
                initialWatcher();
              }
            }
        });

        transclude(scope, function(clonedEl){
          var initialText = TextUtils.normalizeWhitespace(clonedEl.text());
          editor.setValue(initialText);

          // Handle setting the model if ngModel exists
          if(ngModelCtrl){

            // Wrap these initial setting calls in a $timeout to give angular a chance
            // to setup the view and set any initial model values that may be set in the view
            $timeout(function(){

              // Populate the initial ng-model if it exists and is empty.
              // Prioritize the value in ngModel.
              if(initialText && !ngModelCtrl.$viewValue){
                ngModelCtrl.$setViewValue(initialText);
              }

              // Whenever the editor emits any change events, update the value
              // of the model.
              editor.on('change', function(){
                ngModelCtrl.$setViewValue(editor.getValue());
              });
            });
          }
        });

        // Clean up the CodeMirror change event whenever the directive is destroyed
        scope.$on('$destroy', function(){
          editor.off('change');
        });
      }
    };
};

  angular.module('humansized.directives')
    .directive('codeEditor',['$timeout','TextUtils', codeEditor]);
})();
