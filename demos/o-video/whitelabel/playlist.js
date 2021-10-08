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
  var video_default = Video; // demos/src/playlist.js

  document.addEventListener("DOMContentLoaded", function () {
    var select = document.querySelector("select");
    var queue = Array.from(select.options).map(function (opt) {
      return opt.value;
    });
    var player = new video_default(document.querySelector('[data-o-component="o-video"]'), {
      autorender: false
    });
    var playlist = new video_default.Playlist({
      player: player,
      queue: queue,
      autoplay: true
    });
    var buttons = Array.from(document.querySelectorAll("button"));
    buttons.forEach(function (button) {
      button.onclick = function (e) {
        return playlist[e.target.name]();
      };
    });
    player.containerEl.addEventListener("play", function () {
      select.options[playlist.currentIndex].selected = true;
    }, true);
  });
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYnJhcmllcy9vLXV0aWxzL21haW4uanMiLCIuLi9vLXZpZXdwb3J0L3NyYy91dGlscy5qcyIsIi4uL28tdmlld3BvcnQvbWFpbi5qcyIsInNyYy9qcy9oZWxwZXJzL3N1cHBvcnRlZC1mb3JtYXRzLmpzIiwic3JjL2pzL2hlbHBlcnMvZ2V0LXJlbmRpdGlvbi5qcyIsInNyYy9qcy9hZHMuanMiLCJzcmMvanMvaW5mby5qcyIsInNyYy9qcy9wbGF5bGlzdC5qcyIsInNyYy9qcy9ndWlkYW5jZS5qcyIsInNyYy9qcy92aWRlby5qcyIsImRlbW9zL3NyYy9wbGF5bGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWFBLFdBQUEsUUFBQSxDQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QjtBQUM3QixRQUFJLE9BQUo7QUFDQSxXQUFPLFlBQVc7QUFBQTs7QUFDakIsVUFBTSxJQUFBLEdBQU8sU0FBYjs7QUFDQSxVQUFNLEtBQUEsR0FBUSxTQUFSLEtBQVEsR0FBTTtBQUNuQixRQUFBLE9BQUEsR0FBVSxJQUFWO0FBQ0EsUUFBQSxJQUFBLENBQUssS0FBTCxDQUFXLEtBQVgsRUFBaUIsSUFBakI7QUFBaUIsT0FGbEI7O0FBSUEsTUFBQSxZQUFBLENBQWEsT0FBYixDQUFBO0FBQ0EsTUFBQSxPQUFBLEdBQVUsVUFBQSxDQUFXLEtBQVgsRUFBa0IsSUFBbEIsQ0FBVjtBQUE0QixLQVA3QjtBQU82Qjs7QUFnQjlCLFdBQUEsUUFBQSxDQUFrQixJQUFsQixFQUF3QixJQUF4QixFQUE4QjtBQUM3QixRQUFJLE9BQUo7QUFDQSxXQUFPLFlBQVc7QUFBQTs7QUFDakIsVUFBSSxPQUFKLEVBQWE7QUFDWjtBQUFBOztBQUVELFVBQU0sSUFBQSxHQUFPLFNBQWI7O0FBQ0EsVUFBTSxLQUFBLEdBQVEsU0FBUixLQUFRLEdBQU07QUFDbkIsUUFBQSxPQUFBLEdBQVUsSUFBVjtBQUNBLFFBQUEsSUFBQSxDQUFLLEtBQUwsQ0FBVyxNQUFY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QUFBLEVBQUEsS0FBVjtBQUFpQixNQUFBLFFBQUEsRUFBVTtBQUEzQixLQUFuQixDQUFqQjtBQUVBLFFBQU0sT0FBQSxHQUFVLEtBQUEsQ0FBTSxJQUFOLENBQVcsUUFBQSxDQUFTLGdCQUFULENBQTBCLFFBQTFCLENBQVgsQ0FBaEI7QUFFQSxJQUFBLE9BQUEsQ0FBUSxPQUFSLENBQWdCLFVBQUEsTUFBQSxFQUFVO0FBQ3pCLE1BQUEsTUFBQSxDQUFPLE9BQVAsR0FBaUIsVUFBQyxDQUFEO0FBQUEsZUFBTyxRQUFBLENBQVMsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxJQUFsQixDQUFBLEVBQVA7QUFBQSxPQUFqQjtBQUEwQyxLQUQzQztBQUlBLElBQUEsTUFBQSxDQUFPLFdBQVAsQ0FBbUIsZ0JBQW5CLENBQW9DLE1BQXBDLEVBQTRDLFlBQU07QUFDakQsTUFBQSxNQUFBLENBQU8sT0FBUCxDQUFlLFFBQUEsQ0FBUyxZQUF4QixFQUFzQyxRQUF0QyxHQUFpRCxJQUFqRDtBQUFpRCxLQURsRCxFQUVHLElBRkg7QUFFRyxHQWxCSiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKlxuKiBEZWJvdW5jZXMgZnVuY3Rpb24gc28gaXQgaXMgb25seSBjYWxsZWQgYWZ0ZXIgbiBtaWxsaXNlY29uZHNcbiogd2l0aG91dCBpdCBub3QgYmVpbmcgY2FsbGVkXG4qXG4qIEBleGFtcGxlXG4qIFV0aWxzLmRlYm91bmNlKG15RnVuY3Rpb24oKSB7fSwgMTAwKTtcbipcbiogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHRvIGJlIGRlYm91bmNlZFxuKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIFRpbWUgaW4gbWlsaXNlY29uZHNcbipcbiogQHJldHVybnMge0Z1bmN0aW9ufSAtIERlYm91bmNlZCBmdW5jdGlvblxuKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQpIHtcblx0bGV0IHRpbWVvdXQ7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGNvbnN0IGxhdGVyID0gKCkgPT4ge1xuXHRcdFx0dGltZW91dCA9IG51bGw7XG5cdFx0XHRmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXHRcdH07XG5cdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0fTtcbn1cblxuLyoqXG4qXG4qIFRocm90dGxlIGZ1bmN0aW9uIHNvIGl0IGlzIG9ubHkgY2FsbGVkIG9uY2UgZXZlcnkgbiBtaWxsaXNlY29uZHNcbipcbiogQGV4YW1wbGVcbiogVXRpbHMudGhyb3R0bGUobXlGdW5jdGlvbigpIHt9LCAxMDApO1xuKlxuKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gRnVuY3Rpb24gdG8gYmUgdGhyb3R0bGVkXG4qIEBwYXJhbSB7bnVtYmVyfSB3YWl0IC0gVGltZSBpbiBtaWxpc2Vjb25kc1xuKlxuKiBAcmV0dXJucyB7RnVuY3Rpb259IC0gVGhyb3R0bGVkIGZ1bmN0aW9uXG4qL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCkge1xuXHRsZXQgdGltZW91dDtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGlmICh0aW1lb3V0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG5cdFx0fTtcblxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblx0fTtcbn1cblxuZXhwb3J0IHtcblx0ZGVib3VuY2UsXG5cdHRocm90dGxlXG59O1xuIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSAnQGZpbmFuY2lhbC10aW1lcy9vLXV0aWxzJztcblxubGV0IGRlYnVnO1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gZGF0YVxuICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0XG4gKi9cbmZ1bmN0aW9uIGJyb2FkY2FzdChldmVudFR5cGUsIGRhdGEsIHRhcmdldCkge1xuXHR0YXJnZXQgPSB0YXJnZXQgfHwgZG9jdW1lbnQuYm9keTtcblxuXHRpZiAoZGVidWcpIHtcblx0XHRjb25zb2xlLmxvZygnby12aWV3cG9ydCcsIGV2ZW50VHlwZSwgZGF0YSk7XG5cdH1cblxuXHR0YXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ29WaWV3cG9ydC4nICsgZXZlbnRUeXBlLCB7XG5cdFx0ZGV0YWlsOiBkYXRhLFxuXHRcdGJ1YmJsZXM6IHRydWVcblx0fSkpO1xufVxuXG4vKipcbiogR2V0IHRoZSB2aWV3cG9ydCBoZWlnaHQuXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIGhlaWdodC5cbiogQHJldHVybiB7bnVtYmVyfVxuKi9cbmZ1bmN0aW9uIGdldEhlaWdodChpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiBpZ25vcmVTY3JvbGxiYXJzID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCA6IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbn1cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgd2lkdGguXG4qIEBwYXJhbSB7Ym9vbGVhbn0gaWdub3JlU2Nyb2xsYmFycyBbZmFsc2VdIC0gc2V0IHRvIHRydWUgdG8gZGlzY291bnQgc2Nyb2xsYmFyIHdpZHRoXG4qIEByZXR1cm4ge251bWJlcn1cbiovXG5mdW5jdGlvbiBnZXRXaWR0aChpZ25vcmVTY3JvbGxiYXJzKSB7XG5cdHJldHVybiBpZ25vcmVTY3JvbGxiYXJzID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDogTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbn1cblxuLyoqXG4gKiBWaWV3cG9ydCBzaXplLlxuICogQHR5cGVkZWYge09iamVjdH0gU2l6ZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhlaWdodFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpZHRoXG4gKi9cblxuLyoqXG4qIEdldCB0aGUgdmlld3BvcnQgd2lkdGggYW5kIGhlaWdodC5cbiogQHBhcmFtIHtib29sZWFufSBpZ25vcmVTY3JvbGxiYXJzIFtmYWxzZV0gLSBzZXQgdG8gdHJ1ZSB0byBkaXNjb3VudCBzY3JvbGxiYXIgd2lkdGgvaGVpZ2h0LlxuKiBAcmV0dXJuIHtTaXplfVxuKi9cbmZ1bmN0aW9uIGdldFNpemUoaWdub3JlU2Nyb2xsYmFycykge1xuXHRyZXR1cm4ge1xuXHRcdGhlaWdodDogZ2V0SGVpZ2h0KGlnbm9yZVNjcm9sbGJhcnMpLFxuXHRcdHdpZHRoOiBnZXRXaWR0aChpZ25vcmVTY3JvbGxiYXJzKVxuXHR9O1xufVxuXG4vKipcbiAqIFNjcm9sbCBwb3NpdGlvbi5cbiAqIEB0eXBlZGVmIHtPYmplY3R9IFNjcm9sbFBvc2l0aW9uXG4gKiBAcHJvcGVydHkge251bWJlcn0gaGVpZ2h0IC0gYGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0YFxuICogQHByb3BlcnR5IHtudW1iZXJ9IHdpZHRoIC0gYGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGhgXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGVmdCAtIGB3aW5kb3cucGFnZVhPZmZzZXQgfHwgd2luZG93LnNjcm9sbFhgXG4gKiBAcHJvcGVydHkge251bWJlcn0gdG9wIC0gYHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWWBcbiAqL1xuXG4vKipcbiAqIEByZXR1cm4ge1Njcm9sbFBvc2l0aW9ufVxuICovXG5mdW5jdGlvbiBnZXRTY3JvbGxQb3NpdGlvbigpIHtcblx0cmV0dXJuIHtcblx0XHRoZWlnaHQ6IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LFxuXHRcdHdpZHRoOiBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLFxuXHRcdGxlZnQ6IHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCxcblx0XHR0b3A6IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWVxuXHR9O1xufVxuXG4vKipcbiAqIEByZXR1cm4ge3N0cmluZ30gLSAncG9ydHJhaXQnIG9yICdsYW5kc2NhcGUnXG4gKi9cbmZ1bmN0aW9uIGdldE9yaWVudGF0aW9uKCkge1xuXHRjb25zdCBvcmllbnRhdGlvbiA9IHdpbmRvdy5zY3JlZW4ub3JpZW50YXRpb247XG5cdGlmIChvcmllbnRhdGlvbikge1xuXHRcdHJldHVybiB0eXBlb2Ygb3JpZW50YXRpb24gPT09ICdzdHJpbmcnID9cblx0XHRcdG9yaWVudGF0aW9uLnNwbGl0KCctJylbMF0gOlxuXHRcdFx0b3JpZW50YXRpb24udHlwZS5zcGxpdCgnLScpWzBdO1xuXHR9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKSB7XG5cdFx0cmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKCcob3JpZW50YXRpb246IHBvcnRyYWl0KScpLm1hdGNoZXMgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGdldEhlaWdodCgpID49IGdldFdpZHRoKCkgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZSc7XG5cdH1cbn1cblxuLyoqXG4gKiBAcmV0dXJuIHtib29sZWFufSAtIHRydWUgaWYgdGhlIHZpZXdwb3J0IGlzIHZpc2libGVcbiAqL1xuZnVuY3Rpb24gZ2V0VmlzaWJpbGl0eSgpIHtcblx0cmV0dXJuIGRvY3VtZW50LmhpZGRlbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXHRkZWJ1ZzogZnVuY3Rpb24oKSB7XG5cdFx0ZGVidWcgPSB0cnVlO1xuXHR9LFxuXHRicm9hZGNhc3QsXG5cdGdldFdpZHRoLFxuXHRnZXRIZWlnaHQsXG5cdGdldFNpemUsXG5cdGdldFNjcm9sbFBvc2l0aW9uLFxuXHRnZXRWaXNpYmlsaXR5LFxuXHRnZXRPcmllbnRhdGlvbixcblx0ZGVib3VuY2U6IFV0aWxzLmRlYm91bmNlLFxuXHR0aHJvdHRsZTogVXRpbHMudGhyb3R0bGVcbn07XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnLi9zcmMvdXRpbHMuanMnO1xuXG5jb25zdCB0aHJvdHRsZSA9IHV0aWxzLnRocm90dGxlO1xuY29uc3QgZGVib3VuY2UgPSB1dGlscy5kZWJvdW5jZTtcblxuY29uc3QgbGlzdGVuZXJzID0ge307XG5jb25zdCBpbnRlcnZhbHMgPSB7XG5cdHJlc2l6ZTogMTAwLFxuXHRvcmllbnRhdGlvbjogMTAwLFxuXHR2aXNpYmlsaXR5OiAxMDAsXG5cdHNjcm9sbDogMTAwXG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgdG8gdGhyb3R0bGUgZm9yIHRoaXMgZHVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gaW50ZXJ2YWwgLSBUaGUgZHVyYXRpb24gdG8gdGhyb3R0bGUgaW4gbXMuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqIEBleGFtcGxlXG4gKiBcdCAgIC8vIHRocm90dGxlIGZvciBkaWZmZXJlbnQgZXZlbnRzIGF0IGRpZmZlcmVudCBkdXJhdGlvbnNcbiAqICAgICBzZXRUaHJvdHRsZUludGVydmFsKCdzY3JvbGwnLCAxMDApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgncmVzaXplJywgMzAwKVxuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoJ29yaWVudGF0aW9uJywgMzApXG4gKiAgICAgc2V0VGhyb3R0bGVJbnRlcnZhbCgndmlzaWJpbGl0eScsIDMwKVxuICogXHRcdC8vIHRocm90dGxlIGFsbCBldmVudHMgYXQgMzBtc1xuICogICAgIHNldFRocm90dGxlSW50ZXJ2YWwoMzApO1xuICovXG5mdW5jdGlvbiBzZXRUaHJvdHRsZUludGVydmFsKGV2ZW50VHlwZSwgaW50ZXJ2YWwpIHtcblx0aWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdudW1iZXInKSB7XG5cdFx0c2V0VGhyb3R0bGVJbnRlcnZhbCgnc2Nyb2xsJywgYXJndW1lbnRzWzBdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCdyZXNpemUnLCBhcmd1bWVudHNbMV0pO1xuXHRcdHNldFRocm90dGxlSW50ZXJ2YWwoJ29yaWVudGF0aW9uJywgYXJndW1lbnRzWzJdKTtcblx0XHRzZXRUaHJvdHRsZUludGVydmFsKCd2aXNpYmlsaXR5JywgYXJndW1lbnRzWzNdKTtcblx0fSBlbHNlIGlmIChpbnRlcnZhbCkge1xuXHRcdGludGVydmFsc1tldmVudFR5cGVdID0gaW50ZXJ2YWw7XG5cdH1cbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9SZXNpemUoKSB7XG5cdGlmIChsaXN0ZW5lcnMucmVzaXplKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Jlc2l6ZScsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMucmVzaXplKTtcblxuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cdGxpc3RlbmVycy5yZXNpemUgPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub09yaWVudGF0aW9uKCkge1xuXG5cdGlmIChsaXN0ZW5lcnMub3JpZW50YXRpb24pIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAnb3JpZW50YXRpb25jaGFuZ2UnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ29yaWVudGF0aW9uJywge1xuXHRcdFx0dmlld3BvcnQ6IHV0aWxzLmdldFNpemUoKSxcblx0XHRcdG9yaWVudGF0aW9uOiB1dGlscy5nZXRPcmllbnRhdGlvbigpLFxuXHRcdFx0b3JpZ2luYWxFdmVudDogZXZcblx0XHR9KTtcblx0fSwgaW50ZXJ2YWxzLm9yaWVudGF0aW9uKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMub3JpZW50YXRpb24gPSB7XG5cdFx0ZXZlbnRUeXBlOiBldmVudFR5cGUsXG5cdFx0aGFuZGxlcjogaGFuZGxlclxuXHR9O1xufVxuXG4vKipcbiAqIEBhY2Nlc3MgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsaXN0ZW5Ub1Zpc2liaWxpdHkoKSB7XG5cblx0aWYgKGxpc3RlbmVycy52aXNpYmlsaXR5KSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgZXZlbnRUeXBlID0gJ3Zpc2liaWxpdHljaGFuZ2UnO1xuXHRjb25zdCBoYW5kbGVyID0gZGVib3VuY2UoZnVuY3Rpb24oZXYpIHtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Zpc2liaWxpdHknLCB7XG5cdFx0XHRoaWRkZW46IHV0aWxzLmdldFZpc2liaWxpdHkoKSxcblx0XHRcdG9yaWdpbmFsRXZlbnQ6IGV2XG5cdFx0fSk7XG5cdH0sIGludGVydmFscy52aXNpYmlsaXR5KTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXG5cdGxpc3RlbmVycy52aXNpYmlsaXR5ID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBAYWNjZXNzIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG9TY3JvbGwoKSB7XG5cblx0aWYgKGxpc3RlbmVycy5zY3JvbGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBldmVudFR5cGUgPSAnc2Nyb2xsJztcblx0Y29uc3QgaGFuZGxlciA9IHRocm90dGxlKGZ1bmN0aW9uKGV2KSB7XG5cdFx0Y29uc3Qgc2Nyb2xsUG9zID0gdXRpbHMuZ2V0U2Nyb2xsUG9zaXRpb24oKTtcblx0XHR1dGlscy5icm9hZGNhc3QoJ3Njcm9sbCcsIHtcblx0XHRcdHZpZXdwb3J0OiB1dGlscy5nZXRTaXplKCksXG5cdFx0XHRzY3JvbGxIZWlnaHQ6IHNjcm9sbFBvcy5oZWlnaHQsXG5cdFx0XHRzY3JvbGxMZWZ0OiBzY3JvbGxQb3MubGVmdCxcblx0XHRcdHNjcm9sbFRvcDogc2Nyb2xsUG9zLnRvcCxcblx0XHRcdHNjcm9sbFdpZHRoOiBzY3JvbGxQb3Mud2lkdGgsXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBldlxuXHRcdH0pO1xuXHR9LCBpbnRlcnZhbHMuc2Nyb2xsKTtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIpO1xuXHRsaXN0ZW5lcnMuc2Nyb2xsID0ge1xuXHRcdGV2ZW50VHlwZTogZXZlbnRUeXBlLFxuXHRcdGhhbmRsZXI6IGhhbmRsZXJcblx0fTtcbn1cblxuLyoqXG4gKiBTdGFydCBsaXN0ZW5pbmcgZm9yIGFuIGV2ZW50KHMpLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0byBzdGFydCBsaXN0ZW5pbmcgZm9yLiBPbmUgb2YgYHJlc2l6ZWAsIGBzY3JvbGxgLCBgb3JpZW50YXRpb25gLCBgdmlzaWJpbGl0eWAgb3IgYGFsbGAuXG4gKiBAZXhhbXBsZVxuICogXHRcdC8vIFN0YXJ0IGxpc3RlbmluZyBmb3IgYWxsIGV2ZW50cy5cbiAqIFx0XHRvVmlld3BvcnQubGlzdGVuVG8oJ2FsbCcpO1xuICpcbiAqIFx0XHQvLyBJdCBpcyBub3cgcG9zc2libGUgdG8gbGlzdGVuIGZvciBkZWJvdW5jZSBvLXZpZXdwb3J0IGV2ZW50cyBzdWNoIGFzIGBvVmlld3BvcnQub3JpZW50YXRpb25gLlxuICogICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ29WaWV3cG9ydC5vcmllbnRhdGlvbicsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gKiAgICAgIFx0Y29uc29sZS5sb2coZXZlbnQudHlwZSk7IC8vIG9WaWV3cG9ydC5vcmllbnRhdGlvblxuICogICAgICB9KTtcbiAqL1xuZnVuY3Rpb24gbGlzdGVuVG8oZXZlbnRUeXBlKSB7XG5cdGlmIChldmVudFR5cGUgPT09ICdyZXNpemUnIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub1Jlc2l6ZSgpO1xuXHR9XG5cblx0aWYgKGV2ZW50VHlwZSA9PT0gJ3Njcm9sbCcgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvU2Nyb2xsKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAnb3JpZW50YXRpb24nIHx8IGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRsaXN0ZW5Ub09yaWVudGF0aW9uKCk7XG5cdH1cblxuXHRpZiAoZXZlbnRUeXBlID09PSAndmlzaWJpbGl0eScgfHwgZXZlbnRUeXBlID09PSAnYWxsJykge1xuXHRcdGxpc3RlblRvVmlzaWJpbGl0eSgpO1xuXHR9XG59XG5cbi8qKlxuICogU3RvcCBsaXN0ZW5pbmcgZm9yIGFuIGV2ZW50KHMpLlxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50VHlwZSAtIFRoZSBldmVudCB0byBzdG9wIGxpc3RlbmluZyBmb3IuIE9uZSBvZiBgcmVzaXplYCwgYHNjcm9sbGAsIGBvcmllbnRhdGlvbmAsIGB2aXNpYmlsaXR5YCBvciBgYWxsYC5cbiAqIEBleGFtcGxlXG4gKiBcdFx0Ly8gU3RhcnQgbGlzdGVuaW5nIGZvciBhbGwgZXZlbnRzLlxuICogXHRcdG9WaWV3cG9ydC5saXN0ZW5UbygnYWxsJyk7XG4gKiBcdFx0Ly8gV2UncmUgZG9uZS4gU3RvcCBsaXN0ZW5pbmcgZm9yIGFsbCBldmVudHMuXG4gKiBcdFx0b1ZpZXdwb3J0LnN0b3BMaXN0ZW5pbmdUbygnYWxsJyk7XG4gKi9cbmZ1bmN0aW9uIHN0b3BMaXN0ZW5pbmdUbyhldmVudFR5cGUpIHtcblx0aWYgKGV2ZW50VHlwZSA9PT0gJ2FsbCcpIHtcblx0XHRPYmplY3Qua2V5cyhsaXN0ZW5lcnMpLmZvckVhY2goc3RvcExpc3RlbmluZ1RvKTtcblx0fSBlbHNlIGlmIChsaXN0ZW5lcnNbZXZlbnRUeXBlXSkge1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyc1tldmVudFR5cGVdLmV2ZW50VHlwZSwgbGlzdGVuZXJzW2V2ZW50VHlwZV0uaGFuZGxlcik7XG5cdFx0ZGVsZXRlIGxpc3RlbmVyc1tldmVudFR5cGVdO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblx0ZGVidWc6IGZ1bmN0aW9uICgpIHtcblx0XHR1dGlscy5kZWJ1ZygpO1xuXHR9LFxuXHRsaXN0ZW5Ubyxcblx0c3RvcExpc3RlbmluZ1RvLFxuXHRzZXRUaHJvdHRsZUludGVydmFsLFxuXHRnZXRPcmllbnRhdGlvbjogdXRpbHMuZ2V0T3JpZW50YXRpb24sXG5cdGdldFNpemU6IHV0aWxzLmdldFNpemUsXG5cdGdldFNjcm9sbFBvc2l0aW9uOiB1dGlscy5nZXRTY3JvbGxQb3NpdGlvbixcblx0Z2V0VmlzaWJpbGl0eTogdXRpbHMuZ2V0VmlzaWJpbGl0eVxufTtcbiIsImNvbnN0IGZvcm1hdHMgPSB7XG5cdG1wZWc0OiBbXG5cdFx0J3ZpZGVvL21wNDsgY29kZWNzPVwibXA0di4yMC44XCInXG5cdF0sXG5cdGgyNjQ6IFtcblx0XHQndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRVwiJyxcblx0XHQndmlkZW8vbXA0OyBjb2RlY3M9XCJhdmMxLjQyRTAxRSwgbXA0YS40MC4yXCInXG5cdF0sXG5cdG9nZzogW1xuXHRcdCd2aWRlby9vZ2c7IGNvZGVjcz1cInRoZW9yYVwiJ1xuXHRdLFxuXHR3ZWJtOiBbXG5cdFx0J3ZpZGVvL3dlYm07IGNvZGVjcz1cInZwOCwgdm9yYmlzXCInXG5cdF1cbn07XG5cbmZ1bmN0aW9uIHN1cHBvcnRlZEZvcm1hdHMgKCkge1xuXHRjb25zdCB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuXHRjb25zdCBzdXBwb3J0ZWQgPSBbXTtcblxuXHR0cnkge1xuXHRcdE9iamVjdC5rZXlzKGZvcm1hdHMpLmZvckVhY2goZm9ybWF0ID0+IHtcblx0XHRcdGlmIChmb3JtYXRzW2Zvcm1hdF0uc29tZSh0eXBlID0+IHRlc3RFbC5jYW5QbGF5VHlwZSh0eXBlKSkpIHtcblx0XHRcdFx0c3VwcG9ydGVkLnB1c2goZm9ybWF0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSBjYXRjaChlKSB7IH1cblxuXHRyZXR1cm4gc3VwcG9ydGVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdXBwb3J0ZWRGb3JtYXRzO1xuIiwiaW1wb3J0IHN1cHBvcnRlZEZvcm1hdHMgZnJvbSAnLi9zdXBwb3J0ZWQtZm9ybWF0cy5qcyc7XG5cbmZ1bmN0aW9uIGdldFJlbmRpdGlvbihyZW5kaXRpb25zLCBvcHRpb25zKSB7XG5cdC8vIGFsbG93IG1vY2tpbmcgb2Ygc3VwcG9ydGVkIGZvcm1hdHMgbW9kdWxlXG5cdGNvbnN0IG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuXHRjb25zdCB3aWR0aCA9IG9wdHMub3B0aW11bXZpZGVvd2lkdGg7XG5cdGNvbnN0IGZvcm1hdHMgPSBvcHRzLnN1cHBvcnRlZEZvcm1hdHMgfHwgc3VwcG9ydGVkRm9ybWF0cygpO1xuXHRsZXQgYXBwcm9wcmlhdGVSZW5kaXRpb247XG5cdC8vIG9yZGVyIHNtYWxsZXN0IHRvIGxhcmdlc3Rcblx0Y29uc3Qgb3JkZXJlZFJlbmRpdGlvbnMgPSByZW5kaXRpb25zXG5cdFx0LmZpbHRlcihyZW5kaXRpb24gPT4ge1xuXHRcdFx0cmV0dXJuIGZvcm1hdHMuaW5kZXhPZihyZW5kaXRpb24uY29kZWMudG9Mb3dlckNhc2UoKSkgPiAtMTtcblx0XHR9KVxuXHRcdC5zb3J0KChyZW5kaXRpb25PbmUsIHJlbmRpdGlvblR3bykgPT4ge1xuXHRcdFx0cmV0dXJuIHJlbmRpdGlvbk9uZS5waXhlbFdpZHRoIC0gcmVuZGl0aW9uVHdvLnBpeGVsV2lkdGg7XG5cdFx0fSk7XG5cblx0Ly8gaWYgbm8gd2lkdGggc3VwcGxpZWQsIGdldCBsYXJnZXN0XG5cdGlmICghd2lkdGgpIHtcblx0XHRyZXR1cm4gb3JkZXJlZFJlbmRpdGlvbnMucG9wKCk7XG5cdH1cblx0Ly8gTk9URTogcmF0aGVyIHVzZSBmaW5kLi4uXG5cdG9yZGVyZWRSZW5kaXRpb25zLnNvbWUocmVuZGl0aW9uID0+IHtcblx0XHRpZiAocmVuZGl0aW9uLnBpeGVsV2lkdGggPj0gd2lkdGgpIHtcblx0XHRcdGFwcHJvcHJpYXRlUmVuZGl0aW9uID0gcmVuZGl0aW9uO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fSk7XG5cblx0cmV0dXJuIGFwcHJvcHJpYXRlUmVuZGl0aW9uIHx8IG9yZGVyZWRSZW5kaXRpb25zLnBvcCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRSZW5kaXRpb247XG4iLCIvKiBnbG9iYWwgZ29vZ2xlICovXG5cbmxldCBzZGtTY3JpcHRMb2FkZWQgPSBmYWxzZTtcbmxldCBzZGtTY3JpcHRFcnJvciA9IG51bGw7XG5cbmZ1bmN0aW9uIGNyZWF0ZVZpZGVvT3ZlcmxheUVsZW1lbnQoKSB7XG5cdGNvbnN0IG92ZXJsYXlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRvdmVybGF5RWwuY2xhc3NMaXN0LmFkZCgnby12aWRlb19fb3ZlcmxheScpO1xuXHRyZXR1cm4gb3ZlcmxheUVsO1xufVxuXG5jbGFzcyBWaWRlb0FkcyB7XG5cdGNvbnN0cnVjdG9yKHZpZGVvKSB7XG5cdFx0dGhpcy52aWRlbyA9IHZpZGVvO1xuXG5cdFx0Ly8gb25seSB3aGVuIHRoZXNlIHRocmVlIGNvbmRpdGlvbnMgYXJlIG1ldCB3aWxsIHRoZSB2aWRlbyBwbGF5XG5cdFx0dGhpcy5hZHNMb2FkZWQgPSBmYWxzZTtcblx0XHR0aGlzLnZpZGVvTG9hZGVkID0gZmFsc2U7XG5cdFx0dGhpcy5sb2FkaW5nU3RhdGVEaXNwbGF5ZWQgPSBmYWxzZTtcblxuXHRcdC8vIHJlY29yZCB3aGVuIHRoZSBhZHZlcnQgaGFzIGNvbXBsZXRlZFxuXHRcdHRoaXMuYWRzQ29tcGxldGVkID0gZmFsc2U7XG5cdH1cblxuXHRzdGF0aWMgbG9hZEFkc0xpYnJhcnkoKSB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGxldCBnb29nbGVTZGtTY3JpcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbc3JjPVwiLy9pbWFzZGsuZ29vZ2xlYXBpcy5jb20vanMvc2RrbG9hZGVyL2ltYTMuanNcIl0nKTtcblxuXHRcdFx0aWYgKCFnb29nbGVTZGtTY3JpcHQpIHtcblx0XHRcdFx0Z29vZ2xlU2RrU2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cdFx0XHRcdGdvb2dsZVNka1NjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAndGV4dC9qYXZhc2NyaXB0Jyk7XG5cdFx0XHRcdGdvb2dsZVNka1NjcmlwdC5zZXRBdHRyaWJ1dGUoJ3NyYycsIGAvL2ltYXNkay5nb29nbGVhcGlzLmNvbS9qcy9zZGtsb2FkZXIvaW1hMy5qc2ApO1xuXHRcdFx0XHRnb29nbGVTZGtTY3JpcHQuc2V0QXR0cmlidXRlKCdhc3luYycsIHRydWUpO1xuXHRcdFx0XHRnb29nbGVTZGtTY3JpcHQuc2V0QXR0cmlidXRlKCdkZWZlcicsIHRydWUpO1xuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoZ29vZ2xlU2RrU2NyaXB0KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHNka1NjcmlwdExvYWRlZCB8fCB3aW5kb3cuZ29vZ2xlICYmIHdpbmRvdy5nb29nbGUuaW1hKSB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0gZWxzZSBpZiAoc2RrU2NyaXB0RXJyb3IpIHtcblx0XHRcdFx0cmVqZWN0KHNka1NjcmlwdEVycm9yKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGdvb2dsZVNka1NjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuXHRcdFx0XHRcdHNka1NjcmlwdExvYWRlZCA9IHRydWU7XG5cdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRnb29nbGVTZGtTY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZSkgPT4ge1xuXHRcdFx0XHRcdHNka1NjcmlwdEVycm9yID0gZTtcblx0XHRcdFx0XHRyZWplY3QoZSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0VmlkZW9CcmFuZCgpIHtcblx0XHRpZiAoIXRoaXMudmlkZW8udmlkZW9EYXRhIHx8ICF0aGlzLnZpZGVvLnZpZGVvRGF0YS5icmFuZCB8fCAhdGhpcy52aWRlby52aWRlb0RhdGEuYnJhbmQubmFtZSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gdGhpcy52aWRlby52aWRlb0RhdGEuYnJhbmQubmFtZTtcblx0XHR9XG5cdH1cblxuXHRzZXRVcEFkcygpIHtcblx0XHR0aGlzLmFkQ29udGFpbmVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0aGlzLnZpZGVvLmNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHRoaXMuYWRDb250YWluZXJFbCk7XG5cdFx0dGhpcy5hZERpc3BsYXlDb250YWluZXIgPSBuZXcgZ29vZ2xlLmltYS5BZERpc3BsYXlDb250YWluZXIodGhpcy5hZENvbnRhaW5lckVsLCB0aGlzLnZpZGVvLnZpZGVvRWwpO1xuXG5cdFx0Ly8gQ3JlYXRlIGFkcyBsb2FkZXIuXG5cdFx0dGhpcy5hZHNMb2FkZXIgPSBuZXcgZ29vZ2xlLmltYS5BZHNMb2FkZXIodGhpcy5hZERpc3BsYXlDb250YWluZXIpO1xuXG5cdFx0Ly8gU2V0cyB1cCBiaW5kaW5ncyBmb3IgYWxsIEFkIHJlbGF0ZWQgaGFuZGxlcnNcblx0XHR0aGlzLmFkc01hbmFnZXJMb2FkZWRIYW5kbGVyID0gdGhpcy5hZHNNYW5hZ2VyTG9hZGVkSGFuZGxlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuYWRFcnJvckhhbmRsZXIgPSB0aGlzLmFkRXJyb3JIYW5kbGVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5hZEV2ZW50SGFuZGxlciA9IHRoaXMuYWRFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmNvbnRlbnRQYXVzZVJlcXVlc3RIYW5kbGVyID0gdGhpcy5jb250ZW50UGF1c2VSZXF1ZXN0SGFuZGxlci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuY29udGVudFJlc3VtZVJlcXVlc3RIYW5kbGVyID0gdGhpcy5jb250ZW50UmVzdW1lUmVxdWVzdEhhbmRsZXIuYmluZCh0aGlzKTtcblx0XHR0aGlzLmdldEFkUHJvZ3Jlc3MgPSB0aGlzLmdldEFkUHJvZ3Jlc3MuYmluZCh0aGlzKTtcblxuXHRcdC8vIExpc3RlbiBhbmQgcmVzcG9uZCB0byBhZHMgbG9hZGVkIGFuZCBlcnJvciBldmVudHMuXG5cdFx0dGhpcy5hZHNMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcdGdvb2dsZS5pbWEuQWRzTWFuYWdlckxvYWRlZEV2ZW50LlR5cGUuQURTX01BTkFHRVJfTE9BREVELFxuXHRcdFx0dGhpcy5hZHNNYW5hZ2VyTG9hZGVkSGFuZGxlcixcblx0XHRcdGZhbHNlKTtcblx0XHR0aGlzLmFkc0xvYWRlci5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFx0Z29vZ2xlLmltYS5BZEVycm9yRXZlbnQuVHlwZS5BRF9FUlJPUixcblx0XHRcdHRoaXMuYWRFcnJvckhhbmRsZXIsXG5cdFx0XHRmYWxzZSk7XG5cblx0XHR0aGlzLnJlcXVlc3RBZHMoKTtcblxuXHRcdHRoaXMucGxheUFkRXZlbnRIYW5kbGVyID0gdGhpcy5wbGF5QWRFdmVudEhhbmRsZXIuYmluZCh0aGlzKTtcblx0XHRpZiAodGhpcy52aWRlby5vcHRzLnBsYWNlaG9sZGVyKSB7XG5cdFx0XHR0aGlzLnBsYXlBZEV2ZW50SGFuZGxlcigpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm92ZXJsYXlFbCA9IGNyZWF0ZVZpZGVvT3ZlcmxheUVsZW1lbnQoKTtcblx0XHRcdHRoaXMudmlkZW8uY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuXHRcdFx0dGhpcy5vdmVybGF5RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnBsYXlBZEV2ZW50SGFuZGxlcik7XG5cdFx0fVxuXHR9XG5cblx0cmVxdWVzdEFkcygpIHtcblx0XHQvLyBSZXF1ZXN0IHZpZGVvIGFkcy5cblx0XHRjb25zdCBhZHNSZXF1ZXN0ID0gbmV3IGdvb2dsZS5pbWEuQWRzUmVxdWVzdCgpO1xuXG5cdFx0bGV0IHRhcmdldGluZyA9IGBwb3M9JHt0aGlzLnZpZGVvLnRhcmdldGluZy5wb3NpdGlvbn0mdHRpZD0ke3RoaXMudmlkZW8udGFyZ2V0aW5nLnZpZGVvSWR9YDtcblx0XHRjb25zdCBicmFuZCA9IHRoaXMuZ2V0VmlkZW9CcmFuZCgpO1xuXHRcdGlmIChicmFuZCkge1xuXHRcdFx0dGFyZ2V0aW5nICs9IGAmYnJhbmQ9JHticmFuZH1gO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFkdmVydGlzaW5nVXJsID0gYGh0dHA6Ly9wdWJhZHMuZy5kb3VibGVjbGljay5uZXQvZ2FtcGFkL2Fkcz9lbnY9dnAmZ2RmcF9yZXE9MSZpbXBsPXMmb3V0cHV0PXhtbF92YXN0MiZpdT0ke3RoaXMudmlkZW8udGFyZ2V0aW5nLnNpdGV9JnN6PSR7dGhpcy52aWRlby50YXJnZXRpbmcuc2l6ZXN9JnVudmlld2VkX3Bvc2l0aW9uX3N0YXJ0PTEmc2NwPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRhcmdldGluZyl9YDtcblxuXHRcdGFkc1JlcXVlc3QuYWRUYWdVcmwgPSBhZHZlcnRpc2luZ1VybDtcblxuXHRcdC8vIFNwZWNpZnkgdGhlIGxpbmVhciBhbmQgbm9ubGluZWFyIHNsb3Qgc2l6ZXMuIFRoaXMgaGVscHMgdGhlIFNES1xuXHRcdC8vIHNlbGVjdCB0aGUgY29ycmVjdCBjcmVhdGl2ZSBpZiBtdWx0aXBsZSBhcmUgcmV0dXJuZWQuXG5cdFx0YWRzUmVxdWVzdC5saW5lYXJBZFNsb3RXaWR0aCA9IDU5Mjtcblx0XHRhZHNSZXF1ZXN0LmxpbmVhckFkU2xvdEhlaWdodCA9IDMzMztcblxuXHRcdGFkc1JlcXVlc3Qubm9uTGluZWFyQWRTbG90V2lkdGggPSA1OTI7XG5cdFx0YWRzUmVxdWVzdC5ub25MaW5lYXJBZFNsb3RIZWlnaHQgPSAxNTA7XG5cblx0XHQvLyBUZW1wb3JhcnkgZml4IHRvIHZlcmlmeSBERlAgYmVoYXZpb3VyXG5cdFx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHRcdGRldGFpbDoge1xuXHRcdFx0XHRjYXRlZ29yeTogJ3ZpZGVvJyxcblx0XHRcdFx0YWN0aW9uOiAnYWRSZXF1ZXN0ZWQnLFxuXHRcdFx0XHRjb250ZW50SWQ6IHRoaXMudmlkZW8ub3B0cy5pZFxuXHRcdFx0fSxcblx0XHRcdGJ1YmJsZXM6IHRydWVcblx0XHR9O1xuXHRcdGNvbnN0IHJlcXVlc3RlZEV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvVHJhY2tpbmcuZXZlbnQnLCBvcHRpb25zKTtcblx0XHRkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQocmVxdWVzdGVkRXZlbnQpO1xuXG5cdFx0dGhpcy5hZHNMb2FkZXIucmVxdWVzdEFkcyhhZHNSZXF1ZXN0KTtcblx0fVxuXG5cdGFkc01hbmFnZXJMb2FkZWRIYW5kbGVyKGFkc01hbmFnZXJMb2FkZWRFdmVudCkge1xuXHRcdC8vIEdldCB0aGUgYWRzIG1hbmFnZXIuXG5cdFx0Y29uc3QgYWRzUmVuZGVyaW5nU2V0dGluZ3MgPSBuZXcgZ29vZ2xlLmltYS5BZHNSZW5kZXJpbmdTZXR0aW5ncygpO1xuXHRcdGFkc1JlbmRlcmluZ1NldHRpbmdzLnJlc3RvcmVDdXN0b21QbGF5YmFja1N0YXRlT25BZEJyZWFrQ29tcGxldGUgPSB0cnVlO1xuXHRcdHRoaXMuYWRzTWFuYWdlciA9IGFkc01hbmFnZXJMb2FkZWRFdmVudC5nZXRBZHNNYW5hZ2VyKHRoaXMudmlkZW8udmlkZW9FbCwgYWRzUmVuZGVyaW5nU2V0dGluZ3MpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byB0aGUgcmVxdWlyZWQgZXZlbnRzLlxuXHRcdHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFcnJvckV2ZW50LlR5cGUuQURfRVJST1IsIHRoaXMuYWRFcnJvckhhbmRsZXIpO1xuXG5cdFx0Ly8gXCJGaXJlZCB3aGVuIGNvbnRlbnQgc2hvdWxkIGJlIHBhdXNlZC4gVGhpcyB1c3VhbGx5IGhhcHBlbnMgcmlnaHQgYmVmb3JlIGFuIGFkIGlzIGFib3V0IHRvIGNvdmVyIHRoZSBjb250ZW50XCJcblx0XHR0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT05URU5UX1BBVVNFX1JFUVVFU1RFRCwgdGhpcy5jb250ZW50UGF1c2VSZXF1ZXN0SGFuZGxlcik7XG5cblx0XHQvLyBcIkZpcmVkIHdoZW4gY29udGVudCBzaG91bGQgYmUgcmVzdW1lZC4gVGhpcyB1c3VhbGx5IGhhcHBlbnMgd2hlbiBhbiBhZCBmaW5pc2hlcyBvciBjb2xsYXBzZXNcIlxuXHRcdHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTlRFTlRfUkVTVU1FX1JFUVVFU1RFRCwgdGhpcy5jb250ZW50UmVzdW1lUmVxdWVzdEhhbmRsZXIpO1xuXG5cdFx0Ly8gXCJGaXJlZCB3aGVuIHRoZSBhZHMgbWFuYWdlciBpcyBkb25lIHBsYXlpbmcgYWxsIHRoZSBhZHNcIlxuXHRcdHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVELCB0aGlzLmFkRXZlbnRIYW5kbGVyKTtcblxuXHRcdC8vIExpc3RlbiB0byBhbnkgYWRkaXRpb25hbCBldmVudHMsIGlmIG5lY2Vzc2FyeS5cblx0XHR0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQsIHRoaXMuYWRFdmVudEhhbmRsZXIpO1xuXHRcdHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLlNUQVJURUQsIHRoaXMuYWRFdmVudEhhbmRsZXIpO1xuXHRcdHRoaXMuYWRzTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkNPTVBMRVRFLCB0aGlzLmFkRXZlbnRIYW5kbGVyKTtcblx0XHR0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TS0lQUEVELCB0aGlzLmFkRXZlbnRIYW5kbGVyKTtcblx0XHR0aGlzLmFkc01hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TS0lQUEFCTEVfU1RBVEVfQ0hBTkdFRCwgdGhpcy5hZEV2ZW50SGFuZGxlcik7XG5cblx0XHR0aGlzLmFkc0xvYWRlZCA9IHRydWU7XG5cdFx0dGhpcy5zdGFydEFkcygpO1xuXHR9XG5cblx0c3RhcnRBZHMoKSB7XG5cblx0XHQvLyBGb3IgYWRzIHRvIHBsYXkgY29ycmVjdGx5IGJvdGggdGhlIHZpZGVvIGFuZCB0aGUgYWR2ZXJ0IHZpZGVvIG5lZWQgdG8gYmUgcmVhZHkgdG9cblx0XHQvLyBwbGF5OyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIGNhbGxlZCBhZnRlciB0aGUgdHdvIGZsYWdzIGluIGFkc01hbmFnZXJMb2FkZWRIYW5kbGVyKClcblx0XHQvLyBhbmQgcGxheUFkRXZlbnRIYW5kbGVyKCkgaGF2ZSBiZWVuIHNldC5cblx0XHQvLyBTbyBpZiB0aGUgdmlkZW8gaGFzbid0IGxvYWRlZCB5ZXQsIHdhaXQgdW50aWwgaXQgaGFzLlxuXHRcdGlmICghdGhpcy52aWRlb0xvYWRlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFdlIHdhbnQgdG8gZGlzcGxheSBhbiBhZCBsb2FkaW5nIG5vdGljZSBmb3IgYSB0aW1lIG9uIHNjcmVlbiwgd2UgZG9uJ3Qgd2FudCBpdCB0byBmbGlja2VyXG5cdFx0Ly8gYW5kIGxlYXZlIHRoZSB1c2VyIHdvbmRlcmluZyBpZiB0aGV5IG1pc3NlZCBzb21ldGhpbmcvdGhpbmsgd2UncmUgdGVzdGluZyBzdWJsaW1pbmFsIGFkcyFcblx0XHRpZiAoIXRoaXMubG9hZGluZ1N0YXRlRGlzcGxheWVkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gSWYgYWRzIGhhdmUgZmFpbGVkIHRvIGxvYWQsIHdoaWNoIHJlc2V0cyB0aGUgYWR2ZXJ0aXNpbmcgc3VwcG9ydCBmbGFnLCBwbGF5IHRoZSB2aWRlb1xuXHRcdC8vIGluc3RlYWQ7IG90aGVyd2lzZSwgd2FpdCB1bnRpbCB0aGUgYWRzIGhhdmUgbG9hZGVkLlxuXHRcdGlmICghdGhpcy52aWRlby5vcHRzLmFkdmVydGlzaW5nKSB7XG5cdFx0XHR0aGlzLnBsYXlVc2VyVmlkZW8oKTtcblx0XHR9IGVsc2UgaWYgKCF0aGlzLmFkc0xvYWRlZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFJlbW92ZSB0aGUgcHJlbG9hZGluZyBzcGlubmVyXG5cdFx0aWYgKHRoaXMubG9hZGluZ1N0YXRlRWwpIHtcblx0XHRcdHRoaXMubG9hZGluZ1N0YXRlRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmxvYWRpbmdTdGF0ZUVsKTtcblx0XHRcdHRoaXMubG9hZGluZ1N0YXRlRWwgPSBudWxsO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHQvLyBJbml0aWFsaXplIHRoZSBhZHMgbWFuYWdlci4gQWQgcnVsZXMgcGxheWxpc3Qgd2lsbCBzdGFydCBhdCB0aGlzIHRpbWUuXG5cdFx0XHR0aGlzLmFkc01hbmFnZXIuaW5pdCh0aGlzLnZpZGVvLnZpZGVvRWwuY2xpZW50V2lkdGgsIHRoaXMudmlkZW8udmlkZW9FbC5jbGllbnRIZWlnaHQsIGdvb2dsZS5pbWEuVmlld01vZGUuTk9STUFMKTtcblx0XHRcdC8vIENhbGwgcGxheSB0byBzdGFydCBzaG93aW5nIHRoZSBhZC4gU2luZ2xlIHZpZGVvIGFuZCBvdmVybGF5IGFkcyB3aWxsXG5cdFx0XHQvLyBzdGFydCBhdCB0aGlzIHRpbWU7IHRoZSBjYWxsIHdpbGwgYmUgaWdub3JlZCBmb3IgYWQgcnVsZXMuXG5cdFx0XHR0aGlzLmFkc01hbmFnZXIuc3RhcnQoKTtcblx0XHR9IGNhdGNoIChhZEVycm9yKSB7XG5cdFx0XHQvLyBBbiBlcnJvciBtYXkgYmUgdGhyb3duIGlmIHRoZXJlIHdhcyBhIHByb2JsZW0gd2l0aCB0aGUgVkFTVCByZXNwb25zZS5cblx0XHRcdHRoaXMucmVwb3J0RXJyb3IoYWRFcnJvcik7XG5cdFx0XHR0aGlzLnBsYXlVc2VyVmlkZW8oKTtcblx0XHR9XG5cdH1cblxuXHRwbGF5QWRFdmVudEhhbmRsZXIoKSB7XG5cdFx0Ly8gU2V0cyB0aGUgc3R5bGluZyBub3cgc28gdGhlIGFkIG9jY3VwaWVzIHRoZSBzcGFjZSBvZiB0aGUgdmlkZW9cblx0XHR0aGlzLmFkQ29udGFpbmVyRWwuY2xhc3NMaXN0LmFkZCgnby12aWRlb19fYWQnKTtcblxuXHRcdC8vIFwiQ2FsbCB0aGlzIG1ldGhvZCBhcyBhIGRpcmVjdCByZXN1bHQgb2YgYSB1c2VyIGFjdGlvbiBiZWZvcmUgc3RhcnRpbmcgdGhlIGFkIHBsYXliYWNrLi4uXCJcblx0XHQvLyA8aHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vaW50ZXJhY3RpdmUtbWVkaWEtYWRzL2RvY3Mvc2Rrcy9odG1sNS92My9hcGlzI2ltYS5BZERpc3BsYXlDb250YWluZXIuaW5pdGlhbGl6ZT5cblx0XHR0aGlzLmFkRGlzcGxheUNvbnRhaW5lci5pbml0aWFsaXplKCk7XG5cblx0XHQvLyBXZSB3YW50IHRvIGRpc3BsYXkgYSBsb2FkaW5nIHN0YXRlIC0gb3RoZXJ3aXNlIGl0IGNhbiBsb29rXG5cdFx0Ly8gbGlrZSB3ZSdyZSBub3QgcmVzcG9uZGluZyB0byB0aGVpciBhY3Rpb24gd2hlbiB3ZSdyZSBhY3R1YWxseSBmZXRjaGluZyBhbiBhZFxuXHRcdHRoaXMubG9hZGluZ1N0YXRlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0dGhpcy5sb2FkaW5nU3RhdGVFbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAncHJvZ3Jlc3NiYXInKTtcblx0XHR0aGlzLmxvYWRpbmdTdGF0ZUVsLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLCAnTG9hZGluZycpO1xuXHRcdHRoaXMubG9hZGluZ1N0YXRlRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX2xvYWRpbmctc3RhdGUnO1xuXHRcdHRoaXMuYWRDb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmxvYWRpbmdTdGF0ZUVsKTtcblxuXHRcdC8vIGRpc3BsYXkgdGhlIGxvYWRpbmcgc3RhdGUgZm9yIGEgbWluaW11bSBvZiAyIHNlY29uZHMgdG8gYXZvaWQgZmxpY2tlcmluZ1xuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5sb2FkaW5nU3RhdGVEaXNwbGF5ZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5zdGFydEFkcygpO1xuXHRcdH0sIDEwMDAgKiAyKTtcblxuXHRcdGNvbnN0IGxvYWRlZG1ldGFkYXRhSGFuZGxlciA9ICgpID0+IHtcblx0XHRcdHRoaXMudmlkZW9Mb2FkZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5zdGFydEFkcygpO1xuXHRcdFx0dGhpcy52aWRlby52aWRlb0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbG9hZGVkbWV0YWRhdGFIYW5kbGVyKTtcblx0XHR9O1xuXG5cdFx0dGhpcy52aWRlby52aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgbG9hZGVkbWV0YWRhdGFIYW5kbGVyKTtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHZpZGVvLiBNdXN0IGJlIGRvbmUgdmlhIGEgdXNlciBhY3Rpb24gb24gbW9iaWxlIGRldmljZXMuXG5cdFx0dGhpcy52aWRlby52aWRlb0VsLmxvYWQoKTtcblxuXHRcdGlmICh0aGlzLm92ZXJsYXlFbCkge1xuXHRcdFx0dGhpcy5vdmVybGF5RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnBsYXlBZEV2ZW50SGFuZGxlcik7XG5cdFx0XHR0aGlzLnZpZGVvLmNvbnRhaW5lckVsLnJlbW92ZUNoaWxkKHRoaXMub3ZlcmxheUVsKTtcblx0XHR9XG5cdFx0ZGVsZXRlIHRoaXMub3ZlcmxheUVsO1xuXHR9XG5cblx0YWRFdmVudEhhbmRsZXIoYWRFdmVudCkge1xuXHRcdC8vIFJldHJpZXZlIHRoZSBhZCBmcm9tIHRoZSBldmVudC4gU29tZSBldmVudHMgKGUuZy4gQUxMX0FEU19DT01QTEVURUQpXG5cdFx0Ly8gZG9uJ3QgaGF2ZSBhZCBvYmplY3QgYXNzb2NpYXRlZC5cblx0XHRjb25zdCBhZCA9IGFkRXZlbnQuZ2V0QWQoKTtcblxuXHRcdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0XHRkZXRhaWw6IHtcblx0XHRcdFx0YWR2ZXJ0aXNpbmc6IHRydWUsXG5cdFx0XHRcdGNhdGVnb3J5OiAndmlkZW8nLFxuXHRcdFx0XHRjb250ZW50SWQ6IHRoaXMudmlkZW8ub3B0cy5pZCxcblx0XHRcdFx0cHJvZ3Jlc3M6IDAsXG5cdFx0XHRcdGFkRHVyYXRpb246IGFkLmdldER1cmF0aW9uKCksXG5cdFx0XHRcdGFkTWluRHVyYXRpb246IGFkLmdldE1pblN1Z2dlc3RlZER1cmF0aW9uKCksXG5cdFx0XHRcdGFkVGl0bGU6IGFkLmdldFRpdGxlKCksXG5cdFx0XHRcdGFkUHJvZ3Jlc3M6IHRoaXMuZ2V0QWRQcm9ncmVzcygpXG5cdFx0XHR9LFxuXHRcdFx0YnViYmxlczogdHJ1ZVxuXHRcdH07XG5cblx0XHRzd2l0Y2ggKGFkRXZlbnQudHlwZSkge1xuXHRcdFx0Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5MT0FERUQ6IHtcblx0XHRcdFx0Ly8gVGhpcyBpcyB0aGUgZmlyc3QgZXZlbnQgc2VudCBmb3IgYW4gYWQgLSBpdCBpcyBwb3NzaWJsZSB0b1xuXHRcdFx0XHQvLyBkZXRlcm1pbmUgd2hldGhlciB0aGUgYWQgaXMgYSB2aWRlbyBhZCBvciBhbiBvdmVybGF5LlxuXHRcdFx0XHRpZiAoIWFkLmlzTGluZWFyKCkpIHtcblx0XHRcdFx0XHQvLyBQb3NpdGlvbiBBZERpc3BsYXlDb250YWluZXIgY29ycmVjdGx5IGZvciBvdmVybGF5LlxuXHRcdFx0XHRcdC8vIFVzZSBhZC53aWR0aCBhbmQgYWQuaGVpZ2h0LlxuXHRcdFx0XHRcdHRoaXMucGxheVVzZXJWaWRlbygpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TVEFSVEVEOiB7XG5cdFx0XHRcdC8vIFRoaXMgZXZlbnQgaW5kaWNhdGVzIHRoZSBhZCBoYXMgc3RhcnRlZCAtIHRoZSB2aWRlbyBwbGF5ZXJcblx0XHRcdFx0Ly8gY2FuIGFkanVzdCB0aGUgVUksIGZvciBleGFtcGxlIGRpc3BsYXkgYSBwYXVzZSBidXR0b24gYW5kXG5cdFx0XHRcdC8vIHJlbWFpbmluZyB0aW1lLlxuXHRcdFx0XHRvcHRpb25zLmRldGFpbC5hY3Rpb24gPSAnYWRTdGFydCc7XG5cdFx0XHRcdGNvbnN0IHN0YXJ0RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ29UcmFja2luZy5ldmVudCcsIG9wdGlvbnMpO1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQoc3RhcnRFdmVudCk7XG5cblx0XHRcdFx0aWYgKGFkLmlzTGluZWFyKCkpIHtcblx0XHRcdFx0XHQvLyBGb3IgYSBsaW5lYXIgYWQsIGEgdGltZXIgY2FuIGJlIHN0YXJ0ZWQgdG8gcG9sbCBmb3Jcblx0XHRcdFx0XHQvLyB0aGUgcmVtYWluaW5nIHRpbWUuXG5cdFx0XHRcdFx0Ly8gVE9ETzogV2UgY291bGQgdXNlIHRoaXMgdG8gYWRkIGEgc2tpcCBhZCBidXR0b25cblx0XHRcdFx0XHQvLyBDdXJyZW50bHkgbm90IHVzZWQsIGNvdWxkIGJlIHVzZWQgaW4gYW4gaW50ZXJ2YWxcblx0XHRcdFx0XHQvLyBjb25zdCByZW1haW5pbmdUaW1lID0gdGhpcy5hZHNNYW5hZ2VyLmdldFJlbWFpbmluZ1RpbWUoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFVzZXJzIHdpdGggc2NyZWVuIHJlYWRlcnMgd2lsbCBsb3NlIGNvbnRyb2wgb2YgdmlkZW8gd2hpbGUgYWR2ZXJ0IGlzIHBsYXlpbmcsXG5cdFx0XHRcdC8vIHNvIHdlIGV4cGxhaW4gd2h5IGFuZCBlbmNvdXJhZ2UgdGhlbSB0byB3YWl0IHdpdGggdGhpcyBtZXNzYWdlLlxuXHRcdFx0XHR0aGlzLnZpZGVvLmxpdmVSZWdpb25FbC5pbm5lckhUTUw9YFZpZGVvIHdpbGwgcGxheSBhZnRlciBhZCBpbiAke29wdGlvbnMuZGV0YWlsLmFkRHVyYXRpb259IHNlY29uZHNgO1xuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5DT01QTEVURToge1xuXG5cdFx0XHRcdG9wdGlvbnMuZGV0YWlsLmFjdGlvbiA9ICdhZENvbXBsZXRlJztcblx0XHRcdFx0Y29uc3QgZW5kRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ29UcmFja2luZy5ldmVudCcsIG9wdGlvbnMpO1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQoZW5kRXZlbnQpO1xuXG5cdFx0XHRcdGlmIChhZC5pc0xpbmVhcigpKSB7XG5cdFx0XHRcdFx0Ly8gV291bGQgYmUgdXNlZCB0byBjbGVhciB0aGUgaW50ZXJ2YWxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMudmlkZW8ubGl2ZVJlZ2lvbkVsLmlubmVySFRNTD0nJztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCB0cmFja2luZyBmb3Igd2hlbiBhbiBhZHZlcnQgYmVjb21lcyBza2lwcGFibGUsIGFuZCB3aGV0aGVyIGl0J3Mgc2tpcHBlZFxuXHRcdFx0Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TS0lQUEFCTEVfU1RBVEVfQ0hBTkdFRDoge1xuXHRcdFx0XHRvcHRpb25zLmRldGFpbC5hY3Rpb24gPSAnYWRTa2lwcGFibGUnO1xuXHRcdFx0XHRjb25zdCBza2lwcGFibGVFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnb1RyYWNraW5nLmV2ZW50Jywgb3B0aW9ucyk7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChza2lwcGFibGVFdmVudCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0Y2FzZSBnb29nbGUuaW1hLkFkRXZlbnQuVHlwZS5TS0lQUEVEOiB7XG5cdFx0XHRcdG9wdGlvbnMuZGV0YWlsLmFjdGlvbiA9ICdhZFNraXAnO1xuXHRcdFx0XHRjb25zdCBza2lwRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ29UcmFja2luZy5ldmVudCcsIG9wdGlvbnMpO1xuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmRpc3BhdGNoRXZlbnQoc2tpcEV2ZW50KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRjYXNlIGdvb2dsZS5pbWEuQWRFdmVudC5UeXBlLkFMTF9BRFNfQ09NUExFVEVEOiB7XG5cdFx0XHRcdG9wdGlvbnMuZGV0YWlsLmFjdGlvbiA9ICdhbGxBZHNDb21wbGV0ZWQnO1xuXHRcdFx0XHRjb25zdCBhbGxBZHNDb21wbGV0ZWRFdmVudCA9IG5ldyBDdXN0b21FdmVudCgnb1RyYWNraW5nLmV2ZW50Jywgb3B0aW9ucyk7XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChhbGxBZHNDb21wbGV0ZWRFdmVudCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0ZGVmYXVsdDoge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2FkRXZlbnQgaGFzIHR5cGUgJyArIGFkRXZlbnQudHlwZSArICcsIHdoaWNoIGlzIG5vdCBoYW5kbGVkIGJ5IGFkRXZlbnRIYW5kbGVyJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmVwb3J0RXJyb3IoZXJyb3IpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG5cdFx0ZG9jdW1lbnQuYm9keS5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnb0Vycm9ycy5sb2cnLCB7IGJ1YmJsZXM6IHRydWUsIGRldGFpbDogeyBlcnJvcjogZXJyb3IgfSB9KSk7XG5cdH1cblxuXHRhZEVycm9ySGFuZGxlcihhZEVycm9yKSB7XG5cdFx0Ly8gTk9URTogaGFzIHRoZSBBUEkgY2hhbmdlZD8gbm93IG5lZWQgdG8gY2FsbCBgZ2V0RXJyb3JgIG1ldGhvZCB0byBnZXQgdGhlIGFkIGVycm9yXG5cdFx0Y29uc3QgYWN0dWFsRXJyb3IgPSAnZ2V0RXJyb3InIGluIGFkRXJyb3IgJiYgdHlwZW9mIGFkRXJyb3IuZ2V0RXJyb3IgPT09ICdmdW5jdGlvbicgPyBhZEVycm9yLmdldEVycm9yKCkgOiBhZEVycm9yO1xuXG5cdFx0Ly8gY29udmVydCB0aGUgR29vZ2xlIEFkIGVycm9yIHRvIGEgSlMgb25lXG5cdFx0Y29uc3QgbWVzc2FnZSA9IGAke2FjdHVhbEVycm9yLmdldEVycm9yQ29kZSgpfSwgJHthY3R1YWxFcnJvci5nZXRUeXBlKCl9LCAke2FjdHVhbEVycm9yLmdldE1lc3NhZ2UoKX0sICR7YWN0dWFsRXJyb3IuZ2V0VmFzdEVycm9yQ29kZSgpfWA7XG5cdFx0dGhpcy5yZXBvcnRFcnJvcihuZXcgRXJyb3IobWVzc2FnZSkpO1xuXG5cdFx0aWYgKHRoaXMuYWRzTWFuYWdlcikge1xuXHRcdFx0dGhpcy5hZHNNYW5hZ2VyLmRlc3Ryb3koKTtcblx0XHR9XG5cdFx0dGhpcy52aWRlby5jb250YWluZXJFbC5yZW1vdmVDaGlsZCh0aGlzLmFkQ29udGFpbmVyRWwpO1xuXHRcdGlmICh0aGlzLm92ZXJsYXlFbCkge1xuXHRcdFx0dGhpcy5vdmVybGF5RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnBsYXlBZEV2ZW50SGFuZGxlcik7XG5cdFx0XHR0aGlzLnZpZGVvLmNvbnRhaW5lckVsLnJlbW92ZUNoaWxkKHRoaXMub3ZlcmxheUVsKTtcblx0XHRcdGRlbGV0ZSB0aGlzLm92ZXJsYXlFbDtcblx0XHR9XG5cdFx0aWYgKHRoaXMudmlkZW8ucGxhY2Vob2xkZXJFbCkge1xuXHRcdFx0dGhpcy52aWRlby5wbGFjZWhvbGRlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5wbGF5QWRFdmVudEhhbmRsZXIpO1xuXHRcdH1cblx0XHR0aGlzLnZpZGVvLm9wdHMuYWR2ZXJ0aXNpbmcgPSBmYWxzZTtcblx0XHR0aGlzLnN0YXJ0QWRzKCk7XG5cdH1cblxuXHRjb250ZW50UGF1c2VSZXF1ZXN0SGFuZGxlcigpIHtcblx0XHR0aGlzLmFkc0NvbXBsZXRlZCA9IGZhbHNlO1xuXHRcdHRoaXMudmlkZW8udmlkZW9FbC5wYXVzZSgpO1xuXHR9XG5cblx0Y29udGVudFJlc3VtZVJlcXVlc3RIYW5kbGVyKCkge1xuXHRcdHRoaXMudmlkZW8uY29udGFpbmVyRWwucmVtb3ZlQ2hpbGQodGhpcy5hZENvbnRhaW5lckVsKTtcblx0XHR0aGlzLmFkc0NvbXBsZXRlZCA9IHRydWU7XG5cdFx0dGhpcy5wbGF5VXNlclZpZGVvKCk7XG5cdH1cblxuXHRwbGF5VXNlclZpZGVvKCkge1xuXHRcdC8vIFNpbmNlIEZpcmVmb3ggNTIsIHRoZSBjYXB0aW9ucyBuZWVkIHJlLWFkZGluZyBhZnRlciB0aGVcblx0XHQvLyBhZCB2aWRlbyBsYXllciBoYXMgZmluaXNoZWQgaXRzIHRoaW5nLlxuXHRcdHRoaXMudmlkZW8uYWRkQ2FwdGlvbnMoKTtcblxuXHRcdHRoaXMudmlkZW8udmlkZW9FbC5wbGF5KCk7XG5cdH1cblxuXHRnZXRBZFByb2dyZXNzKCkge1xuXHRcdGlmICghdGhpcy5hZHNNYW5hZ2VyIHx8ICF0aGlzLmFkc01hbmFnZXIuZ2V0Q3VycmVudEFkKCkpIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblx0XHRjb25zdCBkdXJhdGlvbiA9IHRoaXMuYWRzTWFuYWdlci5nZXRDdXJyZW50QWQoKS5nZXREdXJhdGlvbigpO1xuXHRcdGNvbnN0IHJlbWFpbmluZ1RpbWUgPSB0aGlzLmFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xuXHRcdHJldHVybiBwYXJzZUludCgxMDAgKiAoZHVyYXRpb24gLSByZW1haW5pbmdUaW1lKSAvIGR1cmF0aW9uLCAxMCk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9BZHM7XG4iLCJjbGFzcyBWaWRlb0luZm8ge1xuXHRjb25zdHJ1Y3RvciAodmlkZW8pIHtcblx0XHR0aGlzLnZpZGVvID0gdmlkZW87XG5cblx0XHR0aGlzLm9wdHMgPSB0aGlzLnZpZGVvLm9wdHMucGxhY2Vob2xkZXJJbmZvLnJlZHVjZSgobWFwLCBrZXkpID0+IHtcblx0XHRcdG1hcFtrZXldID0gdHJ1ZTtcblx0XHRcdHJldHVybiBtYXA7XG5cdFx0fSwge30pO1xuXG5cdFx0dGhpcy5pbmZvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0XHR0aGlzLmluZm9FbC5jbGFzc05hbWUgPSAnby12aWRlb19faW5mbyc7XG5cblx0XHRpZiAodGhpcy5vcHRzLmJyYW5kKSB7XG5cdFx0XHR0aGlzLmJyYW5kRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHR0aGlzLmJyYW5kRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX2luZm8tYnJhbmQnO1xuXHRcdFx0dGhpcy5pbmZvRWwuYXBwZW5kQ2hpbGQodGhpcy5icmFuZEVsKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLnRpdGxlKSB7XG5cdFx0XHR0aGlzLnRpdGxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cdFx0XHR0aGlzLnRpdGxlRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX2luZm8tdGl0bGUnO1xuXHRcdFx0dGhpcy5pbmZvRWwuYXBwZW5kQ2hpbGQodGhpcy50aXRsZUVsKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5vcHRzLmRlc2NyaXB0aW9uKSB7XG5cdFx0XHR0aGlzLmRlc2NyaXB0aW9uRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG5cdFx0XHR0aGlzLmRlc2NyaXB0aW9uRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX2luZm8tZGVzY3JpcHRpb24nO1xuXHRcdFx0dGhpcy5pbmZvRWwuYXBwZW5kQ2hpbGQodGhpcy5kZXNjcmlwdGlvbkVsKTtcblx0XHR9XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdFx0dGhpcy52aWRlby5wbGFjZWhvbGRlckVsLmFwcGVuZENoaWxkKHRoaXMuaW5mb0VsKTtcblx0fVxuXG5cdHVwZGF0ZSAoKSB7XG5cdFx0aWYgKHRoaXMuYnJhbmRFbCkge1xuXHRcdFx0Y29uc3QgYnJhbmROYW1lID0gdGhpcy52aWRlby52aWRlb0RhdGEuYnJhbmQgJiYgdGhpcy52aWRlby52aWRlb0RhdGEuYnJhbmQubmFtZTtcblx0XHRcdHRoaXMuYnJhbmRFbC50ZXh0Q29udGVudCA9IGJyYW5kTmFtZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy50aXRsZUVsKSB7XG5cdFx0XHR0aGlzLnRpdGxlRWwudGV4dENvbnRlbnQgPSB0aGlzLnZpZGVvLnZpZGVvRGF0YS50aXRsZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5kZXNjcmlwdGlvbkVsKSB7XG5cdFx0XHR0aGlzLmRlc2NyaXB0aW9uRWwudGV4dENvbnRlbnQgPSB0aGlzLnZpZGVvLnZpZGVvRGF0YS5zdGFuZGZpcnN0O1xuXHRcdH1cblx0fVxuXG5cdHRlYXJkb3duICgpIHtcblx0XHR0aGlzLnZpZGVvLnBsYWNlaG9sZGVyRWwucmVtb3ZlQ2hpbGQodGhpcy5pbmZvRWwpO1xuXG5cdFx0ZGVsZXRlIHRoaXMuaW5mb0VsO1xuXHRcdGRlbGV0ZSB0aGlzLmJyYW5kRWw7XG5cdFx0ZGVsZXRlIHRoaXMudGl0bGVFbDtcblx0XHRkZWxldGUgdGhpcy5kZXNjcmlwdGlvbkVsO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZpZGVvSW5mbztcbiIsImNsYXNzIFBsYXlsaXN0IHtcblx0Y29uc3RydWN0b3IgKG9wdHMpIHtcblx0XHR0aGlzLm9wdHMgPSBvcHRzO1xuXG5cdFx0Ly8gZmluZCB0aGUgY3VycmVudGx5IHBsYXlpbmcgdmlkZW8sIGFsd2F5cyBkZWFsIHdpdGggc3RyaW5nc1xuXHRcdGNvbnN0IGN1cnJlbnRJZCA9IG9wdHMucGxheWVyLnZpZGVvRGF0YSA/IG9wdHMucGxheWVyLnZpZGVvRGF0YS5pZCA6IG9wdHMucGxheWVyLm9wdHMuaWQ7XG5cdFx0dGhpcy5jdXJyZW50SW5kZXggPSBjdXJyZW50SWQgPyBvcHRzLnF1ZXVlLmluZGV4T2YoY3VycmVudElkLnRvU3RyaW5nKCkpIDogLTE7XG5cblx0XHR0aGlzLmNhY2hlID0ge307XG5cblx0XHRpZiAodGhpcy5vcHRzLmF1dG9wbGF5KSB7XG5cdFx0XHR0aGlzLm9wdHMucGxheWVyLmNvbnRhaW5lckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgdGhpcy5uZXh0LmJpbmQodGhpcyksIHRydWUpO1xuXG5cdFx0XHRpZiAoIHRoaXMuY3VycmVudEluZGV4ID09PSAtMSkge1xuXHRcdFx0XHR0aGlzLm5leHQoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRuZXh0ICgpIHtcblx0XHR0aGlzLmdvdG8odGhpcy5jdXJyZW50SW5kZXggKyAxKTtcblx0fVxuXG5cdHByZXYgKCkge1xuXHRcdHRoaXMuZ290byh0aGlzLmN1cnJlbnRJbmRleCAtIDEpO1xuXHR9XG5cblx0Z290byAoaW5kZXgpIHtcblx0XHRpZiAoaW5kZXggPCAwKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMub3B0cy5xdWV1ZS5sZW5ndGggLSAxO1xuXHRcdH0gZWxzZSBpZiAoaW5kZXggPj0gdGhpcy5vcHRzLnF1ZXVlLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5jdXJyZW50SW5kZXggPSAwO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRJbmRleCA9IGluZGV4O1xuXHRcdH1cblxuXHRcdC8vIHN0b3JlIHRoZSBjdXJyZW50IGRhdGEgZm9yIHF1aWNrIGFjY2VzcyBsYXRlclxuXHRcdGNvbnN0IGN1cnJlbnRWaWRlb0lkID0gdGhpcy5vcHRzLnBsYXllci52aWRlb0RhdGEgJiYgdGhpcy5vcHRzLnBsYXllci52aWRlb0RhdGEuaWQ7XG5cblx0XHRpZiAoY3VycmVudFZpZGVvSWQgJiYgIXRoaXMuY2FjaGVbY3VycmVudFZpZGVvSWRdKSB7XG5cdFx0XHR0aGlzLmNhY2hlW2N1cnJlbnRWaWRlb0lkXSA9IHRoaXMub3B0cy5wbGF5ZXIudmlkZW9EYXRhO1xuXHRcdH1cblxuXHRcdC8vIGZpcmUgb2ZmIGFueSBjdXJyZW50IHdhdGNoZWQgZGF0YVxuXHRcdHRoaXMub3B0cy5wbGF5ZXIuZmlyZVdhdGNoZWRFdmVudCgpO1xuXHRcdHRoaXMub3B0cy5wbGF5ZXIucmVzZXRBbW91bnRXYXRjaGVkKCk7XG5cblx0XHRjb25zdCBuZXh0VmlkZW9JZCA9IHRoaXMub3B0cy5xdWV1ZVt0aGlzLmN1cnJlbnRJbmRleF07XG5cblx0XHRjb25zdCBuZXh0VmlkZW9PcHRzID0ge1xuXHRcdFx0aWQ6IG5leHRWaWRlb0lkLFxuXHRcdFx0ZGF0YTogdGhpcy5jYWNoZVtuZXh0VmlkZW9JZF1cblx0XHR9O1xuXG5cdFx0cmV0dXJuIHRoaXMub3B0cy5wbGF5ZXIudXBkYXRlKG5leHRWaWRlb09wdHMpLnRoZW4oKCkgPT4ge1xuXHRcdFx0aWYgKHRoaXMub3B0cy5wbGF5ZXIudmlkZW9FbCkge1xuXHRcdFx0XHR0aGlzLm9wdHMucGxheWVyLnZpZGVvRWwucGxheSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXlsaXN0O1xuIiwiLyogZXNsaW50IGNsYXNzLW1ldGhvZHMtdXNlLXRoaXM6IDAgKi9cblxuY29uc3QgY2xvc2VCdXR0b24gPSAob25DbGljaykgPT4ge1xuXHRjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcblx0YnV0dG9uLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19ndWlkYW5jZV9fY2xvc2UnO1xuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdG9uQ2xpY2soKTtcblx0fSk7XG5cdHJldHVybiBidXR0b247XG59O1xuXG5jb25zdCBjb250YWluZXIgPSAoYmFubmVyTW9kZSkgPT4ge1xuXHRjb25zdCBjb250YWluZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRjb250YWluZXJFbC5jbGFzc05hbWUgPSBgby12aWRlb19fZ3VpZGFuY2UgJHtiYW5uZXJNb2RlID8gJ28tdmlkZW9fX2d1aWRhbmNlLS1iYW5uZXInIDogJyd9YDtcblx0cmV0dXJuIGNvbnRhaW5lckVsO1xufTtcblxuY29uc3QgbGluayA9ICgpID0+IHtcblx0Y29uc3QgbGlua0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXHRsaW5rRWwuc2V0QXR0cmlidXRlKCdocmVmJywgJ2h0dHBzOi8vd3d3LmZ0LmNvbS9hY2Nlc3NpYmlsaXR5I3ZpZGVvLXRyYW5zY3JpcHRpb25zJyk7XG5cdGxpbmtFbC5jbGFzc05hbWUgPSAnby12aWRlb19fZ3VpZGFuY2VfX2xpbmsnO1xuXHRsaW5rRWwuaW5uZXJUZXh0ID0gJ1N1YnRpdGxlcyB1bmF2YWlsYWJsZSc7XG5cdGxpbmtFbC50YXJnZXQgPSAnX2JsYW5rJztcblx0bGlua0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpKTtcblx0cmV0dXJuIGxpbmtFbDtcbn07XG5cbmNsYXNzIEd1aWRhbmNlIHtcblxuXHRjb25zdHJ1Y3RvciAoKSB7XG5cdFx0dGhpcy5yZW1vdmVCYW5uZXIgPSB0aGlzLnJlbW92ZUJhbm5lci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuaGlkZUJhbm5lciA9IHRoaXMuaGlkZUJhbm5lci5iaW5kKHRoaXMpO1xuXHR9XG5cblx0Y3JlYXRlUGxhY2Vob2xkZXIgKCkge1xuXHRcdGNvbnN0IGNvbnRhaW5lckVsID0gY29udGFpbmVyKCk7XG5cdFx0Y29udGFpbmVyRWwuYXBwZW5kQ2hpbGQobGluaygpKTtcblx0XHRyZXR1cm4gY29udGFpbmVyRWw7XG5cdH1cblxuXHRjcmVhdGVCYW5uZXIgKCkge1xuXHRcdHRoaXMuYmFubmVyID0gY29udGFpbmVyKHRydWUpO1xuXHRcdHRoaXMuYmFubmVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKHRoaXMucmVtb3ZlQmFubmVyKSk7XG5cdFx0dGhpcy5iYW5uZXIuYXBwZW5kQ2hpbGQobGluaygpKTtcblxuXHRcdHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQodGhpcy5oaWRlQmFubmVyLCA1MDAwKTtcblxuXHRcdHJldHVybiB0aGlzLmJhbm5lcjtcblx0fVxuXG5cdHJlbW92ZUJhbm5lciAoKSB7XG5cdFx0aWYgKHRoaXMuYmFubmVyKSB7XG5cdFx0XHR0aGlzLmJhbm5lci5yZW1vdmUoKTtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXHRcdH1cblx0fVxuXG5cdGhpZGVCYW5uZXIgKCkge1xuXHRcdGlmICh0aGlzLmJhbm5lcikge1xuXHRcdFx0dGhpcy5iYW5uZXIuY2xhc3NMaXN0LmFkZCgnby12aWRlb19fZ3VpZGFuY2UtLWhpZGRlbicpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBHdWlkYW5jZTsiLCJpbXBvcnQgb1ZpZXdwb3J0IGZyb20gJ0BmaW5hbmNpYWwtdGltZXMvby12aWV3cG9ydCc7XG5cbmltcG9ydCBnZXRSZW5kaXRpb24gZnJvbSAnLi9oZWxwZXJzL2dldC1yZW5kaXRpb24uanMnO1xuaW1wb3J0IFZpZGVvQWRzIGZyb20gJy4vYWRzLmpzJztcbmltcG9ydCBWaWRlb0luZm8gZnJvbSAnLi9pbmZvLmpzJztcbmltcG9ydCBQbGF5bGlzdCBmcm9tICcuL3BsYXlsaXN0LmpzJztcbmltcG9ydCBHdWlkYW5jZSBmcm9tICcuL2d1aWRhbmNlLmpzJztcblxuZnVuY3Rpb24gbGlzdGVuT25jZShlbCwgZXZlbnROYW1lLCBmbikge1xuXHRjb25zdCB3cmFwcGVkRm4gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG5cdFx0ZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIHdyYXBwZWRGbik7XG5cdFx0Zm4oLi4uYXJncyk7XG5cdH07XG5cdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCB3cmFwcGVkRm4pO1xufVxuXG5mdW5jdGlvbiBldmVudExpc3RlbmVyKHZpZGVvLCBldikge1xuXG5cdC8vIE9uIHNvbWUgcGxhdGZvcm1zIChlZyBpT1MpLCB0aGUgR29vZ2xlIGFkdmVydCBsaWJyYXJ5IHdpbGwgdXNlIHRoZSBtYWluIDx2aWRlbz4gZWxlbWVudFxuXHQvLyB1c2VkIGJ5IG8tdmlkZW8gdG8gYWxzbyBwbGF5IGEgcHJlLXJvbGwgYWR2ZXJ0OyBhcyB0aGUgYWR2ZXJ0IHBsYXlzLCB0aGlzIHdpbGwgdHJpZ2dlclxuXHQvLyB0aGUgbm9ybWFsIDx2aWRlbz4gZXZlbnQgbGlzdGVuZXJzLiAgRGlzY2FyZCBldmVudHMgdGhhdCB3ZSBjYW4gaWRlbnRpZnkgYXMgY29taW5nXG5cdC8vIGZyb20gdGhlIHByZS1yb2xsIHJhdGhlciB0aGFuIHRoZSBtYWluIGNvbnRlbnQuXG5cdC8vIFRvIGRvIHRoaXMsIGNoZWNrIHdoZXRoZXIgYWR2ZXJ0aXNpbmcgaXMgc3RpbGwgZW5hYmxlZCAoaXQnbGwgYmUgZGlzYWJsZWQgb24gYW55IGVycm9yKSxcblx0Ly8gYW5kIGZvciB0aGUgdmlkZW8gYWRzIGxvYWQgYW5kIGNvbXBsZXRlZCBmbGFncy5cblx0aWYgKHZpZGVvLm9wdHMuYWR2ZXJ0aXNpbmcgJiYgdmlkZW8udmlkZW9BZHMgJiYgdmlkZW8udmlkZW9BZHMuYWRzTG9hZGVkICYmICF2aWRlby52aWRlb0Fkcy5hZHNDb21wbGV0ZWQpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHQvLyBEaXNwYXRjaCBwcm9ncmVzcyBldmVudCBhdCBhcm91bmQgMjUlLCA1MCUsIDc1JSBhbmQgMTAwJVxuXHRpZiAoZXYudHlwZSA9PT0gJ3Byb2dyZXNzJyAmJiAhc2hvdWxkRGlzcGF0Y2godmlkZW8pKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZmlyZUV2ZW50KGV2LnR5cGUsIHZpZGVvLCB7XG5cdFx0cHJvZ3Jlc3M6IHZpZGVvLmdldFByb2dyZXNzKCksXG5cdFx0ZHVyYXRpb246IHZpZGVvLmdldER1cmF0aW9uKCksXG5cdFx0dGV4dFRyYWNrTW9kZTogdmlkZW8uZ2V0VHJhY2tNb2RlKClcblx0fSk7XG59XG5cbmZ1bmN0aW9uIGZpcmVFdmVudChhY3Rpb24sIHZpZGVvLCBleHRyYURldGFpbCA9IHt9KSB7XG5cdGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdvVHJhY2tpbmcuZXZlbnQnLCB7XG5cdFx0ZGV0YWlsOiBPYmplY3QuYXNzaWduKHtcblx0XHRcdGNhdGVnb3J5OiAndmlkZW8nLFxuXHRcdFx0YWN0aW9uLFxuXHRcdFx0YWR2ZXJ0aXNpbmc6IHZpZGVvLm9wdHMuYWR2ZXJ0aXNpbmcsXG5cdFx0XHRjb250ZW50SWQ6IHZpZGVvLm9wdHMuaWQsXG5cdFx0fSwgZXh0cmFEZXRhaWwpLFxuXHRcdGJ1YmJsZXM6IHRydWVcblx0fSk7XG5cdGRvY3VtZW50LmJvZHkuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG5cbmNvbnN0IGRpc3BhdGNoZWRQcm9ncmVzcyA9IHt9O1xuZnVuY3Rpb24gc2hvdWxkRGlzcGF0Y2godmlkZW8pIHtcblx0Y29uc3QgcHJvZ3Jlc3MgPSB2aWRlby5nZXRQcm9ncmVzcygpO1xuXHRjb25zdCBpZCA9IHZpZGVvLm9wdHMuaWQ7XG5cdGNvbnN0IHJlbGV2YW50UHJvZ3Jlc3NQb2ludHMgPSBbXG5cdFx0OCwgOSwgMTAsIDExLCAxMixcblx0XHQyMywgMjQsIDI1LCAyNiwgMjcsXG5cdFx0NDgsIDQ5LCA1MCwgNTEsIDUyLFxuXHRcdDczLCA3NCwgNzUsIDc2LCA3Nyxcblx0XHQxMDBcblx0XTtcblxuXHQvLyBJbml0aWFsaXNlIGRpc3BhdGNoZWQgcHJvZ3Jlc3Mgc3RvcmVcblx0aWYgKCFkaXNwYXRjaGVkUHJvZ3Jlc3NbaWRdKSB7XG5cdFx0ZGlzcGF0Y2hlZFByb2dyZXNzW2lkXSA9IFtdO1xuXHR9XG5cblx0Ly8gUHJvZ3Jlc3MgaXMgbm90IHJlbGV2YW50XG5cdGlmICghcmVsZXZhbnRQcm9ncmVzc1BvaW50cy5pbmNsdWRlcyhwcm9ncmVzcykpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBQcm9ncmVzcyBoYXMgYWxyZWFkeSBiZWVuIGRpc3BhdGNoZWRcblx0aWYgKGRpc3BhdGNoZWRQcm9ncmVzc1tpZF0uaW5jbHVkZXMocHJvZ3Jlc3MpKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0ZGlzcGF0Y2hlZFByb2dyZXNzW2lkXS5wdXNoKHByb2dyZXNzKTtcblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50cyh2aWRlbywgZXZlbnRzKSB7XG5cdGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcblx0XHR2aWRlby52aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGV2ZW50TGlzdGVuZXIuYmluZCh0aGlzLCB2aWRlbykpO1xuXHR9KTtcbn1cblxuLy8gdXNlIHRoZSBpbWFnZSByZXNpemluZyBzZXJ2aWNlLCBpZiB3aWR0aCBzdXBwbGllZFxuZnVuY3Rpb24gdXBkYXRlUG9zdGVyVXJsKHBvc3RlckltYWdlLCB3aWR0aCwgc3lzdGVtY29kZSkge1xuXHRsZXQgdXJsID0gYGh0dHBzOi8vd3d3LmZ0LmNvbS9fX29yaWdhbWkvc2VydmljZS9pbWFnZS92Mi9pbWFnZXMvcmF3LyR7ZW5jb2RlVVJJQ29tcG9uZW50KHBvc3RlckltYWdlKX0/c291cmNlPSR7c3lzdGVtY29kZX0mcXVhbGl0eT1sb3dgO1xuXHRpZiAod2lkdGgpIHtcblx0XHR1cmwgKz0gYCZmaXQ9c2NhbGUtZG93biZ3aWR0aD0ke3dpZHRofWA7XG5cdH1cblxuXHRyZXR1cm4gdXJsO1xufVxuXG4vLyBjb252ZXJ0cyBkYXRhLW8tdmlkZW8gYXR0cmlidXRlcyB0byBhbiBvcHRpb25zIG9iamVjdFxuZnVuY3Rpb24gZ2V0T3B0aW9uc0Zyb21EYXRhQXR0cmlidXRlcyhhdHRyaWJ1dGVzKSB7XG5cdGNvbnN0IG9wdHMgPSB7fTtcblx0Ly8gVHJ5IHRvIGdldCBjb25maWcgc2V0IGRlY2xhcmF0aXZlbHkgb24gdGhlIGVsZW1lbnRcblx0QXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChhdHRyaWJ1dGVzLCAoYXR0cikgPT4ge1xuXHRcdGlmIChhdHRyLm5hbWUuaW5kZXhPZignZGF0YS1vLXZpZGVvJykgPT09IDApIHtcblx0XHRcdC8vIFJlbW92ZSB0aGUgcHJlZml4IHBhcnQgb2YgdGhlIGRhdGEgYXR0cmlidXRlIG5hbWUgYW5kIGh5cGhlbi1jYXNlIHRvIGNhbWVsQ2FzZVxuXHRcdFx0Y29uc3Qga2V5ID0gYXR0ci5uYW1lLnJlcGxhY2UoJ2RhdGEtby12aWRlby0nLCAnJykucmVwbGFjZSgvLShbYS16XSkvZywgKG0sIHcpID0+IHtcblx0XHRcdFx0cmV0dXJuIHcudG9VcHBlckNhc2UoKTtcblx0XHRcdH0pO1xuXG5cdFx0XHR0cnkge1xuXHRcdFx0XHQvLyBJZiBpdCdzIGEgSlNPTiwgYSBib29sZWFuIG9yIGEgbnVtYmVyLCB3ZSB3YW50IGl0IHN0b3JlZCBsaWtlIHRoYXQsIGFuZCBub3QgYXMgYSBzdHJpbmdcblxuXHRcdFx0XHQvLyBGb3IgbGVnYWN5IG8tdmlkZW8gZW1iZWRzLCB3ZSdsbCBuZWVkIHRvIGNoZWNrIGZvciBwbGFjZUhvbGRlckluZm8gYXR0cmlidXRlc1xuXHRcdFx0XHQvLyBhcyB0aGV5IHR5cGljYWxseSBwYXNzIGRhdGEgaW4gd2l0aCBzaW5nbGUgcXVvdGVzLCB3aGljaCB3b24ndCBwYXJzZTpcblx0XHRcdFx0Ly8gZGF0YS1vLXZpZGVvLXBsYWNlaG9sZGVyLWluZm89XCJbJ3RpdGxlJywgJ2Rlc2NyaXB0aW9uJ11cIlxuXHRcdFx0XHRpZiAoa2V5ID09PSAncGxhY2Vob2xkZXJJbmZvJykge1xuXHRcdFx0XHRcdG9wdHNba2V5XSA9IEpTT04ucGFyc2UoYXR0ci52YWx1ZS5yZXBsYWNlKC9cXCcvZywgJ1wiJykpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG9wdHNba2V5XSA9IEpTT04ucGFyc2UoYXR0ci52YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0b3B0c1trZXldID0gYXR0ci52YWx1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gb3B0cztcbn1cblxuZnVuY3Rpb24gdW5sb2FkTGlzdGVuZXIoKSB7XG5cdHRoaXMudXBkYXRlQW1vdW50V2F0Y2hlZCgpO1xuXHRmaXJlRXZlbnQoJ3dhdGNoZWQnLCB0aGlzLCB7XG5cdFx0YW1vdW50OiB0aGlzLmdldEFtb3VudFdhdGNoZWQoMCksXG5cdFx0YW1vdW50UGVyY2VudGFnZTogdGhpcy5nZXRBbW91bnRXYXRjaGVkUGVyY2VudGFnZSgwKVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gdmlzaWJpbGl0eUxpc3RlbmVyKGV2KSB7XG5cdGlmIChldi5kZXRhaWwuaGlkZGVuKSB7XG5cdFx0dGhpcy51cGRhdGVBbW91bnRXYXRjaGVkKCk7XG5cdH0gZWxzZSBpZiAoIXRoaXMudmlkZW9FbC5wYXVzZWQpIHtcblx0XHR0aGlzLm1hcmtQbGF5U3RhcnQoKTtcblx0fVxufVxuXG5jb25zdCB1bmxvYWRFdmVudE5hbWUgPSAnb25iZWZvcmV1bmxvYWQnIGluIHdpbmRvdyA/ICdiZWZvcmV1bmxvYWQnIDogJ3VubG9hZCc7XG5cbmNvbnN0IGRlZmF1bHRPcHRzID0ge1xuXHRhZHZlcnRpc2luZzogZmFsc2UsXG5cdGFsbFByb2dyZXNzOiBmYWxzZSxcblx0YXV0b3JlbmRlcjogdHJ1ZSxcblx0Y2xhc3NlczogW10sXG5cdG9wdGltdW13aWR0aDogbnVsbCxcblx0cGxhY2Vob2xkZXI6IGZhbHNlLFxuXHRwbGFjZWhvbGRlckluZm86IFsndGl0bGUnXSxcblx0cGxhY2Vob2xkZXJIaW50OiAnJyxcblx0cGxheXNpbmxpbmU6IGZhbHNlLFxuXHRzaG93Q2FwdGlvbnM6IHRydWUsXG5cdHNob3dHdWlkYW5jZTogdHJ1ZSxcblx0ZGF0YTogbnVsbFxufTtcblxuY2xhc3MgVmlkZW8ge1xuXHRjb25zdHJ1Y3RvcihlbCwgb3B0cykge1xuXHRcdHRoaXMuY29udGFpbmVyRWwgPSBlbDtcblx0XHQvLyBhbW91bnQgb2YgdGhlIHZpZGVvLCBpbiBtaWxsaXNlY29uZHMsIHRoYXQgaGFzIGFjdHVhbGx5IGJlZW4gJ3dhdGNoZWQnXG5cdFx0dGhpcy5hbW91bnRXYXRjaGVkID0gMDtcblx0XHR0aGlzLmZpcmVXYXRjaGVkRXZlbnQgPSB1bmxvYWRMaXN0ZW5lci5iaW5kKHRoaXMpO1xuXHRcdHRoaXMudmlzaWJpbGl0eUxpc3RlbmVyID0gdmlzaWJpbGl0eUxpc3RlbmVyLmJpbmQodGhpcyk7XG5cdFx0dGhpcy5kaWRVc2VyUHJlc3NQbGF5ID0gZmFsc2U7XG5cblx0XHR0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0T3B0cywgb3B0cywgZ2V0T3B0aW9uc0Zyb21EYXRhQXR0cmlidXRlcyh0aGlzLmNvbnRhaW5lckVsLmF0dHJpYnV0ZXMpKTtcblxuXHRcdHRoaXMuY29udGFpbmVyRWwuc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgJ1ZpZGVvIFBsYXllcicpO1xuXG5cdFx0aWYodHlwZW9mIHRoaXMub3B0cy5zeXN0ZW1jb2RlICE9PSAnc3RyaW5nJykge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdvLXZpZGVvIHJlcXVpcmVzIFwic3lzdGVtY29kZVwiIGlzIGNvbmZpZ3VyZWQgdXNpbmcgdGhlIFwiZGF0YS1vLXZpZGVvLXN5c3RlbWNvZGVcIiBkYXRhIGF0dHJpYnV0ZSwgb3IgY29uZmlndXJlZCB3aXRoIHRoZSBgb3B0c2AgY29uc3RydWN0b3IgYXJndW1lbnQuIEl0IG11c3QgYmUgc2V0IHRvIGEgdmFsaWQgW0Jpem9wcyBzeXN0ZW0gY29kZV0oaHR0cHM6Ly9iaXotb3BzLmluLmZ0LmNvbS9saXN0L1N5c3RlbXMpLicpO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgdGhpcy5vcHRzLmNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHR0aGlzLm9wdHMuY2xhc3NlcyA9IHRoaXMub3B0cy5jbGFzc2VzLnNwbGl0KCcgJyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMub3B0cy5jbGFzc2VzLmluZGV4T2YoJ28tdmlkZW9fX3ZpZGVvJykgPT09IC0xKSB7XG5cdFx0XHR0aGlzLm9wdHMuY2xhc3Nlcy5wdXNoKCdvLXZpZGVvX192aWRlbycpO1xuXHRcdH1cblxuXHRcdHRoaXMudGFyZ2V0aW5nID0ge1xuXHRcdFx0c2l0ZTogJy81ODg3L2Z0LmNvbScsXG5cdFx0XHRwb3NpdGlvbjogJ3ZpZGVvJyxcblx0XHRcdHNpemVzOiAnNTkyeDMzM3w0MDB4MjI1Jyxcblx0XHRcdHZpZGVvSWQ6IHRoaXMub3B0cy5pZFxuXHRcdH07XG5cblx0XHRpZiAodGhpcy5vcHRzLmFkdmVydGlzaW5nKSB7XG5cdFx0XHR0aGlzLnZpZGVvQWRzID0gbmV3IFZpZGVvQWRzKHRoaXMpO1xuXHRcdH1cblxuXHRcdHRoaXMuY29udGFpbmVyRWwuc2V0QXR0cmlidXRlKCdkYXRhLW8tdmlkZW8tanMnLCAnJyk7XG5cblx0XHRpZiAodGhpcy5vcHRzLmF1dG9yZW5kZXIgPT09IHRydWUpIHtcblx0XHRcdHRoaXMuaW5pdCgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLm9wdHMuc2hvd0d1aWRhbmNlKSB7XG5cdFx0XHR0aGlzLmd1aWRhbmNlID0gbmV3IEd1aWRhbmNlKCk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RGF0YSgpIHtcblx0XHRjb25zdCBkYXRhUHJvbWlzZSA9IHRoaXMub3B0cy5kYXRhID9cblx0XHRcdFByb21pc2UucmVzb2x2ZSh0aGlzLm9wdHMuZGF0YSkgOlxuXHRcdFx0ZmV0Y2goYGh0dHBzOi8vbmV4dC1tZWRpYS1hcGkuZnQuY29tL3YxLyR7dGhpcy5vcHRzLmlkfWApXG5cdFx0XHRcdC50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRpZiAocmVzcG9uc2Uub2spIHtcblx0XHRcdFx0XHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRocm93IEVycm9yKCdOZXh0IE1lZGlhIEFQSSByZXNwb25kZWQgd2l0aCBhICcgKyByZXNwb25zZS5zdGF0dXMgKyAnICgnICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCArICcpIGZvciBpZCAnICsgdGhpcy5vcHRzLmlkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0cmV0dXJuIGRhdGFQcm9taXNlLnRoZW4oZGF0YSA9PiB7XG5cdFx0XHR0aGlzLnZpZGVvRGF0YSA9IGRhdGE7XG5cdFx0XHR0aGlzLnBvc3RlckltYWdlID0gZGF0YS5tYWluSW1hZ2VVcmwgJiYgdXBkYXRlUG9zdGVyVXJsKGRhdGEubWFpbkltYWdlVXJsLCB0aGlzLm9wdHMub3B0aW11bXdpZHRoLCB0aGlzLm9wdHMuc3lzdGVtY29kZSk7XG5cdFx0XHR0aGlzLnJlbmRpdGlvbiA9IGdldFJlbmRpdGlvbihkYXRhLnJlbmRpdGlvbnMsIHRoaXMub3B0cyk7XG5cdFx0fSk7XG5cdH1cblxuXHRyZW5kZXJWaWRlbygpIHtcblx0XHRpZiAodGhpcy5yZW5kaXRpb24pIHtcblx0XHRcdGlmICh0aGlzLm9wdHMucGxhY2Vob2xkZXIpIHtcblx0XHRcdFx0dGhpcy5hZGRQbGFjZWhvbGRlcigpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hZGRWaWRlbygpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGluaXQoKSB7XG5cdFx0cmV0dXJuICh0aGlzLm9wdHMuYWR2ZXJ0aXNpbmcgPyBWaWRlb0Fkcy5sb2FkQWRzTGlicmFyeSgpIDogUHJvbWlzZS5yZXNvbHZlKCkpXG5cdFx0XHQuY2F0Y2goKCkgPT4ge1xuXHRcdFx0XHQvLyBJZiBhZCBkb2Vzbid0IGxvYWQgZm9yIHNvbWUgcmVhc29uLCBsb2FkIHZpZGVvIGFzIG5vcm1hbFxuXHRcdFx0XHR0aGlzLm9wdHMuYWR2ZXJ0aXNpbmcgPSBmYWxzZTtcblx0XHRcdH0pXG5cdFx0XHQudGhlbigoKSA9PiB0aGlzLmdldERhdGEoKSlcblx0XHRcdC50aGVuKCgpID0+IHRoaXMucmVuZGVyVmlkZW8oKSk7XG5cdH1cblxuXHRhZGRWaWRlbygpIHtcblx0XHR0aGlzLmxpdmVSZWdpb25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRoaXMubGl2ZVJlZ2lvbkVsLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywnYXNzZXJ0aXZlJyk7XG5cdFx0dGhpcy5saXZlUmVnaW9uRWwuY2xhc3NMaXN0LmFkZCgnby12aWRlb19fbGl2ZS1yZWdpb24nKTtcblx0XHR0aGlzLnZpZGVvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuXHRcdHRoaXMudmlkZW9FbC5jb250cm9scyA9IHRydWU7XG5cdFx0dGhpcy52aWRlb0VsLmNsYXNzTmFtZSA9IEFycmF5LmlzQXJyYXkodGhpcy5vcHRzLmNsYXNzZXMpID8gdGhpcy5vcHRzLmNsYXNzZXMuam9pbignICcpIDogdGhpcy5vcHRzLmNsYXNzZXM7XG5cdFx0dGhpcy5jb250YWluZXJFbC5jbGFzc0xpc3QuYWRkKCdvLXZpZGVvLS1wbGF5ZXInKTtcblxuXHRcdGlmICh0aGlzLm9wdHMucGxheXNpbmxpbmUpIHtcblx0XHRcdHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJ3RydWUnKTtcblx0XHRcdHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ3dlYmtpdC1wbGF5c2lubGluZScsICd0cnVlJyk7XG5cdFx0fVxuXG5cdFx0Ly8gZGlzYWJsZSBkb3dubG9hZCBidXR0b24gaW4gQ2hyb21lIDU4K1xuXHRcdGlmICh0aGlzLnZpZGVvRWwuY29udHJvbHNMaXN0KSB7XG5cdFx0XHR0aGlzLnZpZGVvRWwuY29udHJvbHNMaXN0LmFkZCgnbm9kb3dubG9hZCcpO1xuXHRcdH1cblxuXHRcdHRoaXMudXBkYXRlVmlkZW8oKTtcblxuXHRcdGlmICh0aGlzLnBsYWNlaG9sZGVyRWwgJiYgIXRoaXMub3B0cy5hZHZlcnRpc2luZykge1xuXHRcdFx0dGhpcy52aWRlb0VsLmF1dG9wbGF5ID0gdGhpcy52aWRlb0VsLmF1dG9zdGFydCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aGlzLmxpdmVSZWdpb25FbCk7XG5cdFx0dGhpcy5jb250YWluZXJFbC5hcHBlbmRDaGlsZCh0aGlzLnZpZGVvRWwpO1xuXG5cdFx0YWRkRXZlbnRzKHRoaXMsIFsncGxheWluZycsICdwYXVzZScsICdlbmRlZCcsICdwcm9ncmVzcycsICdzZWVrZWQnLCAnZXJyb3InLCAnc3RhbGxlZCcsICd3YWl0aW5nJ10pO1xuXHRcdHRoaXMudmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKCdwbGF5aW5nJywgdGhpcy5wYXVzZU90aGVyVmlkZW9zLmJpbmQodGhpcykpO1xuXHRcdHRoaXMudmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKCdwbGF5aW5nJywgdGhpcy5tYXJrUGxheVN0YXJ0LmJpbmQodGhpcykpO1xuXHRcdHRoaXMudmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIHRoaXMudXBkYXRlQW1vdW50V2F0Y2hlZC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLnZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcignc3VzcGVuZCcsIHRoaXMuY2xlYXJDdXJyZW50bHlQbGF5aW5nLmJpbmQodGhpcykpO1xuXHRcdHRoaXMudmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIHRoaXMuY2xlYXJDdXJyZW50bHlQbGF5aW5nLmJpbmQodGhpcykpO1xuXG5cdFx0aWYgKHRoaXMub3B0cy5hZHZlcnRpc2luZykge1xuXHRcdFx0dGhpcy52aWRlb0Fkcy5zZXRVcEFkcygpO1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgJ3dhdGNoZWQnIGV2ZW50IG9uIHBhZ2UgdW5sb2FkLFxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKHVubG9hZEV2ZW50TmFtZSwgdGhpcy5maXJlV2F0Y2hlZEV2ZW50KTtcblx0XHRvVmlld3BvcnQubGlzdGVuVG8oJ3Zpc2liaWxpdHknKTtcblx0XHQvLyBwYXVzZSAnd2F0Y2hpbmcnIHRoZSB2aWRlbyBpZiB0aGUgdGFiIGlzIGhpZGRlblxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvVmlld3BvcnQudmlzaWJpbGl0eScsIHRoaXMudmlzaWJpbGl0eUxpc3RlbmVyKTtcblx0fVxuXG5cdGFkZENhcHRpb25zKCkge1xuXHRcdGlmICh0aGlzLm9wdHMuc2hvd0NhcHRpb25zID09PSBmYWxzZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgdGhpcy52aWRlb0RhdGEgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSBjYWxsIGBnZXREYXRhKClgIGJlZm9yZSBjYWxsaW5nIGBhZGRDYXB0aW9ucygpYCBkaXJlY3RseS4nKTtcblx0XHR9XG5cblx0XHRjb25zdCBleGlzdGluZ1RyYWNrRWwgPSB0aGlzLnZpZGVvRWwucXVlcnlTZWxlY3RvcigndHJhY2snKTtcblx0XHRpZiAoZXhpc3RpbmdUcmFja0VsKSB7XG5cdFx0XHR0aGlzLnZpZGVvRWwucmVtb3ZlQ2hpbGQoZXhpc3RpbmdUcmFja0VsKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy52aWRlb0RhdGEuY2FwdGlvbnNVcmwpIHtcblx0XHRcdC8vIEZJWE1FIHRoaXMgaXMgYWxsIGhhcmRjb2RlZCBhcyBFbmdsaXNoIGNhcHRpb25zIGF0IHRoZSBtb21lbnRcblx0XHRcdGNvbnN0IHRyYWNrRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cmFjaycpO1xuXHRcdFx0dHJhY2tFbC5zZXRBdHRyaWJ1dGUoJ2xhYmVsJywgJ0VuZ2xpc2gnKTtcblx0XHRcdHRyYWNrRWwuc2V0QXR0cmlidXRlKCdraW5kJywgJ2NhcHRpb25zJyk7XG5cdFx0XHR0cmFja0VsLnNldEF0dHJpYnV0ZSgnc3JjbGFuZycsICdlbicpO1xuXHRcdFx0dHJhY2tFbC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHRoaXMudmlkZW9EYXRhLmNhcHRpb25zVXJsKTtcblx0XHRcdHRyYWNrRWwuc2V0QXR0cmlidXRlKCdjcm9zc29yaWdpbicsICd0cnVlJyk7XG5cdFx0XHR0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdjcm9zc29yaWdpbicsICd0cnVlJyk7XG5cdFx0XHR0aGlzLnZpZGVvRWwuYXBwZW5kQ2hpbGQodHJhY2tFbCk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlVmlkZW8oKSB7XG5cdFx0aWYgKHRoaXMucG9zdGVySW1hZ2UpIHtcblx0XHRcdHRoaXMudmlkZW9FbC5wb3N0ZXIgPSB0aGlzLnBvc3RlckltYWdlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnZpZGVvRWwucmVtb3ZlQXR0cmlidXRlKCdwb3N0ZXInKTtcblx0XHR9XG5cblx0XHR0aGlzLnZpZGVvRWwuc3JjID0gdGhpcy5yZW5kaXRpb24gJiYgdGhpcy5yZW5kaXRpb24udXJsO1xuXHRcdGlmICh0aGlzLmd1aWRhbmNlKSB7XG5cdFx0XHR0aGlzLmd1aWRhbmNlLnJlbW92ZUJhbm5lcigpO1xuXHRcdH1cblx0XHRsaXN0ZW5PbmNlKHRoaXMudmlkZW9FbCwgJ3BsYXlpbmcnLCB0aGlzLnNob3dHdWlkYW5jZUJhbm5lci5iaW5kKHRoaXMpKTtcblxuXHRcdHRoaXMuYWRkQ2FwdGlvbnMoKTtcblx0fVxuXG5cdGFkZFBsYWNlaG9sZGVyKCkge1xuXHRcdHRoaXMucGxhY2Vob2xkZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXHRcdHRoaXMucGxhY2Vob2xkZXJFbC5jbGFzc05hbWUgPSAnby12aWRlb19fcGxhY2Vob2xkZXInO1xuXG5cdFx0dGhpcy5wbGFjZWhvbGRlckltYWdlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblx0XHR0aGlzLnBsYWNlaG9sZGVySW1hZ2VFbC5jbGFzc05hbWUgPSAnby12aWRlb19fcGxhY2Vob2xkZXItaW1hZ2UnO1xuXHRcdHRoaXMucGxhY2Vob2xkZXJJbWFnZUVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdwcmVzZW50YXRpb24nKTtcblx0XHR0aGlzLnBsYWNlaG9sZGVySW1hZ2VFbC5zZXRBdHRyaWJ1dGUoJ2FsdCcsICcnKTtcblxuXHRcdHRoaXMucGxhY2Vob2xkZXJFbC5hcHBlbmRDaGlsZCh0aGlzLnBsYWNlaG9sZGVySW1hZ2VFbCk7XG5cblx0XHQvLyBpbmZvIHBhbmVsXG5cdFx0aWYgKHRoaXMub3B0cy5wbGFjZWhvbGRlckluZm8ubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLmluZm9QYW5lbCA9IG5ldyBWaWRlb0luZm8odGhpcyk7XG5cdFx0fVxuXG5cdFx0Ly8gcGxheSBidXR0b25cblx0XHRjb25zdCBwbGF5Q1RBID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cdFx0cGxheUNUQS5jbGFzc05hbWUgPSBgby12aWRlb19fcGxheS1jdGEgJHt0aGlzLm9wdHMucGxhY2Vob2xkZXJIaW50ID8gJ28tdmlkZW9fX3BsYXktY3RhLS13aXRoLWhpbnQnIDogJ28tdmlkZW9fX3BsYXktY3RhLS13aXRob3V0LWhpbnQnfWA7XG5cblx0XHR0aGlzLnBsYXlCdXR0b25FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuXHRcdHRoaXMucGxheUJ1dHRvbkVsLmNsYXNzTmFtZSA9ICdvLXZpZGVvX19wbGF5LWJ1dHRvbic7XG5cblx0XHRjb25zdCBwbGF5QnV0dG9uSWNvbkVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXHRcdHBsYXlCdXR0b25JY29uRWwuY2xhc3NOYW1lID0gJ28tdmlkZW9fX3BsYXktYnV0dG9uLWljb24nO1xuXHRcdHBsYXlCdXR0b25JY29uRWwudGV4dENvbnRlbnQgPSB0aGlzLm9wdHMucGxhY2Vob2xkZXJIaW50O1xuXG5cblx0XHRwbGF5Q1RBLmFwcGVuZENoaWxkKHBsYXlCdXR0b25JY29uRWwpO1xuXG5cdFx0Y29uc3QgeyBjYXB0aW9uc1VybCB9ID0gdGhpcy52aWRlb0RhdGEgfHwge307XG5cdFx0aWYgKCFjYXB0aW9uc1VybCAmJiB0aGlzLmd1aWRhbmNlKSB7XG5cdFx0XHRwbGF5Q1RBLmFwcGVuZENoaWxkKHRoaXMuZ3VpZGFuY2UuY3JlYXRlUGxhY2Vob2xkZXIoKSk7XG5cdFx0fVxuXHRcdHRoaXMucGxheUJ1dHRvbkVsLmFwcGVuZENoaWxkKHBsYXlDVEEpO1xuXG5cdFx0dGhpcy5wbGFjZWhvbGRlckVsLmFwcGVuZENoaWxkKHRoaXMucGxheUJ1dHRvbkVsKTtcblxuXHRcdHRoaXMucGxhY2Vob2xkZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblx0XHRcdHRoaXMuZGlkVXNlclByZXNzUGxheSA9IHRydWU7XG5cdFx0XHR0aGlzLnBsYXkoKTtcblx0XHR9KTtcblxuXHRcdHRoaXMudXBkYXRlUGxhY2Vob2xkZXIoKTtcblxuXHRcdHRoaXMuY29udGFpbmVyRWwuYXBwZW5kQ2hpbGQodGhpcy5wbGFjZWhvbGRlckVsKTtcblx0fVxuXG5cdHBsYXkoKSB7XG5cdFx0aWYgKHRoaXMucGxhY2Vob2xkZXJFbCkge1xuXG5cdFx0XHQvLyBBZGRzIHZpZGVvIHNvb24gc28gYWRzIGNhbiBzdGFydCBsb2FkaW5nXG5cdFx0XHR0aGlzLmFkZFZpZGVvKCk7XG5cdFx0XHR0aGlzLnZpZGVvRWwuZm9jdXMoKTtcblxuXHRcdFx0dGhpcy5jb250YWluZXJFbC5yZW1vdmVDaGlsZCh0aGlzLnBsYWNlaG9sZGVyRWwpO1xuXHRcdFx0aWYgKHRoaXMuaW5mb1BhbmVsKSB7XG5cdFx0XHRcdHRoaXMuaW5mb1BhbmVsLnRlYXJkb3duKCk7XG5cdFx0XHR9XG5cblx0XHRcdGRlbGV0ZSB0aGlzLnBsYWNlaG9sZGVyRWw7XG5cdFx0XHRkZWxldGUgdGhpcy5wbGFjZWhvbGRlckltYWdlRWw7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMudmlkZW9FbC5wbGF5KCk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlUGxhY2Vob2xkZXIoKSB7XG5cdFx0aWYgKHRoaXMucG9zdGVySW1hZ2UpIHtcblx0XHRcdHRoaXMucGxhY2Vob2xkZXJJbWFnZUVsLnNyYyA9IHRoaXMucG9zdGVySW1hZ2U7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuaW5mb1BhbmVsKSB7XG5cdFx0XHR0aGlzLmluZm9QYW5lbC51cGRhdGUoKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5wbGF5QnV0dG9uRWwpIHtcblx0XHRcdHRoaXMucGxheUJ1dHRvbkVsLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIGBQbGF5IHZpZGVvICR7dGhpcy52aWRlb0RhdGEudGl0bGV9YCk7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlKG5ld09wdHMpIHtcblx0XHRpZiAodGhpcy52aWRlb0VsKSB7XG5cdFx0XHR0aGlzLnZpZGVvRWwucGF1c2UoKTtcblx0XHR9XG5cdFx0dGhpcy5jbGVhckN1cnJlbnRseVBsYXlpbmcoKTtcblxuXHRcdHRoaXMuZGlkVXNlclByZXNzUGxheSA9IGZhbHNlO1xuXG5cdFx0dGhpcy5vcHRzID0gT2JqZWN0LmFzc2lnbih0aGlzLm9wdHMsIHsgZGF0YTogbnVsbCB9LCBuZXdPcHRzKTtcblxuXHRcdGlmICghdGhpcy52aWRlb0VsICYmICF0aGlzLnBsYWNlaG9sZGVyRWwpIHtcblx0XHRcdHJldHVybiB0aGlzLmluaXQoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5nZXREYXRhKCkudGhlbigoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5wbGFjZWhvbGRlckVsKSB7XG5cdFx0XHRcdHRoaXMudXBkYXRlUGxhY2Vob2xkZXIoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMudXBkYXRlVmlkZW8oKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGdldFByb2dyZXNzKCkge1xuXHRcdHJldHVybiB0aGlzLnZpZGVvRWwuZHVyYXRpb24gPyBwYXJzZUludCgxMDAgKiB0aGlzLnZpZGVvRWwuY3VycmVudFRpbWUgLyB0aGlzLnZpZGVvRWwuZHVyYXRpb24sIDEwKSA6IDA7XG5cdH1cblxuXHRnZXREdXJhdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy52aWRlb0VsLmR1cmF0aW9uID8gcGFyc2VJbnQodGhpcy52aWRlb0VsLmR1cmF0aW9uLCAxMCkgOiAwO1xuXHR9XG5cblx0Z2V0VHJhY2tNb2RlKCkge1xuXHRcdHJldHVybiB0aGlzLnZpZGVvRWwudGV4dFRyYWNrcyAmJiB0aGlzLnZpZGVvRWwudGV4dFRyYWNrc1swXSA/IHRoaXMudmlkZW9FbC50ZXh0VHJhY2tzWzBdLm1vZGUgOiB1bmRlZmluZWQ7XG5cdH1cblxuXHRnZXRBbW91bnRXYXRjaGVkKGRlY2ltYWxQb2ludHMpIHtcblx0XHRjb25zdCBzZWNvbmRzV2F0Y2hlZCA9IHRoaXMuYW1vdW50V2F0Y2hlZCAvIDEwMDA7XG5cdFx0cmV0dXJuIGRlY2ltYWxQb2ludHMgIT09IHVuZGVmaW5lZCA/IE51bWJlcihzZWNvbmRzV2F0Y2hlZC50b0ZpeGVkKGRlY2ltYWxQb2ludHMpKSA6IHNlY29uZHNXYXRjaGVkO1xuXHR9XG5cblx0Z2V0QW1vdW50V2F0Y2hlZFBlcmNlbnRhZ2UoZGVjaW1hbFBvaW50cykge1xuXHRcdGNvbnN0IHBlcmNlbnRhZ2VXYXRjaGVkID0gdGhpcy52aWRlb0VsICYmIHRoaXMudmlkZW9FbC5kdXJhdGlvbiA/IDEwMCAvIHRoaXMudmlkZW9FbC5kdXJhdGlvbiAqIHRoaXMuZ2V0QW1vdW50V2F0Y2hlZCgpIDogMDtcblx0XHRyZXR1cm4gZGVjaW1hbFBvaW50cyAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKHBlcmNlbnRhZ2VXYXRjaGVkLnRvRml4ZWQoZGVjaW1hbFBvaW50cykpIDogcGVyY2VudGFnZVdhdGNoZWQ7XG5cdH1cblxuXHRwYXVzZU90aGVyVmlkZW9zKCkge1xuXHRcdGlmICh0aGlzLmN1cnJlbnRseVBsYXlpbmdWaWRlbyAmJiB0aGlzLmN1cnJlbnRseVBsYXlpbmdWaWRlbyAhPT0gdGhpcy52aWRlb0VsKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRseVBsYXlpbmdWaWRlby5wYXVzZSgpO1xuXHRcdH1cblxuXHRcdHRoaXMuY3VycmVudGx5UGxheWluZ1ZpZGVvID0gdGhpcy52aWRlb0VsO1xuXHR9XG5cblx0Y2xlYXJDdXJyZW50bHlQbGF5aW5nKCkge1xuXHRcdGlmICh0aGlzLmN1cnJlbnRseVBsYXlpbmdWaWRlbyAhPT0gdGhpcy52aWRlb0VsKSB7XG5cdFx0XHR0aGlzLmN1cnJlbnRseVBsYXlpbmdWaWRlbyA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0bWFya1BsYXlTdGFydCAoKSB7XG5cdFx0dGhpcy5wbGF5U3RhcnQgPSBEYXRlLm5vdygpO1xuXHR9XG5cblx0dXBkYXRlQW1vdW50V2F0Y2hlZCAoKSB7XG5cdFx0aWYgKHRoaXMucGxheVN0YXJ0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuYW1vdW50V2F0Y2hlZCArPSBEYXRlLm5vdygpIC0gdGhpcy5wbGF5U3RhcnQ7XG5cdFx0XHR0aGlzLnBsYXlTdGFydCA9IHVuZGVmaW5lZDtcblx0XHR9XG5cdH1cblxuXHRyZXNldEFtb3VudFdhdGNoZWQgKCkge1xuXHRcdHRoaXMuYW1vdW50V2F0Y2hlZCA9IDA7XG5cdH1cblxuXHRzaG93R3VpZGFuY2VCYW5uZXIgKCkge1xuXHRcdGNvbnN0IHsgY2FwdGlvbnNVcmwgfSA9IHRoaXMudmlkZW9EYXRhIHx8IHt9O1xuXHRcdGlmICghdGhpcy5kaWRVc2VyUHJlc3NQbGF5ICYmICFjYXB0aW9uc1VybCAmJiB0aGlzLmd1aWRhbmNlKSB7XG5cdFx0XHR0aGlzLmNvbnRhaW5lckVsLmFwcGVuZENoaWxkKHRoaXMuZ3VpZGFuY2UuY3JlYXRlQmFubmVyKCkpO1xuXHRcdH1cblx0fVxuXG5cdGRlc3Ryb3kgKCkge1xuXHRcdC8vIHJlbW92ZSBsaXN0ZW5lcnNcblx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcih1bmxvYWRFdmVudE5hbWUsIHRoaXMuZmlyZVdhdGNoZWRFdmVudCk7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29WaWV3cG9ydC52aXNpYmlsaXR5JywgdGhpcy52aXNpYmlsaXR5TGlzdGVuZXIpO1xuXHR9XG5cblx0c3RhdGljIGluaXQocm9vdEVsLCBjb25maWcpIHtcblx0XHRjb25zdCB2aWRlb3MgPSBbXTtcblx0XHRpZiAoIXJvb3RFbCkge1xuXHRcdFx0cm9vdEVsID0gZG9jdW1lbnQuYm9keTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiByb290RWwgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RFbCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdmlkZW9FbHMgPSByb290RWwucXVlcnlTZWxlY3RvckFsbCgnOm5vdChbZGF0YS1vLXZpZGVvLWpzXSlbZGF0YS1vLWNvbXBvbmVudH49XCJvLXZpZGVvXCJdJyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHZpZGVvRWxzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2aWRlb3MucHVzaChuZXcgVmlkZW8odmlkZW9FbHNbaV0sIGNvbmZpZykpO1xuXHRcdH1cblxuXHRcdHJldHVybiB2aWRlb3M7XG5cdH1cbn1cblxuVmlkZW8uUGxheWxpc3QgPSBQbGF5bGlzdDtcblxuZXhwb3J0IGRlZmF1bHQgVmlkZW87XG4iLCJpbXBvcnQgVmlkZW8gZnJvbSAnLi4vLi4vc3JjL2pzL3ZpZGVvLmpzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKSB7XG5cdGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuXHRjb25zdCBxdWV1ZSA9IEFycmF5LmZyb20oc2VsZWN0Lm9wdGlvbnMpLm1hcChvcHQgPT4gb3B0LnZhbHVlKTtcblxuXHRjb25zdCBwbGF5ZXIgPSBuZXcgVmlkZW8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtby1jb21wb25lbnQ9XCJvLXZpZGVvXCJdJyksIHtcblx0XHRhdXRvcmVuZGVyOiBmYWxzZVxuXHR9KTtcblxuXHRjb25zdCBwbGF5bGlzdCA9IG5ldyBWaWRlby5QbGF5bGlzdCh7IHBsYXllciwgcXVldWUsIGF1dG9wbGF5OiB0cnVlIH0pO1xuXG5cdGNvbnN0IGJ1dHRvbnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpKTtcblxuXHRidXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcblx0XHRidXR0b24ub25jbGljayA9IChlKSA9PiBwbGF5bGlzdFtlLnRhcmdldC5uYW1lXSgpO1xuXHR9KTtcblxuXHRwbGF5ZXIuY29udGFpbmVyRWwuYWRkRXZlbnRMaXN0ZW5lcigncGxheScsICgpID0+IHtcblx0XHRzZWxlY3Qub3B0aW9uc1twbGF5bGlzdC5jdXJyZW50SW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcblx0fSwgdHJ1ZSk7XG59KTtcbiJdfQ==