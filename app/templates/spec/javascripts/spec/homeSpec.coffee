define [
  "angular-mocks"
  "home/home"
], ->
  describe "controller title", ->
    # initialize
    $scope = undefined
    $location = undefined
    homeController = undefined

    beforeEach ->
      module("homeModule")
      inject((_$injector_, _$rootScope_) ->
        $scope = _$rootScope_.$new()
        $location = _$injector_.get("$location")
        homeController = _$injector_.get("$controller")("HomeController",
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
