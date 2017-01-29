// import request from 'request';
//import x from 'node-webcrawler';
let Crawler = require('node-webcrawler');
import each from 'lodash/each';

class PriceSearch {
  constructor(baseUrl) {
    //   let Crawler = x.default;

    //   console.log(x);
    this.currentPage = 1;
    this.baseUrl = baseUrl;
    let that = this;

    this.crawler = new Crawler({
        maxConnections : 100,
        // This will be called for each crawled page 
        callback : function (error, result, $) {
            // $ is Cheerio by default 
            //a lean implementation of core jQuery designed specifically for the server 
            if(error){
                console.log(error);
            }else{
                let title = $("title").text();
                
                if(title.indexOf('Selges') == 0 || title.indexOf('Reservert') == 0 || title.indexOf('Solgt') == 0) {
                    console.log(title);
                } else {
                    that.queueAllLinks($,that);
                    that.goToNextPage($);
                }
            }
        }   
    });  
  }

//   getPotentialPrices() {
//       $('blockquote.messageText.SelectQuoteContainer')
//   }

  queueAllLinks($,that){
      var links = $('li.discussionListItem:not(.sticky)  a.PreviewTooltip');

        each(links.toArray(),function(item) {
          let link = 'http://www.tidssonen.no/forum/' + item.attribs["href"];
          that.crawler.queue(link);
      });
  }

  goToNextPage() {
      this.currentPage++;
      this.crawler.queue(this.baseUrl + 'page-' + this.currentPage)
  }

  find() {
      this.crawler.queue(this.baseUrl);
  }
}

export {PriceSearch};