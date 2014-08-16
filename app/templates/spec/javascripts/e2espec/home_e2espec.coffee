describe "home page title", ->
  ptor = protractor.getInstance()
  it "should not be Dummy", ->
    ptor.get "/#"
    expect(ptor.getTitle()).not.toBe "Dummy"
    return

  return
