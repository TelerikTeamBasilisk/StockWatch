mocha.setup('bdd');
const {expect} = chai;

describe('User Model Tests', () => {
    let email = 'sample@mail.test';
    let password = 'samplepassword';
    let name = 'sample name';

    describe('signIn Tests', () => {
        it('signIn should call firebaseDatabase.signIn', (done) => {
            sinon.stub(firebaseDataBase, 'signInWithEmail').returns(Promise.resolve());

            userModel.signIn(email, password);
            done();

            expect(firebaseDataBase.signInWithEmail).to.have.been.calledOnce();

            firebaseDataBase.signInWithEmail.restore();
        });
    });

    describe('signUp tests', () => {
        it('signUp should call firebaseDataBase.createUserWithEmail', (done) => {
            sinon.stub(firebaseDataBase, 'createUserWithEmail').returns(Promise.resolve());

            userModel.signUp(email, password, name, 'confirm');
            done();

            expect(firebaseDataBase.createUserWithEmail).to.have.been.calledOnce();

            firebaseDataBase.createUserWithEmail.restore();
        });
    });

    describe('signOut tests', () => {
        it('signOut should call firebaseDataBase.signOut', (done) => {
            sinon.stub(firebaseDataBase, 'signOut').returns(Promise.resolve());

            userModel.signUp();
            done();

            expect(firebaseDataBase.signOut).to.have.been.calledOnce();

            firebaseDataBase.signOut.restore();
        });
    });

    describe('addToWatchlist tests', () => {
        it('addToWatchlist should call firebaseDatabase.addToWatchlist', (done) => {
            sinon.stub(firebaseDataBase, 'getCurrentUser').returns({uid:'userID'});
            sinon.stub(firebaseDataBase, 'addToWatchlist').returns(Promise.resolve());

            userModel.addToWatchlist({sample:'sample watchlist'});
            done();

            firebaseDataBase.getCurrentUser.restore();
            expect(firebaseDataBase.addToWatchlist).to.have.been.calledOnce();

            firebaseDataBase.addToWatchlist.restore();
        });
    });

    describe('getUserWatchlist Tests', () => {
        it('getUserWatchlist should call method firebaseDataBase.getUsersWatchlist', (done) => {
            sinon.stub(firebaseDataBase, 'getCurrentUser').returns({uid:'userID'});
            sinon.stub(firebaseDataBase, 'getUsersWatchlist').returns(Promise.reject());

            userModel.getUsersWatchlist();
            done();

            firebaseDataBase.getCurrentUser.restore();

            expect(firebaseDataBase.getUsersWatchlist).to.have.been.calledOnce();

            firebaseDataBase.getUsersWatchlist.restore();
        });
    });

    describe('addUsersIndustry Tests', () => {
        it('expect addUsersIndustry to call method firebaseDataBase.addUsersIndustry', (done) => {
            sinon.stub(firebaseDataBase, 'getCurrentUser').returns({uid:'userID'});
            sinon.stub(firebaseDataBase, 'addUsersIndustry').returns(Promise.reject());

            userModel.addUsersIndustry('sample industry');
            done();

            firebaseDataBase.getCurrentUser.restore();

            expect(firebaseDataBase.addUsersIndustry).to.have.been.calledOnce();

            firebaseDataBase.addUsersIndustry.restore();
        });
    });

     describe('getUsersIndustry Tests', () => {
        it('expect getUsersIndustry to call method firebaseDataBase.getUsersIndustry', (done) => {
            sinon.stub(firebaseDataBase, 'getCurrentUser').returns({uid:'userID'});
            sinon.stub(firebaseDataBase, 'getUsersIndustry').returns(Promise.reject());

            userModel.getUsersIndustry();
            done();

            firebaseDataBase.getCurrentUser.restore();

            expect(firebaseDataBase.getUsersIndustry).to.have.been.calledOnce();

            firebaseDataBase.getUsersIndustry.restore();
        });
    });

    describe('isUserLoggedIn Tests', () => {
        let expected = true;
        let currentUserStub;

        beforeEach(() => {
            currentUserStub = sinon.stub(firebaseDataBase, 'getCurrentUser');
        });
        afterEach(() => {
            currentUserStub.restore();
        });

        it('expect isUserLoggedIn to return true when user is loged in', () => {
            currentUserStub.returns({uid:'userID'});

            let actual = userModel.isUserLoggedIn();

            expect(actual).to.be.equal(expected);
        });

         it('expect isUserLoggedIn to return false when user is not loged in', () => {
            currentUserStub.returns(null);

            let actual = userModel.isUserLoggedIn();

            expect(actual).to.not.equal(expected);
        });
    });
});

mocha.run();