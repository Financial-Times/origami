var commentUi = require('comment-ui');
var oCommentData = require('o-comment-data');
var utils = require('./utils.js');

exports.showSetPseudonymDialog = function (callbacks) {
    "use strict";

    if (!callbacks || typeof callbacks !== 'object') {
        callbacks = {};
    }

    callbacks.onSuccess = callbacks.onSuccess || function () {};
    callbacks.onFailure = callbacks.onFailure || function () {};

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
                            callbacks.onFailure();
                            return;
                        }

                        callbacks.onSuccess(authData);
                        responseCallback();
                    });
                });
            } else {
                responseCallback(commentUi.i18n.texts.changePseudonymError);
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

                        responseCallback();
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

    callbacks.onSuccess = callbacks.onSuccess || function () {};
    callbacks.onFailure = callbacks.onFailure || function () {};

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
                            callbacks.onFailure();
                            responseCallback(commentUi.i18n.texts.genericError);
                            return;
                        }

                        callbacks.onSuccess(authData);
                        responseCallback();
                    });
                });
            } else {
                responseCallback(commentUi.i18n.texts.genericError);
            }
        },
        close: function () {
            callbacks.onFailure();
        }
    });
};