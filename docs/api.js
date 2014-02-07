YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Queue",
        "Settings",
        "Track",
        "Track._Core",
        "Track._Core.Send",
        "Track._Core.Store",
        "Track._Utils",
        "Track.page"
    ],
    "modules": [
        "Queue",
        "Send",
        "Store",
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
            "displayName": "Queue",
            "name": "Queue",
            "description": "Class for handling a queue backed up by a store."
        },
        {
            "displayName": "Send",
            "name": "Send",
            "description": "Queuing and sending tags\nKeep track of individual requests in case any fail due to network errors / being offline / browser being closed mid-request."
        },
        {
            "displayName": "Store",
            "name": "Store",
            "description": "Class for storing data\nWill choose the \"best\" storage method available. Can also specify a type of storage."
        },
        {
            "displayName": "Track",
            "name": "Track",
            "description": "Origami tracking module.\n========================\nFrom this specification: https://docs.google.com/a/ft.com/document/d/1F5P3Ip3mIax6kWytYM7Kf6g7LaPS3Njdw7jLXAH1OWI/edit?usp=sharing\n\nFeatures\n--------\n* Use AJAX instead of image requests\n* Bundle requests TODO\n* Handle offline\n* Use storage methods other than cookies\n* Make the API cleaner and easier to use\n* Origami module\n* Use a single configuration object\n\nExample\n-------\n<pre>Track.init({ environment: 'test', server: 'http://ftweb03299-lvpr-uk-d/' });</pre>"
        }
    ]
} };
});