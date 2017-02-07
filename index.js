const http = require("https");

// pull in customer specific values from environment variables
let key = process.env.CAPTORA_API_KEY;
let domain = process.env.CAPTORA_DOMAIN;


/*
 * ensure key and domain are provided
 */
function checkKeyAndDomain () {

	let err;

	if (!key) {

		err = new Error("CAPTORA_API_KEY not found in environment.");

	}
	if (!domain) {

		err = new Error("CAPTORA_DOMAIN not found in environment.");

	}

	return err;

}

/**
 * download cdm with list of links
 * @arg {String} url of current page
 * @arg {Function} callback
 * @returns {undefined} 
 */
function download (url, callback) {

	// ensure callback is a function
	callback = callback || function () {};

	return new Promise((resolve, reject) => {

		let err;

		err = checkKeyAndDomain();
		if (err) {

			reject(err);
			return callback(err);

		}

		// encode url for passing to query parameter
		url = encodeURIComponent(url);

		http.get({
			"protocol": "https:",
			"host": "widgets.captora.com",
			"path": `/wserver?key=${key}&domain=${domain}&url=${url}`,
			"timeout": 10000 //ms
		}, (res) => {

			const statusCode = res.statusCode;
			const contentType = res.headers["content-type"];

			if (statusCode !== 200) {

				err = new Error(`Request Failed; Status Code: ${statusCode}`);

			} else if (!/^text\/html/.test(contentType)) {

				err = new Error(`Invalid content-type; Expected text/html but received ${contentType}`);

			}
			if (err) {

				// consume response data to free up memory
				res.resume();
				reject(err);
				return callback(err);

			}

			res.setEncoding("utf8");
			let rawData = "";
			res.on("data", (chunk) => rawData += chunk);
			res.on("end", () => {

				resolve(rawData);
				return callback(null, rawData);

			});

		}).on("error", function (err) {

			reject(err);
			return callback(err);

		});

	});

}

module.exports = {
	widget: {
		download: download
	}
};
