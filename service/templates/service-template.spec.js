define(['angular-mocks', '<%= name %>'], function() {
    describe('service name', function() {
        var <%= uppercaseName %>Service;
        beforeEach(module('<%= name %>Module'));
        beforeEach(inject(function(_<%= uppercaseName %>Service_) {
            <%= uppercaseName %>Service = _<%= uppercaseName %>Service_;
        }));

        it('should be equal dummy', function() {
            expect(<%= uppercaseName %>Service).toEqual('Hello world');
        });
    });
});
