define(['angular'], function(angular) {
    'use strict';
    angular.module('<%= name %>Module', [])
        .factory('<%= uppercaseName %>Service', [
            function() {
                return 'Hello world';
            }
        ]);
});
