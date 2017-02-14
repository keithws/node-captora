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
    captora.widget.download(url, function (err, html) {
    
        if (err) {
            throw err;
        }
        console.log(html);
    
    });
```


## Usage with a Proxy

To proxy HTTP(S) requests, then set the appropriate npm config variables.

```shell
npm config set https-proxy http://proxy.example.com:3128/
npm config set proxy http://proxy.example.com:3128/
```

If the npm config variables are not found, then these environment variables will be used.

```shell
HTTPS_PROXY=http://proxy.example.com:3128/
HTTP_PROXY=http://proxy.example.com:3128/
```


## Change log

_v1.1.0 — February 13, 2017_

* added support HTTP(S) proxy

_v1.0.0 — February 6, 2017_

* Initial version
* supports downloading Captora CDM widget HTML

## License

node-captora is available under the [MIT License][license].

[captora]: https://www.captora.com
[promises]: https://promisesaplus.com
[license]: https://github.com/keithws/node-captora/blob/master/LICENSE
