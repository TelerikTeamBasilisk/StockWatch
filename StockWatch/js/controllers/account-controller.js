import { userModel } from 'user-model';
import { htmlHandler } from 'htmlHandler';
import { templateHandler } from 'templateHandler';
import { chartProvider } from 'chartProvider';
import { headerController } from 'headerController';
import { validator } from 'validator';
import { stockData } from 'stockData';
import { time } from 'time';
import { calendar } from 'calendar';

class AccountController {
    loadSignInPage(sammy) {
        htmlHandler.setHtml('sign-in', '#content', {}).then(() => showModal('#signin-modal', sammy));
        hideHeaderFooter();
    }

    loadSignUpPage(sammy) {
        htmlHandler.setHtml('sign-up', '#content', {}).then(() => showModal('#signup-modal', sammy));
        hideHeaderFooter();
    }

    getMarketOverview() {
        if (headerController.checkLoggedIn()) {
            htmlHandler.setHtml('marketOverview', '#content').then(() => {
                chartProvider.createChart();
                calendar.showCalendar();
            });
        } else {
            htmlHandler.setHtml('home', '#content');
        }
    }

    getWatchlist() {
        if (headerController.checkLoggedIn()) {
            templateHandler.setTemplate('watchlist', '#content', {}).then(() => {
                time.startTime();
                time.getDate();
            });
        } else {
            htmlHandler.setHtml('home', '#content');
        }
    }

    getNews() {
        if (headerController.checkLoggedIn()) {
            stockData.getNews().then((json) => templateHandler.setTemplate('news', '#content', json));
        } else {
            htmlHandler.setHtml('home', '#content');
        }
    }

    getUserSettings() {
        htmlHandler.setHtml('user-settings', '#content').then(() => {});
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
                        sammy.redirect('#/account/marketOverview');
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
                        sammy.redirect('#/account/marketOverview');
                        resolve();
                    }, 750);
                });
            }).catch(error => {
                console.log(error.message);
                $('.label.label-danger').text(error.message);

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
            }).catch(console.log);
    }

    addToWatchlist(sammy) {
        const company = sammy.params.id;
        userModel.addToWatchlist(company);
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