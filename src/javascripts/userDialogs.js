var commentsUi = require('comments-ui');
var oCommentsData = require('o-comments-data');
var utils = require('./utils.js');

exports.showSetPseudonymDialog = function (onSuccess, onFailure) {
    "use strict";

    onSuccess = onSuccess || function () {};
    onFailure = onFailure || function () {};

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


                    oCommentsData.getAuth({
                        force: true
                    }, function (err, authData) {
                        if (err) {
                            responseCallback(commentsUi.i18n.texts.changePseudonymError);
                            onFailure();
                            return;
                        }

                        onSuccess(authData);
                        responseCallback();
                    });
                });
            } else {
                responseCallback(commentsUi.i18n.texts.changePseudonymError);
            }
        },

        // onClose
        function () {
            onFailure();
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
                            responseCallback(commentsUi.i18n.texts.genericError);
                        }
                        
                        return;
                    }

                    oCommentsData.getAuth({
                        force: true
                    }, function (err) {
                        if (err) {
                            responseCallback(commentsUi.i18n.texts.genericError);
                            return;
                        }

                        responseCallback();
                    });
                });
            } else {
                responseCallback(commentsUi.i18n.texts.genericError);
            }
        }
    );
};

exports.showSettingsDialog = function (currentSettings, onSuccess, onFailure) {
    "use strict";

    onSuccess = onSuccess || function () {};
    onFailure = onFailure || function () {};

    commentsUi.userDialogs.showSettingsDialog(currentSettings,
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
                            responseCallback(commentsUi.i18n.texts.genericError);
                        }
                        
                        return;
                    }

                    oCommentsData.getAuth({
                        force: true
                    }, function (err, authData) {
                        if (err) {
                            onFailure();
                            responseCallback(commentsUi.i18n.texts.genericError);
                            return;
                        }

                        onSuccess(authData);
                        responseCallback();
                    });
                });
            } else {
                responseCallback(commentsUi.i18n.texts.genericError);
            }
        },
        // onClose
        function () {
            onFailure();
        }
    );
};

exports.showInactivityMessage = function () {
    "use strict";

    commentsUi.userDialogs.showInactivityMessage(function () {
        window.location.href = 'https://registration.ft.com/registration/barrier/login?location='+ encodeURIComponent(document.location.href);
    });
};