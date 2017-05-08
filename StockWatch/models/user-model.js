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

     addToWatchlist() {
            firebaseDataBase.addToWatchlist();
    }
}

const userModel = new UserModel();
export { userModel };