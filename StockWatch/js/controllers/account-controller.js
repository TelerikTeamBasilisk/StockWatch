import { userModel } from 'user-model';
import { htmlHandler } from 'htmlHandler';
import { templateHandler } from 'templateHandler';
import { chartProvider } from 'chartProvider';
import { validator } from 'validator';
import { stockData } from 'stockData';
import { time } from 'time';
import { calendar } from 'calendar';

class AccountController {
    loadSignInPage(sammy) {
        if (!userModel.isUserLoggedIn()) {
            htmlHandler.setHtml('sign-in', '#content', {})
                .then(() => showModal('#signin-modal', sammy))
                .then(() => validator.validateSignIn());
            hideHeaderFooter();
        }
        else {
            sammy.redirect('#/account/market-overview');
        }
    }

    loadSignUpPage(sammy) {
        if (!userModel.isUserLoggedIn()) {
            htmlHandler.setHtml('sign-up', '#content', {})
                .then(() => showModal('#signup-modal', sammy))
                .then(() => validator.validateSignUp());
            hideHeaderFooter();
        }
        else {
            sammy.redirect('#/account/market-overview');
        }
    }

    getMarketOverview(sammy) {
        if (userModel.isUserLoggedIn()) {
            htmlHandler.setHtml('market-overview', '#content').then(() => {
                chartProvider.createChart();
                calendar.showCalendar();
            });
        }
        else {
            sammy.redirect('#/home');
        }
    }

    getWatchlist(sammy) {
        if (userModel.isUserLoggedIn()) {
            userModel.getUsersIndustry().then((industry) => {
                stockData.get10Largest(industry).then((companies) => {
                    userModel.getUsersWatchlist().then((tickers) => {
                        let promises = [];
                        tickers.forEach((ticker) => { promises.push(stockData.getPriceChange(ticker)); });

                        Promise.all(promises).then((values) => {
                            let leftColumn = [values[0], values[2]];
                            let rightColumn = [values[1], values[3]];
                            templateHandler.setTemplate('watchlist', '#content', { companies: companies, leftColumn: leftColumn, rightColumn: rightColumn }).then(() => {
                                $.each($('.change'), (i, item) => {
                                    let $item = $(item);
                                    if (+$item.html() < 0) {
                                        $item.parent().parent().parent().addClass('red');
                                    }
                                });

                                time.startTime();
                                time.getDate();
                            });
                        });
                    });
                });
            });
        } else {
            sammy.redirect('#/home');
        }
    }

    getNews(sammy) {
        if (userModel.isUserLoggedIn()) {
            stockData.getNews().then((json) => templateHandler.setTemplate('news', '#content', json));
        } else {
            sammy.redirect('#/home');
        }
    }

    getUserSettings(sammy) {
        if (userModel.isUserLoggedIn()) {
            htmlHandler.setHtml('user-settings', '#content');
        } else {
            sammy.redirect('#/home');
        }
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
                onModalClose('#signin-modal', sammy, '#/account/market-overview');
                $('#signin-modal').modal('toggle');
            })
            .catch(console.log);
    }

    signUp(sammy) {
        let username = sammy.params.username;
        let email = sammy.params.email;
        let password = sammy.params.password;
        let passwordConfirm = sammy.params['password-confirm'];

        userModel
            .signUp(email, password, username, passwordConfirm)
            .then(() => {
                onModalClose('#signup-modal', sammy, '#/account/portfolio');
                $('#signup-modal').modal('toggle');
            })
            .catch(console.log);
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

        let watchlist = {
            companyOne: sammy.params.firstCompany,
            companyTwo: sammy.params.secondCompany,
            companyThree: sammy.params.thirdCompany,
            companyFour: sammy.params.fourthCompany,
        };

        let industry = sammy.params.industry;

        userModel.addToWatchlist(watchlist);
        userModel.addUsersIndustry(industry);
    }
}

function showModal(identifier, sammy) {
    $(identifier).modal('show');
    onModalClose(identifier, sammy, '#/home');
}

function hideHeaderFooter() {
    $('#header').hide();
    $('#footer').hide();
}

function showHeaderFooter() {
    $('#header').show();
    setTimeout(() => { $('#footer').show(); }, 100);
}

function onModalClose(identifier, sammy, redirect) {
    $(identifier).on('hidden.bs.modal', function () {
        sammy.redirect(redirect);
        showHeaderFooter();
    });
}

const accountController = new AccountController();
export { accountController };