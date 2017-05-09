const firebaseDataBase = (function () {

    const database = firebaseModule.database;
    const auth = firebaseModule.auth;

    const defaultIndustry = 'Technology';
    const initialWatchlist = {
        companyOne: 'AAPL',
        companyTwo: 'GOOGL',
        companyThree: 'MSFT',
        companyFour: 'FB',
    };

    function createUserWithEmail(email, password, username) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(() => getCurrentUser())
            .then(user => {
                database.ref('users/' + user.uid).child('username').set(username);
                database.ref('users/' + user.uid).child('industry').set(defaultIndustry);
                database.ref('users/' + user.uid).child('watchlist').set(initialWatchlist);
            })
            .catch(error => Promise.reject(error));
    }

    function signInWithEmail(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
            .catch(error => Promise.reject(error));
    }

    function signOut() {
        return auth.signOut();
    }

    function getCurrentUser() {
        return auth.currentUser;
    }

    function onAuthStateChanged(callback) {
        return auth.onAuthStateChanged(function (user) {
            callback(user);
        });
    }

    function addToWatchlist(userId, watchlist) {
        database.ref('users/' + userId).child('watchlist').set(watchlist).catch(error => {
            console.log(error.message);
        });
    }

    function getUsersWatchlist(userId) {
        return new Promise((resolve, reject) => {
            let watchlist = database.ref().child('users').child(userId).child('watchlist');
            watchlist.once('value', data => {
                let dataValues = Object.values(data.val());
                let companies = [];

                dataValues.forEach(value => {
                    companies.push(value);
                });

                resolve(companies);
            });
        });
    }

    function addUsersIndustry(userId, industry) {
        database.ref('users/' + userId).child('industry').set(industry).catch(error => {
            console.log(error.message);
        });
    }

    function getUsersIndustry(userId) {
        return new Promise((resolve, reject) => {
            let industry = database.ref().child('users').child(userId).child('industry');
            industry.once('value', data => {
                resolve(data.val());
            });
        });
    }


    function subscribe(email) {
        database.ref('subscriptions').once('value').then(function (snapshot) {
            let list = snapshot.val();

            for (let key in list) {
                if (list[key] === email) {
                    $('.label.label-danger').text('The email address is already subscribed.');
                    return;
                }
            }

            database.ref('subscriptions').push(email).catch(error => {
                console.log(error.message);
            });
        });
    }

    function contact(name, email, message) {
        let contactInfo = {
            nameOfClient: name,
            emailOfClient: email,
            messageOfClient: message
        };

        database.ref('contact-us').push(contactInfo).catch(error => {
            console.log(error.message);
        });
    }

    return {
        createUserWithEmail,
        signInWithEmail,
        signOut,
        getCurrentUser,
        onAuthStateChanged,
        addToWatchlist,
        getUsersWatchlist,
        addUsersIndustry,
        getUsersIndustry,
        subscribe,
        contact
    };
}());