import { firebaseDb } from 'firebase-database';

class UserModel {
    signIn(email, password) {
        return firebaseDb.signInWithEmail(email, password)
            .catch(error => Promise.reject(error));
    }

    signUp(email, password, username, passwordConfirm) {
        return firebaseDb.createUserWithEmail(email, password, username)
            .catch(error => Promise.reject(error));
    }

    signOut() {
        return firebaseDb.signOut()
            .catch(error => Promise.reject(error));
    }

     addToWatchlist(company) {
        return new Promise(resolve => {
            const userId = localStorage.getItem('userUid');
            firebaseDb.addToWatchlist(userId, company)
                .then(data => resolve(data));
        });
    }

    removeFromWatchlist(company) {
        return new Promise(resolve => {
            const userId = localStorage.getItem('userUid');
            firebaseDb.removeFromWatchlist(userId, company)
                .then(data => resolve(data));
        });
    }

    getWatchlist() {
    //TODO
    }
}

const userModel = new UserModel();
export { userModel };