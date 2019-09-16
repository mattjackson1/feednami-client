$.fn.extend({
  showRSS: function(url, num) {
    if (num === undefined) {
      num = 10;
    }

    return this.each(function() {
      var currentObject = $(this).append(
        $("<div>", { class: "carousel slide", "data-ride": "carousel" }).append(
          $("<div>", { class: "carousel-inner", role: "listbox" })
        )
      );

      feednami.load(url, function(result) {
        if (result.error) {
          console.log(result.error);
        } else {
          var entries = result.feed.entries;
          for (var i = 0; i < num; i++) {
            var entry = entries[i];

            var itemClass = "item";
            i === 0 ? (itemClass += " active") : null;

            var $item = $("<div>", { class: itemClass, role: 'option'}).append(
              $("<a>", {
                href: entry.link,
                target: "_blank",
                text: entry.title
              })
            );

            currentObject
              .find('.carousel-inner')
              .append($item);
          }
        }
      });
    });
  }
});

/*!
 * Feednami Client v1.0.1 - DONT CHANGE BELOW THIS LINE
 * Copyright (c) 2015 Richard Kazuo Miller and contributors
 */

window.feednami = {};
feednami.load = function(options, callback) {
  var apiRoot = "https://api.feednami.com/api/v1";
  var feedUrl = options;
  if (typeof options == "object") {
    feedUrl = options.url;
  }
  var qs = "url=" + feedUrl;
  if (options.format) {
    qs += "&include_xml_document&format=" + options.format;
  }
  if (options.includeXml) {
    qs += "&include_xml_document";
  }
  var url = apiRoot + "/feeds/load?" + qs;
  if (window.XDomainRequest) {
    var script = document.createElement("script");
    var callbackName =
      "jsonp_callback_" +
      new Date().getTime() +
      "_" +
      Math.round(1000000 * Math.random());
    url += "&jsonp_callback=" + callbackName;
    window[callbackName] = function(data) {
      callback(data);
      document.body.removeChild(script);
      window[callbackName] = null;
      try {
        delete window[callbackName];
      } catch (e) {}
    };
    script.src = url;
    //document.body.appendChild(script);
  } else {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        callback(JSON.parse(req.responseText));
      }
    };
    req.open("GET", url);
    req.send();
  }
};
/*
feednami.loadGoogleFormat = function(feedUrl, callback) {
  return feednami.load(
    {
      url: feedUrl,
      format: "google",
      includeXml: true
    },
    callback
  );
};
*/