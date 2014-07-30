var commentsUi = require('comments-ui');
var oCommentsData = require('o-comments-data');
var utils = require('./utils.js');

exports.showSetPseudonymDialog = function (callbacks) {
    "use strict";

    if (!callbacks || typeof callbacks !== 'object') {
        callbacks = {};
    }

    callbacks.onSuccess = callbacks.onSuccess || function () {};
    callbacks.onFailure = callbacks.onFailure || function () {};

    commentsUi.userDialogs.showSetPseudonymDialog({
        submit: function (formData, responseCallback) {
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


                    oCommentsData.api.getAuth({
                        force: true
                    }, function (err, authData) {
                        if (err) {
                            responseCallback(commentsUi.i18n.texts.changePseudonymError);
                            callbacks.onFailure();
                            return;
                        }

                        callbacks.onSuccess(authData);
                        responseCallback();
                    });
                });
            } else {
                responseCallback(commentsUi.i18n.texts.changePseudonymError);
            }
        },
        close: function () {
            callbacks.onFailure();
            utils.emptyLivefyreActionQueue();
        }
    });
};


exports.showEmailAlertDialog = function () {
    "use strict";

    commentsUi.userDialogs.showEmailAlertDialog({
        submit: function (formData, responseCallback) {
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

                    oCommentsData.api.getAuth({
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
    });
};

exports.showSettingsDialog = function (currentSettings, callbacks) {
    "use strict";

    if (!callbacks || typeof callbacks !== 'object') {
        callbacks = {};
    }

    callbacks.onSuccess = callbacks.onSuccess || function () {};
    callbacks.onFailure = callbacks.onFailure || function () {};

    commentsUi.userDialogs.showSettingsDialog(currentSettings, {
        submit: function (formData, responseCallback) {
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

                    oCommentsData.api.getAuth({
                        force: true
                    }, function (err, authData) {
                        if (err) {
                            callbacks.onFailure();
                            responseCallback(commentsUi.i18n.texts.genericError);
                            return;
                        }

                        callbacks.onSuccess(authData);
                        responseCallback();
                    });
                });
            } else {
                responseCallback(commentsUi.i18n.texts.genericError);
            }
        },
        close: function () {
            callbacks.onFailure();
        }
    });
};