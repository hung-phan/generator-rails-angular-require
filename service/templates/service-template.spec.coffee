define [
  "angular-mocks"
  "<%= name %>/<%= name %>"
], ->
  describe "service name", ->
    <%= uppercaseName %>Service = undefined
    beforeEach module("<%= name %>Module")
    beforeEach inject((_<%= uppercaseName %>Service_) ->
      <%= uppercaseName %>Service = _<%= uppercaseName %>Service_
      return
    )
    it "should be equal dummy", ->
      expect(<%= uppercaseName %>Service).toEqual "Hello world"
      return

    return

  return
