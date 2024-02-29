import {ToolTip} from './tooltip';
import type {OnboardingToolTipProps} from '../types';

export class OnboardingToolTip
	extends ToolTip
	implements OnboardingToolTipProps
{
	private _closeButton!: HTMLElement;

	connectedCallback() {
		super.connectedCallback();
		this.innerHTML = this.generateMarkup(
			this.title,
			this.content,
			this.contentId
		);
		if (!this.title) {
			this.setAttribute('no-title', '');
		}
		this._targetNode = this.getTargetNode();
		this._popperInstance = this.initialisePopper(this._targetNode, this);
		this.render();
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

	private getTargetNode() {
		this.targetId = this.getAttribute('target-id') as string;
		let targetNode = document.getElementById(this.targetId);

		if (!targetNode) {
			throw new Error(
				'Target node not found. o3-tooltip requires a target node id to position itself against the target element.'
			);
		}
		return targetNode as HTMLElement;
	}

	private generateMarkup(title: string, content: string, contentId: string) {
		return `
		<div class="o3-tooltip-wrapper">
				<div data-tooltip-arrow></div>
				<div class="o3-tooltip-content" id=${contentId}>
					${title && `<div class="o3-tooltip-content-title">${title}</div>`}
					<div>${content}</div>
				</div>
				<button
					type="button"
					class="o3-tooltip-close"
					aria-label="Close tooltip"
					title="Close tooltip"></button>
			</div>
		`;
	}
}

customElements.define('o3-tooltip-onboarding', OnboardingToolTip);

declare global {
	interface HTMLElementTagNameMap {
		'o3-tooltip-onboarding': OnboardingToolTip;
	}
}
