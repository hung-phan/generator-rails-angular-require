define(['angular-mocks', '<%= name %>'], function() {
    describe('filter 100000', function() {
        var <%= name %>Filter;
        beforeEach(module('<%= name %>Module'));
        beforeEach(inject(function(_$filter_) {
            <%= name %>Filter = _$filter_('<%= name %>Filter');
        }));

        it('should be equal 100,000', function() {
            expect(<%=name %>Filter(100000)).toEqual('100,000');
        });
    });
});
