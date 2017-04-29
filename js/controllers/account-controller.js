import { htmlHandler } from 'htmlHandler';
import { templateHandler } from 'templateHandler';
import { chartProvider } from 'chartProvider';
import { validator } from 'validator';

class AccountController {
    loadSignInPage(sammy) {
        htmlHandler.setHtml('sign-in', '#content', {}).then(() => showModal('#signin-modal', sammy));
        hideHeaderFooter();
    }

    loadSignUpPage(sammy) {
        htmlHandler.setHtml('sign-up', '#content', {}).then(() => showModal('#signup-modal', sammy));
        hideHeaderFooter();
    }

    getPortfolio() {
        htmlHandler.setHtml('portfolio', '#content').then(() => {
            chartProvider.getLineChart('#line-chart');
            chartProvider.getPieChart('#pie-chart');
        });
    }

    getWatchlist() {
        templateHandler.setTemplate('watchlist', '#content', {});
    }

    getNews() {
        templateHandler.setTemplate('news', '#content', {});
    }
}

function showModal(identifier, sammy) {
    $(identifier).modal('show');
    $(identifier).on('hidden.bs.modal', function () {
        sammy.redirect('#/home');
        showHeaderFooter();
    });

    if (identifier == '#signin-modal') {
        validator.validateSignIn();
    }
    else {
        validator.validateSignUp();
    }
}

function hideHeaderFooter() {
    $('#header').hide();
    $('#footer').hide();
}

function showHeaderFooter() {
    $('#header').show();
    setTimeout(() => { $('#footer').show(); }, 100);
}

const accountController = new AccountController();
export { accountController };