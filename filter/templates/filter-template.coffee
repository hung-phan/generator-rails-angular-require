define ["angular"], (angular) ->
  "use strict"
  angular.module("<%= name %>Module", []).filter "<%= name %>Filter", ->
    (input) ->
      input.toString().replace /\B(?=(\d{3})+(?!\d))/g, ","

  return
