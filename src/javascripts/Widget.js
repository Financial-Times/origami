var resourceLoader = require('./resourceLoader.js'),
    auth = require('./auth.js'),
    envConfig = require('./config.js'),
    WidgetUi = require('./WidgetUi.js'),
    utils = require('./utils.js'),
    commentUtilities = require('comment-utilities'),
    userDialogs = require('./userDialogs.js'),
    merge = require('js-merge'),
    i18n = require('./i18n.js'),

    commentUi = require('comment-ui'),
    oCommentData = require('o-comment-data');

/* global fyre */

/**
 * Incorporates the loading of Livefyre core resources, communication with SUDS and caching,
 * Livefyre authentication, Livefyre's widget loading mechanism with the possibility to extend and modify
 * the process.
 * 
 *
 * #### Configuration:
 * ##### Mandatory fields:
 *  - elId: ID of the HTML element in which the widget should be loaded
 *  - articleId: ID of the article, any string
 *  - url: canonical URL of the page
 *  - title: Title of the page
 *     
 * ##### Optional fields:
 *  - stream_type: livecomments, livechat, liveblog
 *  - initExtension: object which contains key-value pairs which should be added to the init object
 *  - stringOverrides: key-value pairs which override default LF strings
 *  - authPageReload: if authentication needs a page reload. By default it's false.
 * 
 * @param {object} config Configuration object. See in the description the fields that are mandatory.
 */
