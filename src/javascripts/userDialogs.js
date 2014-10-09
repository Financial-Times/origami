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


function getModifiedSubscribesUnsubscribes (currentSettings, newSettings) {
    "use strict";

    var subscribes = [];
    var unsubscribes = [];

    if (currentSettings.emailcomments !== newSettings.emailcomments) {
        if ((isUnsubscribed(currentSettings.emailcomments) || !currentSettings.emailcomments) && isSubscribed(newSettings.emailcomments)) {
            subscribes.push('emailcomments');
        }
        if (isSubscribed(currentSettings.emailcomments) && isUnsubscribed(newSettings.emailcomments)) {
            unsubscribes.push('emailcomments');
        }
    }

    if (currentSettings.emailreplies !== newSettings.emailreplies) {
        if ((isUnsubscribed(currentSettings.emailreplies) || !currentSettings.emailreplies) && isSubscribed(newSettings.emailreplies)) {
            subscribes.push('emailreplies');
        }
        if (isSubscribed(currentSettings.emailreplies) && isUnsubscribed(newSettings.emailreplies)) {
            unsubscribes.push('emailreplies');
        }
    }

    if (currentSettings.emaillikes !== newSettings.emaillikes) {
        if ((isUnsubscribed(currentSettings.emaillikes) || !currentSettings.emaillikes) && isSubscribed(newSettings.emaillikes)) {
            subscribes.push('emaillikes');
        }
        if (isSubscribed(currentSettings.emaillikes) && isUnsubscribed(newSettings.emaillikes)) {
            unsubscribes.push('emaillikes');
        }
    }

    if (currentSettings.emailautofollow !== newSettings.emailautofollow) {
        if ((isUnsubscribed(currentSettings.emailautofollow) || !currentSettings.emailautofollow) && isSubscribed(newSettings.emailautofollow)) {
            subscribes.push('emailautofollow');
        }
        if (isSubscribed(currentSettings.emailautofollow) && isUnsubscribed(newSettings.emailautofollow)) {
            unsubscribes.push('emailautofollow');
        }
    }


    return {
        subscribes: subscribes,
        unsubscribes: unsubscribes
    };
}

function getNewSubscribes (newSettings) {
    "use strict";

    var subscribes = [];

    if (isSubscribed(newSettings.emailcomments)) {
        subscribes.push('emailcomments');
    }
    if (isSubscribed(newSettings.emailreplies)) {
        subscribes.push('emailreplies');
    }
    if (isSubscribed(newSettings.emaillikes)) {
        subscribes.push('emaillikes');
    }
    if (isSubscribed(newSettings.emailautofollow)) {
        subscribes.push('emailautofollow');
    }


    return {
        subscribes: subscribes
    };
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


/**
 * Settings dialog where the user can change its pseudonym or email preferences.
 * @param  {Object} currentPseudonym Required. Current pseudonym of the user.
 * @param  {Function} callbacks Optional. Two possible fields: success and failure. Success will get the new authentication data as parameter.
 */
exports.showChangePseudonymDialog = function (currentPseudonym, callbacks) {
    "use strict";

    if (!callbacks || typeof callbacks !== 'object') {
        callbacks = {};
    }

    callbacks.success = callbacks.success || function () {};
    callbacks.failure = callbacks.failure || function () {};

    commentUi.userDialogs.showChangePseudonymDialog(currentPseudonym, {
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
                    }, function (err, newUserDetails) {
                        if (err) {
                            responseCallback(commentUi.i18n.texts.genericError);
                            return;
                        }

                        // success
                        responseCallback();

                        // get new subscribes
                        // as this is the initial setup, there cannot be considered any unsubscribe
                        var result;
                        result = getNewSubscribes(newUserDetails.settings);

                        if (result.subscribes.length) {
                            globalEvents.trigger('subscribe.tracking', [result.subscribes]);
                        }
                    });
                });
            } else {
                responseCallback(commentUi.i18n.texts.genericError);
            }
        }
    });
};

exports.showSettingsDialog = function (currentUserDetails, callbacks) {
    "use strict";

    if (!callbacks || typeof callbacks !== 'object') {
        callbacks = {};
    }

    callbacks.success = callbacks.success || function () {};
    callbacks.failure = callbacks.failure || function () {};

    commentUi.userDialogs.showSettingsDialog(currentUserDetails, {
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
                    }, function (err, newUserDetails) {
                        if (err) {
                            callbacks.failure();
                            responseCallback(commentUi.i18n.texts.genericError);
                            return;
                        }

                        callbacks.success(newUserDetails);
                        responseCallback();

                        // get subscribes and unsubscribes
                        var result;
                        if (currentUserDetails.settings) {
                            result = getModifiedSubscribesUnsubscribes(currentUserDetails.settings, newUserDetails.settings);
                        } else {
                            result = getNewSubscribes(newUserDetails.settings);
                            result.unsubscribes = [];
                        }


                        if (result.subscribes.length) {
                            globalEvents.trigger('subscribe.tracking', [result.subscribes]);
                        }

                        if (result.unsubscribes.length) {
                            globalEvents.trigger('unsubscribe.tracking', [result.unsubscribes]);
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