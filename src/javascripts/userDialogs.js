var commentUi = require('comment-ui');
var oCommentData = require('o-comment-data');
var utils = require('./utils.js');


var emailSubscribeOptions = ['immediately', 'hourly', 'on'];
var emailUnsubscribeOptions = ['never', 'off'];

var globalEvents = require('./globalEvents.js');

function inArray (array, item) {
    "use strict";

    if (Array.prototype.indexOf) {
        return array.indexOf(item) !== -1 ? true : false;
    } else {
         for (var i = 0; i < array.length; i++) {
            if (array[i] === item) {
                return true;
            }
         }
         return false;
    }
}

function isSubscribed (option) {
    "use strict";
    
    return inArray(emailSubscribeOptions, option);
}

function isUnsubscribed (option) {
    "use strict";
    
    return inArray(emailUnsubscribeOptions, option);
}


exports.showSetPseudonymDialog = function (callbacks) {
    "use strict";

    if (!callbacks || typeof callbacks !== 'object') {
        callbacks = {};
    }

    callbacks.success = callbacks.success || function () {};
    callbacks.failure = callbacks.failure || function () {};

    commentUi.userDialogs.showSetPseudonymDialog({
        submit: function (formData, responseCallback) {
            if (formData && formData.pseudonym) {
                oCommentData.api.updateUser({
                    pseudonym: formData.pseudonym
                }, function (err) {
                    if (err) {
                        if (typeof err === 'object' && err.sudsError) {
                            if (commentUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
                                responseCallback(commentUi.i18n.serviceMessageOverrides[err.error]);
                            } else {
                                responseCallback(err.error);
                            }
                        } else {
                            responseCallback(commentUi.i18n.texts.changePseudonymError);
                        }
                        
                        return;
                    }


                    oCommentData.api.getAuth({
                        force: true
                    }, function (err, authData) {
                        if (err) {
                            responseCallback(commentUi.i18n.texts.changePseudonymError);
                            callbacks.failure();
                            return;
                        }

                        callbacks.success(authData);
                        responseCallback();
                    });
                });
            } else {
                responseCallback(commentUi.i18n.texts.changePseudonymBlankError);
            }
        },
        close: function () {
            callbacks.failure();
            utils.emptyLivefyreActionQueue();
        }
    });
};

exports.showEmailAlertDialog = function () {
    "use strict";

    commentUi.userDialogs.showEmailAlertDialog({
        submit: function (formData, responseCallback) {
            if (formData) {
                oCommentData.api.updateUser(formData, function (err) {
                    if (err) {
                        if (typeof err === 'object' && err.sudsError) {
                            if (commentUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
                                responseCallback(commentUi.i18n.serviceMessageOverrides[err.error]);
                            } else {
                                responseCallback(err.error);
                            }
                        } else {
                            responseCallback(commentUi.i18n.texts.genericError);
                        }
                        
                        return;
                    }

                    oCommentData.api.getAuth({
                        force: true
                    }, function (err) {
                        if (err) {
                            responseCallback(commentUi.i18n.texts.genericError);
                            return;
                        }

                        // success
                        responseCallback();

                        // get new subscribes
                        // as this is the initial setup, there cannot be considered any unsubscribe
                        var subscribes = [];
                        if (isSubscribed(formData.emailcomments)) {
                            subscribes.push('emailcomments');
                        }
                        if (isSubscribed(formData.emailreplies)) {
                            subscribes.push('emailreplies');
                        }
                        if (isSubscribed(formData.emaillikes)) {
                            subscribes.push('emaillikes');
                        }
                        if (isSubscribed(formData.emailautofollow)) {
                            subscribes.push('emailautofollow');
                        }

                        if (subscribes.length) {
                            globalEvents.trigger('subscribe.tracking', subscribes);
                        }
                    });
                });
            } else {
                responseCallback(commentUi.i18n.texts.genericError);
            }
        }
    });
};

exports.showSettingsDialog = function (currentSettings, callbacks) {
    "use strict";

    if (!callbacks || typeof callbacks !== 'object') {
        callbacks = {};
    }

    callbacks.success = callbacks.success || function () {};
    callbacks.failure = callbacks.failure || function () {};

    commentUi.userDialogs.showSettingsDialog(currentSettings, {
        submit: function (formData, responseCallback) {
            if (formData) {
                oCommentData.api.updateUser(formData, function (err) {
                    if (err) {
                        if (typeof err === 'object' && err.sudsError) {
                            if (commentUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
                                responseCallback(commentUi.i18n.serviceMessageOverrides[err.error]);
                            } else {
                                responseCallback(err.error);
                            }
                        } else {
                            responseCallback(commentUi.i18n.texts.genericError);
                        }
                        
                        return;
                    }

                    oCommentData.api.getAuth({
                        force: true
                    }, function (err, authData) {
                        if (err) {
                            callbacks.failure();
                            responseCallback(commentUi.i18n.texts.genericError);
                            return;
                        }

                        callbacks.success(authData);
                        responseCallback();

                        // get subscribes and unsubscribes
                        var subscribes = [];
                        var unsubscribes = [];

                        if (currentSettings.emailcomments !== formData.emailcomments) {
                            if ((isUnsubscribed(currentSettings.emailcomments) || !currentSettings.emailcomments) && isSubscribed(formData.emailcomments)) {
                                subscribes.push('emailcomments');
                            }
                            if (isSubscribed(currentSettings.emailcomments) && isUnsubscribed(formData.emailcomments)) {
                                unsubscribes.push('emailcomments');
                            }
                        }

                        if (currentSettings.emailreplies !== formData.emailreplies) {
                            if ((isUnsubscribed(currentSettings.emailreplies) || !currentSettings.emailreplies) && isSubscribed(formData.emailreplies)) {
                                subscribes.push('emailreplies');
                            }
                            if (isSubscribed(currentSettings.emailreplies) && isUnsubscribed(formData.emailreplies)) {
                                unsubscribes.push('emailreplies');
                            }
                        }

                        if (currentSettings.emaillikes !== formData.emaillikes) {
                            if ((isUnsubscribed(currentSettings.emaillikes) || !currentSettings.emaillikes) && isSubscribed(formData.emaillikes)) {
                                subscribes.push('emaillikes');
                            }
                            if (isSubscribed(currentSettings.emaillikes) && isUnsubscribed(formData.emaillikes)) {
                                unsubscribes.push('emaillikes');
                            }
                        }

                        if (currentSettings.emailautofollow !== formData.emailautofollow) {
                            if ((isUnsubscribed(currentSettings.emailautofollow) || !currentSettings.emailautofollow) && isSubscribed(formData.emailautofollow)) {
                                subscribes.push('emailautofollow');
                            }
                            if (isSubscribed(currentSettings.emailautofollow) && isUnsubscribed(formData.emailautofollow)) {
                                unsubscribes.push('emailautofollow');
                            }
                        }


                        if (subscribes.length) {
                            globalEvents.trigger('subscribe.tracking', subscribes);
                        }

                        if (unsubscribes.length) {
                            globalEvents.trigger('unsubscribe.tracking', unsubscribes);
                        }
                    });
                });
            } else {
                responseCallback(commentUi.i18n.texts.genericError);
            }
        },
        close: function () {
            callbacks.failure();
        }
    });
};


exports.showInactivityMessage = commentUi.userDialogs.showInactivityMessage;