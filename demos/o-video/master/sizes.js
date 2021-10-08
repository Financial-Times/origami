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
  var video_default = Video; // demos/src/sizes.js

  document.addEventListener("DOMContentLoaded", function () {
    video_default.init();
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCIuLi9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4uL28tdmlld3BvcnQvbWFpbi5qcyIsInNyYy9qcy9oZWxwZXJzL3N1cHBvcnRlZC1mb3JtYXRzLmpzIiwic3JjL2pzL2hlbHBlcnMvZ2V0LXJlbmRpdGlvbi5qcyIsInNyYy9qcy9hZHMuanMiLCJzcmMvanMvaW5mby5qcyIsInNyYy9qcy9wbGF5bGlzdC5qcyIsInNyYy9qcy9ndWlkYW5jZS5qcyIsInNyYy9qcy92aWRlby5qcyIsImRlbW9zL3NyYy9zaXplcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWFBLFdBQUEsUUFBQSxDQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QjtBQUM3QixRQUFJLE9BQUo7QUFDQSxXQUFPLFlBQVc7QUFBQTs7QUFDakIsVUFBTSxJQUFBLEdBQU8sU0FBYjs7QUFDQSxVQUFNLEtBQUEsR0FBUSxTQUFSLEtBQVEsR0FBTTtBQUNuQixRQUFBLE9BQUEsR0FBVSxJQUFWO0FBQ0EsUUFBQSxJQUFBLENBQUssS0FBTCxDQUFXLEtBQVgsRUFBaUIsSUFBakI7QUFBaUIsT0FGbEI7O0FBSUEsTUFBQSxZQUFBLENBQWEsT0FBYixDQUFBO0FBQ0EsTUFBQSxPQUFBLEdBQVUsVUFBQSxDQUFXLEtBQVgsRUFBa0IsSUFBbEIsQ0FBVjtBQUE0QixLQVA3QjtBQU82Qjs7QUFnQjlCLFdBQUEsUUFBQSxDQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QjtBQUM3QixRQUFJLE9BQUo7QUFDQSxXQUFPLFlBQVc7QUFBQTs7QUFDakIsVUFBSSxPQUFKLEVBQWE7QUFDWjtBQUFBOztBQUVELFVBQU0sSUFBQSxHQUFPLFNBQWI7O0FBQ0EsVUFBTSxLQUFBLEdBQVEsU0FBUixLQUFRLEdBQU07QUFDbkIsUUFBQSxPQUFBLEdBQVUsSUFBVjtBQUNBLFFBQUEsSUFBQSxDQUFLLEtBQUwsQ0FBVyxNQUFYLEVB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QUFTLFFBQUEsQ0FBUyxJQUFsQjtBQUFrQixTQURuQixNQUNtQixJQUNSLE9BQU8sTUFBUCxLQUFrQixRQURWLEVBQ29CO0FBQ3RDLFVBQUEsTUFBQSxHQUFTLFFBQUEsQ0FBUyxhQUFULENBQXVCLE1BQXZCLENBQVQ7QUFBZ0M7O0FBR2pDLFlBQU0sUUFBQSxHQUFXLE1BQUEsQ0FBTyxnQkFBUCxDQUF3QixzREFBeEIsQ0FBakI7O0FBRUEsYUFBQSxJQUFTLENBQUEsR0FBSSxDQUFiLEVBQWdCLENBQUEsR0FBSSxRQUFBLENBQVMsTUFBN0IsRUFBcUMsQ0FBQSxFQUFyQyxFQUEwQztBQUN6QyxVQUFBLE1BQUEsQ0FBTyxJQUFQLENBQVksSUFBSSxLQUFKLENBQVUsUUFBQSxDQUFTLENBQVQsQ0FBVixFQUF1QixNQUF2QixDQUFaO0FBQW1DOztBQUdwQyxlQUFPLE1BQVA7QUFBTztBQXJXVDs7QUFBQTtBQUFBLEtBQUE7O0FBeVdBLEVBQUEsS0FBQSxDQUFNLFFBQU4sR0FBaUIsZ0JBQWpCO0FBRUEsTUFBTyxhQUFBLEdBQVEsS0FBZixDOztBQzVnQkEsRUFBQSxRQUFBLENBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDeEQsSUFBQSxhQUFBLENBQU8sSUFBUDtBQUFPLEdBRFIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbipcbiogRGVib3VuY2VzIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIGFmdGVyIG4gbWlsbGlzZWNvbmRzXG4qIHdpdGhvdXQgaXQgbm90IGJlaW5nIGNhbGxlZFxuKlxuKiBAZXhhbXBsZVxuKiBVdGlscy5kZWJvdW5jZShteUZ1bmN0aW9uKCkge30sIDEwMCk7XG4qXG4qIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB0byBiZSBkZWJvdW5jZWRcbiogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBUaW1lIGluIG1pbGlzZWNvbmRzXG4qXG4qIEByZXR1cm5zIHtGdW5jdGlvbn0gLSBEZWJvdW5jZWQgZnVuY3Rpb25cbiovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0KSB7XG5cdGxldCB0aW1lb3V0O1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50cztcblx0XHRjb25zdCBsYXRlciA9ICgpID0+IHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0ZnVuYy5hcHBseSh0aGlzLCBhcmdzKTtcblx0XHR9O1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbi8qKlxuKlxuKiBUaHJvdHRsZSBmdW5jdGlvbiBzbyBpdCBpcyBvbmx5IGNhbGxlZCBvbmNlIGV2ZXJ5IG4gbWlsbGlzZWNvbmRzXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLnRocm90dGxlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIHRocm90dGxlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIFRocm90dGxlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cdH07XG59XG5cbmV4cG9ydCB7XG5cdGRlYm91bmNlLFxuXHR0aHJvdHRsZVxufTtcbiIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby11dGlscyc7XG5cbmxldCBkZWJ1ZztcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZVxuICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldFxuICovXG5mdW5jdGlvbiBicm9hZGNhc3QoZXZlbnRUeXBlLCBkYXRhLCB0YXJnZXQpIHtcblx0dGFyZ2V0ID0gdGFyZ2V0IHx8IGRvY3VtZW50LmJvZHk7XG5cblx0aWYgKGRlYnVnKSB7XG5cdFx0Y29uc29sZS5sb2coJ28tdmlld3BvcnQnLCBldmVudFR5cGUsIGRhdGEpO1xuXHR9XG5cblx0dGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdvVmlld3BvcnQuJyArIGV2ZW50VHlwZSwge1xuXHRcdGRldGFpbDogZGF0YSxcblx0XHRidWJibGVzOiB0cnVlXG5cdH0pKTtcbn1cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgaGVpZ2h0LlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciBoZWlnaHQuXG4qIEByZXR1cm4ge251bWJlcn1cbiovXG5mdW5jdGlvbiBnZXRIZWlnaHQoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4gaWdub3JlU2Nyb2xsYmFycyA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgOiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG59XG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoLlxuKiBAcGFyYW0ge2Jvb2xlYW59IGlnbm9yZVNjcm9sbGJhcnMgW2ZhbHNlXSAtIHNldCB0byB0cnVlIHRvIGRpc2NvdW50IHNjcm9sbGJhciB3aWR0aFxuKiBAcmV0dXJuIHtudW1iZXJ9XG4qL1xuZnVuY3Rpb24gZ2V0V2lkdGgoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4gaWdub3JlU2Nyb2xsYmFycyA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG59XG5cbi8qKlxuICogVmlld3BvcnQgc2l6ZS5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNpemVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBoZWlnaHRcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aFxuICovXG5cbi8qKlxuKiBHZXQgdGhlIHZpZXdwb3J0IHdpZHRoIGFuZCBoZWlnaHQuXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIHdpZHRoL2hlaWdodC5cbiogQHJldHVybiB7U2l6ZX1cbiovXG5mdW5jdGlvbiBnZXRTaXplKGlnbm9yZVNjcm9sbGJhcnMpIHtcblx0cmV0dXJuIHtcblx0XHRoZWlnaHQ6IGdldEhlaWdodChpZ25vcmVTY3JvbGxiYXJzKSxcblx0XHR3aWR0aDogZ2V0V2lkdGgoaWdub3JlU2Nyb2xsYmFycylcblx0fTtcbn1cblxuLyoqXG4gKiBTY3JvbGwgcG9zaXRpb24uXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBTY3JvbGxQb3NpdGlvblxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodCAtIGBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodGBcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3aWR0aCAtIGBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxlZnQgLSBgd2luZG93LnBhZ2VYT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxYYFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHRvcCAtIGB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFlgXG4gKi9cblxuLyoqXG4gKiBAcmV0dXJuIHtTY3JvbGxQb3NpdGlvbn1cbiAqL1xuZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG5cdHJldHVybiB7XG5cdFx0aGVpZ2h0OiBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcblx0XHR3aWR0aDogZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCxcblx0XHRsZWZ0OiB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFgsXG5cdFx0dG9wOiB3aW5kb3cucGFnZVlPZmZzZXQgfHwgd2luZG93LnNjcm9sbFlcblx0fTtcbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtzdHJpbmd9IC0gJ3BvcnRyYWl0JyBvciAnbGFuZHNjYXBlJ1xuICovXG5mdW5jdGlvbiBnZXRPcmllbnRhdGlvbigpIHtcblx0Y29uc3Qgb3JpZW50YXRpb24gPSB3aW5kb3cuc2NyZWVuLm9yaWVudGF0aW9uO1xuXHRpZiAob3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm4gdHlwZW9mIG9yaWVudGF0aW9uID09PSAnc3RyaW5nJyA/XG5cdFx0XHRvcmllbnRhdGlvbi5zcGxpdCgnLScpWzBdIDpcblx0XHRcdG9yaWVudGF0aW9uLnR5cGUuc3BsaXQoJy0nKVswXTtcblx0fSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYSkge1xuXHRcdHJldHVybiB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBwb3J0cmFpdCknKS5tYXRjaGVzID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBnZXRIZWlnaHQoKSA+PSBnZXRXaWR0aCgpID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnO1xuXHR9XG59XG5cbi8qKlxuICogQHJldHVybiB7Ym9vbGVhbn0gLSB0cnVlIGlmIHRoZSB2aWV3cG9ydCBpcyB2aXNpYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFZpc2liaWxpdHkoKSB7XG5cdHJldHVybiBkb2N1bWVudC5oaWRkZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGVidWc6IGZ1bmN0aW9uKCkge1xuXHRcdGRlYnVnID0gdHJ1ZTtcblx0fSxcblx0YnJvYWRjYXN0LFxuXHRnZXRXaWR0aCxcblx0Z2V0SGVpZ2h0LFxuXHRnZXRTaXplLFxuXHRnZXRTY3JvbGxQb3NpdGlvbixcblx0Z2V0VmlzaWJpbGl0eSxcblx0Z2V0T3JpZW50YXRpb24sXG5cdGRlYm91bmNlOiBVdGlscy5kZWJvdW5jZSxcblx0dGhyb3R0bGU6IFV0aWxzLnRocm90dGxlXG59O1xuIiwiaW1wb3J0IHV0aWxzIGZyb20gJy4vc3JjL3V0aWxzLmpzJztcblxuY29uc3QgdGhyb3R0bGUgPSB1dGlscy50aHJvdHRsZTtcbmNvbnN0IGRlYm91bmNlID0gdXRpbHMuZGVib3VuY2U7XG5cbmNvbnN0IGxpc3RlbmVycyA9IHt9O1xuY29uc3QgaW50ZXJ2YWxzID0ge1xuXHRyZXNpemU6IDEwMCxcblx0b3JpZW50YXRpb246IDEwMCxcblx0dmlzaWJpbGl0eTogMTAwLFxuXHRzY3JvbGw6IDEwMFxufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IHRvIHRocm90dGxlIGZvciB0aGlzIGR1cmF0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IGludGVydmFsIC0gVGhlIGR1cmF0aW9uIHRvIHRocm90dGxlIGluIG1zLlxuICogQHJldHVybnMge3ZvaWR9XG4gKiBAZXhhbXBsZVxuICogXHQgICAvLyB0aHJvdHRsZSBmb3IgZGlmZmVyZW50IGV2ZW50cyBhdCBkaWZmZXJlbnQgZHVyYXRpb25zXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgnc2Nyb2xsJywgMTAwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Jlc2l6ZScsIDMwMClcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIDMwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ3Zpc2liaWxpdHknLCAzMClcbiAqIFx0XHQvLyB0aHJvdHRsZSBhbGwgZXZlbnRzIGF0IDMwbXNcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKDMwKTtcbiAqL1xuZnVuY3Rpb24gc2V0VGhyb3R0bGVJbnRlcnZhbChldmVudFR5cGUsIGludGVydmFsKSB7XG5cdGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnbnVtYmVyJykge1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ3Njcm9sbCcsIGFyZ3VtZW50c1swXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgYXJndW1lbnRzWzFdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdvcmllbnRhdGlvbicsIGFyZ3VtZW50c1syXSk7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgndmlzaWJpbGl0eScsIGFyZ3VtZW50c1szXSk7XG5cdH0gZWxzZSBpZiAoaW50ZXJ2YWwpIHtcblx0XHRpbnRlcnZhbHNbZXZlbnRUeXBlXSA9IGludGVydmFsO1xuXHR9XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvUmVzaXplKCkge1xuXHRpZiAobGlzdGVuZXJzLnJlc2l6ZSkge1xuXHRcdHJldHVybjtcblx0fVxuXHRjb25zdCBldmVudFR5cGUgPSAncmVzaXplJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdyZXNpemUnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnJlc2l6ZSk7XG5cblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMucmVzaXplID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9PcmllbnRhdGlvbigpIHtcblxuXHRpZiAobGlzdGVuZXJzLm9yaWVudGF0aW9uKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ29yaWVudGF0aW9uY2hhbmdlJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdvcmllbnRhdGlvbicsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRvcmllbnRhdGlvbjogdXRpbHMuZ2V0T3JpZW50YXRpb24oKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy5vcmllbnRhdGlvbik7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLm9yaWVudGF0aW9uID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9WaXNpYmlsaXR5KCkge1xuXG5cdGlmIChsaXN0ZW5lcnMudmlzaWJpbGl0eSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IGV2ZW50VHlwZSA9ICd2aXNpYmlsaXR5Y2hhbmdlJztcblx0Y29uc3QgaGFuZGxlciA9IGRlYm91bmNlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCd2aXNpYmlsaXR5Jywge1xuXHRcdFx0aGlkZGVuOiB1dGlscy5nZXRWaXNpYmlsaXR5KCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMudmlzaWJpbGl0eSk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuXHRsaXN0ZW5lcnMudmlzaWJpbGl0eSA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogQGFjY2VzcyBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvU2Nyb2xsKCkge1xuXG5cdGlmIChsaXN0ZW5lcnMuc2Nyb2xsKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Njcm9sbCc7XG5cdGNvbnN0IGhhbmRsZXIgPSB0aHJvdHRsZShmdW5jdGlvbihldikge1xuXHRcdGNvbnN0IHNjcm9sbFBvcyA9IHV0aWxzLmdldFNjcm9sbFBvc2l0aW9uKCk7XG5cdFx0dXRpbHMuYnJvYWRjYXN0KCdzY3JvbGwnLCB7XG5cdFx0XHR2aWV3cG9ydDogdXRpbHMuZ2V0U2l6ZSgpLFxuXHRcdFx0c2Nyb2xsSGVpZ2h0OiBzY3JvbGxQb3MuaGVpZ2h0LFxuXHRcdFx0c2Nyb2xsTGVmdDogc2Nyb2xsUG9zLmxlZnQsXG5cdFx0XHRzY3JvbGxUb3A6IHNjcm9sbFBvcy50b3AsXG5cdFx0XHRzY3JvbGxXaWR0aDogc2Nyb2xsUG9zLndpZHRoLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLnNjcm9sbCk7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblx0bGlzdGVuZXJzLnNjcm9sbCA9IHtcblx0XHRldmVudFR5cGU6IGV2ZW50VHlwZSxcblx0XHRoYW5kbGVyOiBoYW5kbGVyXG5cdH07XG59XG5cbi8qKlxuICogU3RhcnQgbGlzdGVuaW5nIGZvciBhbiBldmVudChzKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdG8gc3RhcnQgbGlzdGVuaW5nIGZvci4gT25lIG9mIGByZXNpemVgLCBgc2Nyb2xsYCwgYG9yaWVudGF0aW9uYCwgYHZpc2liaWxpdHlgIG9yIGBhbGxgLlxuICogQGV4YW1wbGVcbiAqIFx0XHQvLyBTdGFydCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCdhbGwnKTtcbiAqXG4gKiBcdFx0Ly8gSXQgaXMgbm93IHBvc3NpYmxlIHRvIGxpc3RlbiBmb3IgZGVib3VuY2Ugby12aWV3cG9ydCBldmVudHMgc3VjaCBhcyBgb1ZpZXdwb3J0Lm9yaWVudGF0aW9uYC5cbiAqICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdvVmlld3BvcnQub3JpZW50YXRpb24nLCBmdW5jdGlvbihldmVudCkge1xuICogICAgICBcdGNvbnNvbGUubG9nKGV2ZW50LnR5cGUpOyAvLyBvVmlld3BvcnQub3JpZW50YXRpb25cbiAqICAgICAgfSk7XG4gKi9cbmZ1bmN0aW9uIGxpc3RlblRvKGV2ZW50VHlwZSkge1xuXHRpZiAoZXZlbnRUeXBlID09PSAncmVzaXplJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9SZXNpemUoKTtcblx0fVxuXG5cdGlmIChldmVudFR5cGUgPT09ICdzY3JvbGwnIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Njcm9sbCgpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ29yaWVudGF0aW9uJyB8fCBldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0bGlzdGVuVG9PcmllbnRhdGlvbigpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Zpc2liaWxpdHknIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Zpc2liaWxpdHkoKTtcblx0fVxufVxuXG4vKipcbiAqIFN0b3AgbGlzdGVuaW5nIGZvciBhbiBldmVudChzKS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFR5cGUgLSBUaGUgZXZlbnQgdG8gc3RvcCBsaXN0ZW5pbmcgZm9yLiBPbmUgb2YgYHJlc2l6ZWAsIGBzY3JvbGxgLCBgb3JpZW50YXRpb25gLCBgdmlzaWJpbGl0eWAgb3IgYGFsbGAuXG4gKiBAZXhhbXBsZVxuICogXHRcdC8vIFN0YXJ0IGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQubGlzdGVuVG8oJ2FsbCcpO1xuICogXHRcdC8vIFdlJ3JlIGRvbmUuIFN0b3AgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5zdG9wTGlzdGVuaW5nVG8oJ2FsbCcpO1xuICovXG5mdW5jdGlvbiBzdG9wTGlzdGVuaW5nVG8oZXZlbnRUeXBlKSB7XG5cdGlmIChldmVudFR5cGUgPT09ICdhbGwnKSB7XG5cdFx0T2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKHN0b3BMaXN0ZW5pbmdUbyk7XG5cdH0gZWxzZSBpZiAobGlzdGVuZXJzW2V2ZW50VHlwZV0pIHtcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcnNbZXZlbnRUeXBlXS5ldmVudFR5cGUsIGxpc3RlbmVyc1tldmVudFR5cGVdLmhhbmRsZXIpO1xuXHRcdGRlbGV0ZSBsaXN0ZW5lcnNbZXZlbnRUeXBlXTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGRlYnVnOiBmdW5jdGlvbiAoKSB7XG5cdFx0dXRpbHMuZGVidWcoKTtcblx0fSxcblx0bGlzdGVuVG8sXG5cdHN0b3BMaXN0ZW5pbmdUbyxcblx0c2V0VGhyb3R0bGVJbnRlcnZhbCxcblx0Z2V0T3JpZW50YXRpb246IHV0aWxzLmdldE9yaWVudGF0aW9uLFxuXHRnZXRTaXplOiB1dGlscy5nZXRTaXplLFxuXHRnZXRTY3JvbGxQb3NpdGlvbjogdXRpbHMuZ2V0U2Nyb2xsUG9zaXRpb24sXG5cdGdldFZpc2liaWxpdHk6IHV0aWxzLmdldFZpc2liaWxpdHlcbn07XG4iLCJjb25zdCBmb3JtYXRzID0ge1xuXHRtcGVnNDogW1xuXHRcdCd2aWRlby9tcDQ7IGNvZGVjcz1cIm1wNHYuMjAuOFwiJ1xuXHRdLFxuXHRoMjY0OiBbXG5cdFx0J3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUVcIicsXG5cdFx0J3ZpZGVvL21wNDsgY29kZWNzPVwiYXZjMS40MkUwMUUsIG1wNGEuNDAuMlwiJ1xuXHRdLFxuXHRvZ2c6IFtcblx0XHQndmlkZW8vb2dnOyBjb2RlY3M9XCJ0aGVvcmFcIidcblx0XSxcblx0d2VibTogW1xuXHRcdCd2aWRlby93ZWJtOyBjb2RlY3M9XCJ2cDgsIHZvcmJpc1wiJ1xuXHRdXG59O1xuXG5mdW5jdGlvbiBzdXBwb3J0ZWRGb3JtYXRzICgpIHtcblx0Y29uc3QgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcblx0Y29uc3Qgc3VwcG9ydGVkID0gW107XG5cblx0dHJ5IHtcblx0XHRPYmplY3Qua2V5cyhmb3JtYXRzKS5mb3JFYWNoKGZvcm1hdCA9PiB7XG5cdFx0XHRpZiAoZm9ybWF0c1tmb3JtYXRdLnNvbWUodHlwZSA9PiB0ZXN0RWwuY2FuUGxheVR5cGUodHlwZSkpKSB7XG5cdFx0XHRcdHN1cHBvcnRlZC5wdXNoKGZvcm1hdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0gY2F0Y2goZSkgeyB9XG5cblx0cmV0dXJuIHN1cHBvcnRlZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3VwcG9ydGVkRm9ybWF0cztcbiIsImltcG9ydCBzdXBwb3J0ZWRGb3JtYXRzIGZyb20gJy4vc3VwcG9ydGVkLWZvcm1hdHMuanMnO1xuXG5mdW5jdGlvbiBnZXRSZW5kaXRpb24ocmVuZGl0aW9ucywgb3B0aW9ucykge1xuXHQvLyBhbGxvdyBtb2NraW5nIG9mIHN1cHBvcnRlZCBmb3JtYXRzIG1vZHVsZVxuXHRjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcblx0Y29uc3Qgd2lkdGggPSBvcHRzLm9wdGltdW12aWRlb3dpZHRoO1xuXHRjb25zdCBmb3JtYXRzID0gb3B0cy5zdXBwb3J0ZWRGb3JtYXRzIHx8IHN1cHBvcnRlZEZvcm1hdHMoKTtcblx0bGV0IGFwcHJvcHJpYXRlUmVuZGl0aW9uO1xuXHQvLyBvcmRlciBzbWFsbGVzdCB0byBsYXJnZXN0XG5cdGNvbnN0IG9yZGVyZWRSZW5kaXRpb25zID0gcmVuZGl0aW9uc1xuXHRcdC5maWx0ZXIocmVuZGl0aW9uID0+IHtcblx0XHRcdHJldHVybiBmb3JtYXRzLmluZGV4T2YocmVuZGl0aW9uLmNvZGVjLnRvTG93ZXJDYXNlKCkpID4gLTE7XG5cdFx0fSlcblx0XHQuc29ydCgocmVuZGl0aW9uT25lLCByZW5kaXRpb25Ud28pID0+IHtcblx0XHRcdHJldHVybiByZW5kaXRpb25PbmUucGl4ZWxXaWR0aCAtIHJlbmRpdGlvblR3by5waXhlbFdpZHRoO1xuXHRcdH0pO1xuXG5cdC8vIGlmIG5vIHdpZHRoIHN1cHBsaWVkLCBnZXQgbGFyZ2VzdFxuXHRpZiAoIXdpZHRoKSB7XG5cdFx0cmV0dXJuIG9yZGVyZWRSZW5kaXRpb25zLnBvcCgpO1xuXHR9XG5cdC8vIE5PVEU6IHJhdGhlciB1c2UgZmluZC4uLlxuXHRvcmRlcmVkUmVuZGl0aW9ucy5zb21lKHJlbmRpdGlvbiA9PiB7XG5cdFx0aWYgKHJlbmRpdGlvbi5waXhlbFdpZHRoID49IHdpZHRoKSB7XG5cdFx0XHRhcHByb3ByaWF0ZVJlbmRpdGlvbiA9IHJlbmRpdGlvbjtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pO1xuXG5cdHJldHVybiBhcHByb3ByaWF0ZVJlbmRpdGlvbiB8fCBvcmRlcmVkUmVuZGl0aW9ucy5wb3AoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0UmVuZGl0aW9uO1xuIiwiLyogZ2xvYmFsIGdvb2dsZSAqL1xuXG5sZXQgc2RrU2NyaXB0TG9hZGVkID0gZmFsc2U7XG5sZXQgc2RrU2NyaXB0RXJyb3IgPSBudWxsO1xuXG5mdW5jdGlvbiBjcmVhdGVWaWRlb092ZXJsYXlFbGVtZW50KCkge1xuXHRjb25zdCBvdmVybGF5RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0b3ZlcmxheUVsLmNsYXNzTGlzdC5hZGQoJ28tdmlkZW9fX292ZXJsYXknKTtcblx0cmV0dXJuIG92ZXJsYXlFbDtcbn1cblxuY2xhc3MgVmlkZW9BZHMge1xuXHRjb25zdHJ1Y3Rvcih2aWRlbykge1xuXHRcdHRoaXMudmlkZW8gPSB2aWRlbztcblxuXHRcdC8vIG9ubHkgd2hlbiB0aGVzZSB0aHJlZSBjb25kaXRpb25zIGFyZSBtZXQgd2lsbCB0aGUgdmlkZW8gcGxheVxuXHRcdHRoaXMuYWRzTG9hZGVkID0gZmFsc2U7XG5cdFx0dGhpcy52aWRlb0xvYWRlZCA9IGZhbHNlO1xuXHRcdHRoaXMubG9hZGluZ1N0YXRlRGlzcGxheWVkID0gZmFsc2U7XG5cblx0XHQvLyByZWNvcmQgd2hlbiB0aGUgYWR2ZXJ0IGhhcyBjb21wbGV0ZWRcblx0XHR0aGlzLmFkc0NvbXBsZXRlZCA9IGZhbHNlO1xuXHR9XG5cblx0c3RhdGljIGxvYWRBZHNMaWJyYXJ5KCkge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRsZXQgZ29vZ2xlU2RrU2NyaXB0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3NyYz1cIi8vaW1hc2RrLmdvb2dsZWFwaXMuY29tL2pzL3Nka2xvYWRlci9pbWEzLmpzXCJdJyk7XG5cblx0XHRcdGlmICghZ29vZ2xlU2RrU2NyaXB0KSB7XG5cdFx0XHRcdGdvb2dsZVNka1NjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXHRcdFx0XHRnb29nbGVTZGtTY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuXHRcdFx0XHRnb29nbGVTZGtTY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCBgLy9pbWFzZGsuZ29vZ2xlYXBpcy5jb20vanMvc2RrbG9hZGVyL2ltYTMuanNgKTtcblx0XHRcdFx0Z29vZ2xlU2RrU2NyaXB0LnNldEF0dHJpYnV0ZSgnYXN5bmMnLCB0cnVlKTtcblx0XHRcdFx0Z29vZ2xlU2RrU2NyaXB0LnNldEF0dHJpYnV0ZSgnZGVmZXInLCB0cnVlKTtcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGdvb2dsZVNka1NjcmlwdCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChzZGtTY3JpcHRMb2FkZWQgfHwgd2luZG93Lmdvb2dsZSAmJiB3aW5kb3cuZ29vZ2xlLmltYSkge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKHNka1NjcmlwdEVycm9yKSB7XG5cdFx0XHRcdHJlamVjdChzZGtTY3JpcHRFcnJvcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRnb29nbGVTZGtTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcblx0XHRcdFx0XHRzZGtTY3JpcHRMb2FkZWQgPSB0cnVlO1xuXHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Z29vZ2xlU2RrU2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGUpID0+IHtcblx0XHRcdFx0XHRzZGtTY3JpcHRFcnJvciA9IGU7XG5cdFx0XHRcdFx0cmVqZWN0KGUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGdldFZpZGVvQnJhbmQoKSB7XG5cdFx0aWYgKCF0aGlzLnZpZGVvLnZpZGVvRGF0YSB8fCAhdGhpcy52aWRlby52aWRlb0RhdGEuYnJhbmQgfHwgIXRoaXMudmlkZW8udmlkZW9EYXRhLmJyYW5kLm5hbWUpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMudmlkZW8udmlkZW9EYXRhLmJyYW5kLm5hbWU7XG5cdFx0fVxuXHR9XG5cblx0c2V0VXBBZHMoKSB7XG5cdFx0dGhpcy5hZENvbnRhaW5lckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dGhpcy52aWRlby5jb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmFkQ29udGFpbmVyRWwpO1xuXHRcdHRoaXMuYWREaXNwbGF5Q29udGFpbmVyID0gbmV3IGdvb2dsZS5pbWEuQWREaXNwbGF5Q29udGFpbmVyKHRoaXMuYWRDb250YWluZXJFbCwgdGhpcy52aWRlby52aWRlb0VsKTtcblxuXHRcdC8vIENyZWF0ZSBhZHMgbG9hZGVyLlxuXHRcdHRoaXMuYWRzTG9hZGVyID0gbmV3IGdvb2dsZS5pbWEuQWRzTG9hZGVyKHRoaXMuYWREaXNwbGF5Q29udGFpbmVyKTtcblxuXHRcdC8vIFNldHMgdXAgYmluZGluZ3MgZm9yIGFsbCBBZCByZWxhdGVkIGhhbmRsZXJzXG5cdFx0dGhpcy5hZHNNYW5hZ2VyTG9hZGVkSGFuZGxlciA9IHRoaXMuYWRzTWFuYWdlckxvYWRlZEhhbmRsZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmFkRXJyb3JIYW5kbGVyID0gdGhpcy5hZEVycm9ySGFuZGxlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWRFdmVudEhhbmRsZXIgPSB0aGlzLmFkRXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5jb250ZW50UGF1c2VSZXF1ZXN0SGFuZGxlciA9IHRoaXMuY29udGVudFBhdXNlUmVxdWVzdEhhbmRsZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbnRlbnRSZXN1bWVSZXF1ZXN0SGFuZGxlciA9IHRoaXMuY29udGVudFJlc3VtZVJlcXVlc3RIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5nZXRBZFByb2dyZXNzID0gdGhpcy5nZXRBZFByb2dyZXNzLmJpbmQodGhpcyk7XG5cblx0XHQvLyBMaXN0ZW4gYW5kIHJlc3BvbmQgdG8gYWRzIGxvYWRlZCBhbmQgZXJyb3IgZXZlbnRzLlxuXHRcdHRoaXMuYWRzTG9hZGVyLmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XHRnb29nbGUuaW1hLkFkc01hbmFnZXJMb2FkZWRFdmVudC5UeXBlLkFEU19NQU5BR0VSX0xPQURFRCxcblx0XHRcdHRoaXMuYWRzTWFuYWdlckxvYWRlZEhhbmRsZXIsXG5cdFx0XHRmYWxzZSk7XG5cdFx0dGhpcy5hZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsXG5cdFx0XHR0aGlzLmFkRXJyb3JIYW5kbGVyLFxuXHRcdFx0ZmFsc2UpO1xuXG5cdFx0dGhpcy5yZXF1ZXN0QWRzKCk7XG5cblx0XHR0aGlzLnBsYXlBZEV2ZW50SGFuZGxlciA9IHRoaXMucGxheUFkRXZlbnRIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0aWYgKHRoaXMudmlkZW8ub3B0cy5wbGFjZWhvbGRlcikge1xuXHRcdFx0dGhpcy5wbGF5QWRFdmVudEhhbmRsZXIoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vdmVybGF5RWwgPSBjcmVhdGVWaWRlb092ZXJsYXlFbGVtZW50KCk7XG5cdFx0XHR0aGlzLnZpZGVvLmNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheUVsKTtcblx0XHRcdHRoaXMub3ZlcmxheUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wbGF5QWRFdmVudEhhbmRsZXIpO1xuXHRcdH1cblx0fVxuXG5cdHJlcXVlc3RBZHMoKSB7XG5cdFx0Ly8gUmVxdWVzdCB2aWRlbyBhZHMuXG5cdFx0Y29uc3QgYWRzUmVxdWVzdCA9IG5ldyBnb29nbGUuaW1hLkFkc1JlcXVlc3QoKTtcblxuXHRcdGxldCB0YXJnZXRpbmcgPSBgcG9zPSR7dGhpcy52aWRlby50YXJnZXRpbmcucG9zaXRpb259JnR0aWQ9JHt0aGlzLnZpZGVvLnRhcmdldGluZy52aWRlb0lkfWA7XG5cdFx0Y29uc3QgYnJhbmQgPSB0aGlzLmdldFZpZGVvQnJhbmQoKTtcblx0XHRpZiAoYnJhbmQpIHtcblx0XHRcdHRhcmdldGluZyArPSBgJmJyYW5kPSR7YnJhbmR9YDtcblx0XHR9XG5cblx0XHRjb25zdCBhZHZlcnRpc2luZ1VybCA9IGBodHRwOi8vcHViYWRzLmcuZG91YmxlY2xpY2submV0L2dhbXBhZC9hZHM/ZW52PXZwJmdkZnBfcmVxPTEmaW1wbD1zJm91dHB1dD14bWxfdmFzdDImaXU9JHt0aGlzLnZpZGVvLnRhcmdldGluZy5zaXRlfSZzej0ke3RoaXMudmlkZW8udGFyZ2V0aW5nLnNpemVzfSZ1bnZpZXdlZF9wb3NpdGlvbl9zdGFydD0xJnNjcD0ke2VuY29kZVVSSUNvbXBvbmVudCh0YXJnZXRpbmcpfWA7XG5cblx0XHRhZHNSZXF1ZXN0LmFkVGFnVXJsID0gYWR2ZXJ0aXNpbmdVcmw7XG5cblx0XHQvLyBTcGVjaWZ5IHRoZSBsaW5lYXIgYW5kIG5vbmxpbmVhciBzbG90IHNpemVzLiBUaGlzIGhlbHBzIHRoZSBTREtcblx0XHQvLyBzZWxlY3QgdGhlIGNvcnJlY3QgY3JlYXRpdmUgaWYgbXVsdGlwbGUgYXJlIHJldHVybmVkLlxuXHRcdGFkc1JlcXVlc3QubGluZWFyQWRTbG90V2lkdGggPSA1OTI7XG5cdFx0YWRzUmVxdWVzdC5saW5lYXJBZFNsb3RIZWlnaHQgPSAzMzM7XG5cblx0XHRhZHNSZXF1ZXN0Lm5vbkxpbmVhckFkU2xvdFdpZHRoID0gNTkyO1xuXHRcdGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90SGVpZ2h0ID0gMTUwO1xuXG5cdFx0Ly8gVGVtcG9yYXJ5IGZpeCB0byB2ZXJpZnkgREZQIGJlaGF2aW91clxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0Y2F0ZWdvcnk6ICd2aWRlbycsXG5cdFx0XHRcdGFjdGlvbjogJ2FkUmVxdWVzdGVkJyxcblx0XHRcdFx0Y29udGVudElkOiB0aGlzLnZpZGVvLm9wdHMuaWRcblx0XHRcdH0sXG5cdFx0XHRidWJibGVzOiB0cnVlXG5cdFx0fTtcblx0XHRjb25zdCByZXF1ZXN0ZWRFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnb1RyYWNraW5nLmV2ZW50Jywgb3B0aW9ucyk7XG5cdFx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KHJlcXVlc3RlZEV2ZW50KTtcblxuXHRcdHRoaXMuYWRzTG9hZGVyLnJlcXVlc3RBZHMoYWRzUmVxdWVzdCk7XG5cdH1cblxuXHRhZHNNYW5hZ2VyTG9hZGVkSGFuZGxlcihhZHNNYW5hZ2VyTG9hZGVkRXZlbnQpIHtcblx0XHQvLyBHZXQgdGhlIGFkcyBtYW5hZ2VyLlxuXHRcdGNvbnN0IGFkc1JlbmRlcmluZ1NldHRpbmdzID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVuZGVyaW5nU2V0dGluZ3MoKTtcblx0XHRhZHNSZW5kZXJpbmdTZXR0aW5ncy5yZXN0b3JlQ3VzdG9tUGxheWJhY2tTdGF0ZU9uQWRCcmVha0NvbXBsZXRlID0gdHJ1ZTtcblx0XHR0aGlzLmFkc01hbmFnZXIgPSBhZHNNYW5hZ2VyTG9hZGVkRXZlbnQuZ2V0QWRzTWFuYWdlcih0aGlzLnZpZGVvLnZpZGVvRWwsIGFkc1JlbmRlcmluZ1NldHRpbmdzKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lcnMgdG8gdGhlIHJlcXVpcmVkIGV2ZW50cy5cblx0XHR0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXJyb3JFdmVudC5UeXBlLkFEX0VSUk9SLCB0aGlzLmFkRXJyb3JIYW5kbGVyKTtcblxuXHRcdC8vIFwiRmlyZWQgd2hlbiBjb250ZW50IHNob3VsZCBiZSBwYXVzZWQuIFRoaXMgdXN1YWxseSBoYXBwZW5zIHJpZ2h0IGJlZm9yZSBhbiBhZCBpcyBhYm91dCB0byBjb3ZlciB0aGUgY29udGVudFwiXG5cdFx0dGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09OVEVOVF9QQVVTRV9SRVFVRVNURUQsIHRoaXMuY29udGVudFBhdXNlUmVxdWVzdEhhbmRsZXIpO1xuXG5cdFx0Ly8gXCJGaXJlZCB3aGVuIGNvbnRlbnQgc2hvdWxkIGJlIHJlc3VtZWQuIFRoaXMgdXN1YWxseSBoYXBwZW5zIHdoZW4gYW4gYWQgZmluaXNoZXMgb3IgY29sbGFwc2VzXCJcblx0XHR0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1JFU1VNRV9SRVFVRVNURUQsIHRoaXMuY29udGVudFJlc3VtZVJlcXVlc3RIYW5kbGVyKTtcblxuXHRcdC8vIFwiRmlyZWQgd2hlbiB0aGUgYWRzIG1hbmFnZXIgaXMgZG9uZSBwbGF5aW5nIGFsbCB0aGUgYWRzXCJcblx0XHR0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRCwgdGhpcy5hZEV2ZW50SGFuZGxlcik7XG5cblx0XHQvLyBMaXN0ZW4gdG8gYW55IGFkZGl0aW9uYWwgZXZlbnRzLCBpZiBuZWNlc3NhcnkuXG5cdFx0dGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVELCB0aGlzLmFkRXZlbnRIYW5kbGVyKTtcblx0XHR0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVELCB0aGlzLmFkRXZlbnRIYW5kbGVyKTtcblx0XHR0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURSwgdGhpcy5hZEV2ZW50SGFuZGxlcik7XG5cdFx0dGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRCwgdGhpcy5hZEV2ZW50SGFuZGxlcik7XG5cdFx0dGhpcy5hZHNNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBBQkxFX1NUQVRFX0NIQU5HRUQsIHRoaXMuYWRFdmVudEhhbmRsZXIpO1xuXG5cdFx0dGhpcy5hZHNMb2FkZWQgPSB0cnVlO1xuXHRcdHRoaXMuc3RhcnRBZHMoKTtcblx0fVxuXG5cdHN0YXJ0QWRzKCkge1xuXG5cdFx0Ly8gRm9yIGFkcyB0byBwbGF5IGNvcnJlY3RseSBib3RoIHRoZSB2aWRlbyBhbmQgdGhlIGFkdmVydCB2aWRlbyBuZWVkIHRvIGJlIHJlYWR5IHRvXG5cdFx0Ly8gcGxheTsgdGhpcyBmdW5jdGlvbiBuZWVkcyB0byBiZSBjYWxsZWQgYWZ0ZXIgdGhlIHR3byBmbGFncyBpbiBhZHNNYW5hZ2VyTG9hZGVkSGFuZGxlcigpXG5cdFx0Ly8gYW5kIHBsYXlBZEV2ZW50SGFuZGxlcigpIGhhdmUgYmVlbiBzZXQuXG5cdFx0Ly8gU28gaWYgdGhlIHZpZGVvIGhhc24ndCBsb2FkZWQgeWV0LCB3YWl0IHVudGlsIGl0IGhhcy5cblx0XHRpZiAoIXRoaXMudmlkZW9Mb2FkZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBXZSB3YW50IHRvIGRpc3BsYXkgYW4gYWQgbG9hZGluZyBub3RpY2UgZm9yIGEgdGltZSBvbiBzY3JlZW4sIHdlIGRvbid0IHdhbnQgaXQgdG8gZmxpY2tlclxuXHRcdC8vIGFuZCBsZWF2ZSB0aGUgdXNlciB3b25kZXJpbmcgaWYgdGhleSBtaXNzZWQgc29tZXRoaW5nL3RoaW5rIHdlJ3JlIHRlc3Rpbmcgc3VibGltaW5hbCBhZHMhXG5cdFx0aWYgKCF0aGlzLmxvYWRpbmdTdGF0ZURpc3BsYXllZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIElmIGFkcyBoYXZlIGZhaWxlZCB0byBsb2FkLCB3aGljaCByZXNldHMgdGhlIGFkdmVydGlzaW5nIHN1cHBvcnQgZmxhZywgcGxheSB0aGUgdmlkZW9cblx0XHQvLyBpbnN0ZWFkOyBvdGhlcndpc2UsIHdhaXQgdW50aWwgdGhlIGFkcyBoYXZlIGxvYWRlZC5cblx0XHRpZiAoIXRoaXMudmlkZW8ub3B0cy5hZHZlcnRpc2luZykge1xuXHRcdFx0dGhpcy5wbGF5VXNlclZpZGVvKCk7XG5cdFx0fSBlbHNlIGlmICghdGhpcy5hZHNMb2FkZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBSZW1vdmUgdGhlIHByZWxvYWRpbmcgc3Bpbm5lclxuXHRcdGlmICh0aGlzLmxvYWRpbmdTdGF0ZUVsKSB7XG5cdFx0XHR0aGlzLmxvYWRpbmdTdGF0ZUVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5sb2FkaW5nU3RhdGVFbCk7XG5cdFx0XHR0aGlzLmxvYWRpbmdTdGF0ZUVsID0gbnVsbDtcblx0XHR9XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgYWRzIG1hbmFnZXIuIEFkIHJ1bGVzIHBsYXlsaXN0IHdpbGwgc3RhcnQgYXQgdGhpcyB0aW1lLlxuXHRcdFx0dGhpcy5hZHNNYW5hZ2VyLmluaXQodGhpcy52aWRlby52aWRlb0VsLmNsaWVudFdpZHRoLCB0aGlzLnZpZGVvLnZpZGVvRWwuY2xpZW50SGVpZ2h0LCBnb29nbGUuaW1hLlZpZXdNb2RlLk5PUk1BTCk7XG5cdFx0XHQvLyBDYWxsIHBsYXkgdG8gc3RhcnQgc2hvd2luZyB0aGUgYWQuIFNpbmdsZSB2aWRlbyBhbmQgb3ZlcmxheSBhZHMgd2lsbFxuXHRcdFx0Ly8gc3RhcnQgYXQgdGhpcyB0aW1lOyB0aGUgY2FsbCB3aWxsIGJlIGlnbm9yZWQgZm9yIGFkIHJ1bGVzLlxuXHRcdFx0dGhpcy5hZHNNYW5hZ2VyLnN0YXJ0KCk7XG5cdFx0fSBjYXRjaCAoYWRFcnJvcikge1xuXHRcdFx0Ly8gQW4gZXJyb3IgbWF5IGJlIHRocm93biBpZiB0aGVyZSB3YXMgYSBwcm9ibGVtIHdpdGggdGhlIFZBU1QgcmVzcG9uc2UuXG5cdFx0XHR0aGlzLnJlcG9ydEVycm9yKGFkRXJyb3IpO1xuXHRcdFx0dGhpcy5wbGF5VXNlclZpZGVvKCk7XG5cdFx0fVxuXHR9XG5cblx0cGxheUFkRXZlbnRIYW5kbGVyKCkge1xuXHRcdC8vIFNldHMgdGhlIHN0eWxpbmcgbm93IHNvIHRoZSBhZCBvY2N1cGllcyB0aGUgc3BhY2Ugb2YgdGhlIHZpZGVvXG5cdFx0dGhpcy5hZENvbnRhaW5lckVsLmNsYXNzTGlzdC5hZGQoJ28tdmlkZW9fX2FkJyk7XG5cblx0XHQvLyBcIkNhbGwgdGhpcyBtZXRob2QgYXMgYSBkaXJlY3QgcmVzdWx0IG9mIGEgdXNlciBhY3Rpb24gYmVmb3JlIHN0YXJ0aW5nIHRoZSBhZCBwbGF5YmFjay4uLlwiXG5cdFx0Ly8gPGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2ludGVyYWN0aXZlLW1lZGlhLWFkcy9kb2NzL3Nka3MvaHRtbDUvdjMvYXBpcyNpbWEuQWREaXNwbGF5Q29udGFpbmVyLmluaXRpYWxpemU+XG5cdFx0dGhpcy5hZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZSgpO1xuXG5cdFx0Ly8gV2Ugd2FudCB0byBkaXNwbGF5IGEgbG9hZGluZyBzdGF0ZSAtIG90aGVyd2lzZSBpdCBjYW4gbG9va1xuXHRcdC8vIGxpa2Ugd2UncmUgbm90IHJlc3BvbmRpbmcgdG8gdGhlaXIgYWN0aW9uIHdoZW4gd2UncmUgYWN0dWFsbHkgZmV0Y2hpbmcgYW4gYWRcblx0XHR0aGlzLmxvYWRpbmdTdGF0ZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdHRoaXMubG9hZGluZ1N0YXRlRWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ3Byb2dyZXNzYmFyJyk7XG5cdFx0dGhpcy5sb2FkaW5nU3RhdGVFbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0JywgJ0xvYWRpbmcnKTtcblx0XHR0aGlzLmxvYWRpbmdTdGF0ZUVsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19sb2FkaW5nLXN0YXRlJztcblx0XHR0aGlzLmFkQ29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5sb2FkaW5nU3RhdGVFbCk7XG5cblx0XHQvLyBkaXNwbGF5IHRoZSBsb2FkaW5nIHN0YXRlIGZvciBhIG1pbmltdW0gb2YgMiBzZWNvbmRzIHRvIGF2b2lkIGZsaWNrZXJpbmdcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMubG9hZGluZ1N0YXRlRGlzcGxheWVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuc3RhcnRBZHMoKTtcblx0XHR9LCAxMDAwICogMik7XG5cblx0XHRjb25zdCBsb2FkZWRtZXRhZGF0YUhhbmRsZXIgPSAoKSA9PiB7XG5cdFx0XHR0aGlzLnZpZGVvTG9hZGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuc3RhcnRBZHMoKTtcblx0XHRcdHRoaXMudmlkZW8udmlkZW9FbC5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGxvYWRlZG1ldGFkYXRhSGFuZGxlcik7XG5cdFx0fTtcblxuXHRcdHRoaXMudmlkZW8udmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGxvYWRlZG1ldGFkYXRhSGFuZGxlcik7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSB2aWRlby4gTXVzdCBiZSBkb25lIHZpYSBhIHVzZXIgYWN0aW9uIG9uIG1vYmlsZSBkZXZpY2VzLlxuXHRcdHRoaXMudmlkZW8udmlkZW9FbC5sb2FkKCk7XG5cblx0XHRpZiAodGhpcy5vdmVybGF5RWwpIHtcblx0XHRcdHRoaXMub3ZlcmxheUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wbGF5QWRFdmVudEhhbmRsZXIpO1xuXHRcdFx0dGhpcy52aWRlby5jb250YWluZXJFbC5yZW1vdmVDaGlsZCh0aGlzLm92ZXJsYXlFbCk7XG5cdFx0fVxuXHRcdGRlbGV0ZSB0aGlzLm92ZXJsYXlFbDtcblx0fVxuXG5cdGFkRXZlbnRIYW5kbGVyKGFkRXZlbnQpIHtcblx0XHQvLyBSZXRyaWV2ZSB0aGUgYWQgZnJvbSB0aGUgZXZlbnQuIFNvbWUgZXZlbnRzIChlLmcuIEFMTF9BRFNfQ09NUExFVEVEKVxuXHRcdC8vIGRvbid0IGhhdmUgYWQgb2JqZWN0IGFzc29jaWF0ZWQuXG5cdFx0Y29uc3QgYWQgPSBhZEV2ZW50LmdldEFkKCk7XG5cblx0XHRjb25zdCBvcHRpb25zID0ge1xuXHRcdFx0ZGV0YWlsOiB7XG5cdFx0XHRcdGFkdmVydGlzaW5nOiB0cnVlLFxuXHRcdFx0XHRjYXRlZ29yeTogJ3ZpZGVvJyxcblx0XHRcdFx0Y29udGVudElkOiB0aGlzLnZpZGVvLm9wdHMuaWQsXG5cdFx0XHRcdHByb2dyZXNzOiAwLFxuXHRcdFx0XHRhZER1cmF0aW9uOiBhZC5nZXREdXJhdGlvbigpLFxuXHRcdFx0XHRhZE1pbkR1cmF0aW9uOiBhZC5nZXRNaW5TdWdnZXN0ZWREdXJhdGlvbigpLFxuXHRcdFx0XHRhZFRpdGxlOiBhZC5nZXRUaXRsZSgpLFxuXHRcdFx0XHRhZFByb2dyZXNzOiB0aGlzLmdldEFkUHJvZ3Jlc3MoKVxuXHRcdFx0fSxcblx0XHRcdGJ1YmJsZXM6IHRydWVcblx0XHR9O1xuXG5cdFx0c3dpdGNoIChhZEV2ZW50LnR5cGUpIHtcblx0XHRcdGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuTE9BREVEOiB7XG5cdFx0XHRcdC8vIFRoaXMgaXMgdGhlIGZpcnN0IGV2ZW50IHNlbnQgZm9yIGFuIGFkIC0gaXQgaXMgcG9zc2libGUgdG9cblx0XHRcdFx0Ly8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGFkIGlzIGEgdmlkZW8gYWQgb3IgYW4gb3ZlcmxheS5cblx0XHRcdFx0aWYgKCFhZC5pc0xpbmVhcigpKSB7XG5cdFx0XHRcdFx0Ly8gUG9zaXRpb24gQWREaXNwbGF5Q29udGFpbmVyIGNvcnJlY3RseSBmb3Igb3ZlcmxheS5cblx0XHRcdFx0XHQvLyBVc2UgYWQud2lkdGggYW5kIGFkLmhlaWdodC5cblx0XHRcdFx0XHR0aGlzLnBsYXlVc2VyVmlkZW8oKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU1RBUlRFRDoge1xuXHRcdFx0XHQvLyBUaGlzIGV2ZW50IGluZGljYXRlcyB0aGUgYWQgaGFzIHN0YXJ0ZWQgLSB0aGUgdmlkZW8gcGxheWVyXG5cdFx0XHRcdC8vIGNhbiBhZGp1c3QgdGhlIFVJLCBmb3IgZXhhbXBsZSBkaXNwbGF5IGEgcGF1c2UgYnV0dG9uIGFuZFxuXHRcdFx0XHQvLyByZW1haW5pbmcgdGltZS5cblx0XHRcdFx0b3B0aW9ucy5kZXRhaWwuYWN0aW9uID0gJ2FkU3RhcnQnO1xuXHRcdFx0XHRjb25zdCBzdGFydEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvVHJhY2tpbmcuZXZlbnQnLCBvcHRpb25zKTtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KHN0YXJ0RXZlbnQpO1xuXG5cdFx0XHRcdGlmIChhZC5pc0xpbmVhcigpKSB7XG5cdFx0XHRcdFx0Ly8gRm9yIGEgbGluZWFyIGFkLCBhIHRpbWVyIGNhbiBiZSBzdGFydGVkIHRvIHBvbGwgZm9yXG5cdFx0XHRcdFx0Ly8gdGhlIHJlbWFpbmluZyB0aW1lLlxuXHRcdFx0XHRcdC8vIFRPRE86IFdlIGNvdWxkIHVzZSB0aGlzIHRvIGFkZCBhIHNraXAgYWQgYnV0dG9uXG5cdFx0XHRcdFx0Ly8gQ3VycmVudGx5IG5vdCB1c2VkLCBjb3VsZCBiZSB1c2VkIGluIGFuIGludGVydmFsXG5cdFx0XHRcdFx0Ly8gY29uc3QgcmVtYWluaW5nVGltZSA9IHRoaXMuYWRzTWFuYWdlci5nZXRSZW1haW5pbmdUaW1lKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBVc2VycyB3aXRoIHNjcmVlbiByZWFkZXJzIHdpbGwgbG9zZSBjb250cm9sIG9mIHZpZGVvIHdoaWxlIGFkdmVydCBpcyBwbGF5aW5nLFxuXHRcdFx0XHQvLyBzbyB3ZSBleHBsYWluIHdoeSBhbmQgZW5jb3VyYWdlIHRoZW0gdG8gd2FpdCB3aXRoIHRoaXMgbWVzc2FnZS5cblx0XHRcdFx0dGhpcy52aWRlby5saXZlUmVnaW9uRWwuaW5uZXJIVE1MPWBWaWRlbyB3aWxsIHBsYXkgYWZ0ZXIgYWQgaW4gJHtvcHRpb25zLmRldGFpbC5hZER1cmF0aW9ufSBzZWNvbmRzYDtcblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuQ09NUExFVEU6IHtcblxuXHRcdFx0XHRvcHRpb25zLmRldGFpbC5hY3Rpb24gPSAnYWRDb21wbGV0ZSc7XG5cdFx0XHRcdGNvbnN0IGVuZEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvVHJhY2tpbmcuZXZlbnQnLCBvcHRpb25zKTtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KGVuZEV2ZW50KTtcblxuXHRcdFx0XHRpZiAoYWQuaXNMaW5lYXIoKSkge1xuXHRcdFx0XHRcdC8vIFdvdWxkIGJlIHVzZWQgdG8gY2xlYXIgdGhlIGludGVydmFsXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnZpZGVvLmxpdmVSZWdpb25FbC5pbm5lckhUTUw9Jyc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBZGQgdHJhY2tpbmcgZm9yIHdoZW4gYW4gYWR2ZXJ0IGJlY29tZXMgc2tpcHBhYmxlLCBhbmQgd2hldGhlciBpdCdzIHNraXBwZWRcblx0XHRcdGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBBQkxFX1NUQVRFX0NIQU5HRUQ6IHtcblx0XHRcdFx0b3B0aW9ucy5kZXRhaWwuYWN0aW9uID0gJ2FkU2tpcHBhYmxlJztcblx0XHRcdFx0Y29uc3Qgc2tpcHBhYmxlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ29UcmFja2luZy5ldmVudCcsIG9wdGlvbnMpO1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQoc2tpcHBhYmxlRXZlbnQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGNhc2UgZ29vZ2xlLmltYS5BZEV2ZW50LlR5cGUuU0tJUFBFRDoge1xuXHRcdFx0XHRvcHRpb25zLmRldGFpbC5hY3Rpb24gPSAnYWRTa2lwJztcblx0XHRcdFx0Y29uc3Qgc2tpcEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvVHJhY2tpbmcuZXZlbnQnLCBvcHRpb25zKTtcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KHNraXBFdmVudCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5BTExfQURTX0NPTVBMRVRFRDoge1xuXHRcdFx0XHRvcHRpb25zLmRldGFpbC5hY3Rpb24gPSAnYWxsQWRzQ29tcGxldGVkJztcblx0XHRcdFx0Y29uc3QgYWxsQWRzQ29tcGxldGVkRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ29UcmFja2luZy5ldmVudCcsIG9wdGlvbnMpO1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQoYWxsQWRzQ29tcGxldGVkRXZlbnQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6IHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdhZEV2ZW50IGhhcyB0eXBlICcgKyBhZEV2ZW50LnR5cGUgKyAnLCB3aGljaCBpcyBub3QgaGFuZGxlZCBieSBhZEV2ZW50SGFuZGxlcicpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJlcG9ydEVycm9yKGVycm9yKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuXHRcdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29FcnJvcnMubG9nJywgeyBidWJibGVzOiB0cnVlLCBkZXRhaWw6IHsgZXJyb3I6IGVycm9yIH0gfSkpO1xuXHR9XG5cblx0YWRFcnJvckhhbmRsZXIoYWRFcnJvcikge1xuXHRcdC8vIE5PVEU6IGhhcyB0aGUgQVBJIGNoYW5nZWQ/IG5vdyBuZWVkIHRvIGNhbGwgYGdldEVycm9yYCBtZXRob2QgdG8gZ2V0IHRoZSBhZCBlcnJvclxuXHRcdGNvbnN0IGFjdHVhbEVycm9yID0gJ2dldEVycm9yJyBpbiBhZEVycm9yICYmIHR5cGVvZiBhZEVycm9yLmdldEVycm9yID09PSAnZnVuY3Rpb24nID8gYWRFcnJvci5nZXRFcnJvcigpIDogYWRFcnJvcjtcblxuXHRcdC8vIGNvbnZlcnQgdGhlIEdvb2dsZSBBZCBlcnJvciB0byBhIEpTIG9uZVxuXHRcdGNvbnN0IG1lc3NhZ2UgPSBgJHthY3R1YWxFcnJvci5nZXRFcnJvckNvZGUoKX0sICR7YWN0dWFsRXJyb3IuZ2V0VHlwZSgpfSwgJHthY3R1YWxFcnJvci5nZXRNZXNzYWdlKCl9LCAke2FjdHVhbEVycm9yLmdldFZhc3RFcnJvckNvZGUoKX1gO1xuXHRcdHRoaXMucmVwb3J0RXJyb3IobmV3IEVycm9yKG1lc3NhZ2UpKTtcblxuXHRcdGlmICh0aGlzLmFkc01hbmFnZXIpIHtcblx0XHRcdHRoaXMuYWRzTWFuYWdlci5kZXN0cm95KCk7XG5cdFx0fVxuXHRcdHRoaXMudmlkZW8uY29udGFpbmVyRWwucmVtb3ZlQ2hpbGQodGhpcy5hZENvbnRhaW5lckVsKTtcblx0XHRpZiAodGhpcy5vdmVybGF5RWwpIHtcblx0XHRcdHRoaXMub3ZlcmxheUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wbGF5QWRFdmVudEhhbmRsZXIpO1xuXHRcdFx0dGhpcy52aWRlby5jb250YWluZXJFbC5yZW1vdmVDaGlsZCh0aGlzLm92ZXJsYXlFbCk7XG5cdFx0XHRkZWxldGUgdGhpcy5vdmVybGF5RWw7XG5cdFx0fVxuXHRcdGlmICh0aGlzLnZpZGVvLnBsYWNlaG9sZGVyRWwpIHtcblx0XHRcdHRoaXMudmlkZW8ucGxhY2Vob2xkZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucGxheUFkRXZlbnRIYW5kbGVyKTtcblx0XHR9XG5cdFx0dGhpcy52aWRlby5vcHRzLmFkdmVydGlzaW5nID0gZmFsc2U7XG5cdFx0dGhpcy5zdGFydEFkcygpO1xuXHR9XG5cblx0Y29udGVudFBhdXNlUmVxdWVzdEhhbmRsZXIoKSB7XG5cdFx0dGhpcy5hZHNDb21wbGV0ZWQgPSBmYWxzZTtcblx0XHR0aGlzLnZpZGVvLnZpZGVvRWwucGF1c2UoKTtcblx0fVxuXG5cdGNvbnRlbnRSZXN1bWVSZXF1ZXN0SGFuZGxlcigpIHtcblx0XHR0aGlzLnZpZGVvLmNvbnRhaW5lckVsLnJlbW92ZUNoaWxkKHRoaXMuYWRDb250YWluZXJFbCk7XG5cdFx0dGhpcy5hZHNDb21wbGV0ZWQgPSB0cnVlO1xuXHRcdHRoaXMucGxheVVzZXJWaWRlbygpO1xuXHR9XG5cblx0cGxheVVzZXJWaWRlbygpIHtcblx0XHQvLyBTaW5jZSBGaXJlZm94IDUyLCB0aGUgY2FwdGlvbnMgbmVlZCByZS1hZGRpbmcgYWZ0ZXIgdGhlXG5cdFx0Ly8gYWQgdmlkZW8gbGF5ZXIgaGFzIGZpbmlzaGVkIGl0cyB0aGluZy5cblx0XHR0aGlzLnZpZGVvLmFkZENhcHRpb25zKCk7XG5cblx0XHR0aGlzLnZpZGVvLnZpZGVvRWwucGxheSgpO1xuXHR9XG5cblx0Z2V0QWRQcm9ncmVzcygpIHtcblx0XHRpZiAoIXRoaXMuYWRzTWFuYWdlciB8fCAhdGhpcy5hZHNNYW5hZ2VyLmdldEN1cnJlbnRBZCgpKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0Y29uc3QgZHVyYXRpb24gPSB0aGlzLmFkc01hbmFnZXIuZ2V0Q3VycmVudEFkKCkuZ2V0RHVyYXRpb24oKTtcblx0XHRjb25zdCByZW1haW5pbmdUaW1lID0gdGhpcy5hZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcblx0XHRyZXR1cm4gcGFyc2VJbnQoMTAwICogKGR1cmF0aW9uIC0gcmVtYWluaW5nVGltZSkgLyBkdXJhdGlvbiwgMTApO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZGVvQWRzO1xuIiwiY2xhc3MgVmlkZW9JbmZvIHtcblx0Y29uc3RydWN0b3IgKHZpZGVvKSB7XG5cdFx0dGhpcy52aWRlbyA9IHZpZGVvO1xuXG5cdFx0dGhpcy5vcHRzID0gdGhpcy52aWRlby5vcHRzLnBsYWNlaG9sZGVySW5mby5yZWR1Y2UoKG1hcCwga2V5KSA9PiB7XG5cdFx0XHRtYXBba2V5XSA9IHRydWU7XG5cdFx0XHRyZXR1cm4gbWFwO1xuXHRcdH0sIHt9KTtcblxuXHRcdHRoaXMuaW5mb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0dGhpcy5pbmZvRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX2luZm8nO1xuXG5cdFx0aWYgKHRoaXMub3B0cy5icmFuZCkge1xuXHRcdFx0dGhpcy5icmFuZEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdFx0dGhpcy5icmFuZEVsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19pbmZvLWJyYW5kJztcblx0XHRcdHRoaXMuaW5mb0VsLmFwcGVuZENoaWxkKHRoaXMuYnJhbmRFbCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy50aXRsZSkge1xuXHRcdFx0dGhpcy50aXRsZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdFx0dGhpcy50aXRsZUVsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19pbmZvLXRpdGxlJztcblx0XHRcdHRoaXMuaW5mb0VsLmFwcGVuZENoaWxkKHRoaXMudGl0bGVFbCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy5kZXNjcmlwdGlvbikge1xuXHRcdFx0dGhpcy5kZXNjcmlwdGlvbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuXHRcdFx0dGhpcy5kZXNjcmlwdGlvbkVsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19pbmZvLWRlc2NyaXB0aW9uJztcblx0XHRcdHRoaXMuaW5mb0VsLmFwcGVuZENoaWxkKHRoaXMuZGVzY3JpcHRpb25FbCk7XG5cdFx0fVxuXG5cdFx0dGhpcy51cGRhdGUoKTtcblxuXHRcdHRoaXMudmlkZW8ucGxhY2Vob2xkZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmluZm9FbCk7XG5cdH1cblxuXHR1cGRhdGUgKCkge1xuXHRcdGlmICh0aGlzLmJyYW5kRWwpIHtcblx0XHRcdGNvbnN0IGJyYW5kTmFtZSA9IHRoaXMudmlkZW8udmlkZW9EYXRhLmJyYW5kICYmIHRoaXMudmlkZW8udmlkZW9EYXRhLmJyYW5kLm5hbWU7XG5cdFx0XHR0aGlzLmJyYW5kRWwudGV4dENvbnRlbnQgPSBicmFuZE5hbWU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMudGl0bGVFbCkge1xuXHRcdFx0dGhpcy50aXRsZUVsLnRleHRDb250ZW50ID0gdGhpcy52aWRlby52aWRlb0RhdGEudGl0bGU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZGVzY3JpcHRpb25FbCkge1xuXHRcdFx0dGhpcy5kZXNjcmlwdGlvbkVsLnRleHRDb250ZW50ID0gdGhpcy52aWRlby52aWRlb0RhdGEuc3RhbmRmaXJzdDtcblx0XHR9XG5cdH1cblxuXHR0ZWFyZG93biAoKSB7XG5cdFx0dGhpcy52aWRlby5wbGFjZWhvbGRlckVsLnJlbW92ZUNoaWxkKHRoaXMuaW5mb0VsKTtcblxuXHRcdGRlbGV0ZSB0aGlzLmluZm9FbDtcblx0XHRkZWxldGUgdGhpcy5icmFuZEVsO1xuXHRcdGRlbGV0ZSB0aGlzLnRpdGxlRWw7XG5cdFx0ZGVsZXRlIHRoaXMuZGVzY3JpcHRpb25FbDtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBWaWRlb0luZm87XG4iLCJjbGFzcyBQbGF5bGlzdCB7XG5cdGNvbnN0cnVjdG9yIChvcHRzKSB7XG5cdFx0dGhpcy5vcHRzID0gb3B0cztcblxuXHRcdC8vIGZpbmQgdGhlIGN1cnJlbnRseSBwbGF5aW5nIHZpZGVvLCBhbHdheXMgZGVhbCB3aXRoIHN0cmluZ3Ncblx0XHRjb25zdCBjdXJyZW50SWQgPSBvcHRzLnBsYXllci52aWRlb0RhdGEgPyBvcHRzLnBsYXllci52aWRlb0RhdGEuaWQgOiBvcHRzLnBsYXllci5vcHRzLmlkO1xuXHRcdHRoaXMuY3VycmVudEluZGV4ID0gY3VycmVudElkID8gb3B0cy5xdWV1ZS5pbmRleE9mKGN1cnJlbnRJZC50b1N0cmluZygpKSA6IC0xO1xuXG5cdFx0dGhpcy5jYWNoZSA9IHt9O1xuXG5cdFx0aWYgKHRoaXMub3B0cy5hdXRvcGxheSkge1xuXHRcdFx0dGhpcy5vcHRzLnBsYXllci5jb250YWluZXJFbC5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIHRoaXMubmV4dC5iaW5kKHRoaXMpLCB0cnVlKTtcblxuXHRcdFx0aWYgKCB0aGlzLmN1cnJlbnRJbmRleCA9PT0gLTEpIHtcblx0XHRcdFx0dGhpcy5uZXh0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0bmV4dCAoKSB7XG5cdFx0dGhpcy5nb3RvKHRoaXMuY3VycmVudEluZGV4ICsgMSk7XG5cdH1cblxuXHRwcmV2ICgpIHtcblx0XHR0aGlzLmdvdG8odGhpcy5jdXJyZW50SW5kZXggLSAxKTtcblx0fVxuXG5cdGdvdG8gKGluZGV4KSB7XG5cdFx0aWYgKGluZGV4IDwgMCkge1xuXHRcdFx0dGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLm9wdHMucXVldWUubGVuZ3RoIC0gMTtcblx0XHR9IGVsc2UgaWYgKGluZGV4ID49IHRoaXMub3B0cy5xdWV1ZS5sZW5ndGgpIHtcblx0XHRcdHRoaXMuY3VycmVudEluZGV4ID0gMDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jdXJyZW50SW5kZXggPSBpbmRleDtcblx0XHR9XG5cblx0XHQvLyBzdG9yZSB0aGUgY3VycmVudCBkYXRhIGZvciBxdWljayBhY2Nlc3MgbGF0ZXJcblx0XHRjb25zdCBjdXJyZW50VmlkZW9JZCA9IHRoaXMub3B0cy5wbGF5ZXIudmlkZW9EYXRhICYmIHRoaXMub3B0cy5wbGF5ZXIudmlkZW9EYXRhLmlkO1xuXG5cdFx0aWYgKGN1cnJlbnRWaWRlb0lkICYmICF0aGlzLmNhY2hlW2N1cnJlbnRWaWRlb0lkXSkge1xuXHRcdFx0dGhpcy5jYWNoZVtjdXJyZW50VmlkZW9JZF0gPSB0aGlzLm9wdHMucGxheWVyLnZpZGVvRGF0YTtcblx0XHR9XG5cblx0XHQvLyBmaXJlIG9mZiBhbnkgY3VycmVudCB3YXRjaGVkIGRhdGFcblx0XHR0aGlzLm9wdHMucGxheWVyLmZpcmVXYXRjaGVkRXZlbnQoKTtcblx0XHR0aGlzLm9wdHMucGxheWVyLnJlc2V0QW1vdW50V2F0Y2hlZCgpO1xuXG5cdFx0Y29uc3QgbmV4dFZpZGVvSWQgPSB0aGlzLm9wdHMucXVldWVbdGhpcy5jdXJyZW50SW5kZXhdO1xuXG5cdFx0Y29uc3QgbmV4dFZpZGVvT3B0cyA9IHtcblx0XHRcdGlkOiBuZXh0VmlkZW9JZCxcblx0XHRcdGRhdGE6IHRoaXMuY2FjaGVbbmV4dFZpZGVvSWRdXG5cdFx0fTtcblxuXHRcdHJldHVybiB0aGlzLm9wdHMucGxheWVyLnVwZGF0ZShuZXh0VmlkZW9PcHRzKS50aGVuKCgpID0+IHtcblx0XHRcdGlmICh0aGlzLm9wdHMucGxheWVyLnZpZGVvRWwpIHtcblx0XHRcdFx0dGhpcy5vcHRzLnBsYXllci52aWRlb0VsLnBsYXkoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5bGlzdDtcbiIsIi8qIGVzbGludCBjbGFzcy1tZXRob2RzLXVzZS10aGlzOiAwICovXG5cbmNvbnN0IGNsb3NlQnV0dG9uID0gKG9uQ2xpY2spID0+IHtcblx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG5cdGJ1dHRvbi5jbGFzc05hbWUgPSAnby12aWRlb19fZ3VpZGFuY2VfX2Nsb3NlJztcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRvbkNsaWNrKCk7XG5cdH0pO1xuXHRyZXR1cm4gYnV0dG9uO1xufTtcblxuY29uc3QgY29udGFpbmVyID0gKGJhbm5lck1vZGUpID0+IHtcblx0Y29uc3QgY29udGFpbmVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0Y29udGFpbmVyRWwuY2xhc3NOYW1lID0gYG8tdmlkZW9fX2d1aWRhbmNlICR7YmFubmVyTW9kZSA/ICdvLXZpZGVvX19ndWlkYW5jZS0tYmFubmVyJyA6ICcnfWA7XG5cdHJldHVybiBjb250YWluZXJFbDtcbn07XG5cbmNvbnN0IGxpbmsgPSAoKSA9PiB7XG5cdGNvbnN0IGxpbmtFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcblx0bGlua0VsLnNldEF0dHJpYnV0ZSgnaHJlZicsICdodHRwczovL3d3dy5mdC5jb20vYWNjZXNzaWJpbGl0eSN2aWRlby10cmFuc2NyaXB0aW9ucycpO1xuXHRsaW5rRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX2d1aWRhbmNlX19saW5rJztcblx0bGlua0VsLmlubmVyVGV4dCA9ICdTdWJ0aXRsZXMgdW5hdmFpbGFibGUnO1xuXHRsaW5rRWwudGFyZ2V0ID0gJ19ibGFuayc7XG5cdGxpbmtFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gZS5zdG9wUHJvcGFnYXRpb24oKSk7XG5cdHJldHVybiBsaW5rRWw7XG59O1xuXG5jbGFzcyBHdWlkYW5jZSB7XG5cblx0Y29uc3RydWN0b3IgKCkge1xuXHRcdHRoaXMucmVtb3ZlQmFubmVyID0gdGhpcy5yZW1vdmVCYW5uZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmhpZGVCYW5uZXIgPSB0aGlzLmhpZGVCYW5uZXIuYmluZCh0aGlzKTtcblx0fVxuXG5cdGNyZWF0ZVBsYWNlaG9sZGVyICgpIHtcblx0XHRjb25zdCBjb250YWluZXJFbCA9IGNvbnRhaW5lcigpO1xuXHRcdGNvbnRhaW5lckVsLmFwcGVuZENoaWxkKGxpbmsoKSk7XG5cdFx0cmV0dXJuIGNvbnRhaW5lckVsO1xuXHR9XG5cblx0Y3JlYXRlQmFubmVyICgpIHtcblx0XHR0aGlzLmJhbm5lciA9IGNvbnRhaW5lcih0cnVlKTtcblx0XHR0aGlzLmJhbm5lci5hcHBlbmRDaGlsZChjbG9zZUJ1dHRvbih0aGlzLnJlbW92ZUJhbm5lcikpO1xuXHRcdHRoaXMuYmFubmVyLmFwcGVuZENoaWxkKGxpbmsoKSk7XG5cblx0XHR0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuaGlkZUJhbm5lciwgNTAwMCk7XG5cblx0XHRyZXR1cm4gdGhpcy5iYW5uZXI7XG5cdH1cblxuXHRyZW1vdmVCYW5uZXIgKCkge1xuXHRcdGlmICh0aGlzLmJhbm5lcikge1xuXHRcdFx0dGhpcy5iYW5uZXIucmVtb3ZlKCk7XG5cdFx0XHRjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblx0XHR9XG5cdH1cblxuXHRoaWRlQmFubmVyICgpIHtcblx0XHRpZiAodGhpcy5iYW5uZXIpIHtcblx0XHRcdHRoaXMuYmFubmVyLmNsYXNzTGlzdC5hZGQoJ28tdmlkZW9fX2d1aWRhbmNlLS1oaWRkZW4nKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3VpZGFuY2U7IiwiaW1wb3J0IG9WaWV3cG9ydCBmcm9tICdAZmluYW5jaWFsLXRpbWVzL28tdmlld3BvcnQnO1xuXG5pbXBvcnQgZ2V0UmVuZGl0aW9uIGZyb20gJy4vaGVscGVycy9nZXQtcmVuZGl0aW9uLmpzJztcbmltcG9ydCBWaWRlb0FkcyBmcm9tICcuL2Fkcy5qcyc7XG5pbXBvcnQgVmlkZW9JbmZvIGZyb20gJy4vaW5mby5qcyc7XG5pbXBvcnQgUGxheWxpc3QgZnJvbSAnLi9wbGF5bGlzdC5qcyc7XG5pbXBvcnQgR3VpZGFuY2UgZnJvbSAnLi9ndWlkYW5jZS5qcyc7XG5cbmZ1bmN0aW9uIGxpc3Rlbk9uY2UoZWwsIGV2ZW50TmFtZSwgZm4pIHtcblx0Y29uc3Qgd3JhcHBlZEZuID0gZnVuY3Rpb24oLi4uYXJncykge1xuXHRcdGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkRm4pO1xuXHRcdGZuKC4uLmFyZ3MpO1xuXHR9O1xuXHRlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgd3JhcHBlZEZuKTtcbn1cblxuZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcih2aWRlbywgZXYpIHtcblxuXHQvLyBPbiBzb21lIHBsYXRmb3JtcyAoZWcgaU9TKSwgdGhlIEdvb2dsZSBhZHZlcnQgbGlicmFyeSB3aWxsIHVzZSB0aGUgbWFpbiA8dmlkZW8+IGVsZW1lbnRcblx0Ly8gdXNlZCBieSBvLXZpZGVvIHRvIGFsc28gcGxheSBhIHByZS1yb2xsIGFkdmVydDsgYXMgdGhlIGFkdmVydCBwbGF5cywgdGhpcyB3aWxsIHRyaWdnZXJcblx0Ly8gdGhlIG5vcm1hbCA8dmlkZW8+IGV2ZW50IGxpc3RlbmVycy4gIERpc2NhcmQgZXZlbnRzIHRoYXQgd2UgY2FuIGlkZW50aWZ5IGFzIGNvbWluZ1xuXHQvLyBmcm9tIHRoZSBwcmUtcm9sbCByYXRoZXIgdGhhbiB0aGUgbWFpbiBjb250ZW50LlxuXHQvLyBUbyBkbyB0aGlzLCBjaGVjayB3aGV0aGVyIGFkdmVydGlzaW5nIGlzIHN0aWxsIGVuYWJsZWQgKGl0J2xsIGJlIGRpc2FibGVkIG9uIGFueSBlcnJvciksXG5cdC8vIGFuZCBmb3IgdGhlIHZpZGVvIGFkcyBsb2FkIGFuZCBjb21wbGV0ZWQgZmxhZ3MuXG5cdGlmICh2aWRlby5vcHRzLmFkdmVydGlzaW5nICYmIHZpZGVvLnZpZGVvQWRzICYmIHZpZGVvLnZpZGVvQWRzLmFkc0xvYWRlZCAmJiAhdmlkZW8udmlkZW9BZHMuYWRzQ29tcGxldGVkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gRGlzcGF0Y2ggcHJvZ3Jlc3MgZXZlbnQgYXQgYXJvdW5kIDI1JSwgNTAlLCA3NSUgYW5kIDEwMCVcblx0aWYgKGV2LnR5cGUgPT09ICdwcm9ncmVzcycgJiYgIXNob3VsZERpc3BhdGNoKHZpZGVvKSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZpcmVFdmVudChldi50eXBlLCB2aWRlbywge1xuXHRcdHByb2dyZXNzOiB2aWRlby5nZXRQcm9ncmVzcygpLFxuXHRcdGR1cmF0aW9uOiB2aWRlby5nZXREdXJhdGlvbigpLFxuXHRcdHRleHRUcmFja01vZGU6IHZpZGVvLmdldFRyYWNrTW9kZSgpXG5cdH0pO1xufVxuXG5mdW5jdGlvbiBmaXJlRXZlbnQoYWN0aW9uLCB2aWRlbywgZXh0cmFEZXRhaWwgPSB7fSkge1xuXHRjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnb1RyYWNraW5nLmV2ZW50Jywge1xuXHRcdGRldGFpbDogT2JqZWN0LmFzc2lnbih7XG5cdFx0XHRjYXRlZ29yeTogJ3ZpZGVvJyxcblx0XHRcdGFjdGlvbixcblx0XHRcdGFkdmVydGlzaW5nOiB2aWRlby5vcHRzLmFkdmVydGlzaW5nLFxuXHRcdFx0Y29udGVudElkOiB2aWRlby5vcHRzLmlkLFxuXHRcdH0sIGV4dHJhRGV0YWlsKSxcblx0XHRidWJibGVzOiB0cnVlXG5cdH0pO1xuXHRkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5jb25zdCBkaXNwYXRjaGVkUHJvZ3Jlc3MgPSB7fTtcbmZ1bmN0aW9uIHNob3VsZERpc3BhdGNoKHZpZGVvKSB7XG5cdGNvbnN0IHByb2dyZXNzID0gdmlkZW8uZ2V0UHJvZ3Jlc3MoKTtcblx0Y29uc3QgaWQgPSB2aWRlby5vcHRzLmlkO1xuXHRjb25zdCByZWxldmFudFByb2dyZXNzUG9pbnRzID0gW1xuXHRcdDgsIDksIDEwLCAxMSwgMTIsXG5cdFx0MjMsIDI0LCAyNSwgMjYsIDI3LFxuXHRcdDQ4LCA0OSwgNTAsIDUxLCA1Mixcblx0XHQ3MywgNzQsIDc1LCA3NiwgNzcsXG5cdFx0MTAwXG5cdF07XG5cblx0Ly8gSW5pdGlhbGlzZSBkaXNwYXRjaGVkIHByb2dyZXNzIHN0b3JlXG5cdGlmICghZGlzcGF0Y2hlZFByb2dyZXNzW2lkXSkge1xuXHRcdGRpc3BhdGNoZWRQcm9ncmVzc1tpZF0gPSBbXTtcblx0fVxuXG5cdC8vIFByb2dyZXNzIGlzIG5vdCByZWxldmFudFxuXHRpZiAoIXJlbGV2YW50UHJvZ3Jlc3NQb2ludHMuaW5jbHVkZXMocHJvZ3Jlc3MpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Ly8gUHJvZ3Jlc3MgaGFzIGFscmVhZHkgYmVlbiBkaXNwYXRjaGVkXG5cdGlmIChkaXNwYXRjaGVkUHJvZ3Jlc3NbaWRdLmluY2x1ZGVzKHByb2dyZXNzKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGRpc3BhdGNoZWRQcm9ncmVzc1tpZF0ucHVzaChwcm9ncmVzcyk7XG5cdHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBhZGRFdmVudHModmlkZW8sIGV2ZW50cykge1xuXHRldmVudHMuZm9yRWFjaChldmVudCA9PiB7XG5cdFx0dmlkZW8udmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBldmVudExpc3RlbmVyLmJpbmQodGhpcywgdmlkZW8pKTtcblx0fSk7XG59XG5cbi8vIHVzZSB0aGUgaW1hZ2UgcmVzaXppbmcgc2VydmljZSwgaWYgd2lkdGggc3VwcGxpZWRcbmZ1bmN0aW9uIHVwZGF0ZVBvc3RlclVybChwb3N0ZXJJbWFnZSwgd2lkdGgsIHN5c3RlbWNvZGUpIHtcblx0bGV0IHVybCA9IGBodHRwczovL3d3dy5mdC5jb20vX19vcmlnYW1pL3NlcnZpY2UvaW1hZ2UvdjIvaW1hZ2VzL3Jhdy8ke2VuY29kZVVSSUNvbXBvbmVudChwb3N0ZXJJbWFnZSl9P3NvdXJjZT0ke3N5c3RlbWNvZGV9JnF1YWxpdHk9bG93YDtcblx0aWYgKHdpZHRoKSB7XG5cdFx0dXJsICs9IGAmZml0PXNjYWxlLWRvd24md2lkdGg9JHt3aWR0aH1gO1xuXHR9XG5cblx0cmV0dXJuIHVybDtcbn1cblxuLy8gY29udmVydHMgZGF0YS1vLXZpZGVvIGF0dHJpYnV0ZXMgdG8gYW4gb3B0aW9ucyBvYmplY3RcbmZ1bmN0aW9uIGdldE9wdGlvbnNGcm9tRGF0YUF0dHJpYnV0ZXMoYXR0cmlidXRlcykge1xuXHRjb25zdCBvcHRzID0ge307XG5cdC8vIFRyeSB0byBnZXQgY29uZmlnIHNldCBkZWNsYXJhdGl2ZWx5IG9uIHRoZSBlbGVtZW50XG5cdEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYXR0cmlidXRlcywgKGF0dHIpID0+IHtcblx0XHRpZiAoYXR0ci5uYW1lLmluZGV4T2YoJ2RhdGEtby12aWRlbycpID09PSAwKSB7XG5cdFx0XHQvLyBSZW1vdmUgdGhlIHByZWZpeCBwYXJ0IG9mIHRoZSBkYXRhIGF0dHJpYnV0ZSBuYW1lIGFuZCBoeXBoZW4tY2FzZSB0byBjYW1lbENhc2Vcblx0XHRcdGNvbnN0IGtleSA9IGF0dHIubmFtZS5yZXBsYWNlKCdkYXRhLW8tdmlkZW8tJywgJycpLnJlcGxhY2UoLy0oW2Etel0pL2csIChtLCB3KSA9PiB7XG5cdFx0XHRcdHJldHVybiB3LnRvVXBwZXJDYXNlKCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSWYgaXQncyBhIEpTT04sIGEgYm9vbGVhbiBvciBhIG51bWJlciwgd2Ugd2FudCBpdCBzdG9yZWQgbGlrZSB0aGF0LCBhbmQgbm90IGFzIGEgc3RyaW5nXG5cblx0XHRcdFx0Ly8gRm9yIGxlZ2FjeSBvLXZpZGVvIGVtYmVkcywgd2UnbGwgbmVlZCB0byBjaGVjayBmb3IgcGxhY2VIb2xkZXJJbmZvIGF0dHJpYnV0ZXNcblx0XHRcdFx0Ly8gYXMgdGhleSB0eXBpY2FsbHkgcGFzcyBkYXRhIGluIHdpdGggc2luZ2xlIHF1b3Rlcywgd2hpY2ggd29uJ3QgcGFyc2U6XG5cdFx0XHRcdC8vIGRhdGEtby12aWRlby1wbGFjZWhvbGRlci1pbmZvPVwiWyd0aXRsZScsICdkZXNjcmlwdGlvbiddXCJcblx0XHRcdFx0aWYgKGtleSA9PT0gJ3BsYWNlaG9sZGVySW5mbycpIHtcblx0XHRcdFx0XHRvcHRzW2tleV0gPSBKU09OLnBhcnNlKGF0dHIudmFsdWUucmVwbGFjZSgvXFwnL2csICdcIicpKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvcHRzW2tleV0gPSBKU09OLnBhcnNlKGF0dHIudmFsdWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdG9wdHNba2V5XSA9IGF0dHIudmFsdWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIG9wdHM7XG59XG5cbmZ1bmN0aW9uIHVubG9hZExpc3RlbmVyKCkge1xuXHR0aGlzLnVwZGF0ZUFtb3VudFdhdGNoZWQoKTtcblx0ZmlyZUV2ZW50KCd3YXRjaGVkJywgdGhpcywge1xuXHRcdGFtb3VudDogdGhpcy5nZXRBbW91bnRXYXRjaGVkKDApLFxuXHRcdGFtb3VudFBlcmNlbnRhZ2U6IHRoaXMuZ2V0QW1vdW50V2F0Y2hlZFBlcmNlbnRhZ2UoMClcblx0fSk7XG59XG5cbmZ1bmN0aW9uIHZpc2liaWxpdHlMaXN0ZW5lcihldikge1xuXHRpZiAoZXYuZGV0YWlsLmhpZGRlbikge1xuXHRcdHRoaXMudXBkYXRlQW1vdW50V2F0Y2hlZCgpO1xuXHR9IGVsc2UgaWYgKCF0aGlzLnZpZGVvRWwucGF1c2VkKSB7XG5cdFx0dGhpcy5tYXJrUGxheVN0YXJ0KCk7XG5cdH1cbn1cblxuY29uc3QgdW5sb2FkRXZlbnROYW1lID0gJ29uYmVmb3JldW5sb2FkJyBpbiB3aW5kb3cgPyAnYmVmb3JldW5sb2FkJyA6ICd1bmxvYWQnO1xuXG5jb25zdCBkZWZhdWx0T3B0cyA9IHtcblx0YWR2ZXJ0aXNpbmc6IGZhbHNlLFxuXHRhbGxQcm9ncmVzczogZmFsc2UsXG5cdGF1dG9yZW5kZXI6IHRydWUsXG5cdGNsYXNzZXM6IFtdLFxuXHRvcHRpbXVtd2lkdGg6IG51bGwsXG5cdHBsYWNlaG9sZGVyOiBmYWxzZSxcblx0cGxhY2Vob2xkZXJJbmZvOiBbJ3RpdGxlJ10sXG5cdHBsYWNlaG9sZGVySGludDogJycsXG5cdHBsYXlzaW5saW5lOiBmYWxzZSxcblx0c2hvd0NhcHRpb25zOiB0cnVlLFxuXHRzaG93R3VpZGFuY2U6IHRydWUsXG5cdGRhdGE6IG51bGxcbn07XG5cbmNsYXNzIFZpZGVvIHtcblx0Y29uc3RydWN0b3IoZWwsIG9wdHMpIHtcblx0XHR0aGlzLmNvbnRhaW5lckVsID0gZWw7XG5cdFx0Ly8gYW1vdW50IG9mIHRoZSB2aWRlbywgaW4gbWlsbGlzZWNvbmRzLCB0aGF0IGhhcyBhY3R1YWxseSBiZWVuICd3YXRjaGVkJ1xuXHRcdHRoaXMuYW1vdW50V2F0Y2hlZCA9IDA7XG5cdFx0dGhpcy5maXJlV2F0Y2hlZEV2ZW50ID0gdW5sb2FkTGlzdGVuZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLnZpc2liaWxpdHlMaXN0ZW5lciA9IHZpc2liaWxpdHlMaXN0ZW5lci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuZGlkVXNlclByZXNzUGxheSA9IGZhbHNlO1xuXG5cdFx0dGhpcy5vcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdHMsIG9wdHMsIGdldE9wdGlvbnNGcm9tRGF0YUF0dHJpYnV0ZXModGhpcy5jb250YWluZXJFbC5hdHRyaWJ1dGVzKSk7XG5cblx0XHR0aGlzLmNvbnRhaW5lckVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICdWaWRlbyBQbGF5ZXInKTtcblxuXHRcdGlmKHR5cGVvZiB0aGlzLm9wdHMuc3lzdGVtY29kZSAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignby12aWRlbyByZXF1aXJlcyBcInN5c3RlbWNvZGVcIiBpcyBjb25maWd1cmVkIHVzaW5nIHRoZSBcImRhdGEtby12aWRlby1zeXN0ZW1jb2RlXCIgZGF0YSBhdHRyaWJ1dGUsIG9yIGNvbmZpZ3VyZWQgd2l0aCB0aGUgYG9wdHNgIGNvbnN0cnVjdG9yIGFyZ3VtZW50LiBJdCBtdXN0IGJlIHNldCB0byBhIHZhbGlkIFtCaXpvcHMgc3lzdGVtIGNvZGVdKGh0dHBzOi8vYml6LW9wcy5pbi5mdC5jb20vbGlzdC9TeXN0ZW1zKS4nKTtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHRoaXMub3B0cy5jbGFzc2VzID09PSAnc3RyaW5nJykge1xuXHRcdFx0dGhpcy5vcHRzLmNsYXNzZXMgPSB0aGlzLm9wdHMuY2xhc3Nlcy5zcGxpdCgnICcpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdHMuY2xhc3Nlcy5pbmRleE9mKCdvLXZpZGVvX192aWRlbycpID09PSAtMSkge1xuXHRcdFx0dGhpcy5vcHRzLmNsYXNzZXMucHVzaCgnby12aWRlb19fdmlkZW8nKTtcblx0XHR9XG5cblx0XHR0aGlzLnRhcmdldGluZyA9IHtcblx0XHRcdHNpdGU6ICcvNTg4Ny9mdC5jb20nLFxuXHRcdFx0cG9zaXRpb246ICd2aWRlbycsXG5cdFx0XHRzaXplczogJzU5MngzMzN8NDAweDIyNScsXG5cdFx0XHR2aWRlb0lkOiB0aGlzLm9wdHMuaWRcblx0XHR9O1xuXG5cdFx0aWYgKHRoaXMub3B0cy5hZHZlcnRpc2luZykge1xuXHRcdFx0dGhpcy52aWRlb0FkcyA9IG5ldyBWaWRlb0Fkcyh0aGlzKTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbnRhaW5lckVsLnNldEF0dHJpYnV0ZSgnZGF0YS1vLXZpZGVvLWpzJywgJycpO1xuXG5cdFx0aWYgKHRoaXMub3B0cy5hdXRvcmVuZGVyID09PSB0cnVlKSB7XG5cdFx0XHR0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLnNob3dHdWlkYW5jZSkge1xuXHRcdFx0dGhpcy5ndWlkYW5jZSA9IG5ldyBHdWlkYW5jZSgpO1xuXHRcdH1cblx0fVxuXG5cdGdldERhdGEoKSB7XG5cdFx0Y29uc3QgZGF0YVByb21pc2UgPSB0aGlzLm9wdHMuZGF0YSA/XG5cdFx0XHRQcm9taXNlLnJlc29sdmUodGhpcy5vcHRzLmRhdGEpIDpcblx0XHRcdGZldGNoKGBodHRwczovL25leHQtbWVkaWEtYXBpLmZ0LmNvbS92MS8ke3RoaXMub3B0cy5pZH1gKVxuXHRcdFx0XHQudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdFx0aWYgKHJlc3BvbnNlLm9rKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aHJvdyBFcnJvcignTmV4dCBNZWRpYSBBUEkgcmVzcG9uZGVkIHdpdGggYSAnICsgcmVzcG9uc2Uuc3RhdHVzICsgJyAoJyArIHJlc3BvbnNlLnN0YXR1c1RleHQgKyAnKSBmb3IgaWQgJyArIHRoaXMub3B0cy5pZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdHJldHVybiBkYXRhUHJvbWlzZS50aGVuKGRhdGEgPT4ge1xuXHRcdFx0dGhpcy52aWRlb0RhdGEgPSBkYXRhO1xuXHRcdFx0dGhpcy5wb3N0ZXJJbWFnZSA9IGRhdGEubWFpbkltYWdlVXJsICYmIHVwZGF0ZVBvc3RlclVybChkYXRhLm1haW5JbWFnZVVybCwgdGhpcy5vcHRzLm9wdGltdW13aWR0aCwgdGhpcy5vcHRzLnN5c3RlbWNvZGUpO1xuXHRcdFx0dGhpcy5yZW5kaXRpb24gPSBnZXRSZW5kaXRpb24oZGF0YS5yZW5kaXRpb25zLCB0aGlzLm9wdHMpO1xuXHRcdH0pO1xuXHR9XG5cblx0cmVuZGVyVmlkZW8oKSB7XG5cdFx0aWYgKHRoaXMucmVuZGl0aW9uKSB7XG5cdFx0XHRpZiAodGhpcy5vcHRzLnBsYWNlaG9sZGVyKSB7XG5cdFx0XHRcdHRoaXMuYWRkUGxhY2Vob2xkZXIoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYWRkVmlkZW8oKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRpbml0KCkge1xuXHRcdHJldHVybiAodGhpcy5vcHRzLmFkdmVydGlzaW5nID8gVmlkZW9BZHMubG9hZEFkc0xpYnJhcnkoKSA6IFByb21pc2UucmVzb2x2ZSgpKVxuXHRcdFx0LmNhdGNoKCgpID0+IHtcblx0XHRcdFx0Ly8gSWYgYWQgZG9lc24ndCBsb2FkIGZvciBzb21lIHJlYXNvbiwgbG9hZCB2aWRlbyBhcyBub3JtYWxcblx0XHRcdFx0dGhpcy5vcHRzLmFkdmVydGlzaW5nID0gZmFsc2U7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKCkgPT4gdGhpcy5nZXREYXRhKCkpXG5cdFx0XHQudGhlbigoKSA9PiB0aGlzLnJlbmRlclZpZGVvKCkpO1xuXHR9XG5cblx0YWRkVmlkZW8oKSB7XG5cdFx0dGhpcy5saXZlUmVnaW9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0aGlzLmxpdmVSZWdpb25FbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsJ2Fzc2VydGl2ZScpO1xuXHRcdHRoaXMubGl2ZVJlZ2lvbkVsLmNsYXNzTGlzdC5hZGQoJ28tdmlkZW9fX2xpdmUtcmVnaW9uJyk7XG5cdFx0dGhpcy52aWRlb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcblx0XHR0aGlzLnZpZGVvRWwuY29udHJvbHMgPSB0cnVlO1xuXHRcdHRoaXMudmlkZW9FbC5jbGFzc05hbWUgPSBBcnJheS5pc0FycmF5KHRoaXMub3B0cy5jbGFzc2VzKSA/IHRoaXMub3B0cy5jbGFzc2VzLmpvaW4oJyAnKSA6IHRoaXMub3B0cy5jbGFzc2VzO1xuXHRcdHRoaXMuY29udGFpbmVyRWwuY2xhc3NMaXN0LmFkZCgnby12aWRlby0tcGxheWVyJyk7XG5cblx0XHRpZiAodGhpcy5vcHRzLnBsYXlzaW5saW5lKSB7XG5cdFx0XHR0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICd0cnVlJyk7XG5cdFx0XHR0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCd3ZWJraXQtcGxheXNpbmxpbmUnLCAndHJ1ZScpO1xuXHRcdH1cblxuXHRcdC8vIGRpc2FibGUgZG93bmxvYWQgYnV0dG9uIGluIENocm9tZSA1OCtcblx0XHRpZiAodGhpcy52aWRlb0VsLmNvbnRyb2xzTGlzdCkge1xuXHRcdFx0dGhpcy52aWRlb0VsLmNvbnRyb2xzTGlzdC5hZGQoJ25vZG93bmxvYWQnKTtcblx0XHR9XG5cblx0XHR0aGlzLnVwZGF0ZVZpZGVvKCk7XG5cblx0XHRpZiAodGhpcy5wbGFjZWhvbGRlckVsICYmICF0aGlzLm9wdHMuYWR2ZXJ0aXNpbmcpIHtcblx0XHRcdHRoaXMudmlkZW9FbC5hdXRvcGxheSA9IHRoaXMudmlkZW9FbC5hdXRvc3RhcnQgPSB0cnVlO1xuXHRcdH1cblxuXHRcdHRoaXMuY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5saXZlUmVnaW9uRWwpO1xuXHRcdHRoaXMuY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy52aWRlb0VsKTtcblxuXHRcdGFkZEV2ZW50cyh0aGlzLCBbJ3BsYXlpbmcnLCAncGF1c2UnLCAnZW5kZWQnLCAncHJvZ3Jlc3MnLCAnc2Vla2VkJywgJ2Vycm9yJywgJ3N0YWxsZWQnLCAnd2FpdGluZyddKTtcblx0XHR0aGlzLnZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHRoaXMucGF1c2VPdGhlclZpZGVvcy5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheWluZycsIHRoaXMubWFya1BsYXlTdGFydC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCB0aGlzLnVwZGF0ZUFtb3VudFdhdGNoZWQuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy52aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1c3BlbmQnLCB0aGlzLmNsZWFyQ3VycmVudGx5UGxheWluZy5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCB0aGlzLmNsZWFyQ3VycmVudGx5UGxheWluZy5iaW5kKHRoaXMpKTtcblxuXHRcdGlmICh0aGlzLm9wdHMuYWR2ZXJ0aXNpbmcpIHtcblx0XHRcdHRoaXMudmlkZW9BZHMuc2V0VXBBZHMoKTtcblx0XHR9XG5cblx0XHQvLyBzZW5kICd3YXRjaGVkJyBldmVudCBvbiBwYWdlIHVubG9hZCxcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcih1bmxvYWRFdmVudE5hbWUsIHRoaXMuZmlyZVdhdGNoZWRFdmVudCk7XG5cdFx0b1ZpZXdwb3J0Lmxpc3RlblRvKCd2aXNpYmlsaXR5Jyk7XG5cdFx0Ly8gcGF1c2UgJ3dhdGNoaW5nJyB0aGUgdmlkZW8gaWYgdGhlIHRhYiBpcyBoaWRkZW5cblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb1ZpZXdwb3J0LnZpc2liaWxpdHknLCB0aGlzLnZpc2liaWxpdHlMaXN0ZW5lcik7XG5cdH1cblxuXHRhZGRDYXB0aW9ucygpIHtcblx0XHRpZiAodGhpcy5vcHRzLnNob3dDYXB0aW9ucyA9PT0gZmFsc2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodHlwZW9mIHRoaXMudmlkZW9EYXRhID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdQbGVhc2UgY2FsbCBgZ2V0RGF0YSgpYCBiZWZvcmUgY2FsbGluZyBgYWRkQ2FwdGlvbnMoKWAgZGlyZWN0bHkuJyk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZXhpc3RpbmdUcmFja0VsID0gdGhpcy52aWRlb0VsLnF1ZXJ5U2VsZWN0b3IoJ3RyYWNrJyk7XG5cdFx0aWYgKGV4aXN0aW5nVHJhY2tFbCkge1xuXHRcdFx0dGhpcy52aWRlb0VsLnJlbW92ZUNoaWxkKGV4aXN0aW5nVHJhY2tFbCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMudmlkZW9EYXRhLmNhcHRpb25zVXJsKSB7XG5cdFx0XHQvLyBGSVhNRSB0aGlzIGlzIGFsbCBoYXJkY29kZWQgYXMgRW5nbGlzaCBjYXB0aW9ucyBhdCB0aGUgbW9tZW50XG5cdFx0XHRjb25zdCB0cmFja0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHJhY2snKTtcblx0XHRcdHRyYWNrRWwuc2V0QXR0cmlidXRlKCdsYWJlbCcsICdFbmdsaXNoJyk7XG5cdFx0XHR0cmFja0VsLnNldEF0dHJpYnV0ZSgna2luZCcsICdjYXB0aW9ucycpO1xuXHRcdFx0dHJhY2tFbC5zZXRBdHRyaWJ1dGUoJ3NyY2xhbmcnLCAnZW4nKTtcblx0XHRcdHRyYWNrRWwuc2V0QXR0cmlidXRlKCdzcmMnLCB0aGlzLnZpZGVvRGF0YS5jYXB0aW9uc1VybCk7XG5cdFx0XHR0cmFja0VsLnNldEF0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nLCAndHJ1ZScpO1xuXHRcdFx0dGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnY3Jvc3NvcmlnaW4nLCAndHJ1ZScpO1xuXHRcdFx0dGhpcy52aWRlb0VsLmFwcGVuZENoaWxkKHRyYWNrRWwpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZVZpZGVvKCkge1xuXHRcdGlmICh0aGlzLnBvc3RlckltYWdlKSB7XG5cdFx0XHR0aGlzLnZpZGVvRWwucG9zdGVyID0gdGhpcy5wb3N0ZXJJbWFnZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy52aWRlb0VsLnJlbW92ZUF0dHJpYnV0ZSgncG9zdGVyJyk7XG5cdFx0fVxuXG5cdFx0dGhpcy52aWRlb0VsLnNyYyA9IHRoaXMucmVuZGl0aW9uICYmIHRoaXMucmVuZGl0aW9uLnVybDtcblx0XHRpZiAodGhpcy5ndWlkYW5jZSkge1xuXHRcdFx0dGhpcy5ndWlkYW5jZS5yZW1vdmVCYW5uZXIoKTtcblx0XHR9XG5cdFx0bGlzdGVuT25jZSh0aGlzLnZpZGVvRWwsICdwbGF5aW5nJywgdGhpcy5zaG93R3VpZGFuY2VCYW5uZXIuYmluZCh0aGlzKSk7XG5cblx0XHR0aGlzLmFkZENhcHRpb25zKCk7XG5cdH1cblxuXHRhZGRQbGFjZWhvbGRlcigpIHtcblx0XHR0aGlzLnBsYWNlaG9sZGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0aGlzLnBsYWNlaG9sZGVyRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX3BsYWNlaG9sZGVyJztcblxuXHRcdHRoaXMucGxhY2Vob2xkZXJJbWFnZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cdFx0dGhpcy5wbGFjZWhvbGRlckltYWdlRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX3BsYWNlaG9sZGVyLWltYWdlJztcblx0XHR0aGlzLnBsYWNlaG9sZGVySW1hZ2VFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJlc2VudGF0aW9uJyk7XG5cdFx0dGhpcy5wbGFjZWhvbGRlckltYWdlRWwuc2V0QXR0cmlidXRlKCdhbHQnLCAnJyk7XG5cblx0XHR0aGlzLnBsYWNlaG9sZGVyRWwuYXBwZW5kQ2hpbGQodGhpcy5wbGFjZWhvbGRlckltYWdlRWwpO1xuXG5cdFx0Ly8gaW5mbyBwYW5lbFxuXHRcdGlmICh0aGlzLm9wdHMucGxhY2Vob2xkZXJJbmZvLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5pbmZvUGFuZWwgPSBuZXcgVmlkZW9JbmZvKHRoaXMpO1xuXHRcdH1cblxuXHRcdC8vIHBsYXkgYnV0dG9uXG5cdFx0Y29uc3QgcGxheUNUQSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHBsYXlDVEEuY2xhc3NOYW1lID0gYG8tdmlkZW9fX3BsYXktY3RhICR7dGhpcy5vcHRzLnBsYWNlaG9sZGVySGludCA/ICdvLXZpZGVvX19wbGF5LWN0YS0td2l0aC1oaW50JyA6ICdvLXZpZGVvX19wbGF5LWN0YS0td2l0aG91dC1oaW50J31gO1xuXG5cdFx0dGhpcy5wbGF5QnV0dG9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0XHR0aGlzLnBsYXlCdXR0b25FbC5jbGFzc05hbWUgPSAnby12aWRlb19fcGxheS1idXR0b24nO1xuXG5cdFx0Y29uc3QgcGxheUJ1dHRvbkljb25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblx0XHRwbGF5QnV0dG9uSWNvbkVsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19wbGF5LWJ1dHRvbi1pY29uJztcblx0XHRwbGF5QnV0dG9uSWNvbkVsLnRleHRDb250ZW50ID0gdGhpcy5vcHRzLnBsYWNlaG9sZGVySGludDtcblxuXG5cdFx0cGxheUNUQS5hcHBlbmRDaGlsZChwbGF5QnV0dG9uSWNvbkVsKTtcblxuXHRcdGNvbnN0IHsgY2FwdGlvbnNVcmwgfSA9IHRoaXMudmlkZW9EYXRhIHx8IHt9O1xuXHRcdGlmICghY2FwdGlvbnNVcmwgJiYgdGhpcy5ndWlkYW5jZSkge1xuXHRcdFx0cGxheUNUQS5hcHBlbmRDaGlsZCh0aGlzLmd1aWRhbmNlLmNyZWF0ZVBsYWNlaG9sZGVyKCkpO1xuXHRcdH1cblx0XHR0aGlzLnBsYXlCdXR0b25FbC5hcHBlbmRDaGlsZChwbGF5Q1RBKTtcblxuXHRcdHRoaXMucGxhY2Vob2xkZXJFbC5hcHBlbmRDaGlsZCh0aGlzLnBsYXlCdXR0b25FbCk7XG5cblx0XHR0aGlzLnBsYWNlaG9sZGVyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHR0aGlzLmRpZFVzZXJQcmVzc1BsYXkgPSB0cnVlO1xuXHRcdFx0dGhpcy5wbGF5KCk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKCk7XG5cblx0XHR0aGlzLmNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHRoaXMucGxhY2Vob2xkZXJFbCk7XG5cdH1cblxuXHRwbGF5KCkge1xuXHRcdGlmICh0aGlzLnBsYWNlaG9sZGVyRWwpIHtcblxuXHRcdFx0Ly8gQWRkcyB2aWRlbyBzb29uIHNvIGFkcyBjYW4gc3RhcnQgbG9hZGluZ1xuXHRcdFx0dGhpcy5hZGRWaWRlbygpO1xuXHRcdFx0dGhpcy52aWRlb0VsLmZvY3VzKCk7XG5cblx0XHRcdHRoaXMuY29udGFpbmVyRWwucmVtb3ZlQ2hpbGQodGhpcy5wbGFjZWhvbGRlckVsKTtcblx0XHRcdGlmICh0aGlzLmluZm9QYW5lbCkge1xuXHRcdFx0XHR0aGlzLmluZm9QYW5lbC50ZWFyZG93bigpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWxldGUgdGhpcy5wbGFjZWhvbGRlckVsO1xuXHRcdFx0ZGVsZXRlIHRoaXMucGxhY2Vob2xkZXJJbWFnZUVsO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnZpZGVvRWwucGxheSgpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZVBsYWNlaG9sZGVyKCkge1xuXHRcdGlmICh0aGlzLnBvc3RlckltYWdlKSB7XG5cdFx0XHR0aGlzLnBsYWNlaG9sZGVySW1hZ2VFbC5zcmMgPSB0aGlzLnBvc3RlckltYWdlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmluZm9QYW5lbCkge1xuXHRcdFx0dGhpcy5pbmZvUGFuZWwudXBkYXRlKCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMucGxheUJ1dHRvbkVsKSB7XG5cdFx0XHR0aGlzLnBsYXlCdXR0b25FbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBgUGxheSB2aWRlbyAke3RoaXMudmlkZW9EYXRhLnRpdGxlfWApO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZShuZXdPcHRzKSB7XG5cdFx0aWYgKHRoaXMudmlkZW9FbCkge1xuXHRcdFx0dGhpcy52aWRlb0VsLnBhdXNlKCk7XG5cdFx0fVxuXHRcdHRoaXMuY2xlYXJDdXJyZW50bHlQbGF5aW5nKCk7XG5cblx0XHR0aGlzLmRpZFVzZXJQcmVzc1BsYXkgPSBmYWxzZTtcblxuXHRcdHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCB7IGRhdGE6IG51bGwgfSwgbmV3T3B0cyk7XG5cblx0XHRpZiAoIXRoaXMudmlkZW9FbCAmJiAhdGhpcy5wbGFjZWhvbGRlckVsKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5pbml0KCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZ2V0RGF0YSgpLnRoZW4oKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMucGxhY2Vob2xkZXJFbCkge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZVBsYWNlaG9sZGVyKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZVZpZGVvKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRnZXRQcm9ncmVzcygpIHtcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsLmR1cmF0aW9uID8gcGFyc2VJbnQoMTAwICogdGhpcy52aWRlb0VsLmN1cnJlbnRUaW1lIC8gdGhpcy52aWRlb0VsLmR1cmF0aW9uLCAxMCkgOiAwO1xuXHR9XG5cblx0Z2V0RHVyYXRpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMudmlkZW9FbC5kdXJhdGlvbiA/IHBhcnNlSW50KHRoaXMudmlkZW9FbC5kdXJhdGlvbiwgMTApIDogMDtcblx0fVxuXG5cdGdldFRyYWNrTW9kZSgpIHtcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsLnRleHRUcmFja3MgJiYgdGhpcy52aWRlb0VsLnRleHRUcmFja3NbMF0gPyB0aGlzLnZpZGVvRWwudGV4dFRyYWNrc1swXS5tb2RlIDogdW5kZWZpbmVkO1xuXHR9XG5cblx0Z2V0QW1vdW50V2F0Y2hlZChkZWNpbWFsUG9pbnRzKSB7XG5cdFx0Y29uc3Qgc2Vjb25kc1dhdGNoZWQgPSB0aGlzLmFtb3VudFdhdGNoZWQgLyAxMDAwO1xuXHRcdHJldHVybiBkZWNpbWFsUG9pbnRzICE9PSB1bmRlZmluZWQgPyBOdW1iZXIoc2Vjb25kc1dhdGNoZWQudG9GaXhlZChkZWNpbWFsUG9pbnRzKSkgOiBzZWNvbmRzV2F0Y2hlZDtcblx0fVxuXG5cdGdldEFtb3VudFdhdGNoZWRQZXJjZW50YWdlKGRlY2ltYWxQb2ludHMpIHtcblx0XHRjb25zdCBwZXJjZW50YWdlV2F0Y2hlZCA9IHRoaXMudmlkZW9FbCAmJiB0aGlzLnZpZGVvRWwuZHVyYXRpb24gPyAxMDAgLyB0aGlzLnZpZGVvRWwuZHVyYXRpb24gKiB0aGlzLmdldEFtb3VudFdhdGNoZWQoKSA6IDA7XG5cdFx0cmV0dXJuIGRlY2ltYWxQb2ludHMgIT09IHVuZGVmaW5lZCA/IE51bWJlcihwZXJjZW50YWdlV2F0Y2hlZC50b0ZpeGVkKGRlY2ltYWxQb2ludHMpKSA6IHBlcmNlbnRhZ2VXYXRjaGVkO1xuXHR9XG5cblx0cGF1c2VPdGhlclZpZGVvcygpIHtcblx0XHRpZiAodGhpcy5jdXJyZW50bHlQbGF5aW5nVmlkZW8gJiYgdGhpcy5jdXJyZW50bHlQbGF5aW5nVmlkZW8gIT09IHRoaXMudmlkZW9FbCkge1xuXHRcdFx0dGhpcy5jdXJyZW50bHlQbGF5aW5nVmlkZW8ucGF1c2UoKTtcblx0XHR9XG5cblx0XHR0aGlzLmN1cnJlbnRseVBsYXlpbmdWaWRlbyA9IHRoaXMudmlkZW9FbDtcblx0fVxuXG5cdGNsZWFyQ3VycmVudGx5UGxheWluZygpIHtcblx0XHRpZiAodGhpcy5jdXJyZW50bHlQbGF5aW5nVmlkZW8gIT09IHRoaXMudmlkZW9FbCkge1xuXHRcdFx0dGhpcy5jdXJyZW50bHlQbGF5aW5nVmlkZW8gPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdG1hcmtQbGF5U3RhcnQgKCkge1xuXHRcdHRoaXMucGxheVN0YXJ0ID0gRGF0ZS5ub3coKTtcblx0fVxuXG5cdHVwZGF0ZUFtb3VudFdhdGNoZWQgKCkge1xuXHRcdGlmICh0aGlzLnBsYXlTdGFydCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLmFtb3VudFdhdGNoZWQgKz0gRGF0ZS5ub3coKSAtIHRoaXMucGxheVN0YXJ0O1xuXHRcdFx0dGhpcy5wbGF5U3RhcnQgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0cmVzZXRBbW91bnRXYXRjaGVkICgpIHtcblx0XHR0aGlzLmFtb3VudFdhdGNoZWQgPSAwO1xuXHR9XG5cblx0c2hvd0d1aWRhbmNlQmFubmVyICgpIHtcblx0XHRjb25zdCB7IGNhcHRpb25zVXJsIH0gPSB0aGlzLnZpZGVvRGF0YSB8fCB7fTtcblx0XHRpZiAoIXRoaXMuZGlkVXNlclByZXNzUGxheSAmJiAhY2FwdGlvbnNVcmwgJiYgdGhpcy5ndWlkYW5jZSkge1xuXHRcdFx0dGhpcy5jb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmd1aWRhbmNlLmNyZWF0ZUJhbm5lcigpKTtcblx0XHR9XG5cdH1cblxuXHRkZXN0cm95ICgpIHtcblx0XHQvLyByZW1vdmUgbGlzdGVuZXJzXG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIodW5sb2FkRXZlbnROYW1lLCB0aGlzLmZpcmVXYXRjaGVkRXZlbnQpO1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvVmlld3BvcnQudmlzaWJpbGl0eScsIHRoaXMudmlzaWJpbGl0eUxpc3RlbmVyKTtcblx0fVxuXG5cdHN0YXRpYyBpbml0KHJvb3RFbCwgY29uZmlnKSB7XG5cdFx0Y29uc3QgdmlkZW9zID0gW107XG5cdFx0aWYgKCFyb290RWwpIHtcblx0XHRcdHJvb3RFbCA9IGRvY3VtZW50LmJvZHk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2Ygcm9vdEVsID09PSAnc3RyaW5nJykge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihyb290RWwpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHZpZGVvRWxzID0gcm9vdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJzpub3QoW2RhdGEtby12aWRlby1qc10pW2RhdGEtby1jb21wb25lbnR+PVwiby12aWRlb1wiXScpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB2aWRlb0Vscy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmlkZW9zLnB1c2gobmV3IFZpZGVvKHZpZGVvRWxzW2ldLCBjb25maWcpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmlkZW9zO1xuXHR9XG59XG5cblZpZGVvLlBsYXlsaXN0ID0gUGxheWxpc3Q7XG5cbmV4cG9ydCBkZWZhdWx0IFZpZGVvO1xuIiwiaW1wb3J0IE9WaWRlbyBmcm9tICcuLi8uLi9zcmMvanMvdmlkZW8uanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpIHtcblx0T1ZpZGVvLmluaXQoKTtcbn0pO1xuIl19