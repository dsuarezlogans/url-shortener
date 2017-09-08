const Url = require("../models/url");

const shortURL = (req, res) => {
  let originalURL = {
    original_url: req.params["0"]
  };
  urlShortener(originalURL, req.headers.host)
    .then(response => {
      res.status(200).jsonp({
        short_url: response.short_url,
        original_url: response.original_url
      });
    })
    .catch(e => {
      if (e.errors.original_url.message === "NO_URL") {
        return res.status(400).jsonp({
          error: "Must enter a valid url, example (https://google.com)."
        });
      } else {
        return res.status(500).jsonp({
          error: "Internar server error."
        });
      }
    });
};

const urlShortener = (originalURL, hostname) => {
  const url = new Url(originalURL, true);

  url.nextCount(function(err, count) {
    url.set("short_url", `http://${hostname}/${count}`);
  });

  return url.save();
};

const getURL = (req, res) => {
  Url.findOne({ code: req.params.code })
    .then(result => {
      res.redirect(result.original_url);
    })
    .catch(err => {
      res.status(500).jsonp({ error: "This url has not been created." });
    });
};

module.exports = {
  shortURL,
  getURL
};
