define [
  "angular-mocks"
  "<%= name %>/<%= name %>"
], ->
  describe "controller title", ->
    # initialize
    $scope = undefined
    $location = undefined
    dummy<%= uppercaseName %> = undefined

    beforeEach ->
      module("<%= name %>Module")
      inject((_$injector_, _$rootScope_) ->
        $scope = _$rootScope_.$new()
        $location = _$injector_.get("$location")
        dummy<%= uppercaseName %>Controller = _$injector_.get("$controller")("Dummy<%= uppercaseName %>Controller",
          '$scope': $scope
          '$location': $location
        )
        return
      )
      return

    it "should be equal dummy", ->
      expect($scope.pageTitle).toEqual "dummy"
      return
    return
  return
