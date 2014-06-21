require('coffee-script');

exports.config = {
    seleniumPort: null,
    baseUrl: 'http://localhost:3000',
    rootElement: 'html',
    capabilities: {
        'browserName': 'chrome'
    },
    jasmineNodeOpts: {
        showColors: true
    },
    specs: ['spec/javascripts/e2espec/**/*_e2espec.{js,coffee}']
};
