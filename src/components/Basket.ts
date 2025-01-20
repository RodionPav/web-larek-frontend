import { Component } from './base/Component';
import { IEvents } from './base/events';

interface IBasket {
	basketItems: HTMLElement[];
	basketTotal: number;
}

export class Basket extends Component<IBasket> {
	protected events: IEvents;
	protected _basketItems: HTMLElement;
	protected _basketTotal: HTMLElement;
	protected basketButton: HTMLButtonElement;

	constructor(protected container: HTMLTemplateElement, events: IEvents) {
		super(container);
		this.events = events;

		this._basketItems = this.container.querySelector('.basket__list');
		this._basketTotal = this.container.querySelector('.basket__price');
		this.basketButton = this.container.querySelector('.basket__button');

		if (this.basketButton) {
			this.basketButton.addEventListener('click', () =>
				this.events.emit('payForm:open', { card: this })
			);
		}

		this.basketTotal = 0;
	}

	set basketItems(items: HTMLElement[]) {
		this._basketItems.replaceChildren(...items);
	}

	set basketTotal(total: number) {
		if (!total) {
			super.disableBasketButton(this.basketButton);
		} else if (total) {
			super.unDisableBasketButton(this.basketButton);
		}
		this._basketTotal.textContent = `${total} синапсов`;
	}
}
