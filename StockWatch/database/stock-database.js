class StockData {

    getNews() {
        // problems with google server, maybe later we can try with yahoo finance which use rss
        // let urlNews = `https://www.google.co.uk/finance/company_news?q=${stockMarket}:${company}&?callback=?`;
        let urlNews = 'https://newsapi.org/v1/articles?source=bloomberg&sortBy=top&apiKey=e84d11cf474d4a9189a09d7b406d1119';
        return new Promise((resolve, reject) => {
            $.getJSON(urlNews)
                .done(resolve)
                .fail(reject);
        });
    }

    getStockQuote() {
        let frequency = 'TIME_SERIES_INTRADAY';
        let symbol = 'IBM';
        let interval = '1min';

        let base = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'http%3A%2F%2Fwww.alphavantage.co%2Fquery%3Ffunction%3D${frequency}%26symbol%3D${symbol}%26interval%3D${interval}%26apikey%3DAEU2'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`;

        return new Promise((resolve, reject) => {
            $.getJSON(base).
            done(resolve).
            fail(reject);
        });
    }
}

const stockData = new StockData();
export { stockData };