define(['angular-mocks', '<%= name %>'], function() {
    describe('directive with templateUrl', function() {
        var element;
        var $scope;
        beforeEach(module('<%= name %>Module'));
        beforeEach(module('src/<%= name %>/<%= name %>.tpl.html'));
        beforeEach(inject(function($compile, _$rootScope_) {
            $scope = _$rootScope_;
            element = angular.element("<<%=name %>></<%= name%>>");
            element = $compile(element)($scope);
        }));

        it('template should be loaded', function() {
            $scope.$digest();
            expect(element.html()).toBe('This is directive for dummy');
        });
    });
});
