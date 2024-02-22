import {ToolTip} from './tooltip';
import type {OnboardingToolTipProps} from '../types';

export class OnboardingToolTip extends ToolTip implements OnboardingToolTipProps {
	private _closeButton!: HTMLElement;

	connectedCallback() {
		super.connectedCallback();
		this._closeButton = this.querySelector('.o3-tooltip-close') as HTMLElement;
		this._addEventListeners();
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this._removeEventListeners();
	}

	private _clickHandler = () => {
		this.remove();
	};

	private _addEventListeners() {
		this._closeButton.addEventListener('click', this._clickHandler);
	}

	private _removeEventListeners() {
		this._closeButton.removeEventListener('click', this._clickHandler);
	}
}

customElements.define('o3-tooltip-onboarding', OnboardingToolTip);

declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip-onboarding': OnboardingToolTip;
	}
}
