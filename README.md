# rss-to-bootstrap-carousel

## Usage:
Include jQuery, Bootstrap and the plugin on your page. Then select an element in which to create your carousel and call the `showRSS` method.
```html
<script src="rss-to-bootstrap-carousel.min.js"></script>
<script>
  $("#wrapper").showRSS('https://weather-broker-cdn.api.bbci.co.uk/en/forecast/rss/3day/2643123',3);
</script>
```
Note:
The second parameter is [OPTIONAL] the number of results to use in your carousel.
