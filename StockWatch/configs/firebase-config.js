 const firebaseModule = (function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBxdeCncv1PLirIHaGX70sUtk8FFf_DJTY",
        authDomain: "stock-watch-eab0d.firebaseapp.com",
        databaseURL: "https://stock-watch-eab0d.firebaseio.com",
        projectId: "stock-watch-eab0d",
        storageBucket: "stock-watch-eab0d.appspot.com",
        messagingSenderId: "554833650626"
    };

    firebase.initializeApp(config);

    const database = firebase.database();
    const auth = firebase.auth();

    return {
        database,
        auth
    };
}());

export { firebaseModule };