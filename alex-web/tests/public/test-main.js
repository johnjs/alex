var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/Spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    "baseUrl": '/base/public/javascripts',
    "paths": {
        'angular': '../libs/angular/angular.min',
        'angular-route': '../libs/angular-route/angular-route.min'
    },
    "shim": {
        'angular': {
            'exports': 'angular'
        },
        'angular-route': {
            'deps': ['angular']
        }
    },
    deps: tests,

    callback: window.__karma__.start
});