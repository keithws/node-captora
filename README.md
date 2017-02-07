# node-captora
JavaScript library for Captora's API (node)

This library supports downloading [Captora][captora] CDM widgets as HTML fragments for inclusion on other pages.

## Install

Available on NPM.

`npm install captora`

Additionally, this library requires that the `CAPTORA_API_KEY` and the `CAPTORA_DOMAIN` variables are present in the environment.

## Usage

This library can be used with [Promises/A+][promises] or with node-style callbacks.

```js
    const captora = require("captora");
    
    // the URL of the page where the CDM widget HTML will be included
    let url = "https://www.example.com/";
    
    // Promise based
    captora.widget.download(url)
        .then(html => console.log(html))
        .catch(console.error);
    
    // error-first, node-style callback
    captora.widget.download(url, callback(err, html) {
    
        if (err) {
            throw err;
        }
        console.log(html);
    
    });
```

## Change log

_v1.0.0 — February 6, 2017_

* Initial version
* supports downloading Captora CDM widget HTML

## License

node-captora is available under the [MIT License][license].

[captora]: https://www.captora.com
[promises]: https://promisesaplus.com
[license]: https://github.com/keithws/node-captora/blob/master/LICENSE
