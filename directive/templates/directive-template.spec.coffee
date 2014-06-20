define [
  "angular-mocks"
  "<%= name %>"
], ->
  describe "directive with templateUrl", ->
    # initialize
    element = undefined
    $scope = undefined

    beforeEach ->
      module("<%= name %>Module")
      module("src/<%= name %>/<%= name %>.tpl.html")
      inject(($compile, _$rootScope_) ->
        $scope = _$rootScope_
        element = angular.element("<<%=name %>></<%= name%>>")
        element = $compile(element)($scope)
        return
      )
      return
    it "template should be loaded", ->
      $scope.$digest()
      expect(element.html()).toBe "This is directive for dummy"
      return

    return

  return
