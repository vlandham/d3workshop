(function() {
  /*jshint newcap: false */
  'use strict';
  /**
   * @ngdoc service
   * @name TextUtils
   * @module humansized.services.TextUtils
   *
   * @description
   *
   * A directive a service for sanitizing text.
   * Extracted from https://github.com/codeschool/CodeEditorDirectiveExample
   */
   var textUtils = function(){
     return {
       // Strip leading whitespace from initial value, this is similar to
       // rails' strip_heredoc function, it uses the first line with content
       // as the leading whitespace baseline
       normalizeWhitespace: function(str) {
         // Strip an initial blank whitespace caused from having text nested inside an html tag
         var string = str.replace(/^\n/, '');

         // Find the first text with an indent and get the length of the indent
         var result = new RegExp('(?:^|\n)([ \t\r]+)').exec(string);
         var firstIndentLength;
         if(result !== null){
           firstIndentLength = result[1].length;
         } else {
           firstIndentLength = 0;
         }

         // Use the first indent length as a baseline and normalize all other lines
         return string.replace(new RegExp('(^|\n)[ \t\r]{'+firstIndentLength+'}', 'g'), '$1');
       }
     };
   };
   angular.module('humansized.services').factory('TextUtils', textUtils);
})();
