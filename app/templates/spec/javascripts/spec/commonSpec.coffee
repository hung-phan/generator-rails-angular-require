define [
  "angular-mocks"
  "common/common"
], ->
  describe "controller title", ->
    # initialize
    $scope = undefined
    $location = undefined
    commonController = undefined

    beforeEach ->
      module("commonModule")
      inject((_$injector_, _$rootScope_) ->
        $scope = _$rootScope_.$new()
        $location = _$injector_.get("$location")
        commonController = _$injector_.get("$controller")("CommonController",
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
