SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': 'https://cdn.rawgit.com/systemjs/plugin-babel/master/plugin-babel.js',
        'systemjs-babel-build': 'https://cdn.rawgit.com/systemjs/plugin-babel/master/systemjs-babel-browser.js',
        
        // app script 
        'main': './js/main.js',
        'router': '../configs/sammy-config.js',
        'validator': './js/helpers/validator.js',

        'firebase-database': './database/firebase-database.js',
        'firebase-config': './configs/firebase-config.js',

        'htmlHandler': './js/helpers/html-handler.js',
        'templateHandler': './js/helpers/template-handler.js',

        'headerController': './js/controllers/header-controller.js',
        'accountController': '././js/controllers/account-controller.js',
        'chartProvider': './js/helpers/chart-provider.js',

        'user-model': './models/user-model.js'
    },
    packages: {
        '/': {
            defaultExtension: 'js'
        }
    }
});