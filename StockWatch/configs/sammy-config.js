import { htmlHandler } from 'htmlHandler';
import { footerController } from 'footerController';
import { headerController } from 'headerController';
import { accountController } from 'accountController';

class Router {


    start() {
        let sammy = null;
        sammy = Sammy(function() {
            this.before({}, () => {
                headerController.initialize();
            });
            this.get('#/', (sammy) => sammy.redirect('#/home'));
            this.get('#/home', () => htmlHandler.setHtml('home', '#content'));

            //Account
            this.get('#/account/sign-in', accountController.loadSignInPage);
            this.get('#/account/sign-up', accountController.loadSignUpPage);

            this.post('#/account/sign-in', accountController.signIn);
            this.post('#/account/sign-up', accountController.signUp);

            this.get('#/account/portfolio', accountController.getPortfolio);
            this.get('#/account/watchlist', accountController.getWatchlist);
            this.get('#/account/news', accountController.getNews);
            this.get('#/account/user-settings', accountController.getUserSettings);

            // Other
            this.get('#/about', () => htmlHandler.setHtml('about', '#content'));
            this.get('#/contact', accountController.validateContactForm);
            this.get('#/newsletter', footerController.subscription);
            this.get('#/account/sign-out', accountController.signOut);
            this.get('#/account/add-to-watchlist', accountController.addToWatchlist);
        });

        $(function() {
            sammy.run('#/');
        });
    }
}

const router = new Router();

export { router };