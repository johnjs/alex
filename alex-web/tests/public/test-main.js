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
        'angular-route': '../libs/angular-route/angular-route.min',
        'angular-animate': '../libs/angular-animate/angular-animate.min',
        'angular-mocks': '../libs/angular-mocks/angular-mocks',
        '_': '../libs/underscore/underscore',
        '$': '../libs/jquery/dist/jquery.min',
        'views': '../../views'
    },
    "shim": {
        'angular': {
            'exports': 'angular'
        },
        'angular-route': {
            'deps': ['angular']
        },
        'angular-animate': {
            'deps': ['angular']
        },
        'angular-mocks': {
            'deps': ['angular']
        },
        '_': {
            'exports': '_'
        },
        '$': {
            'exports': '$'
        },
        'views/partials/wordCreator.jade': {
            deps: ['angular']
        },
        'views/partials/lessonCreator.jade': {
            deps: ['angular']
        },
        'views/partials/words.jade': {
            deps: ['angular']
        }
    },
    deps: tests,

    callback: window.__karma__.start
})
;