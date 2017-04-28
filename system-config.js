SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // app scripts
        'main': './js/main.js',
        'validator': './js/helpers/validator.js',
        'firebase-database': './database/firebase-database.js',
        'firebase-config': './config/firebase-config.js',

        // Library files
        'jquery': 'https://code.jquery.com/jquery-3.2.1.min.js',
        'handlebars': 'https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.6/handlebars.js',
        'sammy': 'https://cdn.jsdelivr.net/sammy/0.7.4/sammy.js',
        'firebase': 'https://www.gstatic.com/firebasejs/3.9.0/firebase.js'

    }
});