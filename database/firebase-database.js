import { firebaseModule } from 'firebase-config';

//to be continued ...
export const firebaseDb = (function () {
    const database = firebaseModule.database;
    const auth = firebaseModule.auth;
    
    function createUserWithEmail(email, password, username) {
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

    return {
        createUserWithEmail,
        signInWithEmail,
        signOut,
        getCurrentUser,
    };
}());