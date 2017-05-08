const stockData = (function () {
    let industries = [];

    function getNews() {
        // problems with google server, maybe later we can try with yahoo finance which use rss
        // let urlNews = `https://www.google.co.uk/finance/company_news?q=${stockMarket}:${company}&?callback=?`;
        let urlNews = 'https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=e84d11cf474d4a9189a09d7b406d1119';
        return new Promise((resolve, reject) => {
            $.getJSON(urlNews)
                .done(resolve)
                .fail(reject);
        });
    }

    function getHistoricalPrices(symbol, startDate, endDate) {

        // date in the format 
        let base = `http://query.yahooapis.com/v1/public/yql?q=%20select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20=%20%22${symbol}%22%20and%20startDate%20=%20%22${startDate}%22%20and%20endDate%20=%20%22${endDate}%22%20&format=json%20&diagnostics=false%20&env=store://datatables.org/alltableswithkeys%20&callback=`;
        return new Promise((resolve, reject) => {
            $.getJSON(base).
                done((data) => {
                    let allData = data.query.results.quote;
                    let prices = [];
                    allData.forEach((x) => {
                        let dataPoint = { Date: x.Date, Price: x.Close };
                        prices.push(dataPoint);
                    });
                    resolve(prices);
                })
                .fail(reject);
        });
    }

    function getPriceChange(symbol) {
        let url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Ffinance.google.com%2Ffinance%2Finfo%3Fclient%3Dig%26q%3DNASDAQ%3A${symbol}'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
        return new Promise((resolve, reject) => {
            $.getJSON(url)
                .done((data) => {
                    let text = data.query.results.body;
                    let obj = $.parseJSON(text.replace('\n// ', ''))[0];
                    let stock = { Price: obj.l, Change: obj.c };
                    resolve(stock);
                })
                .fail(reject);
        });
    }

    function getOpeningClosingTime() {
        const offsetAmericanNewYork = '-04:00';
        let timeInNewYork = moment(new Date()).utcOffset(offsetAmericanNewYork);
        let opening = moment(timeInNewYork).hour(9).minute(30).second(0);
        let close = moment(timeInNewYork).hour(16).minute(0).second(0);

        function isWeekend(date) {
            return (date.isoWeekday() == 6 || date.isoWeekday() == 7);
        };

        let exchangeState;
        let willCloseOpen;
        let hoursDiff;
        let minutesDiff;
        let secondsDiff;


        if (!isWeekend(timeInNewYork) && timeInNewYork.isAfter(opening) && timeInNewYork.isBefore(close)) {
            exchangeState = 'open';
            willCloseOpen = 'Closes';
            hoursDiff = (close.diff(timeInNewYork, 'hours'));
            minutesDiff = (close.diff(timeInNewYork, 'minutes'));
            secondsDiff = (close.diff(timeInNewYork, 'seconds'));
        }
        else {
            exchangeState = 'closed';
            willCloseOpen = 'Opens';

            if (timeInNewYork.isAfter(opening)) {
                opening = moment(opening).add(1, 'days');
            }

            while (isWeekend(opening)) {
                opening = moment(opening).add(1, 'days');
            }

            hoursDiff = (opening.diff(timeInNewYork, 'hours'));
            minutesDiff = (opening.diff(timeInNewYork, 'minutes'));
            secondsDiff = (opening.diff(timeInNewYork, 'seconds'));
        }

        return { State: exchangeState, Will: willCloseOpen, Hours: hoursDiff, Minutes: minutesDiff % 60, Seconds: secondsDiff % 60 % 60 };
    }

    function get10Largest(industry) {
        if (!industries[industry]) {
            return getAllCompaniesInIndustry(industry).then(() => getCompaniesSortedByMarketCap(industry));
        }
        else {
            return Promise.resolve(getCompaniesSortedByMarketCap(industry));
        }
    }

    function getCompaniesSortedByMarketCap(industry) {
        let industryData = industries[industry];
        sortByMarketCap(industryData);

        let selected = industryData.slice(0, 10);

        for (let i = 0; i < selected.length; i++) {
            let comp = selected[i];
            let priceChange = getPriceChange(comp.Ticker);
            comp.Price = priceChange.Price;
            comp.Change = priceChange.Change;
        }

        return selected;
    }

    function getAllCompaniesInIndustry(industry) {
        industry = industry.replace(' ', '%2520');
        let url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.nasdaq.com%2Fscreening%2Fcompanies-by-industry.aspx%3Findustry%3D${industry}%26render%3Ddownload'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;
        return new Promise((resolve, reject) => {
            $.getJSON(url)
                .done((data) => {
                    industries[industry] = [];

                    let text = data.query.results.body;
                    let lines = text.split('\n');
                    for (let i = 1; i < lines.length; i++) {
                        let splitted = lines[i].split('","');
                        if (splitted[0] && splitted[0].replace('"', '')) {
                            let ticker = splitted[0].replace('"', '');
                            let companyName = splitted[1].replace('"', '');
                            let marketCap = +splitted[3].replace('"', '');
                            industries[industry].push(new Company(ticker, companyName, marketCap));
                        }
                    }
                    resolve(industries[industry]);
                })
                .fail(reject);
        });
    }

    function sortByMarketCap(array) {
        array.sort((x, y) => {
            return y.MarketCap - x.MarketCap;
        });
    }

    return {
        getNews,
        getPriceChange,
        getHistoricalPrices,
        get10Largest,
        getOpeningClosingTime
    };
}());

class Company {
    constructor(ticker, companyName, marketCap, price, change) {
        this.Ticker = ticker;
        this.CompanyName = companyName;
        this.MarketCap = marketCap;
        this.Price = price;
        this.Change = change;
    }
}

export { stockData };
