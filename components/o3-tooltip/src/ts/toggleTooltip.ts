import {ToolTip} from './tooltip';
import {TooltipProps} from '../types';

export class ToggleToolTip extends ToolTip implements TooltipProps {
	connectedCallback() {
		super.connectedCallback();
		this._addEventListeners();
		this.style.display = 'none';
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._removeEventListeners();
	}

	private _clickHandler = () => {
		console.log('click');
		if (this.style.display === 'none') {
			this.render();
			this.style.display = 'block';
			return;
		}
		this.style.display = 'none';
	};

	private _closeOnOutsideClick = (e: Event) => {
		const target = e.target as Node;
		const isTarget = target === this._targetNode;
		const isChild = this.contains(target);
		if (!isChild && !isTarget) {
			this.style.display = 'none';
		}
	};

	private _closeOnEsc = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this.style.display = 'none';
		}
	};

	private _addEventListeners() {
		this._targetNode.addEventListener('click', this._clickHandler);
		// Close on outside click
		document.addEventListener('click', this._closeOnOutsideClick);
		// Remove toggletip on ESC
		this.addEventListener('keydown', this._closeOnEsc);
	}

	private _removeEventListeners() {
		this._targetNode.removeEventListener('click', this._clickHandler);
		document.removeEventListener('click', this._closeOnOutsideClick);
		this.removeEventListener('keydown', this._closeOnEsc);
	}
}

customElements.define('o3-tooltip-toggle', ToggleToolTip);

declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip-toggle': ToggleToolTip;
	}
}
