mocha.setup('bdd');
const {expect} = chai;



describe('Firebase-database Tests', () => {
    let name = 'Sample Name';
    let email = 'sample@email.test';
    let password = 'samplepasword';
    let message = 'sample message';

    describe('createUserWithEmail Tests', () => {
        let currentUserStub,
            setUsernameStub,
            setWatchlistStub;

        beforeEach(() => {
            currentUserStub = sinon.stub(firebaseDataBase, 'getCurrentUser');
            setUsernameStub =  sinon.stub(firebaseModule.database.ref('users/testID').child('username'), 'set');
            setWatchlistStub = sinon.stub(firebaseModule.database.ref('users/testID').child('watchlist'), 'set');
            setIndustryStub = sinon.stub(firebaseModule.database.ref('users/testUI').child('industry'), 'set');
        });
        afterEach(() => {
            currentUserStub.restore();
            setUsernameStub.restore();
            setWatchlistStub.restore();
            setIndustryStub.restore();
        });

        it('expect createUserWithEmail to call createUserWithEmailAndPassword', (done) => {
            sinon.stub(firebaseModule.auth, 'createUserWithEmailAndPassword').returns(Promise.reject());

            firebaseDataBase.createUserWithEmail(email, password, name)
                .then(() => {
                    expect(firebaseModule.auth.createUserWithEmailAndPassword).to.have.been.calledOnce()
                })
                .then(done, done);

            firebaseModule.auth.createUserWithEmailAndPassword.restore();
        });

        it('expect createUserWithEmail to send information to database about watchlst', (done) => {
            currentUserStub.returns({uid:'testID'});
            setWatchlistStub.returns(Promise.reject());
            setUsernameStub.returns(Promise.reject());
            setIndustryStub.returns(Promise.reject())

            firebaseDataBase.createUserWithEmail(email, password, name);
            done();

            expect(setWatchlistStub.set).to.have.been.calledOnce();
        });

        it('expect createUserWithEmail to send information to database about username', (done) => {
            currentUserStub.returns({uid:'testID'});
            setWatchlistStub.returns(Promise.reject());
            setUsernameStub.returns(Promise.reject());
            setIndustryStub.returns(Promise.reject())

            firebaseDataBase.createUserWithEmail(email, password, name);
            done();

            expect(setUsernameStub.set).to.have.been.calledOnce();
        });

          it('expect createUserWithEmail to send information to database about industry', (done) => {
            currentUserStub.returns({uid:'testID'});
            setWatchlistStub.returns(Promise.reject());
            setUsernameStub.returns(Promise.reject());
            setIndustryStub.returns(Promise.reject())

            firebaseDataBase.createUserWithEmail(email, password, name);
            done();

            expect(setIndustryStub.set).to.have.been.calledOnce();
        });
    });

    describe('signInWithEmail Tests', () => {
        it('expect signInWithEmail to call signInWithEmailAndPassword', (done) => {
            sinon.stub(firebaseModule.auth, 'signInWithEmailAndPassword').returns(Promise.reject());

            firebaseDataBase.signInWithEmail(email, password)
                .then(() => {
                    expect(firebaseModule.auth.signInWithEmailAndPassword).to.have.been.calledOnce()
                })
                .then(done, done);

            firebaseModule.auth.signInWithEmailAndPassword.restore();
        });
    });

    describe('signOut Tests', () =>{
        it('expect signOut to call auth.signOut', (done) =>{
            sinon.stub(firebaseModule.auth, 'signOut').returns(Promise.reject());

            firebaseDataBase.signOut()
            .then(() => {
                expect(firebaseModule.auth.signOut()).to.have.been.calledOnce();
            })
            .then(done, done);

            firebaseModule.auth.signOut.restore();
        });
    });

    describe('addToWatchlist Tests', () => {
        it('expect addToWatchlist to send information to database', (done) => {
            sinon.stub(firebaseDataBase, 'getCurrentUser').returns({uid:'testID'});
            sinon.stub(firebaseModule.database.ref('users/' + firebaseDataBase.getCurrentUser().uid).child('watchlist'), 'set').returns(Promise.reject());

            firebaseDataBase.addToWatchlist(firebaseDataBase.getCurrentUser().uid, {test: 'testWatchList'});
            done();

            firebaseDataBase.getCurrentUser.restore();

            expect(firebaseModule.database.ref('users/' + firebaseDataBase.getCurrentUser().uid).child('watchlist').set).to.have.been.calledOnce();
            
            firebaseModule.database.ref('users/' + firebaseDataBase.getCurrentUser().uid).child('watchlist').set.restore();
        });
    });

    describe('addUsersIndustry Tests', () => {
        it('addUsersIndustry should send information to database', (done) => {
            sinon.stub(firebaseDataBase, 'getCurrentUser').returns({uid:'testID'});
            sinon.stub(firebaseModule.database.ref('users/userID').child('industry'), 'set').returns(Promise.reject());
            
            firebaseDataBase.addUsersIndustry(firebaseDataBase.getCurrentUser().uid, 'sample industry');
            done();

            expect(firebaseModule.database.ref('users/userID').set).to.have.been.calledOnce();

            firebaseModule.database.ref('users/userID').child('industry').set.restore();
            firebaseDataBase.getCurrentUser.restore();
        });
    });

    describe('Subscribe Tests', () =>{
        let onceStub,
            pushStub;

        beforeEach(() => {
            onceStub = sinon.stub(firebaseModule.database.ref('subscriptions'), 'once');
            pushStub = sinon.stub(firebaseModule.database.ref('subscriptions'), 'push');
        });
        afterEach(() => {
            onceStub.restore();
            pushStub.restore();
        });

        it('expect subscribe to ask for information from database', (done) => {
            onceStub.returns(Promise.reject());
            pushStub.returns(Promise.reject());

            firebaseDataBase.subscribe(email);
            done();

            expect(onceStub).to.have.been.calledOnce();
        });

        it('expect subscribe to send information to database', (done) => {
            onceStub.returns(Promise.reject());
            pushStub.returns(Promise.reject());

            firebaseDataBase.subscribe(email);
            done();
            
            expect(pushStub).to.have.been.calledOnce();
        });
    });

    describe('contact Tests', () => {
        it('expect contact to send information to database', (done) => {
            sinon.stub(firebaseModule.database.ref('contact-us'), 'push').returns(Promise.reject());

            firebaseDataBase.contact(name, email, message);
            done();

            expect(firebaseModule.database.ref('contact-us').push).to.have.been.calledOnce();

            firebaseModule.database.ref('contact-us').push.restore();
        });
    });
});

mocha.run();