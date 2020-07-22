# o-tracking for Membership

[Google doc](https://drive.google.com/open?id=1D6ZBAcBDlcM4Qjxf0rJfq8aA-KScEGqVYb8KZnqrjC0)

```html
<!DOCTYPE html>
<!-- Add core class to head tag -->
<head class="core">
<head>
    <title>Full example</title>
    <!-- Add CTM styles -->
    <style type="text/css">
        /* Hide any enhanced experience content when in core mode, and vice versa. */
        .core .o--if-js,
        .enhanced .o--if-no-js { display: none !important; }
    </style>
    <!-- Add CTM check -->
    <script>
        var cutsTheMustard = ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window);
        if (cutsTheMustard) {
        // Swap the 'core' class on the HTML element for an 'enhanced' one
        // We're doing it early in the head to avoid a flash of unstyled content
        document.documentElement.className = document.documentElement.className.replace(/\bcore\b/g, 'enhanced');
        }
    </script>
    <!-- Add Polyfil service -->
    <script src="https://cdn.polyfill.io/v1/polyfill.min.js"></script>
    <!-- INIT and make a page request -->
    <script>
        function otrackinginit() {
            var config_data = {
                server: 'https://spoor-api.ft.com/px.gif',
                context: {
                    product: 'ft.com'
                }
            }
            // oTracking
            var oTracking = Origami['o-tracking'];
            // Setup
            oTracking.init(config_data);
            // Page
            otracking.page({
                funnel: {
                    funnel_name: "Subs sign-up",
                    funnel_steps: 3,
                    step_name: "",
                    step_number: 1
                },
                payment_term: payment_term
            });
        }
        if (cutsTheMustard) {
            var o = document.createElement('script');
            o.async = o.defer = true;
            o.src = 'https://build.origami.ft.com/v2/bundles/js?modules=o-tracking';
            var s = document.getElementsByTagName('script')[0];
            if (o.hasOwnProperty('onreadystatechange')) {
                o.onreadystatechange = function() {
                    if (o.readyState === "loaded") {
                        otrackinginit();
                    }
                };
            } else {
                o.onload = otrackinginit;
            }
            s.parentNode.insertBefore(o, s);
        }
    </script>
</head>
<body>
<!-- Add fallback if browsers don't cut the mustard -->
<div class="o-tracking o--if-no-js" data-o-component="o-tracking">
    <div style="background:url('https://spoor-api.ft.com/px.gif?data=%7B%22category%22:%22page%22,%20%22action%22:%22view%22,%20%22system%22:%7B%%22source%22:%22o-tracking%22,%22version%22:%221.0.0%22%7D,%22context%22:%7B%22url%22:%22URL%22,%22product%22:%22ft.com%22,%22content%22:%7B%22uuid%22:%22UUID%22,%22hurdle%22:%22HURDLE%22%7D%7D%7D');"></div>
</div>
<!-- Send an event -->
<button onclick="document.body.dispatchEvent(new CustomEvent('oTracking.event', { detail: { category: 'element', action: 'click' }, bubbles: true}));">Send an event</button>
</body>
</html>
```
