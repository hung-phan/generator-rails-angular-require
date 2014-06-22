require [
  "angular"
  "jquery"
  "restangular"<% if (includeAngularAnimate) { %>
  "angular-animate"<% } %>
  "angular-ui-router"<% if (includeBindonce) { %>
  "bindonce"<% } %><% if (includeUIBootstrap) { %>
  "ui-bootstrap-tpls"<% } %><% if (includeLodash) { %>
  "lodash"<% } %>
  "bootstrap"
  "home/home"
], (angular) ->
  "use strict"

  #App Module
  angular.element(document).ready ->

    #smart works go here
    $html = angular.element("html")
    angular.module("webApp", [
      "ui.router"
      "restangular"<% if (includeUIBootstrap) { %>
      "ui.bootstrap"<% } %><% if (includeAngularAnimate) { %>
      "ngAnimate"<% } %><% if (includeBindonce) { %>
      "pasvaz.bindonce"<% } %>
      "homeModule"
    ]).config ["$urlRouterProvider", "$provide", ($urlRouterProvider, $provide) ->
      $urlRouterProvider.otherwise "/"

      # change configure to use [[ to be the interpolation ([[2 + 2]])

      #$interpolateProvider.startSymbol('[[');
      #$interpolateProvider.endSymbol(']]');

      # add safeApply function for $rootScope - called by $scope.$root.safeApply(fn)
      $provide.decorator "$rootScope", ["$delegate", ($delegate) ->
        $delegate.safeApply = (fn) ->
          phase = $delegate.$$phase
          if phase is "$apply" or phase is "$digest"
            fn() if fn and typeof fn is "function"
          else
            $delegate.$apply fn
          return

        return $delegate
      ]
    ]

    #bootstrap model
    angular.bootstrap $html, ["webApp"]
