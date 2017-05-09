mocha.setup('bdd');
const {expect} = chai;

describe('Controllers Tests', () => {
    describe('Footer Controller Tests', () => {
        it('subscription should call firebaseDatabBase.subscribe', (done) => {
            sinon.stub(firebaseDataBase, 'subscribe')

            footerController.subscription();
            done();

            expect(firebaseDataBase.subscribe).to.have.been.calledOnce();

            firebaseDataBase.subscribe.restore();
        });
    });
});

mocha.run();