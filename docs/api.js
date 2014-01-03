YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Track",
        "Track._Core",
        "Track._Core.Send",
        "Track._Utils",
        "Track.page"
    ],
    "modules": [
        "Track",
        "_Core",
        "_Utils",
        "page"
    ],
    "allModules": [
        {
            "displayName": "_Core",
            "name": "_Core",
            "description": "Core functionality. Queuing and sending tags"
        },
        {
            "displayName": "_Utils",
            "name": "_Utils",
            "description": "Common utilities for the tracking module."
        },
        {
            "displayName": "page",
            "name": "page",
            "description": "Page functionality. For tracking a page."
        },
        {
            "displayName": "Send",
            "name": "Send",
            "description": "Queuing and sending tags\nKeep track of individual requests in case any fail due to network errors / being offline / browser being closed mid-request."
        },
        {
            "displayName": "Track",
            "name": "Track",
            "description": "Origami tracking module.\n<pre>Track.init({ environment: 'test' });</pre>"
        }
    ]
} };
});