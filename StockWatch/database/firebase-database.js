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

    subscribe(email){
        //TODO
    }
}

const  firebaseDb = new firebaseDataBase();
export { firebaseDb };