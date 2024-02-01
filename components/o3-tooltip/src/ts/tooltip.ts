class ToolTip extends HTMLElement {
  constructor() {
    super();
  }
	connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

if (!window.customElements.get("o3-tooltip")) {
	window.customElements.define("o3-tooltip", ToolTip);
}
