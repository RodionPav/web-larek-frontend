import { Component } from './base/Component';
import { IEvents } from './base/events';
import { TotalOrderInfo } from '../types';

export class Success extends Component<TotalOrderInfo> {
	protected successButton: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.successButton = this.container.querySelector('.order-success__close');
		this._total = this.container.querySelector('.order-success__description');

		this.successButton.addEventListener('click', () =>
			this.events.emit('successButton:click')
		);
	}

	set total(value: number) {
		this._total.textContent = `Списано ${value} синапсов`;
	}
}
