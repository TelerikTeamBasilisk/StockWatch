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
        'stockData': './database/stock-database.js',
        'calendar': './js/helpers/calendar.js',

        'headerController': './js/controllers/header-controller.js',
        'accountController': '././js/controllers/account-controller.js',
        'footerController': './js/controllers/footer-controller.js',
        'chartProvider': './js/helpers/chart-provider.js',
        'time': './js/helpers/date-provider.js',

        'chart-js': 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js',
        // 'handlebars': 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.min.js',

        'user-model': './models/user-model.js'
    },
    packages: {
        '/': {
            defaultExtension: 'js'
        }
    }
});