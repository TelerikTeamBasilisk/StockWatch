import { firebaseModule } from 'firebase-config';

//to be continued ...
const firebaseDb = (function () {
    const database = firebaseModule.database; // value is never used?
    const auth = firebaseModule.auth;

    function createUserWithEmail(email, password, username) {
        console.log('firebase create user with email.');
        return auth.createUserWithEmailAndPassword(email, password)
            .then(() => this.getCurrentUser())
            .then(user => {
                user.updateProfile({ displayName: username });
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
        return new Promise(resolve => {
            auth.onAuthStateChanged(userInfo => resolve(userInfo));
        });
    }

    function onAuthStateChanged(callback) {
        return auth.onAuthStateChanged(function (user) {
            callback(user);
        });
    }


    return {
        createUserWithEmail,
        signInWithEmail,
        signOut,
        getCurrentUser,
        onAuthStateChanged
    };
}());

export { firebaseDb };