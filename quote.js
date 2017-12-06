let browser_name = (browser) ? "firefox" : "chrome";

let tab_js = {

  quoted: false,

  _shuffle: a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  renderQuote: quotes => {
    let me = tab_js;

    if (me.quoted) return;

    let quote = me._shuffle(quotes).pop();
    let $quote = document.querySelector('.quote > a');

    $quote.textContent = quote.quote + " " + quote.source;
    $quote.href = `https://womany.net/weightofwords?ref=${browser_name}_add_on#${quote.created_on}`;
    $quote.parentNode.classList.remove('loading');
    me.quoted = true;
  },

  renderArticles: og_articles => {
    let me = tab_js;
    let articles = me._shuffle(og_articles).slice(0, 6);

    let fetchs = articles.map( art => art.id).map( id => fetch(`https://api.womany.net/articles/${id}`).then( res => res.json() ));

    Promise.all(fetchs).then( results => {
      results.map( r => r.article ).map( a => ({
        id:    a.id,
        title: a.title,
        image: a.featured_image_thumb
      })).map( a => {
        var link = document.createElement('A');
        link.classList.add('article');
        link.href = `https://womany.net/read/article/${a.id}?ref=${browser_name}_add_on`;
        link.style['background-image'] = `url(https:${a.image})`;

        var mask = document.createElement('DIV');
        mask.classList.add('mask');
        mask.textContent = a.title;
        link.append(mask);

        return link;
      }).forEach( (dom, i) => {
        let $articles = document.querySelector('.articles');
        $articles.append(dom);
        if (results.length - 1 == i) {
          $articles.classList.remove('loading');
        }
      });

    });
  },

  fetchQuotes: () => fetch('https://api.womany.net/daily_quotes/').then(a => a.json()),
  fetchArticles: () => fetch('https://api.womany.net/articles/weekly').then(a => a.json()),

  fetchOrQuery: (type, fetchFunc, renderFunc, updateFunc) => {
    let me = tab_js;
    chrome.storage.local.get( type, data => {
      if (!data || !data[type]) return;

      renderFunc(data[type]);
    });

    fetchFunc().then( data => {
      renderFunc(data);

      chrome.storage.local.get( type, updateFunc);
    });
  },

  init: () => {
    let me = tab_js;

    me.fetchOrQuery("quotes", me.fetchQuotes ,me.renderQuote, (saved_quotes, fetched_quotes) => {
      if (saved_quotes.length != fetched_quotes.length) {
        chrome.storage.local.set({ quotes: fetched_quotes });
      }
    });

    me.fetchOrQuery("articles", me.fetchArticles ,me.renderArticles, (saved_arts, fetched_arts) => {
    });
  }
};

tab_js.init();
