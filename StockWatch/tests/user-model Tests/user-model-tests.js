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

            expect(firebaseDataBase.signIn).to.have.been.calledOnce();

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
            sinon.stub(firebaseDataBase, 'addToWatchlist').returns(Promise.resolve());

            userModel.addToWatchlist({sample:'sample watchlist'});
            done();

            expect(firebaseDataBase.addToWatchlist).to.have.been.calledOnce();

            firebaseDataBase.addToWatchlist.restore();
        });
    });
});

mocha.run();