import { firebaseDataBase } from 'firebase-database';

class UserModel {
    signIn(email, password) {
        return firebaseDataBase.signInWithEmail(email, password)
            .catch(error => Promise.reject(error));
    }

    signUp(email, password, username, passwordConfirm) {
        return firebaseDataBase.createUserWithEmail(email, password, username)
            .catch(error => Promise.reject(error));
    }

    signOut() {
        return firebaseDataBase.signOut()
            .catch(error => Promise.reject(error));
    }

    addToWatchlist(company) {
        return new Promise(resolve => {
            const userId = localStorage.getItem('userUid');
            firebaseDataBase.addToWatchlist(userId, company)
                .then(data => resolve(data));
        });
    }

    removeFromWatchlist(company) {
        return new Promise(resolve => {
            const userId = localStorage.getItem('userUid');
            firebaseDataBase.removeFromWatchlist(userId, company)
                .then(data => resolve(data));
        });
    }

    getWatchlist() {
        //TODO
    }

    isUserLoggedIn() {
        let user = firebaseDataBase.getCurrentUser();
        if (user) {
            return true;
        } else {
            return false;
        }
    }
}

const userModel = new UserModel();
export { userModel };