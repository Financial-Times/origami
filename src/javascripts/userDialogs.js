var commentsUi = require('comments-ui');
var oCommentsData = require('o-comments-data');
var utils = require('./utils.js');

exports.showSetPseudonymDialog = function (delegate) {
    "use strict";

    commentsUi.userDialogs.showSetPseudonymDialog(
        // onSubmit
        function (formData, responseCallback) {
            if (formData && formData.pseudonym) {
                oCommentsData.api.updateUser({
                    pseudonym: formData.pseudonym
                }, function (err) {
                    if (err) {
                        if (typeof err === 'object' && err.sudsError) {
                            if (commentsUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
                                responseCallback(commentsUi.i18n.serviceMessageOverrides[err.error]);
                            } else {
                                responseCallback(err.error);
                            }
                        } else {
                            responseCallback(commentsUi.i18n.texts.changePseudonymError);
                        }
                        
                        return;
                    }

                    if (delegate) {
                        delegate.success();
                    }
                    responseCallback();
                });
            } else {
                responseCallback(commentsUi.i18n.texts.changePseudonymError);
            }
        },

        // onClose
        function () {
            if (delegate) {
                delegate.success();
            }
            utils.emptyLivefyreActionQueue();
        }
    );
};


exports.showEmailAlertDialog = function () {
    "use strict";

    commentsUi.userDialogs.showEmailAlertDialog(
        // onSubmit
        function (formData, responseCallback) {
            if (formData) {
                oCommentsData.api.updateUser(formData, function (err) {
                    if (err) {
                        if (typeof err === 'object' && err.sudsError) {
                            if (commentsUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
                                responseCallback(commentsUi.i18n.serviceMessageOverrides[err.error]);
                            } else {
                                responseCallback(err.error);
                            }
                        } else {
                            responseCallback(commentsUi.i18n.texts.changePseudonymError);
                        }
                        
                        return;
                    }

                    responseCallback();
                });
            } else {
                responseCallback(commentsUi.i18n.texts.changePseudonymError);
            }
        }
    );
};

exports.showSettingsDialog = function (currentSettings) {
    "use strict";

    commentsUi.userDialogs.showSettingsDialog(currentSettings, function (formData, responseCallback) {
        if (formData) {
            oCommentsData.api.updateUser(formData, function (err) {
                if (err) {
                    if (typeof err === 'object' && err.sudsError) {
                        if (commentsUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
                            responseCallback(commentsUi.i18n.serviceMessageOverrides[err.error]);
                        } else {
                            responseCallback(err.error);
                        }
                    } else {
                        responseCallback(commentsUi.i18n.texts.changePseudonymError);
                    }
                    
                    return;
                }

                responseCallback();
            });
        } else {
            responseCallback(commentsUi.i18n.texts.changePseudonymError);
        }
    });
};

exports.showInactivityMessage = function () {
    "use strict";

    commentsUi.userDialogs.showInactivityMessage(function () {
        window.location.href = 'https://registration.ft.com/registration/barrier/login?location='+ encodeURIComponent(document.location.href);
    });
};