// src/ts/tooltip.ts
import { createPopper } from "@popperjs/core";
var ToolTip = class extends HTMLElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["placement", "title", "content"];
  }
  get placement() {
    return this.getAttribute("placement");
  }
  set placement(value) {
    this.setAttribute("placement", value);
  }
  get title() {
    return this.getAttribute("title");
  }
  set title(value) {
    this.setAttribute("title", value);
  }
  get content() {
    return this.getAttribute("content");
  }
  set content(value) {
    this.setAttribute("content", value);
  }
  connectedCallback() {
    this.content = this.getAttribute("content");
    if (this.hasAttribute("title")) {
      this.title = this.getAttribute("title");
    }
    this.contentId = this.getAttribute("content-id");
  }
  attributeChangedCallback(name) {
    this.render(name);
  }
  disconnectedCallback() {
    this._popperInstance?.destroy();
  }
  render(name) {
    this._popperInstance?.setOptions({
      placement: this.placement
    });
    if (name === "title" || name === "content") {
      const titleEl = this.querySelector(".o3-tooltip-content-title");
      const contentEl = this.querySelector(
        ".o3-tooltip-content-body"
      );
      if (titleEl) {
        titleEl.textContent = this.title;
      }
      if (contentEl) {
        contentEl.textContent = this.content;
      }
      if (!this.title) {
        this.setAttribute("no-title", "");
      } else {
        this.removeAttribute("no-title");
      }
    }
  }
  initialisePopper(targetNode, popperElement) {
    return createPopper(targetNode, popperElement, {
      placement: this.placement || "top",
      modifiers: [
        {
          name: "preventOverflow",
          options: {
            rootBoundary: document.body
          }
        },
        {
          name: "eventListeners",
          options: {
            scroll: false
          }
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top", "bottom", "left", "right"],
            rootBoundary: document.body
          }
        },
        {
          name: "offset",
          options: {
            offset: [0, 16]
          }
        }
      ]
    });
  }
};

// src/ts/onboardingTooltip.ts
var OnboardingToolTip = class extends ToolTip {
  constructor() {
    super(...arguments);
    this._clickHandler = () => {
      this.remove();
    };
  }
  connectedCallback() {
    super.connectedCallback();
    this.innerHTML = this._generateMarkup(
      this.title,
      this.content,
      this.contentId
    );
    this._targetNode = this.getTargetNode();
    this._popperInstance = this.initialisePopper(this._targetNode, this);
    this._closeButton = this.querySelector(".o3-tooltip-close");
    this._addEventListeners();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEventListeners();
  }
  _addEventListeners() {
    this._closeButton.addEventListener("click", this._clickHandler);
  }
  _removeEventListeners() {
    this._closeButton.removeEventListener("click", this._clickHandler);
  }
  getTargetNode() {
    this.targetId = this.getAttribute("target-id");
    let targetNode = document.getElementById(this.targetId);
    if (!targetNode) {
      throw new Error(
        "Target node not found. o3-tooltip requires a target node id to position itself against the target element."
      );
    }
    return targetNode;
  }
  _generateMarkup(title, content, contentId) {
    return `
		<div class="o3-tooltip-wrapper">
				<div data-tooltip-arrow></div>
				<div class="o3-tooltip-content" id=${contentId}>
					<div class="o3-tooltip-content-title">${title}</div>
					<div class="o3-tooltip-content-body">${content}</div>
				</div>
				<button
					type="button"
					class="o3-tooltip-close"
					aria-label="Close tooltip"
					title="Close tooltip"></button>
			</div>
		`;
  }
};
customElements.define("o3-tooltip-onboarding", OnboardingToolTip);

// src/ts/toggleTooltip.ts
var ToggleToolTip = class extends ToolTip {
  constructor() {
    super();
    this._clickHandler = () => {
      if (this._contentWrapper.style.display === "none") {
        this._addContentInLiveRegion();
        return;
      }
      this._cleanUp();
    };
    this._closeOnOutsideClick = (e) => {
      const target = e.target;
      const isTarget = target === this._targetNode;
      const isChild = this.contains(target);
      if (!isChild && !isTarget) {
        this._cleanUp();
      }
    };
    this._closeOnEsc = (e) => {
      if (e.key === "Escape") {
        this._cleanUp();
      }
    };
    this.infoLabel = "more information";
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.getAttribute("info-label")) {
      this.infoLabel = this.getAttribute("info-label");
    }
    this.innerHTML = this._generateMarkup(this.infoLabel);
    this._contentWrapper = this.querySelector(
      ".o3-tooltip-wrapper"
    );
    this._liveRegionEl = this.querySelector(
      ".o3-tooltip-content"
    );
    this._contentWrapper.style.display = "none";
    this._targetNode = this.querySelector(
      ".o3-toggletip-target"
    );
    this._popperInstance = this.initialisePopper(
      this._targetNode,
      this._contentWrapper
    );
    this._addEventListeners();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._removeEventListeners();
  }
  _cleanUp() {
    this._contentWrapper.style.display = "none";
    this.removeAttribute("open");
    this._removeContentInLiveRegion();
  }
  _addContentInLiveRegion() {
    this._liveRegionEl.innerHTML = "";
    this._contentWrapper.style.display = "block";
    this._contentWrapper.style.opacity = "0";
    this.setAttribute("open", "");
    setTimeout(() => {
      this.render();
      this._liveRegionEl.innerHTML = `
				<div class="o3-tooltip-content-title">${this.title}</div>
				<div class="o3-tooltip-content-body">${this.content}</div>
			`;
      this._contentWrapper.style.opacity = "1";
    }, 100);
  }
  _removeContentInLiveRegion() {
    this._liveRegionEl.innerHTML = "";
  }
  _addEventListeners() {
    this._targetNode.addEventListener("click", this._clickHandler);
    document.addEventListener("click", this._closeOnOutsideClick);
    this.addEventListener("keydown", this._closeOnEsc);
  }
  _removeEventListeners() {
    this._targetNode.removeEventListener("click", this._clickHandler);
    document.removeEventListener("click", this._closeOnOutsideClick);
    this.removeEventListener("keydown", this._closeOnEsc);
  }
  _generateMarkup(infoLabel) {
    const tooltipButtonMarkup = `<button type="button" aria-label="${infoLabel}" class="o3-toggletip-target"></button>`;
    return `
		${tooltipButtonMarkup}
		<div class="o3-tooltip-wrapper">
			<div data-tooltip-arrow></div>
			<div class="o3-tooltip-content" role="status"></div>
		</div>`;
  }
};
customElements.define("o3-tooltip-toggle", ToggleToolTip);
