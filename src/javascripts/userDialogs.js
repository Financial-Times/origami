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
                    }, function (err, newUserDetails) {
                        if (err) {
                            responseCallback(commentUi.i18n.texts.genericError);
                            return;
                        }

                        // success
                        responseCallback();

                        // get new subscribes
                        // as this is the initial setup, there cannot be considered any unsubscribe
                        var subscribes = [];
                        if (isSubscribed(newUserDetails.settings.emailcomments)) {
                            subscribes.push('emailcomments');
                        }
                        if (isSubscribed(newUserDetails.settings.emailreplies)) {
                            subscribes.push('emailreplies');
                        }
                        if (isSubscribed(newUserDetails.settings.emaillikes)) {
                            subscribes.push('emaillikes');
                        }
                        if (isSubscribed(newUserDetails.settings.emailautofollow)) {
                            subscribes.push('emailautofollow');
                        }

                        if (subscribes.length) {
                            globalEvents.trigger('subscribe.tracking', [subscribes]);
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
                        var subscribes = [];
                        var unsubscribes = [];

                        if (currentUserDetails.settings.emailcomments !== newUserDetails.settings.emailcomments) {
                            if ((isUnsubscribed(currentUserDetails.settings.emailcomments) || !currentUserDetails.settings.emailcomments) && isSubscribed(newUserDetails.settings.emailcomments)) {
                                subscribes.push('emailcomments');
                            }
                            if (isSubscribed(currentUserDetails.settings.emailcomments) && isUnsubscribed(newUserDetails.settings.emailcomments)) {
                                unsubscribes.push('emailcomments');
                            }
                        }

                        if (currentUserDetails.settings.emailreplies !== newUserDetails.settings.emailreplies) {
                            if ((isUnsubscribed(currentUserDetails.settings.emailreplies) || !currentUserDetails.settings.emailreplies) && isSubscribed(newUserDetails.settings.emailreplies)) {
                                subscribes.push('emailreplies');
                            }
                            if (isSubscribed(currentUserDetails.settings.emailreplies) && isUnsubscribed(newUserDetails.settings.emailreplies)) {
                                unsubscribes.push('emailreplies');
                            }
                        }

                        if (currentUserDetails.settings.emaillikes !== newUserDetails.settings.emaillikes) {
                            if ((isUnsubscribed(currentUserDetails.settings.emaillikes) || !currentUserDetails.settings.emaillikes) && isSubscribed(newUserDetails.settings.emaillikes)) {
                                subscribes.push('emaillikes');
                            }
                            if (isSubscribed(currentUserDetails.settings.emaillikes) && isUnsubscribed(newUserDetails.settings.emaillikes)) {
                                unsubscribes.push('emaillikes');
                            }
                        }

                        if (currentUserDetails.settings.emailautofollow !== newUserDetails.settings.emailautofollow) {
                            if ((isUnsubscribed(currentUserDetails.settings.emailautofollow) || !currentUserDetails.settings.emailautofollow) && isSubscribed(newUserDetails.settings.emailautofollow)) {
                                subscribes.push('emailautofollow');
                            }
                            if (isSubscribed(currentUserDetails.settings.emailautofollow) && isUnsubscribed(newUserDetails.settings.emailautofollow)) {
                                unsubscribes.push('emailautofollow');
                            }
                        }


                        if (subscribes.length) {
                            globalEvents.trigger('subscribe.tracking', [subscribes]);
                        }

                        if (unsubscribes.length) {
                            globalEvents.trigger('unsubscribe.tracking', [unsubscribes]);
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