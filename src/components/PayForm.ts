import { Form } from './common/Form';
import { TOrderPayInfo } from '../types';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';

export class PayForm extends Form<TOrderPayInfo> {
	protected paymentCardButton: HTMLButtonElement;
	protected paymentCashButton: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.paymentCardButton = ensureElement<HTMLButtonElement>(
			'button[name=card]',
			this.container
		);

		this.paymentCashButton = ensureElement<HTMLButtonElement>(
			'button[name=cash]',
			this.container
		);
		this.paymentCardButton.addEventListener('click', () => {
			this.events.emit('paymentButton:click', { payment: 'card' });
		});
		this.paymentCashButton.addEventListener('click', () => {
			this.events.emit('paymentButton:click', { payment: 'cash' });
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	togglePayButton(value: string) {
		value === 'card'
			? (this.paymentCardButton.classList.add('button_alt-active'),
			  this.paymentCashButton.classList.remove('button_alt-active'))
			: (this.paymentCashButton.classList.add('button_alt-active'),
			  this.paymentCardButton.classList.remove('button_alt-active'));
	}

	// disableBasketButton(element: HTMLButtonElement) {
	// 	if (element) {
	// 		element.disabled = true;
	// 	}
	// }
	// unDisableBasketButton(element: HTMLButtonElement) {
	// 	if (element) {
	// 		element.disabled = false;
	// 	}
	// }
}
