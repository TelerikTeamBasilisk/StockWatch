import { userModel } from 'user-model';
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

    signIn(sammy) {
        let email = sammy.params.email;
        let password = sammy.params.password;

        userModel
            .signIn(email, password)
            .then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        sammy.redirect('#/');
                        resolve();
                    }, 1500);
                });
            }).catch(error => {
                const code = error.code;
                const message = error.message;

                let $warningContainer = $('.warning');
                $warningContainer.removeClass('hide');

                let $dangerMessageContainer = $('#danger-message-container');
                $dangerMessageContainer.html(message);

                errorLogger.push(`${code} - ${message}`);
            });
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
                        sammy.redirect('#/home');
                        resolve();
                    }, 750);
                });
            }).catch(error => {
                const code = error.code;
                const message = error.message;

                let $warningContainer = $('.warning');
                $warningContainer.removeClass('hide');

                let $dangerMessageContainer = $('#danger-message-container');
                $dangerMessageContainer.html(message);

                errorLogger.push(`${code} - ${message}`);
            });
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
            }).catch(error => {
                const code = error.code;
                const message = error.message;

                errorLogger.push(`${code} - ${message}`);
            });
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