import { templateHandler } from 'templateHandler';

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
}
const stockData = new StockData();
export { stockData };