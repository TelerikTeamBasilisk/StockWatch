import { userModel } from 'user-model';
import { htmlHandler } from 'htmlHandler';
import { templateHandler } from 'templateHandler';
import { chartProvider } from 'chartProvider';
import { validator } from 'validator';
import { stockData } from 'stockData';
import { time } from 'time';

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
        time.startTime();
        time.getDate();
    }

    getNews() {
        stockData.getNews().then((json) => templateHandler.setTemplate('news', '#content', json));
    }

    validateContactForm() {
        htmlHandler.setHtml('contact', '#content').then(() => validator.validateContactForm());
    }
    signIn(sammy) {
        let email = sammy.params.email;
        let password = sammy.params.password;

        userModel
            .signIn(email, password)
            .then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        sammy.redirect('#/account/portfolio');
                        resolve();
                    }, 1500);
                });
            }).catch(console.log);
    }

    signUp(sammy) {
        let username = sammy.params.username;
        let email = sammy.params.email;
        let password = sammy.params.password;
        let passwordConfirm = sammy.params['password-confirm'];
        userModel
            .signUp(email, password, username, passwordConfirm)
            .then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        sammy.redirect('#/account/portfolio');
                        resolve();
                    }, 750);
                });
            }).catch(console.log);
    }

    signOut(sammy) {
        userModel
            .signOut()
            .then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        sammy.redirect('#/');
                        resolve();
                    }, 750);
                });
            }).catch(console.log);
    }

    addToWatchlist(sammy) {
        const company = sammy.params.id;
        userModel.addToWatchlist(company);
    }

    removeFromWatchlist(sammy) {
        const company = sammy.params.id;
        userModel.removeFromWatchlist(company);
    }
}

function showModal(identifier, sammy) {
    $(identifier).modal('show');
    $(identifier).on('hidden.bs.modal', function() {
        sammy.redirect('#/home');
        showHeaderFooter();
    });

    if (identifier == '#signin-modal') {
        validator.validateSignIn();
    } else {
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