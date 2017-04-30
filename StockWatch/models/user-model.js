import { firebaseDb } from 'firebase-database';

class UserModel {
    signIn(email, password) {
        return firebaseDb.signInWithEmail(email, password)
            .catch(error => Promise.reject(error));
    }

    signUp(email, password, username, passwordConfirm) {
        console.log('usermode signup');
        return firebaseDb.createUserWithEmail(email, password, username)
            .catch(error => Promise.reject(error));
    }

    signOut() {
        return firebaseDb.signOut()
            .catch(error => Promise.reject(error));
    }
}

const userModel = new UserModel();
export { userModel };