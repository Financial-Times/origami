# Origami Tracking component

This module should be included on your product to make sending tracking requests to the Spoor API easy.

## The Spoor ecosystem
![ScreenShot](https://rawgit.com/Financial-Times/o-tracking/master/resources/images/ngda-system-design.svg)

# Usage

## Quickstart example 1 - JSON config
Use the build service to load o-tracking and add a json config.
```
<script type="application/json" data-o-tracking-config>
{
    server: 'https://test.spoor-api.ft.com/px.gif',
    context: {
        product: 'ft.com' // e.g. webapp, next - This is a defined list, send the correct value!
    }
}
</script>
```
o-tracking will listen on the window for 2 events:
- 'oTracking.page' - Send a page view event
    ```
    var event = new CustomEvent('oTracking.page', { content: { uuid: 'abc-123', barrier: 'PREMIUM' }});
    window.dispatchEvent(event);
    ```
- 'oTracking.event' - Send a normal event  
    ```
    var event = new CustomEvent('oTracking.event', { category: 'video', action: 'play', id: '512346789', pos: '10' });
    window.dispatchEvent(event);
    ```

## Quickstart example 2 - JS init
Use the build service to load o-tracking and init manually.
```
if (cutsTheMustard) {
    var oTracking = Origami['o-tracking'];
    // Setup
    oTracking.init({
        server: server,
        context: {
            product: 'ft.com'
        },
        user: {
            passport_id: passport_id,
            ft_session: ft_session
        }
    });
    // Track page
    oTracking.page({
        content: {
            uuid: uuid,
            hurdle: hurdle
        }
    });
}
```

# Parameters

## Init
```
{
    server: "...",
    context: {
        product: "..."
    },
    user: {
        passport_id: "...",
        ft_session: "..."
    }
}
```

## Page
```
{
    url: "...",
    referrer: "..."
    content: {
        uuid: "...",
        hurdle: "..."
    }
    
    ... anything other key-values ...
}
```

## Event
```
{
    category: 'video',
    action: 'play',
    
    ... anything other key-values ...  
    id: '512346789',
    pos: '10'
}
```
