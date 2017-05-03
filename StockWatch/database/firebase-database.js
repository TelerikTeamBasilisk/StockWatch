import { firebaseModule } from 'firebase-config';

class firebaseDataBase {
    constructor() {
        this.database = firebaseModule.database;
        this.auth = firebaseModule.auth;
    }

    createUserWithEmail(email, password, username) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(() => this.getCurrentUser())
            .then(user => {
                user.updateProfile({ displayName: username });
                 localStorage.setItem('username', username);
                 localStorage.setItem('userUid', user.uid);
            })
            .catch(error => Promise.reject(error));
    }

    signInWithEmail(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
            .catch(error => Promise.reject(error));
    }

    signOut() {
        return auth.signOut();
    }

    getCurrentUser() {
        return new Promise(resolve => {
            auth.onAuthStateChanged(userInfo => resolve(userInfo));
        });
    }

    onAuthStateChanged(callback) {
        return auth.onAuthStateChanged(function (user) {
            callback(user);
        });
    }

    addToWatchlist(userId, company) {
        return new Promise(resolve => {
            let companyToAdd = database.child('users').child(userId).child('watchlist').child(company);
            companyToAdd.update({ 'company': company });

            resolve(companyToAdd);
        });
    }

    removeFromWatchlist(userId, company) {
        return new Promise(resolve => {
            let companyToRemove = database.child('users').child(userId).child('watchlist').child(company);
            movieToRemove.update({ 'company': [] });

            resolve(companyToRemove);
        });
    }

    getUsersWatchlist(userId) {
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

    subscribe(email) {
        //TODO
    }
}

const firebaseDb = new firebaseDataBase();
export { firebaseDb };