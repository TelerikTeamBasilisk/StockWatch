import { htmlHandler } from 'htmlHandler';

import { headerController } from 'headerController';
import { accountController } from 'accountController';

const router = (function () {
    let sammy = null;

    function start() {
        sammy = Sammy(function () {
            this.before({}, () => {
                headerController.initialize();
            }
            );
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

            // Other
            this.get('#/about', () => htmlHandler.setHtml('about', '#content'));
        });

        $(function () {
            sammy.run('#/');
        });
    }

    return {
        start,
    };
}());

export { router };