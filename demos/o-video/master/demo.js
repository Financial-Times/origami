function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  // ../../libraries/o-utils/main.js
  function debounce(func, wait) {
    var timeout;
    return function () {
      var _this = this;

      var args = arguments;

      var later = function later() {
        timeout = null;
        func.apply(_this, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function throttle(func, wait) {
    var timeout;
    return function () {
      var _this2 = this;

      if (timeout) {
        return;
      }

      var args = arguments;

      var later = function later() {
        timeout = null;
        func.apply(_this2, args);
      };

      timeout = setTimeout(later, wait);
    };
  } // ../o-viewport/src/utils.js


  var _debug;

  function broadcast(eventType, data, target) {
    target = target || document.body;

    if (_debug) {
      console.log("o-viewport", eventType, data);
    }

    target.dispatchEvent(new CustomEvent("oViewport." + eventType, {
      detail: data,
      bubbles: true
    }));
  }

  function getHeight(ignoreScrollbars) {
    return ignoreScrollbars ? document.documentElement.clientHeight : Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  function getWidth(ignoreScrollbars) {
    return ignoreScrollbars ? document.documentElement.clientWidth : Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  function getSize(ignoreScrollbars) {
    return {
      height: getHeight(ignoreScrollbars),
      width: getWidth(ignoreScrollbars)
    };
  }

  function getScrollPosition() {
    return {
      height: document.body.scrollHeight,
      width: document.body.scrollWidth,
      left: window.pageXOffset || window.scrollX,
      top: window.pageYOffset || window.scrollY
    };
  }

  function getOrientation() {
    var orientation = window.screen.orientation;

    if (orientation) {
      return typeof orientation === "string" ? orientation.split("-")[0] : orientation.type.split("-")[0];
    } else if (window.matchMedia) {
      return window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape";
    } else {
      return getHeight() >= getWidth() ? "portrait" : "landscape";
    }
  }

  function getVisibility() {
    return document.hidden;
  }

  var utils_default = {
    debug: function debug() {
      _debug = true;
    },
    broadcast: broadcast,
    getWidth: getWidth,
    getHeight: getHeight,
    getSize: getSize,
    getScrollPosition: getScrollPosition,
    getVisibility: getVisibility,
    getOrientation: getOrientation,
    debounce: debounce,
    throttle: throttle
  }; // ../o-viewport/main.js

  var throttle2 = utils_default.throttle;
  var debounce2 = utils_default.debounce;
  var listeners = {};
  var intervals = {
    resize: 100,
    orientation: 100,
    visibility: 100,
    scroll: 100
  };

  function setThrottleInterval(eventType, interval) {
    if (typeof arguments[0] === "number") {
      setThrottleInterval("scroll", arguments[0]);
      setThrottleInterval("resize", arguments[1]);
      setThrottleInterval("orientation", arguments[2]);
      setThrottleInterval("visibility", arguments[3]);
    } else if (interval) {
      intervals[eventType] = interval;
    }
  }

  function listenToResize() {
    if (listeners.resize) {
      return;
    }

    var eventType = "resize";
    var handler = debounce2(function (ev) {
      utils_default.broadcast("resize", {
        viewport: utils_default.getSize(),
        originalEvent: ev
      });
    }, intervals.resize);
    window.addEventListener(eventType, handler);
    listeners.resize = {
      eventType: eventType,
      handler: handler
    };
  }

  function listenToOrientation() {
    if (listeners.orientation) {
      return;
    }

    var eventType = "orientationchange";
    var handler = debounce2(function (ev) {
      utils_default.broadcast("orientation", {
        viewport: utils_default.getSize(),
        orientation: utils_default.getOrientation(),
        originalEvent: ev
      });
    }, intervals.orientation);
    window.addEventListener(eventType, handler);
    listeners.orientation = {
      eventType: eventType,
      handler: handler
    };
  }

  function listenToVisibility() {
    if (listeners.visibility) {
      return;
    }

    var eventType = "visibilitychange";
    var handler = debounce2(function (ev) {
      utils_default.broadcast("visibility", {
        hidden: utils_default.getVisibility(),
        originalEvent: ev
      });
    }, intervals.visibility);
    window.addEventListener(eventType, handler);
    listeners.visibility = {
      eventType: eventType,
      handler: handler
    };
  }

  function listenToScroll() {
    if (listeners.scroll) {
      return;
    }

    var eventType = "scroll";
    var handler = throttle2(function (ev) {
      var scrollPos = utils_default.getScrollPosition();
      utils_default.broadcast("scroll", {
        viewport: utils_default.getSize(),
        scrollHeight: scrollPos.height,
        scrollLeft: scrollPos.left,
        scrollTop: scrollPos.top,
        scrollWidth: scrollPos.width,
        originalEvent: ev
      });
    }, intervals.scroll);
    window.addEventListener(eventType, handler);
    listeners.scroll = {
      eventType: eventType,
      handler: handler
    };
  }

  function listenTo(eventType) {
    if (eventType === "resize" || eventType === "all") {
      listenToResize();
    }

    if (eventType === "scroll" || eventType === "all") {
      listenToScroll();
    }

    if (eventType === "orientation" || eventType === "all") {
      listenToOrientation();
    }

    if (eventType === "visibility" || eventType === "all") {
      listenToVisibility();
    }
  }

  function stopListeningTo(eventType) {
    if (eventType === "all") {
      Object.keys(listeners).forEach(stopListeningTo);
    } else if (listeners[eventType]) {
      window.removeEventListener(listeners[eventType].eventType, listeners[eventType].handler);
      delete listeners[eventType];
    }
  }

  var main_default = {
    debug: function debug() {
      utils_default.debug();
    },
    listenTo: listenTo,
    stopListeningTo: stopListeningTo,
    setThrottleInterval: setThrottleInterval,
    getOrientation: utils_default.getOrientation,
    getSize: utils_default.getSize,
    getScrollPosition: utils_default.getScrollPosition,
    getVisibility: utils_default.getVisibility
  }; // src/js/helpers/supported-formats.js

  var formats = {
    mpeg4: ['video/mp4; codecs="mp4v.20.8"'],
    h264: ['video/mp4; codecs="avc1.42E01E"', 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'],
    ogg: ['video/ogg; codecs="theora"'],
    webm: ['video/webm; codecs="vp8, vorbis"']
  };

  function supportedFormats() {
    var testEl = document.createElement("video");
    var supported = [];

    try {
      Object.keys(formats).forEach(function (format) {
        if (formats[format].some(function (type) {
          return testEl.canPlayType(type);
        })) {
          supported.push(format);
        }
      });
    } catch (e) {}

    return supported;
  }

  var supported_formats_default = supportedFormats; // src/js/helpers/get-rendition.js

  function getRendition(renditions, options) {
    var opts = options || {};
    var width = opts.optimumvideowidth;
    var formats2 = opts.supportedFormats || supported_formats_default();
    var appropriateRendition;
    var orderedRenditions = renditions.filter(function (rendition) {
      return formats2.indexOf(rendition.codec.toLowerCase()) > -1;
    }).sort(function (renditionOne, renditionTwo) {
      return renditionOne.pixelWidth - renditionTwo.pixelWidth;
    });

    if (!width) {
      return orderedRenditions.pop();
    }

    orderedRenditions.some(function (rendition) {
      if (rendition.pixelWidth >= width) {
        appropriateRendition = rendition;
        return true;
      }

      return false;
    });
    return appropriateRendition || orderedRenditions.pop();
  }

  var get_rendition_default = getRendition; // src/js/ads.js

  var sdkScriptLoaded = false;
  var sdkScriptError = null;

  function createVideoOverlayElement() {
    var overlayEl = document.createElement("div");
    overlayEl.classList.add("o-video__overlay");
    return overlayEl;
  }

  var VideoAds = /*#__PURE__*/function () {
    "use strict";

    function VideoAds(video) {
      _classCallCheck(this, VideoAds);

      this.video = video;
      this.adsLoaded = false;
      this.videoLoaded = false;
      this.loadingStateDisplayed = false;
      this.adsCompleted = false;
    }

    _createClass(VideoAds, [{
      key: "getVideoBrand",
      value: function getVideoBrand() {
        if (!this.video.videoData || !this.video.videoData.brand || !this.video.videoData.brand.name) {
          return false;
        } else {
          return this.video.videoData.brand.name;
        }
      }
    }, {
      key: "setUpAds",
      value: function setUpAds() {
        this.adContainerEl = document.createElement("div");
        this.video.containerEl.appendChild(this.adContainerEl);
        this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerEl, this.video.videoEl);
        this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
        this.adsManagerLoadedHandler = this.adsManagerLoadedHandler.bind(this);
        this.adErrorHandler = this.adErrorHandler.bind(this);
        this.adEventHandler = this.adEventHandler.bind(this);
        this.contentPauseRequestHandler = this.contentPauseRequestHandler.bind(this);
        this.contentResumeRequestHandler = this.contentResumeRequestHandler.bind(this);
        this.getAdProgress = this.getAdProgress.bind(this);
        this.adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this.adsManagerLoadedHandler, false);
        this.adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.adErrorHandler, false);
        this.requestAds();
        this.playAdEventHandler = this.playAdEventHandler.bind(this);

        if (this.video.opts.placeholder) {
          this.playAdEventHandler();
        } else {
          this.overlayEl = createVideoOverlayElement();
          this.video.containerEl.appendChild(this.overlayEl);
          this.overlayEl.addEventListener("click", this.playAdEventHandler);
        }
      }
    }, {
      key: "requestAds",
      value: function requestAds() {
        var adsRequest = new google.ima.AdsRequest();
        var targeting = "pos=".concat(this.video.targeting.position, "&ttid=").concat(this.video.targeting.videoId);
        var brand = this.getVideoBrand();

        if (brand) {
          targeting += "&brand=".concat(brand);
        }

        var advertisingUrl = "http://pubads.g.doubleclick.net/gampad/ads?env=vp&gdfp_req=1&impl=s&output=xml_vast2&iu=".concat(this.video.targeting.site, "&sz=").concat(this.video.targeting.sizes, "&unviewed_position_start=1&scp=").concat(encodeURIComponent(targeting));
        adsRequest.adTagUrl = advertisingUrl;
        adsRequest.linearAdSlotWidth = 592;
        adsRequest.linearAdSlotHeight = 333;
        adsRequest.nonLinearAdSlotWidth = 592;
        adsRequest.nonLinearAdSlotHeight = 150;
        var options = {
          detail: {
            category: "video",
            action: "adRequested",
            contentId: this.video.opts.id
          },
          bubbles: true
        };
        var requestedEvent = new CustomEvent("oTracking.event", options);
        document.body.dispatchEvent(requestedEvent);
        this.adsLoader.requestAds(adsRequest);
      }
    }, {
      key: "adsManagerLoadedHandler",
      value: function adsManagerLoadedHandler(adsManagerLoadedEvent) {
        var adsRenderingSettings = new google.ima.AdsRenderingSettings();
        adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
        this.adsManager = adsManagerLoadedEvent.getAdsManager(this.video.videoEl, adsRenderingSettings);
        this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.adErrorHandler);
        this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.contentPauseRequestHandler);
        this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.contentResumeRequestHandler);
        this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.adEventHandler);
        this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this.adEventHandler);
        this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this.adEventHandler);
        this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.adEventHandler);
        this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, this.adEventHandler);
        this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this.adEventHandler);
        this.adsLoaded = true;
        this.startAds();
      }
    }, {
      key: "startAds",
      value: function startAds() {
        if (!this.videoLoaded) {
          return;
        }

        if (!this.loadingStateDisplayed) {
          return;
        }

        if (!this.video.opts.advertising) {
          this.playUserVideo();
        } else if (!this.adsLoaded) {
          return;
        }

        if (this.loadingStateEl) {
          this.loadingStateEl.parentNode.removeChild(this.loadingStateEl);
          this.loadingStateEl = null;
        }

        try {
          this.adsManager.init(this.video.videoEl.clientWidth, this.video.videoEl.clientHeight, google.ima.ViewMode.NORMAL);
          this.adsManager.start();
        } catch (adError) {
          this.reportError(adError);
          this.playUserVideo();
        }
      }
    }, {
      key: "playAdEventHandler",
      value: function playAdEventHandler() {
        var _this3 = this;

        this.adContainerEl.classList.add("o-video__ad");
        this.adDisplayContainer.initialize();
        this.loadingStateEl = document.createElement("span");
        this.loadingStateEl.setAttribute("role", "progressbar");
        this.loadingStateEl.setAttribute("aria-valuetext", "Loading");
        this.loadingStateEl.className = "o-video__loading-state";
        this.adContainerEl.appendChild(this.loadingStateEl);
        setTimeout(function () {
          _this3.loadingStateDisplayed = true;

          _this3.startAds();
        }, 1e3 * 2);

        var loadedmetadataHandler = function loadedmetadataHandler() {
          _this3.videoLoaded = true;

          _this3.startAds();

          _this3.video.videoEl.removeEventListener("loadedmetadata", loadedmetadataHandler);
        };

        this.video.videoEl.addEventListener("loadedmetadata", loadedmetadataHandler);
        this.video.videoEl.load();

        if (this.overlayEl) {
          this.overlayEl.removeEventListener("click", this.playAdEventHandler);
          this.video.containerEl.removeChild(this.overlayEl);
        }

        delete this.overlayEl;
      }
    }, {
      key: "adEventHandler",
      value: function adEventHandler(adEvent) {
        var ad = adEvent.getAd();
        var options = {
          detail: {
            advertising: true,
            category: "video",
            contentId: this.video.opts.id,
            progress: 0,
            adDuration: ad.getDuration(),
            adMinDuration: ad.getMinSuggestedDuration(),
            adTitle: ad.getTitle(),
            adProgress: this.getAdProgress()
          },
          bubbles: true
        };

        switch (adEvent.type) {
          case google.ima.AdEvent.Type.LOADED:
            {
              if (!ad.isLinear()) {
                this.playUserVideo();
              }

              break;
            }

          case google.ima.AdEvent.Type.STARTED:
            {
              options.detail.action = "adStart";
              var startEvent = new CustomEvent("oTracking.event", options);
              document.body.dispatchEvent(startEvent);

              if (ad.isLinear()) {}

              this.video.liveRegionEl.innerHTML = "Video will play after ad in ".concat(options.detail.adDuration, " seconds");
              break;
            }

          case google.ima.AdEvent.Type.COMPLETE:
            {
              options.detail.action = "adComplete";
              var endEvent = new CustomEvent("oTracking.event", options);
              document.body.dispatchEvent(endEvent);

              if (ad.isLinear()) {}

              this.video.liveRegionEl.innerHTML = "";
              break;
            }

          case google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED:
            {
              options.detail.action = "adSkippable";
              var skippableEvent = new CustomEvent("oTracking.event", options);
              document.body.dispatchEvent(skippableEvent);
              break;
            }

          case google.ima.AdEvent.Type.SKIPPED:
            {
              options.detail.action = "adSkip";
              var skipEvent = new CustomEvent("oTracking.event", options);
              document.body.dispatchEvent(skipEvent);
              break;
            }

          case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
            {
              options.detail.action = "allAdsCompleted";
              var allAdsCompletedEvent = new CustomEvent("oTracking.event", options);
              document.body.dispatchEvent(allAdsCompletedEvent);
              break;
            }

          default:
            {
              throw new Error("adEvent has type " + adEvent.type + ", which is not handled by adEventHandler");
            }
        }
      }
    }, {
      key: "reportError",
      value: function reportError(error) {
        document.body.dispatchEvent(new CustomEvent("oErrors.log", {
          bubbles: true,
          detail: {
            error: error
          }
        }));
      }
    }, {
      key: "adErrorHandler",
      value: function adErrorHandler(adError) {
        var actualError = "getError" in adError && typeof adError.getError === "function" ? adError.getError() : adError;
        var message = "".concat(actualError.getErrorCode(), ", ").concat(actualError.getType(), ", ").concat(actualError.getMessage(), ", ").concat(actualError.getVastErrorCode());
        this.reportError(new Error(message));

        if (this.adsManager) {
          this.adsManager.destroy();
        }

        this.video.containerEl.removeChild(this.adContainerEl);

        if (this.overlayEl) {
          this.overlayEl.removeEventListener("click", this.playAdEventHandler);
          this.video.containerEl.removeChild(this.overlayEl);
          delete this.overlayEl;
        }

        if (this.video.placeholderEl) {
          this.video.placeholderEl.removeEventListener("click", this.playAdEventHandler);
        }

        this.video.opts.advertising = false;
        this.startAds();
      }
    }, {
      key: "contentPauseRequestHandler",
      value: function contentPauseRequestHandler() {
        this.adsCompleted = false;
        this.video.videoEl.pause();
      }
    }, {
      key: "contentResumeRequestHandler",
      value: function contentResumeRequestHandler() {
        this.video.containerEl.removeChild(this.adContainerEl);
        this.adsCompleted = true;
        this.playUserVideo();
      }
    }, {
      key: "playUserVideo",
      value: function playUserVideo() {
        this.video.addCaptions();
        this.video.videoEl.play();
      }
    }, {
      key: "getAdProgress",
      value: function getAdProgress() {
        if (!this.adsManager || !this.adsManager.getCurrentAd()) {
          return 0;
        }

        var duration = this.adsManager.getCurrentAd().getDuration();
        var remainingTime = this.adsManager.getRemainingTime();
        return parseInt(100 * (duration - remainingTime) / duration, 10);
      }
    }], [{
      key: "loadAdsLibrary",
      value: function loadAdsLibrary() {
        return new Promise(function (resolve, reject) {
          var googleSdkScript = document.querySelector('[src="//imasdk.googleapis.com/js/sdkloader/ima3.js"]');

          if (!googleSdkScript) {
            googleSdkScript = document.createElement("script");
            googleSdkScript.setAttribute("type", "text/javascript");
            googleSdkScript.setAttribute("src", "//imasdk.googleapis.com/js/sdkloader/ima3.js");
            googleSdkScript.setAttribute("async", true);
            googleSdkScript.setAttribute("defer", true);
            document.getElementsByTagName("head")[0].appendChild(googleSdkScript);
          }

          if (sdkScriptLoaded || window.google && window.google.ima) {
            resolve();
          } else if (sdkScriptError) {
            reject(sdkScriptError);
          } else {
            googleSdkScript.addEventListener("load", function () {
              sdkScriptLoaded = true;
              resolve();
            });
            googleSdkScript.addEventListener("error", function (e) {
              sdkScriptError = e;
              reject(e);
            });
          }
        });
      }
    }]);

    return VideoAds;
  }();

  var ads_default = VideoAds; // src/js/info.js

  var VideoInfo = /*#__PURE__*/function () {
    "use strict";

    function VideoInfo(video) {
      _classCallCheck(this, VideoInfo);

      this.video = video;
      this.opts = this.video.opts.placeholderInfo.reduce(function (map, key) {
        map[key] = true;
        return map;
      }, {});
      this.infoEl = document.createElement("div");
      this.infoEl.className = "o-video__info";

      if (this.opts.brand) {
        this.brandEl = document.createElement("span");
        this.brandEl.className = "o-video__info-brand";
        this.infoEl.appendChild(this.brandEl);
      }

      if (this.opts.title) {
        this.titleEl = document.createElement("span");
        this.titleEl.className = "o-video__info-title";
        this.infoEl.appendChild(this.titleEl);
      }

      if (this.opts.description) {
        this.descriptionEl = document.createElement("p");
        this.descriptionEl.className = "o-video__info-description";
        this.infoEl.appendChild(this.descriptionEl);
      }

      this.update();
      this.video.placeholderEl.appendChild(this.infoEl);
    }

    _createClass(VideoInfo, [{
      key: "update",
      value: function update() {
        if (this.brandEl) {
          var brandName = this.video.videoData.brand && this.video.videoData.brand.name;
          this.brandEl.textContent = brandName;
        }

        if (this.titleEl) {
          this.titleEl.textContent = this.video.videoData.title;
        }

        if (this.descriptionEl) {
          this.descriptionEl.textContent = this.video.videoData.standfirst;
        }
      }
    }, {
      key: "teardown",
      value: function teardown() {
        this.video.placeholderEl.removeChild(this.infoEl);
        delete this.infoEl;
        delete this.brandEl;
        delete this.titleEl;
        delete this.descriptionEl;
      }
    }]);

    return VideoInfo;
  }();

  var info_default = VideoInfo; // src/js/playlist.js

  var Playlist = /*#__PURE__*/function () {
    "use strict";

    function Playlist(opts) {
      _classCallCheck(this, Playlist);

      this.opts = opts;
      var currentId = opts.player.videoData ? opts.player.videoData.id : opts.player.opts.id;
      this.currentIndex = currentId ? opts.queue.indexOf(currentId.toString()) : -1;
      this.cache = {};

      if (this.opts.autoplay) {
        this.opts.player.containerEl.addEventListener("ended", this.next.bind(this), true);

        if (this.currentIndex === -1) {
          this.next();
        }
      }
    }

    _createClass(Playlist, [{
      key: "next",
      value: function next() {
        this.goto(this.currentIndex + 1);
      }
    }, {
      key: "prev",
      value: function prev() {
        this.goto(this.currentIndex - 1);
      }
    }, {
      key: "goto",
      value: function goto(index) {
        var _this4 = this;

        if (index < 0) {
          this.currentIndex = this.opts.queue.length - 1;
        } else if (index >= this.opts.queue.length) {
          this.currentIndex = 0;
        } else {
          this.currentIndex = index;
        }

        var currentVideoId = this.opts.player.videoData && this.opts.player.videoData.id;

        if (currentVideoId && !this.cache[currentVideoId]) {
          this.cache[currentVideoId] = this.opts.player.videoData;
        }

        this.opts.player.fireWatchedEvent();
        this.opts.player.resetAmountWatched();
        var nextVideoId = this.opts.queue[this.currentIndex];
        var nextVideoOpts = {
          id: nextVideoId,
          data: this.cache[nextVideoId]
        };
        return this.opts.player.update(nextVideoOpts).then(function () {
          if (_this4.opts.player.videoEl) {
            _this4.opts.player.videoEl.play();
          }
        });
      }
    }]);

    return Playlist;
  }();

  var playlist_default = Playlist; // src/js/guidance.js

  var closeButton = function closeButton(onClick) {
    var button = document.createElement("button");
    button.className = "o-video__guidance__close";
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      onClick();
    });
    return button;
  };

  var container = function container(bannerMode) {
    var containerEl = document.createElement("div");
    containerEl.className = "o-video__guidance ".concat(bannerMode ? "o-video__guidance--banner" : "");
    return containerEl;
  };

  var link = function link() {
    var linkEl = document.createElement("a");
    linkEl.setAttribute("href", "https://www.ft.com/accessibility#video-transcriptions");
    linkEl.className = "o-video__guidance__link";
    linkEl.innerText = "Subtitles unavailable";
    linkEl.target = "_blank";
    linkEl.addEventListener("click", function (e) {
      return e.stopPropagation();
    });
    return linkEl;
  };

  var Guidance = /*#__PURE__*/function () {
    "use strict";

    function Guidance() {
      _classCallCheck(this, Guidance);

      this.removeBanner = this.removeBanner.bind(this);
      this.hideBanner = this.hideBanner.bind(this);
    }

    _createClass(Guidance, [{
      key: "createPlaceholder",
      value: function createPlaceholder() {
        var containerEl = container();
        containerEl.appendChild(link());
        return containerEl;
      }
    }, {
      key: "createBanner",
      value: function createBanner() {
        this.banner = container(true);
        this.banner.appendChild(closeButton(this.removeBanner));
        this.banner.appendChild(link());
        this.timeout = setTimeout(this.hideBanner, 5e3);
        return this.banner;
      }
    }, {
      key: "removeBanner",
      value: function removeBanner() {
        if (this.banner) {
          this.banner.remove();
          clearTimeout(this.timeout);
        }
      }
    }, {
      key: "hideBanner",
      value: function hideBanner() {
        if (this.banner) {
          this.banner.classList.add("o-video__guidance--hidden");
        }
      }
    }]);

    return Guidance;
  }();

  var guidance_default = Guidance; // src/js/video.js

  function listenOnce(el, eventName, fn) {
    var wrappedFn = function wrappedFn() {
      el.removeEventListener(eventName, wrappedFn);
      fn.apply(void 0, arguments);
    };

    el.addEventListener(eventName, wrappedFn);
  }

  function eventListener(video, ev) {
    if (video.opts.advertising && video.videoAds && video.videoAds.adsLoaded && !video.videoAds.adsCompleted) {
      return;
    }

    if (ev.type === "progress" && !shouldDispatch(video)) {
      return;
    }

    fireEvent(ev.type, video, {
      progress: video.getProgress(),
      duration: video.getDuration(),
      textTrackMode: video.getTrackMode()
    });
  }

  function fireEvent(action, video) {
    var extraDetail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var event = new CustomEvent("oTracking.event", {
      detail: Object.assign({
        category: "video",
        action: action,
        advertising: video.opts.advertising,
        contentId: video.opts.id
      }, extraDetail),
      bubbles: true
    });
    document.body.dispatchEvent(event);
  }

  var dispatchedProgress = {};

  function shouldDispatch(video) {
    var progress = video.getProgress();
    var id = video.opts.id;
    var relevantProgressPoints = [8, 9, 10, 11, 12, 23, 24, 25, 26, 27, 48, 49, 50, 51, 52, 73, 74, 75, 76, 77, 100];

    if (!dispatchedProgress[id]) {
      dispatchedProgress[id] = [];
    }

    if (!relevantProgressPoints.includes(progress)) {
      return false;
    }

    if (dispatchedProgress[id].includes(progress)) {
      return false;
    }

    dispatchedProgress[id].push(progress);
    return true;
  }

  function addEvents(video, events) {
    var _this5 = this;

    events.forEach(function (event) {
      video.videoEl.addEventListener(event, eventListener.bind(_this5, video));
    });
  }

  function updatePosterUrl(posterImage, width, systemcode) {
    var url = "https://www.ft.com/__origami/service/image/v2/images/raw/".concat(encodeURIComponent(posterImage), "?source=").concat(systemcode, "&quality=low");

    if (width) {
      url += "&fit=scale-down&width=".concat(width);
    }

    return url;
  }

  function getOptionsFromDataAttributes(attributes) {
    var opts = {};
    Array.prototype.forEach.call(attributes, function (attr) {
      if (attr.name.indexOf("data-o-video") === 0) {
        var key = attr.name.replace("data-o-video-", "").replace(/-([a-z])/g, function (m, w) {
          return w.toUpperCase();
        });

        try {
          if (key === "placeholderInfo") {
            opts[key] = JSON.parse(attr.value.replace(/\'/g, '"'));
          } else {
            opts[key] = JSON.parse(attr.value);
          }
        } catch (e) {
          opts[key] = attr.value;
        }
      }
    });
    return opts;
  }

  function unloadListener() {
    this.updateAmountWatched();
    fireEvent("watched", this, {
      amount: this.getAmountWatched(0),
      amountPercentage: this.getAmountWatchedPercentage(0)
    });
  }

  function visibilityListener(ev) {
    if (ev.detail.hidden) {
      this.updateAmountWatched();
    } else if (!this.videoEl.paused) {
      this.markPlayStart();
    }
  }

  var unloadEventName = "onbeforeunload" in window ? "beforeunload" : "unload";
  var defaultOpts = {
    advertising: false,
    allProgress: false,
    autorender: true,
    classes: [],
    optimumwidth: null,
    placeholder: false,
    placeholderInfo: ["title"],
    placeholderHint: "",
    playsinline: false,
    showCaptions: true,
    showGuidance: true,
    data: null
  };

  var Video = /*#__PURE__*/function () {
    "use strict";

    function Video(el, opts) {
      _classCallCheck(this, Video);

      this.containerEl = el;
      this.amountWatched = 0;
      this.fireWatchedEvent = unloadListener.bind(this);
      this.visibilityListener = visibilityListener.bind(this);
      this.didUserPressPlay = false;
      this.opts = Object.assign({}, defaultOpts, opts, getOptionsFromDataAttributes(this.containerEl.attributes));
      this.containerEl.setAttribute("aria-label", "Video Player");

      if (typeof this.opts.systemcode !== "string") {
        throw new Error('o-video requires "systemcode" is configured using the "data-o-video-systemcode" data attribute, or configured with the `opts` constructor argument. It must be set to a valid [Bizops system code](https://biz-ops.in.ft.com/list/Systems).');
      }

      if (typeof this.opts.classes === "string") {
        this.opts.classes = this.opts.classes.split(" ");
      }

      if (this.opts.classes.indexOf("o-video__video") === -1) {
        this.opts.classes.push("o-video__video");
      }

      this.targeting = {
        site: "/5887/ft.com",
        position: "video",
        sizes: "592x333|400x225",
        videoId: this.opts.id
      };

      if (this.opts.advertising) {
        this.videoAds = new ads_default(this);
      }

      this.containerEl.setAttribute("data-o-video-js", "");

      if (this.opts.autorender === true) {
        this.init();
      }

      if (this.opts.showGuidance) {
        this.guidance = new guidance_default();
      }
    }

    _createClass(Video, [{
      key: "getData",
      value: function getData() {
        var _this6 = this;

        var dataPromise = this.opts.data ? Promise.resolve(this.opts.data) : fetch("https://next-media-api.ft.com/v1/".concat(this.opts.id)).then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw Error("Next Media API responded with a " + response.status + " (" + response.statusText + ") for id " + _this6.opts.id);
          }
        });
        return dataPromise.then(function (data) {
          _this6.videoData = data;
          _this6.posterImage = data.mainImageUrl && updatePosterUrl(data.mainImageUrl, _this6.opts.optimumwidth, _this6.opts.systemcode);
          _this6.rendition = get_rendition_default(data.renditions, _this6.opts);
        });
      }
    }, {
      key: "renderVideo",
      value: function renderVideo() {
        if (this.rendition) {
          if (this.opts.placeholder) {
            this.addPlaceholder();
          } else {
            this.addVideo();
          }
        }
      }
    }, {
      key: "init",
      value: function init() {
        var _this7 = this;

        return (this.opts.advertising ? ads_default.loadAdsLibrary() : Promise.resolve()).catch(function () {
          _this7.opts.advertising = false;
        }).then(function () {
          return _this7.getData();
        }).then(function () {
          return _this7.renderVideo();
        });
      }
    }, {
      key: "addVideo",
      value: function addVideo() {
        this.liveRegionEl = document.createElement("div");
        this.liveRegionEl.setAttribute("aria-live", "assertive");
        this.liveRegionEl.classList.add("o-video__live-region");
        this.videoEl = document.createElement("video");
        this.videoEl.controls = true;
        this.videoEl.className = Array.isArray(this.opts.classes) ? this.opts.classes.join(" ") : this.opts.classes;
        this.containerEl.classList.add("o-video--player");

        if (this.opts.playsinline) {
          this.videoEl.setAttribute("playsinline", "true");
          this.videoEl.setAttribute("webkit-playsinline", "true");
        }

        if (this.videoEl.controlsList) {
          this.videoEl.controlsList.add("nodownload");
        }

        this.updateVideo();

        if (this.placeholderEl && !this.opts.advertising) {
          this.videoEl.autoplay = this.videoEl.autostart = true;
        }

        this.containerEl.appendChild(this.liveRegionEl);
        this.containerEl.appendChild(this.videoEl);
        addEvents(this, ["playing", "pause", "ended", "progress", "seeked", "error", "stalled", "waiting"]);
        this.videoEl.addEventListener("playing", this.pauseOtherVideos.bind(this));
        this.videoEl.addEventListener("playing", this.markPlayStart.bind(this));
        this.videoEl.addEventListener("pause", this.updateAmountWatched.bind(this));
        this.videoEl.addEventListener("suspend", this.clearCurrentlyPlaying.bind(this));
        this.videoEl.addEventListener("ended", this.clearCurrentlyPlaying.bind(this));

        if (this.opts.advertising) {
          this.videoAds.setUpAds();
        }

        window.addEventListener(unloadEventName, this.fireWatchedEvent);
        main_default.listenTo("visibility");
        window.addEventListener("oViewport.visibility", this.visibilityListener);
      }
    }, {
      key: "addCaptions",
      value: function addCaptions() {
        if (this.opts.showCaptions === false) {
          return;
        }

        if (typeof this.videoData === "undefined") {
          throw new Error("Please call `getData()` before calling `addCaptions()` directly.");
        }

        var existingTrackEl = this.videoEl.querySelector("track");

        if (existingTrackEl) {
          this.videoEl.removeChild(existingTrackEl);
        }

        if (this.videoData.captionsUrl) {
          var trackEl = document.createElement("track");
          trackEl.setAttribute("label", "English");
          trackEl.setAttribute("kind", "captions");
          trackEl.setAttribute("srclang", "en");
          trackEl.setAttribute("src", this.videoData.captionsUrl);
          trackEl.setAttribute("crossorigin", "true");
          this.videoEl.setAttribute("crossorigin", "true");
          this.videoEl.appendChild(trackEl);
        }
      }
    }, {
      key: "updateVideo",
      value: function updateVideo() {
        if (this.posterImage) {
          this.videoEl.poster = this.posterImage;
        } else {
          this.videoEl.removeAttribute("poster");
        }

        this.videoEl.src = this.rendition && this.rendition.url;

        if (this.guidance) {
          this.guidance.removeBanner();
        }

        listenOnce(this.videoEl, "playing", this.showGuidanceBanner.bind(this));
        this.addCaptions();
      }
    }, {
      key: "addPlaceholder",
      value: function addPlaceholder() {
        var _this8 = this;

        this.placeholderEl = document.createElement("div");
        this.placeholderEl.className = "o-video__placeholder";
        this.placeholderImageEl = document.createElement("img");
        this.placeholderImageEl.className = "o-video__placeholder-image";
        this.placeholderImageEl.setAttribute("role", "presentation");
        this.placeholderImageEl.setAttribute("alt", "");
        this.placeholderEl.appendChild(this.placeholderImageEl);

        if (this.opts.placeholderInfo.length) {
          this.infoPanel = new info_default(this);
        }

        var playCTA = document.createElement("div");
        playCTA.className = "o-video__play-cta ".concat(this.opts.placeholderHint ? "o-video__play-cta--with-hint" : "o-video__play-cta--without-hint");
        this.playButtonEl = document.createElement("button");
        this.playButtonEl.className = "o-video__play-button";
        var playButtonIconEl = document.createElement("span");
        playButtonIconEl.className = "o-video__play-button-icon";
        playButtonIconEl.textContent = this.opts.placeholderHint;
        playCTA.appendChild(playButtonIconEl);

        var _ref = this.videoData || {},
            captionsUrl = _ref.captionsUrl;

        if (!captionsUrl && this.guidance) {
          playCTA.appendChild(this.guidance.createPlaceholder());
        }

        this.playButtonEl.appendChild(playCTA);
        this.placeholderEl.appendChild(this.playButtonEl);
        this.placeholderEl.addEventListener("click", function () {
          _this8.didUserPressPlay = true;

          _this8.play();
        });
        this.updatePlaceholder();
        this.containerEl.appendChild(this.placeholderEl);
      }
    }, {
      key: "play",
      value: function play() {
        if (this.placeholderEl) {
          this.addVideo();
          this.videoEl.focus();
          this.containerEl.removeChild(this.placeholderEl);

          if (this.infoPanel) {
            this.infoPanel.teardown();
          }

          delete this.placeholderEl;
          delete this.placeholderImageEl;
        } else {
          this.videoEl.play();
        }
      }
    }, {
      key: "updatePlaceholder",
      value: function updatePlaceholder() {
        if (this.posterImage) {
          this.placeholderImageEl.src = this.posterImage;
        }

        if (this.infoPanel) {
          this.infoPanel.update();
        }

        if (this.playButtonEl) {
          this.playButtonEl.setAttribute("aria-label", "Play video ".concat(this.videoData.title));
        }
      }
    }, {
      key: "update",
      value: function update(newOpts) {
        var _this9 = this;

        if (this.videoEl) {
          this.videoEl.pause();
        }

        this.clearCurrentlyPlaying();
        this.didUserPressPlay = false;
        this.opts = Object.assign(this.opts, {
          data: null
        }, newOpts);

        if (!this.videoEl && !this.placeholderEl) {
          return this.init();
        }

        return this.getData().then(function () {
          if (_this9.placeholderEl) {
            _this9.updatePlaceholder();
          } else {
            _this9.updateVideo();
          }
        });
      }
    }, {
      key: "getProgress",
      value: function getProgress() {
        return this.videoEl.duration ? parseInt(100 * this.videoEl.currentTime / this.videoEl.duration, 10) : 0;
      }
    }, {
      key: "getDuration",
      value: function getDuration() {
        return this.videoEl.duration ? parseInt(this.videoEl.duration, 10) : 0;
      }
    }, {
      key: "getTrackMode",
      value: function getTrackMode() {
        return this.videoEl.textTracks && this.videoEl.textTracks[0] ? this.videoEl.textTracks[0].mode : void 0;
      }
    }, {
      key: "getAmountWatched",
      value: function getAmountWatched(decimalPoints) {
        var secondsWatched = this.amountWatched / 1e3;
        return decimalPoints !== void 0 ? Number(secondsWatched.toFixed(decimalPoints)) : secondsWatched;
      }
    }, {
      key: "getAmountWatchedPercentage",
      value: function getAmountWatchedPercentage(decimalPoints) {
        var percentageWatched = this.videoEl && this.videoEl.duration ? 100 / this.videoEl.duration * this.getAmountWatched() : 0;
        return decimalPoints !== void 0 ? Number(percentageWatched.toFixed(decimalPoints)) : percentageWatched;
      }
    }, {
      key: "pauseOtherVideos",
      value: function pauseOtherVideos() {
        if (this.currentlyPlayingVideo && this.currentlyPlayingVideo !== this.videoEl) {
          this.currentlyPlayingVideo.pause();
        }

        this.currentlyPlayingVideo = this.videoEl;
      }
    }, {
      key: "clearCurrentlyPlaying",
      value: function clearCurrentlyPlaying() {
        if (this.currentlyPlayingVideo !== this.videoEl) {
          this.currentlyPlayingVideo = null;
        }
      }
    }, {
      key: "markPlayStart",
      value: function markPlayStart() {
        this.playStart = Date.now();
      }
    }, {
      key: "updateAmountWatched",
      value: function updateAmountWatched() {
        if (this.playStart !== void 0) {
          this.amountWatched += Date.now() - this.playStart;
          this.playStart = void 0;
        }
      }
    }, {
      key: "resetAmountWatched",
      value: function resetAmountWatched() {
        this.amountWatched = 0;
      }
    }, {
      key: "showGuidanceBanner",
      value: function showGuidanceBanner() {
        var _ref2 = this.videoData || {},
            captionsUrl = _ref2.captionsUrl;

        if (!this.didUserPressPlay && !captionsUrl && this.guidance) {
          this.containerEl.appendChild(this.guidance.createBanner());
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        window.removeEventListener(unloadEventName, this.fireWatchedEvent);
        window.removeEventListener("oViewport.visibility", this.visibilityListener);
      }
    }], [{
      key: "init",
      value: function init(rootEl, config) {
        var videos = [];

        if (!rootEl) {
          rootEl = document.body;
        } else if (typeof rootEl === "string") {
          rootEl = document.querySelector(rootEl);
        }

        var videoEls = rootEl.querySelectorAll(':not([data-o-video-js])[data-o-component~="o-video"]');

        for (var i = 0; i < videoEls.length; i++) {
          videos.push(new Video(videoEls[i], config));
        }

        return videos;
      }
    }]);

    return Video;
  }();

  Video.Playlist = playlist_default;
  var video_default = Video; // demos/src/demo.js

  document.addEventListener("DOMContentLoaded", function () {
    var video = new video_default(document.querySelector('[data-o-component="o-video"]'));
    var select = document.querySelector("select");

    if (select) {
      select.addEventListener("change", function () {
        video.update({
          id: this.value
        });
      });
      select.value = video.opts.id;
    }
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCIuLi9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4uL28tdmlld3BvcnQvbWFpbi5qcyIsInNyYy9qcy9oZWxwZXJzL3N1cHBvcnRlZC1mb3JtYXRzLmpzIiwic3JjL2pzL2hlbHBlcnMvZ2V0LXJlbmRpdGlvbi5qcyIsInNyYy9qcy9hZHMuanMiLCJzcmMvanMvaW5mby5qcyIsInNyYy9qcy9wbGF5bGlzdC5qcyIsInNyYy9qcy9ndWlkYW5jZS5qcyIsInNyYy9qcy92aWRlby5qcyIsImRlbW9zL3NyYy9kZW1vLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBYUEsV0FBQSxRQUFBLENBQWtCLElBQWxCLEVBQXdCLElBQXhCLEVBQThCO0FBQzdCLFFBQUksT0FBSjtBQUNBLFdBQU8sWUFBVztBQUFBOztBQUNqQixVQUFNLElBQUEsR0FBTyxTQUFiOztBQUNBLFVBQU0sS0FBQSxHQUFRLFNBQVIsS0FBUSxHQUFNO0FBQ25CLFFBQUEsT0FBQSxHQUFVLElBQVY7QUFDQSxRQUFBLElBQUEsQ0FBSyxLQUFMLENBQVcsS0FBWCxFQUFpQixJQUFqQjtBQUFpQixPQUZsQjs7QUFJQSxNQUFBLFlBQUEsQ0FBYSxPQUFiLENBQUE7QUFDQSxNQUFBLE9BQUEsR0FBVSxVQUFBLENBQVcsS0FBWCxFQUFrQixJQUFsQixDQUFWO0FBQTRCLEtBUDdCO0FBTzZCOztBQWdCOUIsV0FBQSxRQUFBLENBQWtCLElBQWxCLEVBQXdCLElBQXhCLEVBQThCO0FBQzdCLFFBQUksT0FBSjtBQUNBLFdBQU8sWUFBVztBQUFBOztBQUNqQixVQUFJLE9BQUosRUFBYTtBQUNaO0FBQUE7O0FBRUQsVUFBTSxJQUFBLEdBQU8sU0FBYjs7QUFDQSxVQUFNLEtBQUEsR0FBUSxTQUFSLEtBQVEsR0FBTTtBQUNuQixRQUFBLE9BQUEsR0FBVSxJQUFWO0FBQ0EsUUFBQSxJQUFBLENBQUssS0FBTCxDQUFXLE1BQVgsRUFB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IERlYm91bmNlcyBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBhZnRlciBuIG1pbGxpc2Vjb25kc1xuKiB3aXRob3V0IGl0IG5vdCBiZWluZyBjYWxsZWRcbipcbiogQGV4YW1wbGVcbiogVXRpbHMuZGVib3VuY2UobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgZGVib3VuY2VkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gRGVib3VuY2VkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG4vKipcbipcbiogVGhyb3R0bGUgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgb25jZSBldmVyeSBuIG1pbGxpc2Vjb25kc1xuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy50aHJvdHRsZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSB0aHJvdHRsZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBUaHJvdHRsZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHR9O1xufVxuXG5leHBvcnQge1xuXHRkZWJvdW5jZSxcblx0dGhyb3R0bGVcbn07XG4iLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdXRpbHMnO1xuXG5sZXQgZGVidWc7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRcbiAqL1xuZnVuY3Rpb24gYnJvYWRjYXN0KGV2ZW50VHlwZSwgZGF0YSwgdGFyZ2V0KSB7XG5cdHRhcmdldCA9IHRhcmdldCB8fCBkb2N1bWVudC5ib2R5O1xuXG5cdGlmIChkZWJ1Zykge1xuXHRcdGNvbnNvbGUubG9nKCdvLXZpZXdwb3J0JywgZXZlbnRUeXBlLCBkYXRhKTtcblx0fVxuXG5cdHRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb1ZpZXdwb3J0LicgKyBldmVudFR5cGUsIHtcblx0XHRkZXRhaWw6IGRhdGEsXG5cdFx0YnViYmxlczogdHJ1ZVxuXHR9KSk7XG59XG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IGhlaWdodC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgaGVpZ2h0LlxuKiBAcmV0dXJuIHtudW1iZXJ9XG4qL1xuZnVuY3Rpb24gZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIGlnbm9yZVNjcm9sbGJhcnMgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xufVxuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCB3aWR0aC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgd2lkdGhcbiogQHJldHVybiB7bnVtYmVyfVxuKi9cbmZ1bmN0aW9uIGdldFdpZHRoKGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIGlnbm9yZVNjcm9sbGJhcnMgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xufVxuXG4vKipcbiAqIFZpZXdwb3J0IHNpemUuXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTaXplXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0XG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGhcbiAqL1xuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCB3aWR0aCBhbmQgaGVpZ2h0LlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciB3aWR0aC9oZWlnaHQuXG4qIEByZXR1cm4ge1NpemV9XG4qL1xuZnVuY3Rpb24gZ2V0U2l6ZShpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiB7XG5cdFx0aGVpZ2h0OiBnZXRIZWlnaHQoaWdub3JlU2Nyb2xsYmFycyksXG5cdFx0d2lkdGg6IGdldFdpZHRoKGlnbm9yZVNjcm9sbGJhcnMpXG5cdH07XG59XG5cbi8qKlxuICogU2Nyb2xsIHBvc2l0aW9uLlxuICogQHR5cGVkZWYge09iamVjdH0gU2Nyb2xsUG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHQgLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHRgXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2lkdGggLSBgZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsZWZ0IC0gYHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB0b3AgLSBgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZYFxuICovXG5cbi8qKlxuICogQHJldHVybiB7U2Nyb2xsUG9zaXRpb259XG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsXG5cdFx0d2lkdGg6IGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsXG5cdFx0bGVmdDogd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYLFxuXHRcdHRvcDogd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZXG5cdH07XG59XG5cbi8qKlxuICogQHJldHVybiB7c3RyaW5nfSAtICdwb3J0cmFpdCcgb3IgJ2xhbmRzY2FwZSdcbiAqL1xuZnVuY3Rpb24gZ2V0T3JpZW50YXRpb24oKSB7XG5cdGNvbnN0IG9yaWVudGF0aW9uID0gd2luZG93LnNjcmVlbi5vcmllbnRhdGlvbjtcblx0aWYgKG9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBvcmllbnRhdGlvbiA9PT0gJ3N0cmluZycgP1xuXHRcdFx0b3JpZW50YXRpb24uc3BsaXQoJy0nKVswXSA6XG5cdFx0XHRvcmllbnRhdGlvbi50eXBlLnNwbGl0KCctJylbMF07XG5cdH0gZWxzZSBpZiAod2luZG93Lm1hdGNoTWVkaWEpIHtcblx0XHRyZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEoJyhvcmllbnRhdGlvbjogcG9ydHJhaXQpJykubWF0Y2hlcyA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZ2V0SGVpZ2h0KCkgPj0gZ2V0V2lkdGgoKSA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJztcblx0fVxufVxuXG4vKipcbiAqIEByZXR1cm4ge2Jvb2xlYW59IC0gdHJ1ZSBpZiB0aGUgdmlld3BvcnQgaXMgdmlzaWJsZVxuICovXG5mdW5jdGlvbiBnZXRWaXNpYmlsaXR5KCkge1xuXHRyZXR1cm4gZG9jdW1lbnQuaGlkZGVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGRlYnVnOiBmdW5jdGlvbigpIHtcblx0XHRkZWJ1ZyA9IHRydWU7XG5cdH0sXG5cdGJyb2FkY2FzdCxcblx0Z2V0V2lkdGgsXG5cdGdldEhlaWdodCxcblx0Z2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb24sXG5cdGdldFZpc2liaWxpdHksXG5cdGdldE9yaWVudGF0aW9uLFxuXHRkZWJvdW5jZTogVXRpbHMuZGVib3VuY2UsXG5cdHRocm90dGxlOiBVdGlscy50aHJvdHRsZVxufTtcbiIsImltcG9ydCB1dGlscyBmcm9tICcuL3NyYy91dGlscy5qcyc7XG5cbmNvbnN0IHRocm90dGxlID0gdXRpbHMudGhyb3R0bGU7XG5jb25zdCBkZWJvdW5jZSA9IHV0aWxzLmRlYm91bmNlO1xuXG5jb25zdCBsaXN0ZW5lcnMgPSB7fTtcbmNvbnN0IGludGVydmFscyA9IHtcblx0cmVzaXplOiAxMDAsXG5cdG9yaWVudGF0aW9uOiAxMDAsXG5cdHZpc2liaWxpdHk6IDEwMCxcblx0c2Nyb2xsOiAxMDBcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0byB0aHJvdHRsZSBmb3IgdGhpcyBkdXJhdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbnRlcnZhbCAtIFRoZSBkdXJhdGlvbiB0byB0aHJvdHRsZSBpbiBtcy5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICogQGV4YW1wbGVcbiAqIFx0ICAgLy8gdGhyb3R0bGUgZm9yIGRpZmZlcmVudCBldmVudHMgYXQgZGlmZmVyZW50IGR1cmF0aW9uc1xuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIDEwMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdyZXNpemUnLCAzMDApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgnb3JpZW50YXRpb24nLCAzMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCd2aXNpYmlsaXR5JywgMzApXG4gKiBcdFx0Ly8gdGhyb3R0bGUgYWxsIGV2ZW50cyBhdCAzMG1zXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgzMCk7XG4gKi9cbmZ1bmN0aW9uIHNldFRocm90dGxlSW50ZXJ2YWwoZXZlbnRUeXBlLCBpbnRlcnZhbCkge1xuXHRpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ251bWJlcicpIHtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdzY3JvbGwnLCBhcmd1bWVudHNbMF0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Jlc2l6ZScsIGFyZ3VtZW50c1sxXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnb3JpZW50YXRpb24nLCBhcmd1bWVudHNbMl0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Zpc2liaWxpdHknLCBhcmd1bWVudHNbM10pO1xuXHR9IGVsc2UgaWYgKGludGVydmFsKSB7XG5cdFx0aW50ZXJ2YWxzW2V2ZW50VHlwZV0gPSBpbnRlcnZhbDtcblx0fVxufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Jlc2l6ZSgpIHtcblx0aWYgKGxpc3RlbmVycy5yZXNpemUpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgncmVzaXplJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5yZXNpemUpO1xuXG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLnJlc2l6ZSA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvT3JpZW50YXRpb24oKSB7XG5cblx0aWYgKGxpc3RlbmVycy5vcmllbnRhdGlvbikge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdvcmllbnRhdGlvbmNoYW5nZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgnb3JpZW50YXRpb24nLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZW50YXRpb246IHV0aWxzLmdldE9yaWVudGF0aW9uKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMub3JpZW50YXRpb24pO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5vcmllbnRhdGlvbiA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvVmlzaWJpbGl0eSgpIHtcblxuXHRpZiAobGlzdGVuZXJzLnZpc2liaWxpdHkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG5cdGNvbnN0IGhhbmRsZXIgPSBkZWJvdW5jZShmdW5jdGlvbihldikge1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgndmlzaWJpbGl0eScsIHtcblx0XHRcdGhpZGRlbjogdXRpbHMuZ2V0VmlzaWJpbGl0eSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnZpc2liaWxpdHkpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cblx0bGlzdGVuZXJzLnZpc2liaWxpdHkgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Njcm9sbCgpIHtcblxuXHRpZiAobGlzdGVuZXJzLnNjcm9sbCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdzY3JvbGwnO1xuXHRjb25zdCBoYW5kbGVyID0gdGhyb3R0bGUoZnVuY3Rpb24oZXYpIHtcblx0XHRjb25zdCBzY3JvbGxQb3MgPSB1dGlscy5nZXRTY3JvbGxQb3NpdGlvbigpO1xuXHRcdHV0aWxzLmJyb2FkY2FzdCgnc2Nyb2xsJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdHNjcm9sbEhlaWdodDogc2Nyb2xsUG9zLmhlaWdodCxcblx0XHRcdHNjcm9sbExlZnQ6IHNjcm9sbFBvcy5sZWZ0LFxuXHRcdFx0c2Nyb2xsVG9wOiBzY3JvbGxQb3MudG9wLFxuXHRcdFx0c2Nyb2xsV2lkdGg6IHNjcm9sbFBvcy53aWR0aCxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5zY3JvbGwpO1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5zY3JvbGwgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIFN0YXJ0IGxpc3RlbmluZyBmb3IgYW4gZXZlbnQocykuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHRvIHN0YXJ0IGxpc3RlbmluZyBmb3IuIE9uZSBvZiBgcmVzaXplYCwgYHNjcm9sbGAsIGBvcmllbnRhdGlvbmAsIGB2aXNpYmlsaXR5YCBvciBgYWxsYC5cbiAqIEBleGFtcGxlXG4gKiBcdFx0Ly8gU3RhcnQgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5saXN0ZW5UbygnYWxsJyk7XG4gKlxuICogXHRcdC8vIEl0IGlzIG5vdyBwb3NzaWJsZSB0byBsaXN0ZW4gZm9yIGRlYm91bmNlIG8tdmlld3BvcnQgZXZlbnRzIHN1Y2ggYXMgYG9WaWV3cG9ydC5vcmllbnRhdGlvbmAuXG4gKiAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0Lm9yaWVudGF0aW9uJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAqICAgICAgXHRjb25zb2xlLmxvZyhldmVudC50eXBlKTsgLy8gb1ZpZXdwb3J0Lm9yaWVudGF0aW9uXG4gKiAgICAgIH0pO1xuICovXG5mdW5jdGlvbiBsaXN0ZW5UbyhldmVudFR5cGUpIHtcblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Jlc2l6ZScgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvUmVzaXplKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAnc2Nyb2xsJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9TY3JvbGwoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdvcmllbnRhdGlvbicgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvT3JpZW50YXRpb24oKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICd2aXNpYmlsaXR5JyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9WaXNpYmlsaXR5KCk7XG5cdH1cbn1cblxuLyoqXG4gKiBTdG9wIGxpc3RlbmluZyBmb3IgYW4gZXZlbnQocykuXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIGV2ZW50IHRvIHN0b3AgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqIFx0XHQvLyBXZSdyZSBkb25lLiBTdG9wIGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQuc3RvcExpc3RlbmluZ1RvKCdhbGwnKTtcbiAqL1xuZnVuY3Rpb24gc3RvcExpc3RlbmluZ1RvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdE9iamVjdC5rZXlzKGxpc3RlbmVycykuZm9yRWFjaChzdG9wTGlzdGVuaW5nVG8pO1xuXHR9IGVsc2UgaWYgKGxpc3RlbmVyc1tldmVudFR5cGVdKSB7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXJzW2V2ZW50VHlwZV0uZXZlbnRUeXBlLCBsaXN0ZW5lcnNbZXZlbnRUeXBlXS5oYW5kbGVyKTtcblx0XHRkZWxldGUgbGlzdGVuZXJzW2V2ZW50VHlwZV07XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkZWJ1ZzogZnVuY3Rpb24gKCkge1xuXHRcdHV0aWxzLmRlYnVnKCk7XG5cdH0sXG5cdGxpc3RlblRvLFxuXHRzdG9wTGlzdGVuaW5nVG8sXG5cdHNldFRocm90dGxlSW50ZXJ2YWwsXG5cdGdldE9yaWVudGF0aW9uOiB1dGlscy5nZXRPcmllbnRhdGlvbixcblx0Z2V0U2l6ZTogdXRpbHMuZ2V0U2l6ZSxcblx0Z2V0U2Nyb2xsUG9zaXRpb246IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uLFxuXHRnZXRWaXNpYmlsaXR5OiB1dGlscy5nZXRWaXNpYmlsaXR5XG59O1xuIiwiY29uc3QgZm9ybWF0cyA9IHtcblx0bXBlZzQ6IFtcblx0XHQndmlkZW8vbXA0OyBjb2RlY3M9XCJtcDR2LjIwLjhcIidcblx0XSxcblx0aDI2NDogW1xuXHRcdCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFXCInLFxuXHRcdCd2aWRlby9tcDQ7IGNvZGVjcz1cImF2YzEuNDJFMDFFLCBtcDRhLjQwLjJcIidcblx0XSxcblx0b2dnOiBbXG5cdFx0J3ZpZGVvL29nZzsgY29kZWNzPVwidGhlb3JhXCInXG5cdF0sXG5cdHdlYm06IFtcblx0XHQndmlkZW8vd2VibTsgY29kZWNzPVwidnA4LCB2b3JiaXNcIidcblx0XVxufTtcblxuZnVuY3Rpb24gc3VwcG9ydGVkRm9ybWF0cyAoKSB7XG5cdGNvbnN0IHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5cdGNvbnN0IHN1cHBvcnRlZCA9IFtdO1xuXG5cdHRyeSB7XG5cdFx0T2JqZWN0LmtleXMoZm9ybWF0cykuZm9yRWFjaChmb3JtYXQgPT4ge1xuXHRcdFx0aWYgKGZvcm1hdHNbZm9ybWF0XS5zb21lKHR5cGUgPT4gdGVzdEVsLmNhblBsYXlUeXBlKHR5cGUpKSkge1xuXHRcdFx0XHRzdXBwb3J0ZWQucHVzaChmb3JtYXQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9IGNhdGNoKGUpIHsgfVxuXG5cdHJldHVybiBzdXBwb3J0ZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN1cHBvcnRlZEZvcm1hdHM7XG4iLCJpbXBvcnQgc3VwcG9ydGVkRm9ybWF0cyBmcm9tICcuL3N1cHBvcnRlZC1mb3JtYXRzLmpzJztcblxuZnVuY3Rpb24gZ2V0UmVuZGl0aW9uKHJlbmRpdGlvbnMsIG9wdGlvbnMpIHtcblx0Ly8gYWxsb3cgbW9ja2luZyBvZiBzdXBwb3J0ZWQgZm9ybWF0cyBtb2R1bGVcblx0Y29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG5cdGNvbnN0IHdpZHRoID0gb3B0cy5vcHRpbXVtdmlkZW93aWR0aDtcblx0Y29uc3QgZm9ybWF0cyA9IG9wdHMuc3VwcG9ydGVkRm9ybWF0cyB8fCBzdXBwb3J0ZWRGb3JtYXRzKCk7XG5cdGxldCBhcHByb3ByaWF0ZVJlbmRpdGlvbjtcblx0Ly8gb3JkZXIgc21hbGxlc3QgdG8gbGFyZ2VzdFxuXHRjb25zdCBvcmRlcmVkUmVuZGl0aW9ucyA9IHJlbmRpdGlvbnNcblx0XHQuZmlsdGVyKHJlbmRpdGlvbiA9PiB7XG5cdFx0XHRyZXR1cm4gZm9ybWF0cy5pbmRleE9mKHJlbmRpdGlvbi5jb2RlYy50b0xvd2VyQ2FzZSgpKSA+IC0xO1xuXHRcdH0pXG5cdFx0LnNvcnQoKHJlbmRpdGlvbk9uZSwgcmVuZGl0aW9uVHdvKSA9PiB7XG5cdFx0XHRyZXR1cm4gcmVuZGl0aW9uT25lLnBpeGVsV2lkdGggLSByZW5kaXRpb25Ud28ucGl4ZWxXaWR0aDtcblx0XHR9KTtcblxuXHQvLyBpZiBubyB3aWR0aCBzdXBwbGllZCwgZ2V0IGxhcmdlc3Rcblx0aWYgKCF3aWR0aCkge1xuXHRcdHJldHVybiBvcmRlcmVkUmVuZGl0aW9ucy5wb3AoKTtcblx0fVxuXHQvLyBOT1RFOiByYXRoZXIgdXNlIGZpbmQuLi5cblx0b3JkZXJlZFJlbmRpdGlvbnMuc29tZShyZW5kaXRpb24gPT4ge1xuXHRcdGlmIChyZW5kaXRpb24ucGl4ZWxXaWR0aCA+PSB3aWR0aCkge1xuXHRcdFx0YXBwcm9wcmlhdGVSZW5kaXRpb24gPSByZW5kaXRpb247XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KTtcblxuXHRyZXR1cm4gYXBwcm9wcmlhdGVSZW5kaXRpb24gfHwgb3JkZXJlZFJlbmRpdGlvbnMucG9wKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJlbmRpdGlvbjtcbiIsIi8qIGdsb2JhbCBnb29nbGUgKi9cblxubGV0IHNka1NjcmlwdExvYWRlZCA9IGZhbHNlO1xubGV0IHNka1NjcmlwdEVycm9yID0gbnVsbDtcblxuZnVuY3Rpb24gY3JlYXRlVmlkZW9PdmVybGF5RWxlbWVudCgpIHtcblx0Y29uc3Qgb3ZlcmxheUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdG92ZXJsYXlFbC5jbGFzc0xpc3QuYWRkKCdvLXZpZGVvX19vdmVybGF5Jyk7XG5cdHJldHVybiBvdmVybGF5RWw7XG59XG5cbmNsYXNzIFZpZGVvQWRzIHtcblx0Y29uc3RydWN0b3IodmlkZW8pIHtcblx0XHR0aGlzLnZpZGVvID0gdmlkZW87XG5cblx0XHQvLyBvbmx5IHdoZW4gdGhlc2UgdGhyZWUgY29uZGl0aW9ucyBhcmUgbWV0IHdpbGwgdGhlIHZpZGVvIHBsYXlcblx0XHR0aGlzLmFkc0xvYWRlZCA9IGZhbHNlO1xuXHRcdHRoaXMudmlkZW9Mb2FkZWQgPSBmYWxzZTtcblx0XHR0aGlzLmxvYWRpbmdTdGF0ZURpc3BsYXllZCA9IGZhbHNlO1xuXG5cdFx0Ly8gcmVjb3JkIHdoZW4gdGhlIGFkdmVydCBoYXMgY29tcGxldGVkXG5cdFx0dGhpcy5hZHNDb21wbGV0ZWQgPSBmYWxzZTtcblx0fVxuXG5cdHN0YXRpYyBsb2FkQWRzTGlicmFyeSgpIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0bGV0IGdvb2dsZVNka1NjcmlwdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tzcmM9XCIvL2ltYXNkay5nb29nbGVhcGlzLmNvbS9qcy9zZGtsb2FkZXIvaW1hMy5qc1wiXScpO1xuXG5cdFx0XHRpZiAoIWdvb2dsZVNka1NjcmlwdCkge1xuXHRcdFx0XHRnb29nbGVTZGtTY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblx0XHRcdFx0Z29vZ2xlU2RrU2NyaXB0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcblx0XHRcdFx0Z29vZ2xlU2RrU2NyaXB0LnNldEF0dHJpYnV0ZSgnc3JjJywgYC8vaW1hc2RrLmdvb2dsZWFwaXMuY29tL2pzL3Nka2xvYWRlci9pbWEzLmpzYCk7XG5cdFx0XHRcdGdvb2dsZVNka1NjcmlwdC5zZXRBdHRyaWJ1dGUoJ2FzeW5jJywgdHJ1ZSk7XG5cdFx0XHRcdGdvb2dsZVNka1NjcmlwdC5zZXRBdHRyaWJ1dGUoJ2RlZmVyJywgdHJ1ZSk7XG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChnb29nbGVTZGtTY3JpcHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoc2RrU2NyaXB0TG9hZGVkIHx8IHdpbmRvdy5nb29nbGUgJiYgd2luZG93Lmdvb2dsZS5pbWEpIHtcblx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0fSBlbHNlIGlmIChzZGtTY3JpcHRFcnJvcikge1xuXHRcdFx0XHRyZWplY3Qoc2RrU2NyaXB0RXJyb3IpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Z29vZ2xlU2RrU2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG5cdFx0XHRcdFx0c2RrU2NyaXB0TG9hZGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGdvb2dsZVNka1NjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChlKSA9PiB7XG5cdFx0XHRcdFx0c2RrU2NyaXB0RXJyb3IgPSBlO1xuXHRcdFx0XHRcdHJlamVjdChlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRWaWRlb0JyYW5kKCkge1xuXHRcdGlmICghdGhpcy52aWRlby52aWRlb0RhdGEgfHwgIXRoaXMudmlkZW8udmlkZW9EYXRhLmJyYW5kIHx8ICF0aGlzLnZpZGVvLnZpZGVvRGF0YS5icmFuZC5uYW1lKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB0aGlzLnZpZGVvLnZpZGVvRGF0YS5icmFuZC5uYW1lO1xuXHRcdH1cblx0fVxuXG5cdHNldFVwQWRzKCkge1xuXHRcdHRoaXMuYWRDb250YWluZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRoaXMudmlkZW8uY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5hZENvbnRhaW5lckVsKTtcblx0XHR0aGlzLmFkRGlzcGxheUNvbnRhaW5lciA9IG5ldyBnb29nbGUuaW1hLkFkRGlzcGxheUNvbnRhaW5lcih0aGlzLmFkQ29udGFpbmVyRWwsIHRoaXMudmlkZW8udmlkZW9FbCk7XG5cblx0XHQvLyBDcmVhdGUgYWRzIGxvYWRlci5cblx0XHR0aGlzLmFkc0xvYWRlciA9IG5ldyBnb29nbGUuaW1hLkFkc0xvYWRlcih0aGlzLmFkRGlzcGxheUNvbnRhaW5lcik7XG5cblx0XHQvLyBTZXRzIHVwIGJpbmRpbmdzIGZvciBhbGwgQWQgcmVsYXRlZCBoYW5kbGVyc1xuXHRcdHRoaXMuYWRzTWFuYWdlckxvYWRlZEhhbmRsZXIgPSB0aGlzLmFkc01hbmFnZXJMb2FkZWRIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hZEVycm9ySGFuZGxlciA9IHRoaXMuYWRFcnJvckhhbmRsZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFkRXZlbnRIYW5kbGVyID0gdGhpcy5hZEV2ZW50SGFuZGxlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29udGVudFBhdXNlUmVxdWVzdEhhbmRsZXIgPSB0aGlzLmNvbnRlbnRQYXVzZVJlcXVlc3RIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb250ZW50UmVzdW1lUmVxdWVzdEhhbmRsZXIgPSB0aGlzLmNvbnRlbnRSZXN1bWVSZXF1ZXN0SGFuZGxlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZ2V0QWRQcm9ncmVzcyA9IHRoaXMuZ2V0QWRQcm9ncmVzcy5iaW5kKHRoaXMpO1xuXG5cdFx0Ly8gTGlzdGVuIGFuZCByZXNwb25kIHRvIGFkcyBsb2FkZWQgYW5kIGVycm9yIGV2ZW50cy5cblx0XHR0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0Z29vZ2xlLmltYS5BZHNNYW5hZ2VyTG9hZGVkRXZlbnQuVHlwZS5BRFNfTUFOQUdFUl9MT0FERUQsXG5cdFx0XHR0aGlzLmFkc01hbmFnZXJMb2FkZWRIYW5kbGVyLFxuXHRcdFx0ZmFsc2UpO1xuXHRcdHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLFxuXHRcdFx0dGhpcy5hZEVycm9ySGFuZGxlcixcblx0XHRcdGZhbHNlKTtcblxuXHRcdHRoaXMucmVxdWVzdEFkcygpO1xuXG5cdFx0dGhpcy5wbGF5QWRFdmVudEhhbmRsZXIgPSB0aGlzLnBsYXlBZEV2ZW50SGFuZGxlci5iaW5kKHRoaXMpO1xuXHRcdGlmICh0aGlzLnZpZGVvLm9wdHMucGxhY2Vob2xkZXIpIHtcblx0XHRcdHRoaXMucGxheUFkRXZlbnRIYW5kbGVyKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3ZlcmxheUVsID0gY3JlYXRlVmlkZW9PdmVybGF5RWxlbWVudCgpO1xuXHRcdFx0dGhpcy52aWRlby5jb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXlFbCk7XG5cdFx0XHR0aGlzLm92ZXJsYXlFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucGxheUFkRXZlbnRIYW5kbGVyKTtcblx0XHR9XG5cdH1cblxuXHRyZXF1ZXN0QWRzKCkge1xuXHRcdC8vIFJlcXVlc3QgdmlkZW8gYWRzLlxuXHRcdGNvbnN0IGFkc1JlcXVlc3QgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZXF1ZXN0KCk7XG5cblx0XHRsZXQgdGFyZ2V0aW5nID0gYHBvcz0ke3RoaXMudmlkZW8udGFyZ2V0aW5nLnBvc2l0aW9ufSZ0dGlkPSR7dGhpcy52aWRlby50YXJnZXRpbmcudmlkZW9JZH1gO1xuXHRcdGNvbnN0IGJyYW5kID0gdGhpcy5nZXRWaWRlb0JyYW5kKCk7XG5cdFx0aWYgKGJyYW5kKSB7XG5cdFx0XHR0YXJnZXRpbmcgKz0gYCZicmFuZD0ke2JyYW5kfWA7XG5cdFx0fVxuXG5cdFx0Y29uc3QgYWR2ZXJ0aXNpbmdVcmwgPSBgaHR0cDovL3B1YmFkcy5nLmRvdWJsZWNsaWNrLm5ldC9nYW1wYWQvYWRzP2Vudj12cCZnZGZwX3JlcT0xJmltcGw9cyZvdXRwdXQ9eG1sX3Zhc3QyJml1PSR7dGhpcy52aWRlby50YXJnZXRpbmcuc2l0ZX0mc3o9JHt0aGlzLnZpZGVvLnRhcmdldGluZy5zaXplc30mdW52aWV3ZWRfcG9zaXRpb25fc3RhcnQ9MSZzY3A9JHtlbmNvZGVVUklDb21wb25lbnQodGFyZ2V0aW5nKX1gO1xuXG5cdFx0YWRzUmVxdWVzdC5hZFRhZ1VybCA9IGFkdmVydGlzaW5nVXJsO1xuXG5cdFx0Ly8gU3BlY2lmeSB0aGUgbGluZWFyIGFuZCBub25saW5lYXIgc2xvdCBzaXplcy4gVGhpcyBoZWxwcyB0aGUgU0RLXG5cdFx0Ly8gc2VsZWN0IHRoZSBjb3JyZWN0IGNyZWF0aXZlIGlmIG11bHRpcGxlIGFyZSByZXR1cm5lZC5cblx0XHRhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdFdpZHRoID0gNTkyO1xuXHRcdGFkc1JlcXVlc3QubGluZWFyQWRTbG90SGVpZ2h0ID0gMzMzO1xuXG5cdFx0YWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RXaWR0aCA9IDU5Mjtcblx0XHRhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdEhlaWdodCA9IDE1MDtcblxuXHRcdC8vIFRlbXBvcmFyeSBmaXggdG8gdmVyaWZ5IERGUCBiZWhhdmlvdXJcblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0ZGV0YWlsOiB7XG5cdFx0XHRcdGNhdGVnb3J5OiAndmlkZW8nLFxuXHRcdFx0XHRhY3Rpb246ICdhZFJlcXVlc3RlZCcsXG5cdFx0XHRcdGNvbnRlbnRJZDogdGhpcy52aWRlby5vcHRzLmlkXG5cdFx0XHR9LFxuXHRcdFx0YnViYmxlczogdHJ1ZVxuXHRcdH07XG5cdFx0Y29uc3QgcmVxdWVzdGVkRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ29UcmFja2luZy5ldmVudCcsIG9wdGlvbnMpO1xuXHRcdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChyZXF1ZXN0ZWRFdmVudCk7XG5cblx0XHR0aGlzLmFkc0xvYWRlci5yZXF1ZXN0QWRzKGFkc1JlcXVlc3QpO1xuXHR9XG5cblx0YWRzTWFuYWdlckxvYWRlZEhhbmRsZXIoYWRzTWFuYWdlckxvYWRlZEV2ZW50KSB7XG5cdFx0Ly8gR2V0IHRoZSBhZHMgbWFuYWdlci5cblx0XHRjb25zdCBhZHNSZW5kZXJpbmdTZXR0aW5ncyA9IG5ldyBnb29nbGUuaW1hLkFkc1JlbmRlcmluZ1NldHRpbmdzKCk7XG5cdFx0YWRzUmVuZGVyaW5nU2V0dGluZ3MucmVzdG9yZUN1c3RvbVBsYXliYWNrU3RhdGVPbkFkQnJlYWtDb21wbGV0ZSA9IHRydWU7XG5cdFx0dGhpcy5hZHNNYW5hZ2VyID0gYWRzTWFuYWdlckxvYWRlZEV2ZW50LmdldEFkc01hbmFnZXIodGhpcy52aWRlby52aWRlb0VsLCBhZHNSZW5kZXJpbmdTZXR0aW5ncyk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXJzIHRvIHRoZSByZXF1aXJlZCBldmVudHMuXG5cdFx0dGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUiwgdGhpcy5hZEVycm9ySGFuZGxlcik7XG5cblx0XHQvLyBcIkZpcmVkIHdoZW4gY29udGVudCBzaG91bGQgYmUgcGF1c2VkLiBUaGlzIHVzdWFsbHkgaGFwcGVucyByaWdodCBiZWZvcmUgYW4gYWQgaXMgYWJvdXQgdG8gY292ZXIgdGhlIGNvbnRlbnRcIlxuXHRcdHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUEFVU0VfUkVRVUVTVEVELCB0aGlzLmNvbnRlbnRQYXVzZVJlcXVlc3RIYW5kbGVyKTtcblxuXHRcdC8vIFwiRmlyZWQgd2hlbiBjb250ZW50IHNob3VsZCBiZSByZXN1bWVkLiBUaGlzIHVzdWFsbHkgaGFwcGVucyB3aGVuIGFuIGFkIGZpbmlzaGVzIG9yIGNvbGxhcHNlc1wiXG5cdFx0dGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9SRVNVTUVfUkVRVUVTVEVELCB0aGlzLmNvbnRlbnRSZXN1bWVSZXF1ZXN0SGFuZGxlcik7XG5cblx0XHQvLyBcIkZpcmVkIHdoZW4gdGhlIGFkcyBtYW5hZ2VyIGlzIGRvbmUgcGxheWluZyBhbGwgdGhlIGFkc1wiXG5cdFx0dGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQsIHRoaXMuYWRFdmVudEhhbmRsZXIpO1xuXG5cdFx0Ly8gTGlzdGVuIHRvIGFueSBhZGRpdGlvbmFsIGV2ZW50cywgaWYgbmVjZXNzYXJ5LlxuXHRcdHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkxPQURFRCwgdGhpcy5hZEV2ZW50SGFuZGxlcik7XG5cdFx0dGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRCwgdGhpcy5hZEV2ZW50SGFuZGxlcik7XG5cdFx0dGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEUsIHRoaXMuYWRFdmVudEhhbmRsZXIpO1xuXHRcdHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQsIHRoaXMuYWRFdmVudEhhbmRsZXIpO1xuXHRcdHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQQUJMRV9TVEFURV9DSEFOR0VELCB0aGlzLmFkRXZlbnRIYW5kbGVyKTtcblxuXHRcdHRoaXMuYWRzTG9hZGVkID0gdHJ1ZTtcblx0XHR0aGlzLnN0YXJ0QWRzKCk7XG5cdH1cblxuXHRzdGFydEFkcygpIHtcblxuXHRcdC8vIEZvciBhZHMgdG8gcGxheSBjb3JyZWN0bHkgYm90aCB0aGUgdmlkZW8gYW5kIHRoZSBhZHZlcnQgdmlkZW8gbmVlZCB0byBiZSByZWFkeSB0b1xuXHRcdC8vIHBsYXk7IHRoaXMgZnVuY3Rpb24gbmVlZHMgdG8gYmUgY2FsbGVkIGFmdGVyIHRoZSB0d28gZmxhZ3MgaW4gYWRzTWFuYWdlckxvYWRlZEhhbmRsZXIoKVxuXHRcdC8vIGFuZCBwbGF5QWRFdmVudEhhbmRsZXIoKSBoYXZlIGJlZW4gc2V0LlxuXHRcdC8vIFNvIGlmIHRoZSB2aWRlbyBoYXNuJ3QgbG9hZGVkIHlldCwgd2FpdCB1bnRpbCBpdCBoYXMuXG5cdFx0aWYgKCF0aGlzLnZpZGVvTG9hZGVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gV2Ugd2FudCB0byBkaXNwbGF5IGFuIGFkIGxvYWRpbmcgbm90aWNlIGZvciBhIHRpbWUgb24gc2NyZWVuLCB3ZSBkb24ndCB3YW50IGl0IHRvIGZsaWNrZXJcblx0XHQvLyBhbmQgbGVhdmUgdGhlIHVzZXIgd29uZGVyaW5nIGlmIHRoZXkgbWlzc2VkIHNvbWV0aGluZy90aGluayB3ZSdyZSB0ZXN0aW5nIHN1YmxpbWluYWwgYWRzIVxuXHRcdGlmICghdGhpcy5sb2FkaW5nU3RhdGVEaXNwbGF5ZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBJZiBhZHMgaGF2ZSBmYWlsZWQgdG8gbG9hZCwgd2hpY2ggcmVzZXRzIHRoZSBhZHZlcnRpc2luZyBzdXBwb3J0IGZsYWcsIHBsYXkgdGhlIHZpZGVvXG5cdFx0Ly8gaW5zdGVhZDsgb3RoZXJ3aXNlLCB3YWl0IHVudGlsIHRoZSBhZHMgaGF2ZSBsb2FkZWQuXG5cdFx0aWYgKCF0aGlzLnZpZGVvLm9wdHMuYWR2ZXJ0aXNpbmcpIHtcblx0XHRcdHRoaXMucGxheVVzZXJWaWRlbygpO1xuXHRcdH0gZWxzZSBpZiAoIXRoaXMuYWRzTG9hZGVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gUmVtb3ZlIHRoZSBwcmVsb2FkaW5nIHNwaW5uZXJcblx0XHRpZiAodGhpcy5sb2FkaW5nU3RhdGVFbCkge1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdGVFbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMubG9hZGluZ1N0YXRlRWwpO1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdGVFbCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIEluaXRpYWxpemUgdGhlIGFkcyBtYW5hZ2VyLiBBZCBydWxlcyBwbGF5bGlzdCB3aWxsIHN0YXJ0IGF0IHRoaXMgdGltZS5cblx0XHRcdHRoaXMuYWRzTWFuYWdlci5pbml0KHRoaXMudmlkZW8udmlkZW9FbC5jbGllbnRXaWR0aCwgdGhpcy52aWRlby52aWRlb0VsLmNsaWVudEhlaWdodCwgZ29vZ2xlLmltYS5WaWV3TW9kZS5OT1JNQUwpO1xuXHRcdFx0Ly8gQ2FsbCBwbGF5IHRvIHN0YXJ0IHNob3dpbmcgdGhlIGFkLiBTaW5nbGUgdmlkZW8gYW5kIG92ZXJsYXkgYWRzIHdpbGxcblx0XHRcdC8vIHN0YXJ0IGF0IHRoaXMgdGltZTsgdGhlIGNhbGwgd2lsbCBiZSBpZ25vcmVkIGZvciBhZCBydWxlcy5cblx0XHRcdHRoaXMuYWRzTWFuYWdlci5zdGFydCgpO1xuXHRcdH0gY2F0Y2ggKGFkRXJyb3IpIHtcblx0XHRcdC8vIEFuIGVycm9yIG1heSBiZSB0aHJvd24gaWYgdGhlcmUgd2FzIGEgcHJvYmxlbSB3aXRoIHRoZSBWQVNUIHJlc3BvbnNlLlxuXHRcdFx0dGhpcy5yZXBvcnRFcnJvcihhZEVycm9yKTtcblx0XHRcdHRoaXMucGxheVVzZXJWaWRlbygpO1xuXHRcdH1cblx0fVxuXG5cdHBsYXlBZEV2ZW50SGFuZGxlcigpIHtcblx0XHQvLyBTZXRzIHRoZSBzdHlsaW5nIG5vdyBzbyB0aGUgYWQgb2NjdXBpZXMgdGhlIHNwYWNlIG9mIHRoZSB2aWRlb1xuXHRcdHRoaXMuYWRDb250YWluZXJFbC5jbGFzc0xpc3QuYWRkKCdvLXZpZGVvX19hZCcpO1xuXG5cdFx0Ly8gXCJDYWxsIHRoaXMgbWV0aG9kIGFzIGEgZGlyZWN0IHJlc3VsdCBvZiBhIHVzZXIgYWN0aW9uIGJlZm9yZSBzdGFydGluZyB0aGUgYWQgcGxheWJhY2suLi5cIlxuXHRcdC8vIDxodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pbnRlcmFjdGl2ZS1tZWRpYS1hZHMvZG9jcy9zZGtzL2h0bWw1L3YzL2FwaXMjaW1hLkFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplPlxuXHRcdHRoaXMuYWREaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemUoKTtcblxuXHRcdC8vIFdlIHdhbnQgdG8gZGlzcGxheSBhIGxvYWRpbmcgc3RhdGUgLSBvdGhlcndpc2UgaXQgY2FuIGxvb2tcblx0XHQvLyBsaWtlIHdlJ3JlIG5vdCByZXNwb25kaW5nIHRvIHRoZWlyIGFjdGlvbiB3aGVuIHdlJ3JlIGFjdHVhbGx5IGZldGNoaW5nIGFuIGFkXG5cdFx0dGhpcy5sb2FkaW5nU3RhdGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHR0aGlzLmxvYWRpbmdTdGF0ZUVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcm9ncmVzc2JhcicpO1xuXHRcdHRoaXMubG9hZGluZ1N0YXRlRWwuc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcsICdMb2FkaW5nJyk7XG5cdFx0dGhpcy5sb2FkaW5nU3RhdGVFbC5jbGFzc05hbWUgPSAnby12aWRlb19fbG9hZGluZy1zdGF0ZSc7XG5cdFx0dGhpcy5hZENvbnRhaW5lckVsLmFwcGVuZENoaWxkKHRoaXMubG9hZGluZ1N0YXRlRWwpO1xuXG5cdFx0Ly8gZGlzcGxheSB0aGUgbG9hZGluZyBzdGF0ZSBmb3IgYSBtaW5pbXVtIG9mIDIgc2Vjb25kcyB0byBhdm9pZCBmbGlja2VyaW5nXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHR0aGlzLmxvYWRpbmdTdGF0ZURpc3BsYXllZCA9IHRydWU7XG5cdFx0XHR0aGlzLnN0YXJ0QWRzKCk7XG5cdFx0fSwgMTAwMCAqIDIpO1xuXG5cdFx0Y29uc3QgbG9hZGVkbWV0YWRhdGFIYW5kbGVyID0gKCkgPT4ge1xuXHRcdFx0dGhpcy52aWRlb0xvYWRlZCA9IHRydWU7XG5cdFx0XHR0aGlzLnN0YXJ0QWRzKCk7XG5cdFx0XHR0aGlzLnZpZGVvLnZpZGVvRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBsb2FkZWRtZXRhZGF0YUhhbmRsZXIpO1xuXHRcdH07XG5cblx0XHR0aGlzLnZpZGVvLnZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkbWV0YWRhdGEnLCBsb2FkZWRtZXRhZGF0YUhhbmRsZXIpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgdmlkZW8uIE11c3QgYmUgZG9uZSB2aWEgYSB1c2VyIGFjdGlvbiBvbiBtb2JpbGUgZGV2aWNlcy5cblx0XHR0aGlzLnZpZGVvLnZpZGVvRWwubG9hZCgpO1xuXG5cdFx0aWYgKHRoaXMub3ZlcmxheUVsKSB7XG5cdFx0XHR0aGlzLm92ZXJsYXlFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucGxheUFkRXZlbnRIYW5kbGVyKTtcblx0XHRcdHRoaXMudmlkZW8uY29udGFpbmVyRWwucmVtb3ZlQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuXHRcdH1cblx0XHRkZWxldGUgdGhpcy5vdmVybGF5RWw7XG5cdH1cblxuXHRhZEV2ZW50SGFuZGxlcihhZEV2ZW50KSB7XG5cdFx0Ly8gUmV0cmlldmUgdGhlIGFkIGZyb20gdGhlIGV2ZW50LiBTb21lIGV2ZW50cyAoZS5nLiBBTExfQURTX0NPTVBMRVRFRClcblx0XHQvLyBkb24ndCBoYXZlIGFkIG9iamVjdCBhc3NvY2lhdGVkLlxuXHRcdGNvbnN0IGFkID0gYWRFdmVudC5nZXRBZCgpO1xuXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdGRldGFpbDoge1xuXHRcdFx0XHRhZHZlcnRpc2luZzogdHJ1ZSxcblx0XHRcdFx0Y2F0ZWdvcnk6ICd2aWRlbycsXG5cdFx0XHRcdGNvbnRlbnRJZDogdGhpcy52aWRlby5vcHRzLmlkLFxuXHRcdFx0XHRwcm9ncmVzczogMCxcblx0XHRcdFx0YWREdXJhdGlvbjogYWQuZ2V0RHVyYXRpb24oKSxcblx0XHRcdFx0YWRNaW5EdXJhdGlvbjogYWQuZ2V0TWluU3VnZ2VzdGVkRHVyYXRpb24oKSxcblx0XHRcdFx0YWRUaXRsZTogYWQuZ2V0VGl0bGUoKSxcblx0XHRcdFx0YWRQcm9ncmVzczogdGhpcy5nZXRBZFByb2dyZXNzKClcblx0XHRcdH0sXG5cdFx0XHRidWJibGVzOiB0cnVlXG5cdFx0fTtcblxuXHRcdHN3aXRjaCAoYWRFdmVudC50eXBlKSB7XG5cdFx0XHRjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkxPQURFRDoge1xuXHRcdFx0XHQvLyBUaGlzIGlzIHRoZSBmaXJzdCBldmVudCBzZW50IGZvciBhbiBhZCAtIGl0IGlzIHBvc3NpYmxlIHRvXG5cdFx0XHRcdC8vIGRldGVybWluZSB3aGV0aGVyIHRoZSBhZCBpcyBhIHZpZGVvIGFkIG9yIGFuIG92ZXJsYXkuXG5cdFx0XHRcdGlmICghYWQuaXNMaW5lYXIoKSkge1xuXHRcdFx0XHRcdC8vIFBvc2l0aW9uIEFkRGlzcGxheUNvbnRhaW5lciBjb3JyZWN0bHkgZm9yIG92ZXJsYXkuXG5cdFx0XHRcdFx0Ly8gVXNlIGFkLndpZHRoIGFuZCBhZC5oZWlnaHQuXG5cdFx0XHRcdFx0dGhpcy5wbGF5VXNlclZpZGVvKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQ6IHtcblx0XHRcdFx0Ly8gVGhpcyBldmVudCBpbmRpY2F0ZXMgdGhlIGFkIGhhcyBzdGFydGVkIC0gdGhlIHZpZGVvIHBsYXllclxuXHRcdFx0XHQvLyBjYW4gYWRqdXN0IHRoZSBVSSwgZm9yIGV4YW1wbGUgZGlzcGxheSBhIHBhdXNlIGJ1dHRvbiBhbmRcblx0XHRcdFx0Ly8gcmVtYWluaW5nIHRpbWUuXG5cdFx0XHRcdG9wdGlvbnMuZGV0YWlsLmFjdGlvbiA9ICdhZFN0YXJ0Jztcblx0XHRcdFx0Y29uc3Qgc3RhcnRFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnb1RyYWNraW5nLmV2ZW50Jywgb3B0aW9ucyk7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChzdGFydEV2ZW50KTtcblxuXHRcdFx0XHRpZiAoYWQuaXNMaW5lYXIoKSkge1xuXHRcdFx0XHRcdC8vIEZvciBhIGxpbmVhciBhZCwgYSB0aW1lciBjYW4gYmUgc3RhcnRlZCB0byBwb2xsIGZvclxuXHRcdFx0XHRcdC8vIHRoZSByZW1haW5pbmcgdGltZS5cblx0XHRcdFx0XHQvLyBUT0RPOiBXZSBjb3VsZCB1c2UgdGhpcyB0byBhZGQgYSBza2lwIGFkIGJ1dHRvblxuXHRcdFx0XHRcdC8vIEN1cnJlbnRseSBub3QgdXNlZCwgY291bGQgYmUgdXNlZCBpbiBhbiBpbnRlcnZhbFxuXHRcdFx0XHRcdC8vIGNvbnN0IHJlbWFpbmluZ1RpbWUgPSB0aGlzLmFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gVXNlcnMgd2l0aCBzY3JlZW4gcmVhZGVycyB3aWxsIGxvc2UgY29udHJvbCBvZiB2aWRlbyB3aGlsZSBhZHZlcnQgaXMgcGxheWluZyxcblx0XHRcdFx0Ly8gc28gd2UgZXhwbGFpbiB3aHkgYW5kIGVuY291cmFnZSB0aGVtIHRvIHdhaXQgd2l0aCB0aGlzIG1lc3NhZ2UuXG5cdFx0XHRcdHRoaXMudmlkZW8ubGl2ZVJlZ2lvbkVsLmlubmVySFRNTD1gVmlkZW8gd2lsbCBwbGF5IGFmdGVyIGFkIGluICR7b3B0aW9ucy5kZXRhaWwuYWREdXJhdGlvbn0gc2Vjb25kc2A7XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFOiB7XG5cblx0XHRcdFx0b3B0aW9ucy5kZXRhaWwuYWN0aW9uID0gJ2FkQ29tcGxldGUnO1xuXHRcdFx0XHRjb25zdCBlbmRFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnb1RyYWNraW5nLmV2ZW50Jywgb3B0aW9ucyk7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChlbmRFdmVudCk7XG5cblx0XHRcdFx0aWYgKGFkLmlzTGluZWFyKCkpIHtcblx0XHRcdFx0XHQvLyBXb3VsZCBiZSB1c2VkIHRvIGNsZWFyIHRoZSBpbnRlcnZhbFxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy52aWRlby5saXZlUmVnaW9uRWwuaW5uZXJIVE1MPScnO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIHRyYWNraW5nIGZvciB3aGVuIGFuIGFkdmVydCBiZWNvbWVzIHNraXBwYWJsZSwgYW5kIHdoZXRoZXIgaXQncyBza2lwcGVkXG5cdFx0XHRjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQQUJMRV9TVEFURV9DSEFOR0VEOiB7XG5cdFx0XHRcdG9wdGlvbnMuZGV0YWlsLmFjdGlvbiA9ICdhZFNraXBwYWJsZSc7XG5cdFx0XHRcdGNvbnN0IHNraXBwYWJsZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvVHJhY2tpbmcuZXZlbnQnLCBvcHRpb25zKTtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KHNraXBwYWJsZUV2ZW50KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNLSVBQRUQ6IHtcblx0XHRcdFx0b3B0aW9ucy5kZXRhaWwuYWN0aW9uID0gJ2FkU2tpcCc7XG5cdFx0XHRcdGNvbnN0IHNraXBFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnb1RyYWNraW5nLmV2ZW50Jywgb3B0aW9ucyk7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChza2lwRXZlbnQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQUxMX0FEU19DT01QTEVURUQ6IHtcblx0XHRcdFx0b3B0aW9ucy5kZXRhaWwuYWN0aW9uID0gJ2FsbEFkc0NvbXBsZXRlZCc7XG5cdFx0XHRcdGNvbnN0IGFsbEFkc0NvbXBsZXRlZEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvVHJhY2tpbmcuZXZlbnQnLCBvcHRpb25zKTtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KGFsbEFkc0NvbXBsZXRlZEV2ZW50KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignYWRFdmVudCBoYXMgdHlwZSAnICsgYWRFdmVudC50eXBlICsgJywgd2hpY2ggaXMgbm90IGhhbmRsZWQgYnkgYWRFdmVudEhhbmRsZXInKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXBvcnRFcnJvcihlcnJvcikgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcblx0XHRkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvRXJyb3JzLmxvZycsIHsgYnViYmxlczogdHJ1ZSwgZGV0YWlsOiB7IGVycm9yOiBlcnJvciB9IH0pKTtcblx0fVxuXG5cdGFkRXJyb3JIYW5kbGVyKGFkRXJyb3IpIHtcblx0XHQvLyBOT1RFOiBoYXMgdGhlIEFQSSBjaGFuZ2VkPyBub3cgbmVlZCB0byBjYWxsIGBnZXRFcnJvcmAgbWV0aG9kIHRvIGdldCB0aGUgYWQgZXJyb3Jcblx0XHRjb25zdCBhY3R1YWxFcnJvciA9ICdnZXRFcnJvcicgaW4gYWRFcnJvciAmJiB0eXBlb2YgYWRFcnJvci5nZXRFcnJvciA9PT0gJ2Z1bmN0aW9uJyA/IGFkRXJyb3IuZ2V0RXJyb3IoKSA6IGFkRXJyb3I7XG5cblx0XHQvLyBjb252ZXJ0IHRoZSBHb29nbGUgQWQgZXJyb3IgdG8gYSBKUyBvbmVcblx0XHRjb25zdCBtZXNzYWdlID0gYCR7YWN0dWFsRXJyb3IuZ2V0RXJyb3JDb2RlKCl9LCAke2FjdHVhbEVycm9yLmdldFR5cGUoKX0sICR7YWN0dWFsRXJyb3IuZ2V0TWVzc2FnZSgpfSwgJHthY3R1YWxFcnJvci5nZXRWYXN0RXJyb3JDb2RlKCl9YDtcblx0XHR0aGlzLnJlcG9ydEVycm9yKG5ldyBFcnJvcihtZXNzYWdlKSk7XG5cblx0XHRpZiAodGhpcy5hZHNNYW5hZ2VyKSB7XG5cdFx0XHR0aGlzLmFkc01hbmFnZXIuZGVzdHJveSgpO1xuXHRcdH1cblx0XHR0aGlzLnZpZGVvLmNvbnRhaW5lckVsLnJlbW92ZUNoaWxkKHRoaXMuYWRDb250YWluZXJFbCk7XG5cdFx0aWYgKHRoaXMub3ZlcmxheUVsKSB7XG5cdFx0XHR0aGlzLm92ZXJsYXlFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucGxheUFkRXZlbnRIYW5kbGVyKTtcblx0XHRcdHRoaXMudmlkZW8uY29udGFpbmVyRWwucmVtb3ZlQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuXHRcdFx0ZGVsZXRlIHRoaXMub3ZlcmxheUVsO1xuXHRcdH1cblx0XHRpZiAodGhpcy52aWRlby5wbGFjZWhvbGRlckVsKSB7XG5cdFx0XHR0aGlzLnZpZGVvLnBsYWNlaG9sZGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnBsYXlBZEV2ZW50SGFuZGxlcik7XG5cdFx0fVxuXHRcdHRoaXMudmlkZW8ub3B0cy5hZHZlcnRpc2luZyA9IGZhbHNlO1xuXHRcdHRoaXMuc3RhcnRBZHMoKTtcblx0fVxuXG5cdGNvbnRlbnRQYXVzZVJlcXVlc3RIYW5kbGVyKCkge1xuXHRcdHRoaXMuYWRzQ29tcGxldGVkID0gZmFsc2U7XG5cdFx0dGhpcy52aWRlby52aWRlb0VsLnBhdXNlKCk7XG5cdH1cblxuXHRjb250ZW50UmVzdW1lUmVxdWVzdEhhbmRsZXIoKSB7XG5cdFx0dGhpcy52aWRlby5jb250YWluZXJFbC5yZW1vdmVDaGlsZCh0aGlzLmFkQ29udGFpbmVyRWwpO1xuXHRcdHRoaXMuYWRzQ29tcGxldGVkID0gdHJ1ZTtcblx0XHR0aGlzLnBsYXlVc2VyVmlkZW8oKTtcblx0fVxuXG5cdHBsYXlVc2VyVmlkZW8oKSB7XG5cdFx0Ly8gU2luY2UgRmlyZWZveCA1MiwgdGhlIGNhcHRpb25zIG5lZWQgcmUtYWRkaW5nIGFmdGVyIHRoZVxuXHRcdC8vIGFkIHZpZGVvIGxheWVyIGhhcyBmaW5pc2hlZCBpdHMgdGhpbmcuXG5cdFx0dGhpcy52aWRlby5hZGRDYXB0aW9ucygpO1xuXG5cdFx0dGhpcy52aWRlby52aWRlb0VsLnBsYXkoKTtcblx0fVxuXG5cdGdldEFkUHJvZ3Jlc3MoKSB7XG5cdFx0aWYgKCF0aGlzLmFkc01hbmFnZXIgfHwgIXRoaXMuYWRzTWFuYWdlci5nZXRDdXJyZW50QWQoKSkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXHRcdGNvbnN0IGR1cmF0aW9uID0gdGhpcy5hZHNNYW5hZ2VyLmdldEN1cnJlbnRBZCgpLmdldER1cmF0aW9uKCk7XG5cdFx0Y29uc3QgcmVtYWluaW5nVGltZSA9IHRoaXMuYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG5cdFx0cmV0dXJuIHBhcnNlSW50KDEwMCAqIChkdXJhdGlvbiAtIHJlbWFpbmluZ1RpbWUpIC8gZHVyYXRpb24sIDEwKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWRlb0FkcztcbiIsImNsYXNzIFZpZGVvSW5mbyB7XG5cdGNvbnN0cnVjdG9yICh2aWRlbykge1xuXHRcdHRoaXMudmlkZW8gPSB2aWRlbztcblxuXHRcdHRoaXMub3B0cyA9IHRoaXMudmlkZW8ub3B0cy5wbGFjZWhvbGRlckluZm8ucmVkdWNlKChtYXAsIGtleSkgPT4ge1xuXHRcdFx0bWFwW2tleV0gPSB0cnVlO1xuXHRcdFx0cmV0dXJuIG1hcDtcblx0XHR9LCB7fSk7XG5cblx0XHR0aGlzLmluZm9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRoaXMuaW5mb0VsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19pbmZvJztcblxuXHRcdGlmICh0aGlzLm9wdHMuYnJhbmQpIHtcblx0XHRcdHRoaXMuYnJhbmRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdHRoaXMuYnJhbmRFbC5jbGFzc05hbWUgPSAnby12aWRlb19faW5mby1icmFuZCc7XG5cdFx0XHR0aGlzLmluZm9FbC5hcHBlbmRDaGlsZCh0aGlzLmJyYW5kRWwpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdHMudGl0bGUpIHtcblx0XHRcdHRoaXMudGl0bGVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRcdHRoaXMudGl0bGVFbC5jbGFzc05hbWUgPSAnby12aWRlb19faW5mby10aXRsZSc7XG5cdFx0XHR0aGlzLmluZm9FbC5hcHBlbmRDaGlsZCh0aGlzLnRpdGxlRWwpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdHMuZGVzY3JpcHRpb24pIHtcblx0XHRcdHRoaXMuZGVzY3JpcHRpb25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcblx0XHRcdHRoaXMuZGVzY3JpcHRpb25FbC5jbGFzc05hbWUgPSAnby12aWRlb19faW5mby1kZXNjcmlwdGlvbic7XG5cdFx0XHR0aGlzLmluZm9FbC5hcHBlbmRDaGlsZCh0aGlzLmRlc2NyaXB0aW9uRWwpO1xuXHRcdH1cblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0XHR0aGlzLnZpZGVvLnBsYWNlaG9sZGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5pbmZvRWwpO1xuXHR9XG5cblx0dXBkYXRlICgpIHtcblx0XHRpZiAodGhpcy5icmFuZEVsKSB7XG5cdFx0XHRjb25zdCBicmFuZE5hbWUgPSB0aGlzLnZpZGVvLnZpZGVvRGF0YS5icmFuZCAmJiB0aGlzLnZpZGVvLnZpZGVvRGF0YS5icmFuZC5uYW1lO1xuXHRcdFx0dGhpcy5icmFuZEVsLnRleHRDb250ZW50ID0gYnJhbmROYW1lO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnRpdGxlRWwpIHtcblx0XHRcdHRoaXMudGl0bGVFbC50ZXh0Q29udGVudCA9IHRoaXMudmlkZW8udmlkZW9EYXRhLnRpdGxlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmRlc2NyaXB0aW9uRWwpIHtcblx0XHRcdHRoaXMuZGVzY3JpcHRpb25FbC50ZXh0Q29udGVudCA9IHRoaXMudmlkZW8udmlkZW9EYXRhLnN0YW5kZmlyc3Q7XG5cdFx0fVxuXHR9XG5cblx0dGVhcmRvd24gKCkge1xuXHRcdHRoaXMudmlkZW8ucGxhY2Vob2xkZXJFbC5yZW1vdmVDaGlsZCh0aGlzLmluZm9FbCk7XG5cblx0XHRkZWxldGUgdGhpcy5pbmZvRWw7XG5cdFx0ZGVsZXRlIHRoaXMuYnJhbmRFbDtcblx0XHRkZWxldGUgdGhpcy50aXRsZUVsO1xuXHRcdGRlbGV0ZSB0aGlzLmRlc2NyaXB0aW9uRWw7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9JbmZvO1xuIiwiY2xhc3MgUGxheWxpc3Qge1xuXHRjb25zdHJ1Y3RvciAob3B0cykge1xuXHRcdHRoaXMub3B0cyA9IG9wdHM7XG5cblx0XHQvLyBmaW5kIHRoZSBjdXJyZW50bHkgcGxheWluZyB2aWRlbywgYWx3YXlzIGRlYWwgd2l0aCBzdHJpbmdzXG5cdFx0Y29uc3QgY3VycmVudElkID0gb3B0cy5wbGF5ZXIudmlkZW9EYXRhID8gb3B0cy5wbGF5ZXIudmlkZW9EYXRhLmlkIDogb3B0cy5wbGF5ZXIub3B0cy5pZDtcblx0XHR0aGlzLmN1cnJlbnRJbmRleCA9IGN1cnJlbnRJZCA/IG9wdHMucXVldWUuaW5kZXhPZihjdXJyZW50SWQudG9TdHJpbmcoKSkgOiAtMTtcblxuXHRcdHRoaXMuY2FjaGUgPSB7fTtcblxuXHRcdGlmICh0aGlzLm9wdHMuYXV0b3BsYXkpIHtcblx0XHRcdHRoaXMub3B0cy5wbGF5ZXIuY29udGFpbmVyRWwuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCB0aGlzLm5leHQuYmluZCh0aGlzKSwgdHJ1ZSk7XG5cblx0XHRcdGlmICggdGhpcy5jdXJyZW50SW5kZXggPT09IC0xKSB7XG5cdFx0XHRcdHRoaXMubmV4dCgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdG5leHQgKCkge1xuXHRcdHRoaXMuZ290byh0aGlzLmN1cnJlbnRJbmRleCArIDEpO1xuXHR9XG5cblx0cHJldiAoKSB7XG5cdFx0dGhpcy5nb3RvKHRoaXMuY3VycmVudEluZGV4IC0gMSk7XG5cdH1cblxuXHRnb3RvIChpbmRleCkge1xuXHRcdGlmIChpbmRleCA8IDApIHtcblx0XHRcdHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5vcHRzLnF1ZXVlLmxlbmd0aCAtIDE7XG5cdFx0fSBlbHNlIGlmIChpbmRleCA+PSB0aGlzLm9wdHMucXVldWUubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRJbmRleCA9IDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuY3VycmVudEluZGV4ID0gaW5kZXg7XG5cdFx0fVxuXG5cdFx0Ly8gc3RvcmUgdGhlIGN1cnJlbnQgZGF0YSBmb3IgcXVpY2sgYWNjZXNzIGxhdGVyXG5cdFx0Y29uc3QgY3VycmVudFZpZGVvSWQgPSB0aGlzLm9wdHMucGxheWVyLnZpZGVvRGF0YSAmJiB0aGlzLm9wdHMucGxheWVyLnZpZGVvRGF0YS5pZDtcblxuXHRcdGlmIChjdXJyZW50VmlkZW9JZCAmJiAhdGhpcy5jYWNoZVtjdXJyZW50VmlkZW9JZF0pIHtcblx0XHRcdHRoaXMuY2FjaGVbY3VycmVudFZpZGVvSWRdID0gdGhpcy5vcHRzLnBsYXllci52aWRlb0RhdGE7XG5cdFx0fVxuXG5cdFx0Ly8gZmlyZSBvZmYgYW55IGN1cnJlbnQgd2F0Y2hlZCBkYXRhXG5cdFx0dGhpcy5vcHRzLnBsYXllci5maXJlV2F0Y2hlZEV2ZW50KCk7XG5cdFx0dGhpcy5vcHRzLnBsYXllci5yZXNldEFtb3VudFdhdGNoZWQoKTtcblxuXHRcdGNvbnN0IG5leHRWaWRlb0lkID0gdGhpcy5vcHRzLnF1ZXVlW3RoaXMuY3VycmVudEluZGV4XTtcblxuXHRcdGNvbnN0IG5leHRWaWRlb09wdHMgPSB7XG5cdFx0XHRpZDogbmV4dFZpZGVvSWQsXG5cdFx0XHRkYXRhOiB0aGlzLmNhY2hlW25leHRWaWRlb0lkXVxuXHRcdH07XG5cblx0XHRyZXR1cm4gdGhpcy5vcHRzLnBsYXllci51cGRhdGUobmV4dFZpZGVvT3B0cykudGhlbigoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5vcHRzLnBsYXllci52aWRlb0VsKSB7XG5cdFx0XHRcdHRoaXMub3B0cy5wbGF5ZXIudmlkZW9FbC5wbGF5KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWxpc3Q7XG4iLCIvKiBlc2xpbnQgY2xhc3MtbWV0aG9kcy11c2UtdGhpczogMCAqL1xuXG5jb25zdCBjbG9zZUJ1dHRvbiA9IChvbkNsaWNrKSA9PiB7XG5cdGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRidXR0b24uY2xhc3NOYW1lID0gJ28tdmlkZW9fX2d1aWRhbmNlX19jbG9zZSc7XG5cdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0b25DbGljaygpO1xuXHR9KTtcblx0cmV0dXJuIGJ1dHRvbjtcbn07XG5cbmNvbnN0IGNvbnRhaW5lciA9IChiYW5uZXJNb2RlKSA9PiB7XG5cdGNvbnN0IGNvbnRhaW5lckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdGNvbnRhaW5lckVsLmNsYXNzTmFtZSA9IGBvLXZpZGVvX19ndWlkYW5jZSAke2Jhbm5lck1vZGUgPyAnby12aWRlb19fZ3VpZGFuY2UtLWJhbm5lcicgOiAnJ31gO1xuXHRyZXR1cm4gY29udGFpbmVyRWw7XG59O1xuXG5jb25zdCBsaW5rID0gKCkgPT4ge1xuXHRjb25zdCBsaW5rRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cdGxpbmtFbC5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCAnaHR0cHM6Ly93d3cuZnQuY29tL2FjY2Vzc2liaWxpdHkjdmlkZW8tdHJhbnNjcmlwdGlvbnMnKTtcblx0bGlua0VsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19ndWlkYW5jZV9fbGluayc7XG5cdGxpbmtFbC5pbm5lclRleHQgPSAnU3VidGl0bGVzIHVuYXZhaWxhYmxlJztcblx0bGlua0VsLnRhcmdldCA9ICdfYmxhbmsnO1xuXHRsaW5rRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IGUuc3RvcFByb3BhZ2F0aW9uKCkpO1xuXHRyZXR1cm4gbGlua0VsO1xufTtcblxuY2xhc3MgR3VpZGFuY2Uge1xuXG5cdGNvbnN0cnVjdG9yICgpIHtcblx0XHR0aGlzLnJlbW92ZUJhbm5lciA9IHRoaXMucmVtb3ZlQmFubmVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5oaWRlQmFubmVyID0gdGhpcy5oaWRlQmFubmVyLmJpbmQodGhpcyk7XG5cdH1cblxuXHRjcmVhdGVQbGFjZWhvbGRlciAoKSB7XG5cdFx0Y29uc3QgY29udGFpbmVyRWwgPSBjb250YWluZXIoKTtcblx0XHRjb250YWluZXJFbC5hcHBlbmRDaGlsZChsaW5rKCkpO1xuXHRcdHJldHVybiBjb250YWluZXJFbDtcblx0fVxuXG5cdGNyZWF0ZUJhbm5lciAoKSB7XG5cdFx0dGhpcy5iYW5uZXIgPSBjb250YWluZXIodHJ1ZSk7XG5cdFx0dGhpcy5iYW5uZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdXR0b24odGhpcy5yZW1vdmVCYW5uZXIpKTtcblx0XHR0aGlzLmJhbm5lci5hcHBlbmRDaGlsZChsaW5rKCkpO1xuXG5cdFx0dGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLmhpZGVCYW5uZXIsIDUwMDApO1xuXG5cdFx0cmV0dXJuIHRoaXMuYmFubmVyO1xuXHR9XG5cblx0cmVtb3ZlQmFubmVyICgpIHtcblx0XHRpZiAodGhpcy5iYW5uZXIpIHtcblx0XHRcdHRoaXMuYmFubmVyLnJlbW92ZSgpO1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cdFx0fVxuXHR9XG5cblx0aGlkZUJhbm5lciAoKSB7XG5cdFx0aWYgKHRoaXMuYmFubmVyKSB7XG5cdFx0XHR0aGlzLmJhbm5lci5jbGFzc0xpc3QuYWRkKCdvLXZpZGVvX19ndWlkYW5jZS0taGlkZGVuJyk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEd1aWRhbmNlOyIsImltcG9ydCBvVmlld3BvcnQgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXZpZXdwb3J0JztcblxuaW1wb3J0IGdldFJlbmRpdGlvbiBmcm9tICcuL2hlbHBlcnMvZ2V0LXJlbmRpdGlvbi5qcyc7XG5pbXBvcnQgVmlkZW9BZHMgZnJvbSAnLi9hZHMuanMnO1xuaW1wb3J0IFZpZGVvSW5mbyBmcm9tICcuL2luZm8uanMnO1xuaW1wb3J0IFBsYXlsaXN0IGZyb20gJy4vcGxheWxpc3QuanMnO1xuaW1wb3J0IEd1aWRhbmNlIGZyb20gJy4vZ3VpZGFuY2UuanMnO1xuXG5mdW5jdGlvbiBsaXN0ZW5PbmNlKGVsLCBldmVudE5hbWUsIGZuKSB7XG5cdGNvbnN0IHdyYXBwZWRGbiA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcblx0XHRlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZEZuKTtcblx0XHRmbiguLi5hcmdzKTtcblx0fTtcblx0ZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHdyYXBwZWRGbik7XG59XG5cbmZ1bmN0aW9uIGV2ZW50TGlzdGVuZXIodmlkZW8sIGV2KSB7XG5cblx0Ly8gT24gc29tZSBwbGF0Zm9ybXMgKGVnIGlPUyksIHRoZSBHb29nbGUgYWR2ZXJ0IGxpYnJhcnkgd2lsbCB1c2UgdGhlIG1haW4gPHZpZGVvPiBlbGVtZW50XG5cdC8vIHVzZWQgYnkgby12aWRlbyB0byBhbHNvIHBsYXkgYSBwcmUtcm9sbCBhZHZlcnQ7IGFzIHRoZSBhZHZlcnQgcGxheXMsIHRoaXMgd2lsbCB0cmlnZ2VyXG5cdC8vIHRoZSBub3JtYWwgPHZpZGVvPiBldmVudCBsaXN0ZW5lcnMuICBEaXNjYXJkIGV2ZW50cyB0aGF0IHdlIGNhbiBpZGVudGlmeSBhcyBjb21pbmdcblx0Ly8gZnJvbSB0aGUgcHJlLXJvbGwgcmF0aGVyIHRoYW4gdGhlIG1haW4gY29udGVudC5cblx0Ly8gVG8gZG8gdGhpcywgY2hlY2sgd2hldGhlciBhZHZlcnRpc2luZyBpcyBzdGlsbCBlbmFibGVkIChpdCdsbCBiZSBkaXNhYmxlZCBvbiBhbnkgZXJyb3IpLFxuXHQvLyBhbmQgZm9yIHRoZSB2aWRlbyBhZHMgbG9hZCBhbmQgY29tcGxldGVkIGZsYWdzLlxuXHRpZiAodmlkZW8ub3B0cy5hZHZlcnRpc2luZyAmJiB2aWRlby52aWRlb0FkcyAmJiB2aWRlby52aWRlb0Fkcy5hZHNMb2FkZWQgJiYgIXZpZGVvLnZpZGVvQWRzLmFkc0NvbXBsZXRlZCkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIERpc3BhdGNoIHByb2dyZXNzIGV2ZW50IGF0IGFyb3VuZCAyNSUsIDUwJSwgNzUlIGFuZCAxMDAlXG5cdGlmIChldi50eXBlID09PSAncHJvZ3Jlc3MnICYmICFzaG91bGREaXNwYXRjaCh2aWRlbykpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmaXJlRXZlbnQoZXYudHlwZSwgdmlkZW8sIHtcblx0XHRwcm9ncmVzczogdmlkZW8uZ2V0UHJvZ3Jlc3MoKSxcblx0XHRkdXJhdGlvbjogdmlkZW8uZ2V0RHVyYXRpb24oKSxcblx0XHR0ZXh0VHJhY2tNb2RlOiB2aWRlby5nZXRUcmFja01vZGUoKVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gZmlyZUV2ZW50KGFjdGlvbiwgdmlkZW8sIGV4dHJhRGV0YWlsID0ge30pIHtcblx0Y29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ29UcmFja2luZy5ldmVudCcsIHtcblx0XHRkZXRhaWw6IE9iamVjdC5hc3NpZ24oe1xuXHRcdFx0Y2F0ZWdvcnk6ICd2aWRlbycsXG5cdFx0XHRhY3Rpb24sXG5cdFx0XHRhZHZlcnRpc2luZzogdmlkZW8ub3B0cy5hZHZlcnRpc2luZyxcblx0XHRcdGNvbnRlbnRJZDogdmlkZW8ub3B0cy5pZCxcblx0XHR9LCBleHRyYURldGFpbCksXG5cdFx0YnViYmxlczogdHJ1ZVxuXHR9KTtcblx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbn1cblxuY29uc3QgZGlzcGF0Y2hlZFByb2dyZXNzID0ge307XG5mdW5jdGlvbiBzaG91bGREaXNwYXRjaCh2aWRlbykge1xuXHRjb25zdCBwcm9ncmVzcyA9IHZpZGVvLmdldFByb2dyZXNzKCk7XG5cdGNvbnN0IGlkID0gdmlkZW8ub3B0cy5pZDtcblx0Y29uc3QgcmVsZXZhbnRQcm9ncmVzc1BvaW50cyA9IFtcblx0XHQ4LCA5LCAxMCwgMTEsIDEyLFxuXHRcdDIzLCAyNCwgMjUsIDI2LCAyNyxcblx0XHQ0OCwgNDksIDUwLCA1MSwgNTIsXG5cdFx0NzMsIDc0LCA3NSwgNzYsIDc3LFxuXHRcdDEwMFxuXHRdO1xuXG5cdC8vIEluaXRpYWxpc2UgZGlzcGF0Y2hlZCBwcm9ncmVzcyBzdG9yZVxuXHRpZiAoIWRpc3BhdGNoZWRQcm9ncmVzc1tpZF0pIHtcblx0XHRkaXNwYXRjaGVkUHJvZ3Jlc3NbaWRdID0gW107XG5cdH1cblxuXHQvLyBQcm9ncmVzcyBpcyBub3QgcmVsZXZhbnRcblx0aWYgKCFyZWxldmFudFByb2dyZXNzUG9pbnRzLmluY2x1ZGVzKHByb2dyZXNzKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIFByb2dyZXNzIGhhcyBhbHJlYWR5IGJlZW4gZGlzcGF0Y2hlZFxuXHRpZiAoZGlzcGF0Y2hlZFByb2dyZXNzW2lkXS5pbmNsdWRlcyhwcm9ncmVzcykpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRkaXNwYXRjaGVkUHJvZ3Jlc3NbaWRdLnB1c2gocHJvZ3Jlc3MpO1xuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gYWRkRXZlbnRzKHZpZGVvLCBldmVudHMpIHtcblx0ZXZlbnRzLmZvckVhY2goZXZlbnQgPT4ge1xuXHRcdHZpZGVvLnZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMsIHZpZGVvKSk7XG5cdH0pO1xufVxuXG4vLyB1c2UgdGhlIGltYWdlIHJlc2l6aW5nIHNlcnZpY2UsIGlmIHdpZHRoIHN1cHBsaWVkXG5mdW5jdGlvbiB1cGRhdGVQb3N0ZXJVcmwocG9zdGVySW1hZ2UsIHdpZHRoLCBzeXN0ZW1jb2RlKSB7XG5cdGxldCB1cmwgPSBgaHR0cHM6Ly93d3cuZnQuY29tL19fb3JpZ2FtaS9zZXJ2aWNlL2ltYWdlL3YyL2ltYWdlcy9yYXcvJHtlbmNvZGVVUklDb21wb25lbnQocG9zdGVySW1hZ2UpfT9zb3VyY2U9JHtzeXN0ZW1jb2RlfSZxdWFsaXR5PWxvd2A7XG5cdGlmICh3aWR0aCkge1xuXHRcdHVybCArPSBgJmZpdD1zY2FsZS1kb3duJndpZHRoPSR7d2lkdGh9YDtcblx0fVxuXG5cdHJldHVybiB1cmw7XG59XG5cbi8vIGNvbnZlcnRzIGRhdGEtby12aWRlbyBhdHRyaWJ1dGVzIHRvIGFuIG9wdGlvbnMgb2JqZWN0XG5mdW5jdGlvbiBnZXRPcHRpb25zRnJvbURhdGFBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpIHtcblx0Y29uc3Qgb3B0cyA9IHt9O1xuXHQvLyBUcnkgdG8gZ2V0IGNvbmZpZyBzZXQgZGVjbGFyYXRpdmVseSBvbiB0aGUgZWxlbWVudFxuXHRBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGF0dHJpYnV0ZXMsIChhdHRyKSA9PiB7XG5cdFx0aWYgKGF0dHIubmFtZS5pbmRleE9mKCdkYXRhLW8tdmlkZW8nKSA9PT0gMCkge1xuXHRcdFx0Ly8gUmVtb3ZlIHRoZSBwcmVmaXggcGFydCBvZiB0aGUgZGF0YSBhdHRyaWJ1dGUgbmFtZSBhbmQgaHlwaGVuLWNhc2UgdG8gY2FtZWxDYXNlXG5cdFx0XHRjb25zdCBrZXkgPSBhdHRyLm5hbWUucmVwbGFjZSgnZGF0YS1vLXZpZGVvLScsICcnKS5yZXBsYWNlKC8tKFthLXpdKS9nLCAobSwgdykgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdHRyeSB7XG5cdFx0XHRcdC8vIElmIGl0J3MgYSBKU09OLCBhIGJvb2xlYW4gb3IgYSBudW1iZXIsIHdlIHdhbnQgaXQgc3RvcmVkIGxpa2UgdGhhdCwgYW5kIG5vdCBhcyBhIHN0cmluZ1xuXG5cdFx0XHRcdC8vIEZvciBsZWdhY3kgby12aWRlbyBlbWJlZHMsIHdlJ2xsIG5lZWQgdG8gY2hlY2sgZm9yIHBsYWNlSG9sZGVySW5mbyBhdHRyaWJ1dGVzXG5cdFx0XHRcdC8vIGFzIHRoZXkgdHlwaWNhbGx5IHBhc3MgZGF0YSBpbiB3aXRoIHNpbmdsZSBxdW90ZXMsIHdoaWNoIHdvbid0IHBhcnNlOlxuXHRcdFx0XHQvLyBkYXRhLW8tdmlkZW8tcGxhY2Vob2xkZXItaW5mbz1cIlsndGl0bGUnLCAnZGVzY3JpcHRpb24nXVwiXG5cdFx0XHRcdGlmIChrZXkgPT09ICdwbGFjZWhvbGRlckluZm8nKSB7XG5cdFx0XHRcdFx0b3B0c1trZXldID0gSlNPTi5wYXJzZShhdHRyLnZhbHVlLnJlcGxhY2UoL1xcJy9nLCAnXCInKSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b3B0c1trZXldID0gSlNPTi5wYXJzZShhdHRyLnZhbHVlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRvcHRzW2tleV0gPSBhdHRyLnZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdHJldHVybiBvcHRzO1xufVxuXG5mdW5jdGlvbiB1bmxvYWRMaXN0ZW5lcigpIHtcblx0dGhpcy51cGRhdGVBbW91bnRXYXRjaGVkKCk7XG5cdGZpcmVFdmVudCgnd2F0Y2hlZCcsIHRoaXMsIHtcblx0XHRhbW91bnQ6IHRoaXMuZ2V0QW1vdW50V2F0Y2hlZCgwKSxcblx0XHRhbW91bnRQZXJjZW50YWdlOiB0aGlzLmdldEFtb3VudFdhdGNoZWRQZXJjZW50YWdlKDApXG5cdH0pO1xufVxuXG5mdW5jdGlvbiB2aXNpYmlsaXR5TGlzdGVuZXIoZXYpIHtcblx0aWYgKGV2LmRldGFpbC5oaWRkZW4pIHtcblx0XHR0aGlzLnVwZGF0ZUFtb3VudFdhdGNoZWQoKTtcblx0fSBlbHNlIGlmICghdGhpcy52aWRlb0VsLnBhdXNlZCkge1xuXHRcdHRoaXMubWFya1BsYXlTdGFydCgpO1xuXHR9XG59XG5cbmNvbnN0IHVubG9hZEV2ZW50TmFtZSA9ICdvbmJlZm9yZXVubG9hZCcgaW4gd2luZG93ID8gJ2JlZm9yZXVubG9hZCcgOiAndW5sb2FkJztcblxuY29uc3QgZGVmYXVsdE9wdHMgPSB7XG5cdGFkdmVydGlzaW5nOiBmYWxzZSxcblx0YWxsUHJvZ3Jlc3M6IGZhbHNlLFxuXHRhdXRvcmVuZGVyOiB0cnVlLFxuXHRjbGFzc2VzOiBbXSxcblx0b3B0aW11bXdpZHRoOiBudWxsLFxuXHRwbGFjZWhvbGRlcjogZmFsc2UsXG5cdHBsYWNlaG9sZGVySW5mbzogWyd0aXRsZSddLFxuXHRwbGFjZWhvbGRlckhpbnQ6ICcnLFxuXHRwbGF5c2lubGluZTogZmFsc2UsXG5cdHNob3dDYXB0aW9uczogdHJ1ZSxcblx0c2hvd0d1aWRhbmNlOiB0cnVlLFxuXHRkYXRhOiBudWxsXG59O1xuXG5jbGFzcyBWaWRlbyB7XG5cdGNvbnN0cnVjdG9yKGVsLCBvcHRzKSB7XG5cdFx0dGhpcy5jb250YWluZXJFbCA9IGVsO1xuXHRcdC8vIGFtb3VudCBvZiB0aGUgdmlkZW8sIGluIG1pbGxpc2Vjb25kcywgdGhhdCBoYXMgYWN0dWFsbHkgYmVlbiAnd2F0Y2hlZCdcblx0XHR0aGlzLmFtb3VudFdhdGNoZWQgPSAwO1xuXHRcdHRoaXMuZmlyZVdhdGNoZWRFdmVudCA9IHVubG9hZExpc3RlbmVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy52aXNpYmlsaXR5TGlzdGVuZXIgPSB2aXNpYmlsaXR5TGlzdGVuZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmRpZFVzZXJQcmVzc1BsYXkgPSBmYWxzZTtcblxuXHRcdHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRPcHRzLCBvcHRzLCBnZXRPcHRpb25zRnJvbURhdGFBdHRyaWJ1dGVzKHRoaXMuY29udGFpbmVyRWwuYXR0cmlidXRlcykpO1xuXG5cdFx0dGhpcy5jb250YWluZXJFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnVmlkZW8gUGxheWVyJyk7XG5cblx0XHRpZih0eXBlb2YgdGhpcy5vcHRzLnN5c3RlbWNvZGUgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ28tdmlkZW8gcmVxdWlyZXMgXCJzeXN0ZW1jb2RlXCIgaXMgY29uZmlndXJlZCB1c2luZyB0aGUgXCJkYXRhLW8tdmlkZW8tc3lzdGVtY29kZVwiIGRhdGEgYXR0cmlidXRlLCBvciBjb25maWd1cmVkIHdpdGggdGhlIGBvcHRzYCBjb25zdHJ1Y3RvciBhcmd1bWVudC4gSXQgbXVzdCBiZSBzZXQgdG8gYSB2YWxpZCBbQml6b3BzIHN5c3RlbSBjb2RlXShodHRwczovL2Jpei1vcHMuaW4uZnQuY29tL2xpc3QvU3lzdGVtcykuJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiB0aGlzLm9wdHMuY2xhc3NlcyA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHRoaXMub3B0cy5jbGFzc2VzID0gdGhpcy5vcHRzLmNsYXNzZXMuc3BsaXQoJyAnKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLmNsYXNzZXMuaW5kZXhPZignby12aWRlb19fdmlkZW8nKSA9PT0gLTEpIHtcblx0XHRcdHRoaXMub3B0cy5jbGFzc2VzLnB1c2goJ28tdmlkZW9fX3ZpZGVvJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy50YXJnZXRpbmcgPSB7XG5cdFx0XHRzaXRlOiAnLzU4ODcvZnQuY29tJyxcblx0XHRcdHBvc2l0aW9uOiAndmlkZW8nLFxuXHRcdFx0c2l6ZXM6ICc1OTJ4MzMzfDQwMHgyMjUnLFxuXHRcdFx0dmlkZW9JZDogdGhpcy5vcHRzLmlkXG5cdFx0fTtcblxuXHRcdGlmICh0aGlzLm9wdHMuYWR2ZXJ0aXNpbmcpIHtcblx0XHRcdHRoaXMudmlkZW9BZHMgPSBuZXcgVmlkZW9BZHModGhpcyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXJFbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtby12aWRlby1qcycsICcnKTtcblxuXHRcdGlmICh0aGlzLm9wdHMuYXV0b3JlbmRlciA9PT0gdHJ1ZSkge1xuXHRcdFx0dGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy5zaG93R3VpZGFuY2UpIHtcblx0XHRcdHRoaXMuZ3VpZGFuY2UgPSBuZXcgR3VpZGFuY2UoKTtcblx0XHR9XG5cdH1cblxuXHRnZXREYXRhKCkge1xuXHRcdGNvbnN0IGRhdGFQcm9taXNlID0gdGhpcy5vcHRzLmRhdGEgP1xuXHRcdFx0UHJvbWlzZS5yZXNvbHZlKHRoaXMub3B0cy5kYXRhKSA6XG5cdFx0XHRmZXRjaChgaHR0cHM6Ly9uZXh0LW1lZGlhLWFwaS5mdC5jb20vdjEvJHt0aGlzLm9wdHMuaWR9YClcblx0XHRcdFx0LnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZS5vaykge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhyb3cgRXJyb3IoJ05leHQgTWVkaWEgQVBJIHJlc3BvbmRlZCB3aXRoIGEgJyArIHJlc3BvbnNlLnN0YXR1cyArICcgKCcgKyByZXNwb25zZS5zdGF0dXNUZXh0ICsgJykgZm9yIGlkICcgKyB0aGlzLm9wdHMuaWQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRyZXR1cm4gZGF0YVByb21pc2UudGhlbihkYXRhID0+IHtcblx0XHRcdHRoaXMudmlkZW9EYXRhID0gZGF0YTtcblx0XHRcdHRoaXMucG9zdGVySW1hZ2UgPSBkYXRhLm1haW5JbWFnZVVybCAmJiB1cGRhdGVQb3N0ZXJVcmwoZGF0YS5tYWluSW1hZ2VVcmwsIHRoaXMub3B0cy5vcHRpbXVtd2lkdGgsIHRoaXMub3B0cy5zeXN0ZW1jb2RlKTtcblx0XHRcdHRoaXMucmVuZGl0aW9uID0gZ2V0UmVuZGl0aW9uKGRhdGEucmVuZGl0aW9ucywgdGhpcy5vcHRzKTtcblx0XHR9KTtcblx0fVxuXG5cdHJlbmRlclZpZGVvKCkge1xuXHRcdGlmICh0aGlzLnJlbmRpdGlvbikge1xuXHRcdFx0aWYgKHRoaXMub3B0cy5wbGFjZWhvbGRlcikge1xuXHRcdFx0XHR0aGlzLmFkZFBsYWNlaG9sZGVyKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFkZFZpZGVvKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0aW5pdCgpIHtcblx0XHRyZXR1cm4gKHRoaXMub3B0cy5hZHZlcnRpc2luZyA/IFZpZGVvQWRzLmxvYWRBZHNMaWJyYXJ5KCkgOiBQcm9taXNlLnJlc29sdmUoKSlcblx0XHRcdC5jYXRjaCgoKSA9PiB7XG5cdFx0XHRcdC8vIElmIGFkIGRvZXNuJ3QgbG9hZCBmb3Igc29tZSByZWFzb24sIGxvYWQgdmlkZW8gYXMgbm9ybWFsXG5cdFx0XHRcdHRoaXMub3B0cy5hZHZlcnRpc2luZyA9IGZhbHNlO1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKCgpID0+IHRoaXMuZ2V0RGF0YSgpKVxuXHRcdFx0LnRoZW4oKCkgPT4gdGhpcy5yZW5kZXJWaWRlbygpKTtcblx0fVxuXG5cdGFkZFZpZGVvKCkge1xuXHRcdHRoaXMubGl2ZVJlZ2lvbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dGhpcy5saXZlUmVnaW9uRWwuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCdhc3NlcnRpdmUnKTtcblx0XHR0aGlzLmxpdmVSZWdpb25FbC5jbGFzc0xpc3QuYWRkKCdvLXZpZGVvX19saXZlLXJlZ2lvbicpO1xuXHRcdHRoaXMudmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5cdFx0dGhpcy52aWRlb0VsLmNvbnRyb2xzID0gdHJ1ZTtcblx0XHR0aGlzLnZpZGVvRWwuY2xhc3NOYW1lID0gQXJyYXkuaXNBcnJheSh0aGlzLm9wdHMuY2xhc3NlcykgPyB0aGlzLm9wdHMuY2xhc3Nlcy5qb2luKCcgJykgOiB0aGlzLm9wdHMuY2xhc3Nlcztcblx0XHR0aGlzLmNvbnRhaW5lckVsLmNsYXNzTGlzdC5hZGQoJ28tdmlkZW8tLXBsYXllcicpO1xuXG5cdFx0aWYgKHRoaXMub3B0cy5wbGF5c2lubGluZSkge1xuXHRcdFx0dGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuXHRcdFx0dGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnd2Via2l0LXBsYXlzaW5saW5lJywgJ3RydWUnKTtcblx0XHR9XG5cblx0XHQvLyBkaXNhYmxlIGRvd25sb2FkIGJ1dHRvbiBpbiBDaHJvbWUgNTgrXG5cdFx0aWYgKHRoaXMudmlkZW9FbC5jb250cm9sc0xpc3QpIHtcblx0XHRcdHRoaXMudmlkZW9FbC5jb250cm9sc0xpc3QuYWRkKCdub2Rvd25sb2FkJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy51cGRhdGVWaWRlbygpO1xuXG5cdFx0aWYgKHRoaXMucGxhY2Vob2xkZXJFbCAmJiAhdGhpcy5vcHRzLmFkdmVydGlzaW5nKSB7XG5cdFx0XHR0aGlzLnZpZGVvRWwuYXV0b3BsYXkgPSB0aGlzLnZpZGVvRWwuYXV0b3N0YXJ0ID0gdHJ1ZTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHRoaXMubGl2ZVJlZ2lvbkVsKTtcblx0XHR0aGlzLmNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHRoaXMudmlkZW9FbCk7XG5cblx0XHRhZGRFdmVudHModGhpcywgWydwbGF5aW5nJywgJ3BhdXNlJywgJ2VuZGVkJywgJ3Byb2dyZXNzJywgJ3NlZWtlZCcsICdlcnJvcicsICdzdGFsbGVkJywgJ3dhaXRpbmcnXSk7XG5cdFx0dGhpcy52aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCB0aGlzLnBhdXNlT3RoZXJWaWRlb3MuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy52aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCB0aGlzLm1hcmtQbGF5U3RhcnQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy52aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgdGhpcy51cGRhdGVBbW91bnRXYXRjaGVkLmJpbmQodGhpcykpO1xuXHRcdHRoaXMudmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKCdzdXNwZW5kJywgdGhpcy5jbGVhckN1cnJlbnRseVBsYXlpbmcuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy52aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgdGhpcy5jbGVhckN1cnJlbnRseVBsYXlpbmcuYmluZCh0aGlzKSk7XG5cblx0XHRpZiAodGhpcy5vcHRzLmFkdmVydGlzaW5nKSB7XG5cdFx0XHR0aGlzLnZpZGVvQWRzLnNldFVwQWRzKCk7XG5cdFx0fVxuXG5cdFx0Ly8gc2VuZCAnd2F0Y2hlZCcgZXZlbnQgb24gcGFnZSB1bmxvYWQsXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIodW5sb2FkRXZlbnROYW1lLCB0aGlzLmZpcmVXYXRjaGVkRXZlbnQpO1xuXHRcdG9WaWV3cG9ydC5saXN0ZW5UbygndmlzaWJpbGl0eScpO1xuXHRcdC8vIHBhdXNlICd3YXRjaGluZycgdGhlIHZpZGVvIGlmIHRoZSB0YWIgaXMgaGlkZGVuXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29WaWV3cG9ydC52aXNpYmlsaXR5JywgdGhpcy52aXNpYmlsaXR5TGlzdGVuZXIpO1xuXHR9XG5cblx0YWRkQ2FwdGlvbnMoKSB7XG5cdFx0aWYgKHRoaXMub3B0cy5zaG93Q2FwdGlvbnMgPT09IGZhbHNlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHR5cGVvZiB0aGlzLnZpZGVvRGF0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignUGxlYXNlIGNhbGwgYGdldERhdGEoKWAgYmVmb3JlIGNhbGxpbmcgYGFkZENhcHRpb25zKClgIGRpcmVjdGx5LicpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGV4aXN0aW5nVHJhY2tFbCA9IHRoaXMudmlkZW9FbC5xdWVyeVNlbGVjdG9yKCd0cmFjaycpO1xuXHRcdGlmIChleGlzdGluZ1RyYWNrRWwpIHtcblx0XHRcdHRoaXMudmlkZW9FbC5yZW1vdmVDaGlsZChleGlzdGluZ1RyYWNrRWwpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnZpZGVvRGF0YS5jYXB0aW9uc1VybCkge1xuXHRcdFx0Ly8gRklYTUUgdGhpcyBpcyBhbGwgaGFyZGNvZGVkIGFzIEVuZ2xpc2ggY2FwdGlvbnMgYXQgdGhlIG1vbWVudFxuXHRcdFx0Y29uc3QgdHJhY2tFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyYWNrJyk7XG5cdFx0XHR0cmFja0VsLnNldEF0dHJpYnV0ZSgnbGFiZWwnLCAnRW5nbGlzaCcpO1xuXHRcdFx0dHJhY2tFbC5zZXRBdHRyaWJ1dGUoJ2tpbmQnLCAnY2FwdGlvbnMnKTtcblx0XHRcdHRyYWNrRWwuc2V0QXR0cmlidXRlKCdzcmNsYW5nJywgJ2VuJyk7XG5cdFx0XHR0cmFja0VsLnNldEF0dHJpYnV0ZSgnc3JjJywgdGhpcy52aWRlb0RhdGEuY2FwdGlvbnNVcmwpO1xuXHRcdFx0dHJhY2tFbC5zZXRBdHRyaWJ1dGUoJ2Nyb3Nzb3JpZ2luJywgJ3RydWUnKTtcblx0XHRcdHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ2Nyb3Nzb3JpZ2luJywgJ3RydWUnKTtcblx0XHRcdHRoaXMudmlkZW9FbC5hcHBlbmRDaGlsZCh0cmFja0VsKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVWaWRlbygpIHtcblx0XHRpZiAodGhpcy5wb3N0ZXJJbWFnZSkge1xuXHRcdFx0dGhpcy52aWRlb0VsLnBvc3RlciA9IHRoaXMucG9zdGVySW1hZ2U7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudmlkZW9FbC5yZW1vdmVBdHRyaWJ1dGUoJ3Bvc3RlcicpO1xuXHRcdH1cblxuXHRcdHRoaXMudmlkZW9FbC5zcmMgPSB0aGlzLnJlbmRpdGlvbiAmJiB0aGlzLnJlbmRpdGlvbi51cmw7XG5cdFx0aWYgKHRoaXMuZ3VpZGFuY2UpIHtcblx0XHRcdHRoaXMuZ3VpZGFuY2UucmVtb3ZlQmFubmVyKCk7XG5cdFx0fVxuXHRcdGxpc3Rlbk9uY2UodGhpcy52aWRlb0VsLCAncGxheWluZycsIHRoaXMuc2hvd0d1aWRhbmNlQmFubmVyLmJpbmQodGhpcykpO1xuXG5cdFx0dGhpcy5hZGRDYXB0aW9ucygpO1xuXHR9XG5cblx0YWRkUGxhY2Vob2xkZXIoKSB7XG5cdFx0dGhpcy5wbGFjZWhvbGRlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dGhpcy5wbGFjZWhvbGRlckVsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19wbGFjZWhvbGRlcic7XG5cblx0XHR0aGlzLnBsYWNlaG9sZGVySW1hZ2VFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXHRcdHRoaXMucGxhY2Vob2xkZXJJbWFnZUVsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19wbGFjZWhvbGRlci1pbWFnZSc7XG5cdFx0dGhpcy5wbGFjZWhvbGRlckltYWdlRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3ByZXNlbnRhdGlvbicpO1xuXHRcdHRoaXMucGxhY2Vob2xkZXJJbWFnZUVsLnNldEF0dHJpYnV0ZSgnYWx0JywgJycpO1xuXG5cdFx0dGhpcy5wbGFjZWhvbGRlckVsLmFwcGVuZENoaWxkKHRoaXMucGxhY2Vob2xkZXJJbWFnZUVsKTtcblxuXHRcdC8vIGluZm8gcGFuZWxcblx0XHRpZiAodGhpcy5vcHRzLnBsYWNlaG9sZGVySW5mby5sZW5ndGgpIHtcblx0XHRcdHRoaXMuaW5mb1BhbmVsID0gbmV3IFZpZGVvSW5mbyh0aGlzKTtcblx0XHR9XG5cblx0XHQvLyBwbGF5IGJ1dHRvblxuXHRcdGNvbnN0IHBsYXlDVEEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHRwbGF5Q1RBLmNsYXNzTmFtZSA9IGBvLXZpZGVvX19wbGF5LWN0YSAke3RoaXMub3B0cy5wbGFjZWhvbGRlckhpbnQgPyAnby12aWRlb19fcGxheS1jdGEtLXdpdGgtaGludCcgOiAnby12aWRlb19fcGxheS1jdGEtLXdpdGhvdXQtaGludCd9YDtcblxuXHRcdHRoaXMucGxheUJ1dHRvbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdFx0dGhpcy5wbGF5QnV0dG9uRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX3BsYXktYnV0dG9uJztcblxuXHRcdGNvbnN0IHBsYXlCdXR0b25JY29uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0cGxheUJ1dHRvbkljb25FbC5jbGFzc05hbWUgPSAnby12aWRlb19fcGxheS1idXR0b24taWNvbic7XG5cdFx0cGxheUJ1dHRvbkljb25FbC50ZXh0Q29udGVudCA9IHRoaXMub3B0cy5wbGFjZWhvbGRlckhpbnQ7XG5cblxuXHRcdHBsYXlDVEEuYXBwZW5kQ2hpbGQocGxheUJ1dHRvbkljb25FbCk7XG5cblx0XHRjb25zdCB7IGNhcHRpb25zVXJsIH0gPSB0aGlzLnZpZGVvRGF0YSB8fCB7fTtcblx0XHRpZiAoIWNhcHRpb25zVXJsICYmIHRoaXMuZ3VpZGFuY2UpIHtcblx0XHRcdHBsYXlDVEEuYXBwZW5kQ2hpbGQodGhpcy5ndWlkYW5jZS5jcmVhdGVQbGFjZWhvbGRlcigpKTtcblx0XHR9XG5cdFx0dGhpcy5wbGF5QnV0dG9uRWwuYXBwZW5kQ2hpbGQocGxheUNUQSk7XG5cblx0XHR0aGlzLnBsYWNlaG9sZGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5wbGF5QnV0dG9uRWwpO1xuXG5cdFx0dGhpcy5wbGFjZWhvbGRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5kaWRVc2VyUHJlc3NQbGF5ID0gdHJ1ZTtcblx0XHRcdHRoaXMucGxheSgpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy51cGRhdGVQbGFjZWhvbGRlcigpO1xuXG5cdFx0dGhpcy5jb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aGlzLnBsYWNlaG9sZGVyRWwpO1xuXHR9XG5cblx0cGxheSgpIHtcblx0XHRpZiAodGhpcy5wbGFjZWhvbGRlckVsKSB7XG5cblx0XHRcdC8vIEFkZHMgdmlkZW8gc29vbiBzbyBhZHMgY2FuIHN0YXJ0IGxvYWRpbmdcblx0XHRcdHRoaXMuYWRkVmlkZW8oKTtcblx0XHRcdHRoaXMudmlkZW9FbC5mb2N1cygpO1xuXG5cdFx0XHR0aGlzLmNvbnRhaW5lckVsLnJlbW92ZUNoaWxkKHRoaXMucGxhY2Vob2xkZXJFbCk7XG5cdFx0XHRpZiAodGhpcy5pbmZvUGFuZWwpIHtcblx0XHRcdFx0dGhpcy5pbmZvUGFuZWwudGVhcmRvd24oKTtcblx0XHRcdH1cblxuXHRcdFx0ZGVsZXRlIHRoaXMucGxhY2Vob2xkZXJFbDtcblx0XHRcdGRlbGV0ZSB0aGlzLnBsYWNlaG9sZGVySW1hZ2VFbDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy52aWRlb0VsLnBsYXkoKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVQbGFjZWhvbGRlcigpIHtcblx0XHRpZiAodGhpcy5wb3N0ZXJJbWFnZSkge1xuXHRcdFx0dGhpcy5wbGFjZWhvbGRlckltYWdlRWwuc3JjID0gdGhpcy5wb3N0ZXJJbWFnZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5pbmZvUGFuZWwpIHtcblx0XHRcdHRoaXMuaW5mb1BhbmVsLnVwZGF0ZSgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnBsYXlCdXR0b25FbCkge1xuXHRcdFx0dGhpcy5wbGF5QnV0dG9uRWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgYFBsYXkgdmlkZW8gJHt0aGlzLnZpZGVvRGF0YS50aXRsZX1gKTtcblx0XHR9XG5cdH1cblxuXHR1cGRhdGUobmV3T3B0cykge1xuXHRcdGlmICh0aGlzLnZpZGVvRWwpIHtcblx0XHRcdHRoaXMudmlkZW9FbC5wYXVzZSgpO1xuXHRcdH1cblx0XHR0aGlzLmNsZWFyQ3VycmVudGx5UGxheWluZygpO1xuXG5cdFx0dGhpcy5kaWRVc2VyUHJlc3NQbGF5ID0gZmFsc2U7XG5cblx0XHR0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHRoaXMub3B0cywgeyBkYXRhOiBudWxsIH0sIG5ld09wdHMpO1xuXG5cdFx0aWYgKCF0aGlzLnZpZGVvRWwgJiYgIXRoaXMucGxhY2Vob2xkZXJFbCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLmdldERhdGEoKS50aGVuKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLnBsYWNlaG9sZGVyRWwpIHtcblx0XHRcdFx0dGhpcy51cGRhdGVQbGFjZWhvbGRlcigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy51cGRhdGVWaWRlbygpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0UHJvZ3Jlc3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbC5kdXJhdGlvbiA/IHBhcnNlSW50KDEwMCAqIHRoaXMudmlkZW9FbC5jdXJyZW50VGltZSAvIHRoaXMudmlkZW9FbC5kdXJhdGlvbiwgMTApIDogMDtcblx0fVxuXG5cdGdldER1cmF0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnZpZGVvRWwuZHVyYXRpb24gPyBwYXJzZUludCh0aGlzLnZpZGVvRWwuZHVyYXRpb24sIDEwKSA6IDA7XG5cdH1cblxuXHRnZXRUcmFja01vZGUoKSB7XG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbC50ZXh0VHJhY2tzICYmIHRoaXMudmlkZW9FbC50ZXh0VHJhY2tzWzBdID8gdGhpcy52aWRlb0VsLnRleHRUcmFja3NbMF0ubW9kZSA6IHVuZGVmaW5lZDtcblx0fVxuXG5cdGdldEFtb3VudFdhdGNoZWQoZGVjaW1hbFBvaW50cykge1xuXHRcdGNvbnN0IHNlY29uZHNXYXRjaGVkID0gdGhpcy5hbW91bnRXYXRjaGVkIC8gMTAwMDtcblx0XHRyZXR1cm4gZGVjaW1hbFBvaW50cyAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHNlY29uZHNXYXRjaGVkLnRvRml4ZWQoZGVjaW1hbFBvaW50cykpIDogc2Vjb25kc1dhdGNoZWQ7XG5cdH1cblxuXHRnZXRBbW91bnRXYXRjaGVkUGVyY2VudGFnZShkZWNpbWFsUG9pbnRzKSB7XG5cdFx0Y29uc3QgcGVyY2VudGFnZVdhdGNoZWQgPSB0aGlzLnZpZGVvRWwgJiYgdGhpcy52aWRlb0VsLmR1cmF0aW9uID8gMTAwIC8gdGhpcy52aWRlb0VsLmR1cmF0aW9uICogdGhpcy5nZXRBbW91bnRXYXRjaGVkKCkgOiAwO1xuXHRcdHJldHVybiBkZWNpbWFsUG9pbnRzICE9PSB1bmRlZmluZWQgPyBOdW1iZXIocGVyY2VudGFnZVdhdGNoZWQudG9GaXhlZChkZWNpbWFsUG9pbnRzKSkgOiBwZXJjZW50YWdlV2F0Y2hlZDtcblx0fVxuXG5cdHBhdXNlT3RoZXJWaWRlb3MoKSB7XG5cdFx0aWYgKHRoaXMuY3VycmVudGx5UGxheWluZ1ZpZGVvICYmIHRoaXMuY3VycmVudGx5UGxheWluZ1ZpZGVvICE9PSB0aGlzLnZpZGVvRWwpIHtcblx0XHRcdHRoaXMuY3VycmVudGx5UGxheWluZ1ZpZGVvLnBhdXNlKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jdXJyZW50bHlQbGF5aW5nVmlkZW8gPSB0aGlzLnZpZGVvRWw7XG5cdH1cblxuXHRjbGVhckN1cnJlbnRseVBsYXlpbmcoKSB7XG5cdFx0aWYgKHRoaXMuY3VycmVudGx5UGxheWluZ1ZpZGVvICE9PSB0aGlzLnZpZGVvRWwpIHtcblx0XHRcdHRoaXMuY3VycmVudGx5UGxheWluZ1ZpZGVvID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRtYXJrUGxheVN0YXJ0ICgpIHtcblx0XHR0aGlzLnBsYXlTdGFydCA9IERhdGUubm93KCk7XG5cdH1cblxuXHR1cGRhdGVBbW91bnRXYXRjaGVkICgpIHtcblx0XHRpZiAodGhpcy5wbGF5U3RhcnQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy5hbW91bnRXYXRjaGVkICs9IERhdGUubm93KCkgLSB0aGlzLnBsYXlTdGFydDtcblx0XHRcdHRoaXMucGxheVN0YXJ0ID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXG5cdHJlc2V0QW1vdW50V2F0Y2hlZCAoKSB7XG5cdFx0dGhpcy5hbW91bnRXYXRjaGVkID0gMDtcblx0fVxuXG5cdHNob3dHdWlkYW5jZUJhbm5lciAoKSB7XG5cdFx0Y29uc3QgeyBjYXB0aW9uc1VybCB9ID0gdGhpcy52aWRlb0RhdGEgfHwge307XG5cdFx0aWYgKCF0aGlzLmRpZFVzZXJQcmVzc1BsYXkgJiYgIWNhcHRpb25zVXJsICYmIHRoaXMuZ3VpZGFuY2UpIHtcblx0XHRcdHRoaXMuY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5ndWlkYW5jZS5jcmVhdGVCYW5uZXIoKSk7XG5cdFx0fVxuXHR9XG5cblx0ZGVzdHJveSAoKSB7XG5cdFx0Ly8gcmVtb3ZlIGxpc3RlbmVyc1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKHVubG9hZEV2ZW50TmFtZSwgdGhpcy5maXJlV2F0Y2hlZEV2ZW50KTtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0LnZpc2liaWxpdHknLCB0aGlzLnZpc2liaWxpdHlMaXN0ZW5lcik7XG5cdH1cblxuXHRzdGF0aWMgaW5pdChyb290RWwsIGNvbmZpZykge1xuXHRcdGNvbnN0IHZpZGVvcyA9IFtdO1xuXHRcdGlmICghcm9vdEVsKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5ib2R5O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHJvb3RFbCA9PT0gJ3N0cmluZycpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iocm9vdEVsKTtcblx0XHR9XG5cblx0XHRjb25zdCB2aWRlb0VscyA9IHJvb3RFbC5xdWVyeVNlbGVjdG9yQWxsKCc6bm90KFtkYXRhLW8tdmlkZW8tanNdKVtkYXRhLW8tY29tcG9uZW50fj1cIm8tdmlkZW9cIl0nKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdmlkZW9FbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZpZGVvcy5wdXNoKG5ldyBWaWRlbyh2aWRlb0Vsc1tpXSwgY29uZmlnKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZpZGVvcztcblx0fVxufVxuXG5WaWRlby5QbGF5bGlzdCA9IFBsYXlsaXN0O1xuXG5leHBvcnQgZGVmYXVsdCBWaWRlbztcbiIsImltcG9ydCBPVmlkZW8gZnJvbSAnLi4vLi4vc3JjL2pzL3ZpZGVvLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cdGNvbnN0IHZpZGVvID0gbmV3IE9WaWRlbyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1vLWNvbXBvbmVudD1cIm8tdmlkZW9cIl0nKSk7XG5cblx0Y29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0Jyk7XG5cblx0aWYgKHNlbGVjdCkge1xuXHRcdHNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2aWRlby51cGRhdGUoeyBpZDogdGhpcy52YWx1ZSB9KTtcblx0XHR9KTtcblxuXHRcdHNlbGVjdC52YWx1ZSA9IHZpZGVvLm9wdHMuaWQ7XG5cdH1cbn0pO1xuIl19