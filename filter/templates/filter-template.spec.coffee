define [
  "angular-mocks"
  "<%= name %>/<%= name %>"
], ->
  describe "filter 100000", ->
    <%= name %>Filter = undefined
    beforeEach module("<%= name %>Module")
    beforeEach inject((_$filter_) ->
      <%= name %>Filter = _$filter_("<%= name %>Filter")
      return
    )
    it "should be equal 100,000", ->
      expect(<%= name %>Filter(100000)).toEqual "100,000"
      return

    return

  return