function Widget () {
    "use strict";

    commentUi.Widget.apply(this, arguments);

    var self = this;

    this.ui = new WidgetUi(this.getWidgetEl());

    this.forceMode = false;



    this.config.stream_type = this.config.stream_type || "livecomments";

    this.getWidgetEl().className += ' o-livefyre-comment-client livefyre-comment-overrides comment-type-' + self.config.stream_type;

    /**
     * Merge custom string overrides with FT specific string overrides.
     * @type {Object}
     */
    var stringOverrides = self.config.stringOverrides ? merge({}, i18n.lfStringOverride, self.config.stringOverrides) : i18n.lfStringOverride;
    self.config.stringOverrides = stringOverrides;


    if (utils.isLivefyreActionQueuePresent()) {
        commentUtilities.logger.log("Force flag set.");

        this.forceMode = true;
    }

    /**
     * Loads the necessary resources - suds data and Livefyre JS core library
     * @param  {object} callbacks
     */
    this.loadResources = function (callback) {
        resourceLoader.loadLivefyreCore(function (err) {
            if (err) {
                callback(err);
                return;
            }

            callback();
        });
    };

    this.init = function (callback) {
        oCommentData.api.getLivefyreInitConfig(self.config, function (err, initData) {
            if (err) {
                callback(err);
                return;
            }

            callback(null, initData);
        });
    };

    this.render = function (initData, callback) {
        if (initData) {
            if (initData.unclassifiedArticle !== true) {
                self.trigger('ready.widget');

                var authDelegate = auth.getAuthDelegate();

                // extends the init data received from SUDS with some user specified fields.
                if (self.config.initExtension && typeof self.config.initExtension === 'object') {
                    var key;

                    for (key in self.config.initExtension) {
                        if (self.config.initExtension.hasOwnProperty(key)) {
                            initData[key] = self.config.initExtension[key];
                        }
                    }
                }

                self.config.initExtension.editorCss = 'p { margin-bottom: 10px !important; }';

                oCommentData.api.getAuth(function (err, authData) {
                    if (err) {
                        authData = null;
                    }

                    self.trigger('loaded.auth', authData);

                    if (self.config.authPageReload === true) {
                        initData.authPageReload = true;
                    }

                    var networkConfig = {
                        network: envConfig.get().livefyre.network,
                        authDelegate: authDelegate
                    };
                    if (self.config.stringOverrides) {
                        networkConfig.strings = self.config.stringOverrides;
                    }

                    // Livefyre's native load function
                    fyre.conv.load(networkConfig, [initData], function (widget) {
                        if (widget) {
                            callback();
                            
                            self.lfWidget = widget;
                            self.trigger('loaded.widget', widget);

                            widget.on('initialRenderComplete', function () {
                                auth.on('login.auth', login);
                                auth.on('logout.auth', logout);

                                self.ui.addTermsAndGuidelineMessage();

                                if (authData) {
                                    if (authData.token) {
                                        auth.login(authData.token);

                                        if (self.forceMode === true) {
                                            setTimeout(self.ui.scrollToWidget, 2000);
                                        }
                                    } else if (authData.pseudonym === false) {
                                        auth.pseudonymMissing = true;
                                        auth.pseudonymWasMissing = true;

                                        if (self.forceMode === true) {
                                            auth.loginRequired();
                                        }

                                        self.ui.hideSignInLink();
                                    } else if (authData.serviceUp === false) {
                                        self.ui.makeReadOnly();
                                        self.ui.hideSignInLink();
                                        self.ui.addAuthNotAvailableMessage();
                                    }
                                }

                                self.trigger('initialRenderComplete.widget');
                            });

                            var siteId = parseInt(initData.siteId, 10);
                            widget.on('commentPosted', function (eventData) {
                                if (!auth.pseudonymWasMissing) {
                                    oCommentData.api.getAuth(function (err, authData) {
                                        if (err) {
                                            authData = null;
                                        }

                                        if (self.config.emailAlert !== false) {
                                            if (authData && typeof authData === 'object') {
                                                if (authData.token && !authData.settings) {
                                                    userDialogs.showEmailAlertDialog();
                                                }
                                            }
                                        }
                                    });
                                } else {
                                    auth.pseudonymWasMissing = false;
                                }

                                self.trigger('commentPosted.tracking', [siteId, eventData]);
                            });

                            widget.on('commentLiked', function (eventData) {
                                self.trigger('commentLiked.tracking', [siteId, eventData]);
                            });

                            widget.on('commentShared', function (eventData) {
                                self.trigger('commentShared.tracking', [siteId, eventData]);
                            });

                            widget.on('socialMention', function (eventData) {
                                self.trigger('socialMention.tracking', [siteId, eventData]);
                            });


                            authDelegate.login = function (delegate) {
                                auth.loginRequired(delegate);
                            };

                            authDelegate.logout = function (delegate) {
                                logout();
                                self.trigger('logout.authAction', delegate);
                            };

                            authDelegate.viewProfile = function (delegate, author) {
                                self.trigger('viewProfile.authAction', [delegate, author]);
                            };

                            authDelegate.editProfile = function (delegate, author) {
                                self.trigger('editProfile.authAction', [delegate, author]);
                            };
                        }
                    });
                });
            } else {
                callback({
                    unclassifiedArticle: true
                });
            }
        }
    };

    this.onError = function (err) {
        self.ui.clearContainer();

        if (typeof err !== 'object' || !err || err.unclassifiedArticle !== true) {
            self.ui.addNotAvailableMessage();
        }
    };



    /**
     * Adds the "Commenting settings" link when login occurs.
     */
    function login () {
        self.ui.addSettingsLink({
            onClick: function () {
                var showSettingsDialog = function () {
                    oCommentData.api.getAuth(function (err, currentAuthData) {
                        if (!err && currentAuthData) {
                            userDialogs.showSettingsDialog(currentAuthData, {
                                success: function (newAuthData) {
                                    if (newAuthData && newAuthData.token) {
                                        auth.logout();
                                        commentUtilities.logger.debug('new settings', newAuthData);
                                        auth.login(newAuthData.token);
                                    }
                                }
                            });
                        }
                    });
                };

                oCommentData.api.getAuth(function (err, currentAuthData) {
                    if (err || !currentAuthData) {
                        auth.loginRequired({
                            success: function () {
                                showSettingsDialog();
                            }
                        });
                        return;
                    }

                    showSettingsDialog();
                });
            }
        });
    }

    /**
     * Removes the "Commenting settings" link when logout occurs.
     */
    function logout () {
        self.ui.removeSettingsLink();
    }
}
commentUi.Widget.__extend(Widget);

Widget.__extend = function(child) {
    "use strict";

    if (typeof Object.create === 'function') {
        child.prototype = Object.create( Widget.prototype );
        child.prototype = Object.create(Widget.prototype);
    } else {
        var Tmp = function () {};
        Tmp.prototype = Widget.prototype;
        child.prototype = new Tmp();
        child.prototype.constructor = child;
    }
};

module.exports = Widget;