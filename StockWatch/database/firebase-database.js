import { firebaseModule } from 'firebase-config';

const firebaseDataBase = (function () {

    const database = firebaseModule.database;
    const auth = firebaseModule.auth;

    function createUserWithEmail(email, password, username) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(() => getCurrentUser())
            .then(user => {
                user.updateProfile({ displayName: username });
                localStorage.setItem('username', username);
                localStorage.setItem('userUid', user.uid);
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

    function addToWatchlist(userId, company) {
        return new Promise(resolve => {
            let companyToAdd = database.child('users').child(userId).child('watchlist').child(company);
            companyToAdd.update({ 'company': company });

            resolve(companyToAdd);
        });
    }

    function removeFromWatchlist(userId, company) {
        return new Promise(resolve => {
            let companyToRemove = database.child('users').child(userId).child('watchlist').child(company);
            companyToRemove.update({ 'company': [] });

            resolve(companyToRemove);
        });
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
        let subscriptionList = database.ref('subscriptions').once('value').then(function(snapshot){
            let list = snapshot.val();

            if(list === null){
                database.ref('subscriptions').push(email);
                return;
            }

            for(let key in list){
                if(list[key] === email){
                    alert('This email is in the subscription box!');
                    return;
                }
            }

            database.ref('subscriptions').push(email);
        })      
    }

    return {
        createUserWithEmail,
        signInWithEmail,
        signOut,
        getCurrentUser,
        onAuthStateChanged,
        addToWatchlist,
        removeFromWatchlist,
        getUsersWatchlist,
        subscribe
    };
}());

export { firebaseDataBase };