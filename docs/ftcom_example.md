# o-tracking for Live Pub

As part of the NGDA project, o-tracking needs to be added to all of our online estate.

## Steps
1. Add polyfill service
2. Check if browser “cuts the mustard”
3. Include o-tracking JS component
4. Init component with the correct values
5. Send page event
6. Add non-JS component for when browser fails “cut the mustard”

## 1. Polyfill service

As recommended by Origami, add the polyfill service to your site to make sure o-tracking runs in as many browsers as possible.

## 2. Cut the mustard check

You need to add the cut the mustard check.
_NOTE: This is currently in open tag, but you may need to move it into the template at the top of the page._

__Don’t forget:__

- The core class on the html tag
- The additional styles:

```css
/* Hide any enhanced experience content when in core mode, and vice versa. */
.core .o--if-js,
.enhanced .o--if-no-js { display: none !important; }
```

## 3. Include o-tracking JS component

Best to follow the origami guide on this: http://origami.ft.com/docs/developer-guide/using-modules/
You need to decide if you’re using the build service or including manually.

## 4. Init o-tracking component
o-tracking requires some settings common to all pages in JSON format.

For ft-cms this is:
```js
{
    server: 'https://spoor-api.ft.com/px.gif',
    context: {
        product: 'ft.com'
    },
    user: {
        passport_id: otracking.utils.getValueFromCookie(/USERID=([0-9]+):/) || otracking.utils.getValueFromCookie(/PID=([0-9]+)\_/),
        ft_session: otracking.utils.getValueFromCookie(/FTSession=([^;]+)/)
    }
}
```

The recommended way to init o-tracking is as follows:
```js
function otrackinginit() {
        // oTracking
        var oTracking = Origami['o-tracking'];

        // Setup
        oTracking.init([config from above]);
}

if (cutsTheMustard) {
        var o = document.createElement('script');
        o.async = o.defer = true;
        o.src = 'https://build.origami.ft.com/bundles/js?modules=o-tracking%401.0.0';
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
```

## 5. Send a page event

A page event also needs a piece of JSON config with details about the page.

For ft-cms, this is:
```js
{
    content: {
        uuid: otracking.utils.getValueFromUrl(/\/cms\/s?\/?\d?\/?([a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12})/) || otracking.utils.getValueFromJsVariable("pageUUID"),
        hurdle: otracking.utils.getValueFromJsVariable("HurdleType")
    }
}
```

Best way to do this is call otracking.page directly after the init function above.

```
otracking.page({json from above})
```

## 6. non-JS component for when browser fails "cut the mustard"

This requires a change to the html template with the following code:
```html
<div class="o-tracking o--if-nojs" data-o-component="o-tracking" style="height:0;line-height:0;overflow:hidden;">
    <div style="background:url('https://server?data=data');"></div>
</div>
```

Where `server` is the server mentioned above: `https://spoor-api.ft.com/px.gif`

And `data` is a url encoded json object with the correct properties for the bits in bold:

```json
{"category":"page", "action":"view", "system":{"apiKey":"qUb9maKfKbtpRsdp0p2J7uWxRPGJEP","source":"o-tracking","version":"1.0.0"},"context":{"url":"URL","product":"ft.com","content":{"uuid":"UUID","hurdle":"HURDLE"}}}
```

The whole thing would look something like this:

```html
<div class="o-tracking o--if-nojs" data-o-component="o-tracking" style="height:0;line-height:0;overflow:hidden;">
    <div style="background:url('https://spoor-api.ft.com/px.gif?data=%7B%22category%22:%22page%22,%20%22action%22:%22view%22,%20%22system%22:%7B%22apiKey%22:%22qUb9maKfKbtpRsdp0p2J7uWxRPGJEP%22,%22source%22:%22o-tracking%22,%22version%22:%221.0.0%22%7D,%22context%22:%7B%22url%22:%22URL%22,%22product%22:%22ft.com%22,%22content%22:%7B%22uuid%22:%22UUID%22,%22hurdle%22:%22HURDLE%22%7D%7D%7D');"></div>
</div>
```
