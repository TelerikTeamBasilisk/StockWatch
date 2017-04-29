import { headerController } from '../js/controllers/header-controller';
import { accountController } from '../js/controllers/account-controller';
import { htmlHandler } from '../js/helpers/html-handler';

const router = (function () {
    let sammy = null;

    function start() {
        sammy = Sammy(function () {
            this.before({}, () => {
                headerController.initialize();}
                );
            this.get('#/', (sammy) => sammy.redirect('#/home'));
            this.get('#/home', () => htmlHandler.setHtml('home', '#content'));

            //Account
            this.get('#/account/sign-in', accountController.loadSignInPage);
            this.get('#/account/sign-up', accountController.loadSignUpPage);
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