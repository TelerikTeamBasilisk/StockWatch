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

    addToWatchlist(watchlist) {
        let user = firebaseDataBase.getCurrentUser();
        firebaseDataBase.addToWatchlist(user.uid, watchlist);
    }

    getUsersWatchlist() {
        let user = firebaseDataBase.getCurrentUser();
        return firebaseDataBase.getUsersWatchlist(user.uid);
    }

    addUsersIndustry(industry) {
        let user = firebaseDataBase.getCurrentUser();
        firebaseDataBase.addUsersIndustry(user.uid, industry);
    }

    getUsersIndustry() {
        let user = firebaseDataBase.getCurrentUser();
        return firebaseDataBase.getUsersIndustry(user.uid);
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
