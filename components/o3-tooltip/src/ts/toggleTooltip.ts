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
		if (this.style.display === 'none') {
			this.render();
			this.style.display = 'block';
			return
		}
		this.style.display = 'none';
	};

	private _addEventListeners() {
		this._targetNode.addEventListener('click', this._clickHandler);
	}

	private _removeEventListeners() {
		this._targetNode.removeEventListener('click', this._clickHandler);
	}
}

customElements.define('o3-tooltip-toggle', ToggleToolTip);

declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip-toggle': ToggleToolTip;
	}
}
