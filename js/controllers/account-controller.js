import { htmlHandler } from '../helpers/html-handler';
import { templateHandler } from '../helpers/template-handler';
import { chartProvider } from '../helpers/chart-provider';

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