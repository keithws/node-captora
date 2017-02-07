const captora = require(".");

// the URL of the page where the CDM widget HTML will be included
let url = `https://www.${process.env.CAPTORA_DOMAIN}/`;

// Promise based
captora.widget.download(url)
    .then(html => console.log(html))
    .catch(err => {
        process.exitCode = 1;
        console.error(err);
    });

// error-first, node-style callback
captora.widget.download(url, function (err, html) {

    if (err) {
        process.exitCode = 1;
        throw err;
    }
    console.log(html);

});
