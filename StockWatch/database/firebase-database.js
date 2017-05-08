import { firebaseModule } from 'firebase-config';

const firebaseDataBase = (function () {

    const database = firebaseModule.database;
    const auth = firebaseModule.auth;

    function createUserWithEmail(email, password, username) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(() => getCurrentUser())
            .then(user => {
                let initialWatchlist = {
                    companyOne: 'Google',
                    companyTwo: 'Facebook',
                    companyThree: 'Dell',
                    companyFour: 'Amazon',
                }

                database.ref('users/' + user.uid).child('watchlist').set(initialWatchlist);
                database.ref('users/' + user.uid).child('username').set(username);
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

    function addToWatchlist() {
        let watchlist = {
            companyOne: $('#sel1').val(),
            companyTwo: $('#sel2').val(),
            companyThree: $('#sel3').val(),
            companyFour: $('#sel4').val(),
        }

        let user = getCurrentUser();

        database.ref('users/' + user.uid).child('watchlist').set(watchlist).catch(error =>{
                console.log(error.message);
            });;
    }

    function getUsersWatchlist(userId) {
        return new Promise((resolve, reject) => {
            let watchlist = database.child('users').child(userId).child('watchlist');
            watchlist.once('value', data => {
                if (!data.val()) {
                    reject({ heading: 'Empty', message: 'The watchlist is empty.' });
                    return;
                }

                let dataKeys = Object.keys(data.val());
                let companies = [];
                dataKeys.forEach(key => {
                    companies.push(key);
                });

                resolve(companies);
            });
        });
    }

    function subscribe(email) {
        let subscriptionList = database.ref('subscriptions').once('value').then(function (snapshot) {
            let list = snapshot.val();

            for (let key in list) {
                if (list[key] === email) {
                    $('.label.label-danger').text('The email address is already subscribed.');
                    return;
                }
            }

            database.ref('subscriptions').push(email).catch(error =>{
                console.log(error.message);
            });;
        })
    }

     function contact(name, email, message) {
            let contactInfo = {
                nameOfClient: name,
                emailOfClient: email,
                messageOfClient: message
            }

            database.ref('contact-us').push(contactInfo).catch(error =>{
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
        subscribe,
        contact
    };
}());

export { firebaseDataBase };