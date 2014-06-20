define ["angular"], (angular) ->
  "use strict"
  angular.module("<%= name %>Module", []).factory "<%= uppercaseName %>Service", [->
    "Hello world"
  ]
  return
