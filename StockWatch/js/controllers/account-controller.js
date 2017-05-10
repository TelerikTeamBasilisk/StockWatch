import { userModel } from 'user-model';
import { htmlHandler } from 'htmlHandler';
import { templateHandler } from 'templateHandler';
import { chartProvider } from 'chartProvider';
import { validator } from 'validator';
import { stockData, Company } from 'stockData';
import { time } from 'time';
import { calendar } from 'calendar';

const accountController = (function () {
    function loadSignInPage(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                htmlHandler.setHtml('sign-in', '#content', {})
                    .then(() => showModal('#signin-modal', sammy))
                    .then(() => validator.validateSignIn());
                hideHeaderFooter();
            } else {
                sammy.redirect('#/account/market-overview');
            }
        });
    }

    function loadSignUpPage(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (!isLoggedIn) {
                htmlHandler.setHtml('sign-up', '#content', {})
                    .then(() => showModal('#signup-modal', sammy))
                    .then(() => validator.validateSignUp());
                hideHeaderFooter();
            } else {
                sammy.redirect('#/account/market-overview');
            }
        });
    }

    function getMarketOverview(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                let endDate = new Date();
                let startDate = new Date();
                startDate.setMonth(startDate.getMonth() - 6);

                userModel.getUsersIndustry()
                    .then(stockData.getAllCompaniesInIndustry)
                    .then((companies) => templateHandler.setTemplate('market-overview', '#content', { companies: companies }))
                    .then(() => {
                        let $startDate = $('#start-date');
                        $startDate.val(time.buildDatesForDatePicker(startDate));
                        let $endDate = $('#end-date');
                        $endDate.val(time.buildDatesForDatePicker(endDate));

                        calendar.showCalendar();
                        updateChart();

                        $endDate.change(updateChart);
                        $startDate.change(updateChart);
                        $('#sel1').change(updateChart);
                        $('#sel2').change(updateChart);

                    });
            } else {
                sammy.redirect('#/home');
            }
        });
    }

    function getWatchlist(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                let allPromises = [];

                allPromises.push(userModel.getUsersIndustry()
                    .then((industry) => {
                        let industryPromise = Promise.resolve(industry);
                        let companies = stockData.get10Largest(industry);
                        return Promise.all([industryPromise, companies]);
                    }));

                allPromises.push(userModel.getUsersWatchlist().then((tickers) => {
                    let promises = [];
                    tickers.forEach((ticker) => promises.push(stockData.getPriceChange(ticker)));
                    return Promise.all(promises);
                }));

                Promise.all(allPromises).then((values) => {
                    let industry = values[0][0];
                    let companies = values[0][1];
                    let tickers = values[1];
                    let leftColumn = [tickers[0], tickers[2]];
                    let rightColumn = [tickers[1], tickers[3]];
                    let content = { industry: industry, companies: companies, leftColumn: leftColumn, rightColumn: rightColumn };
                    templateHandler.setTemplate('watchlist', '#content', content)
                        .then(() => {
                            $.each($('.change'), (i, item) => {
                                let $item = $(item);
                                let number = +$item.html().replace('%', '');
                                if (number < 0) {
                                    $item.parent().parent().addClass('red');
                                }
                            });

                            time.startTime();
                            time.getDate();
                        });
                });

            } else {
                sammy.redirect('#/home');
            }
        });
    }

    function getNews(sammy) {
        if (userModel.isUserLoggedIn()) {
            stockData.getNews()
                .then((json) => templateHandler.setTemplate('news', '#content', json));
        } else {
            sammy.redirect('#/home');
        }
    }

    function getUserSettings(sammy) {
        userModel.isUserLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                let promises = [];
                promises.push(userModel.getUsersIndustry()
                    .then((industry) => {
                        let industryPromise = Promise.resolve(industry);
                        let companies = stockData.getAllCompaniesInIndustry(industry);
                        return Promise.all([industryPromise, companies]);
                    }));

                promises.push(userModel.getUsersWatchlist());

                Promise.all(promises).then((values) => {
                    let industry = values[0][0];
                    let companies = values[0][1];
                    let tickers = values[1];

                    for (let i = 0; i < tickers.length; i++) {
                        let ticker = tickers[i];
                        if (companies.find((x) => x.Ticker === ticker) === undefined) {
                            companies.push(new Company(ticker));
                        }
                    }

                    companies.find((x) => x.Ticker === tickers[0]).firstCompany = true;
                    companies.find((x) => x.Ticker === tickers[1]).secondCompany = true;
                    companies.find((x) => x.Ticker === tickers[2]).thirdCompany = true;
                    companies.find((x) => x.Ticker === tickers[3]).fourthCompany = true;

                    templateHandler.setTemplate('user-settings', '#content', { companies: companies })
                        .then(() => {
                            saveChangesMessage();
                            $('#industry option').each((i, item) => {
                                let $item = $(item);
                                if ($item.html() === industry) {
                                    $item.attr('selected', 'selected');
                                }
                            });
                        });
                });
            } else {
                sammy.redirect('#/home');
            }
        });
    }

    function validateContactForm() {
        htmlHandler.setHtml('contact', '#content')
            .then(validator.validateContactForm);
    }

    function signIn(sammy) {
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

    function signUp(sammy) {
        let username = sammy.params.username;
        let email = sammy.params.email;
        let password = sammy.params.password;
        let passwordConfirm = sammy.params['password-confirm'];

        userModel
            .signUp(email, password, username, passwordConfirm)
            .then(() => {
                onModalClose('#signup-modal', sammy, '#/account/market-overview');
                $('#signup-modal').modal('toggle');
            })
            .catch(error => {
                console.log(error.message);
                $('.label.label-danger').text(error.message);
            });
    }

    function signOut(sammy) {
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

    function addToWatchlist(sammy) {

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

    function updateChart() {
        let startDate = time.getDateFromDatePicker($('#start-date').val());
        let endDate = time.getDateFromDatePicker($('#end-date').val());

        let benchmark = $('#sel1').val();
        let benchmarName = $("#sel1 option:selected").text();
        let comp = $('#sel2').val();

        let promises = [];
        promises.push(stockData.getHistoricalPrices(benchmark, benchmarName, startDate, endDate));
        promises.push(stockData.getHistoricalPrices(comp, comp, startDate, endDate));

        Promise.all(promises).then((values) => {
            chartProvider.updateChart(values);
        });
    }

    function saveChangesMessage() {
        let showMessage =
            $('#save-changes').on('click', () => {
                let $divMsg = $("<div>", { id: "save-changes-message" });
                $divMsg.text('Your changes are saved! You can move to watch list.')
                $('#settings-form').append($divMsg);
            });
        return showMessage
    }

    return {
        loadSignInPage,
        loadSignUpPage,
        getMarketOverview,
        getWatchlist,
        getNews,
        getUserSettings,
        validateContactForm,
        signIn,
        signUp,
        signOut,
        addToWatchlist
    };
}());

export { accountController };