import { IProduct } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export class CardBasket extends Component<IProduct> {
	protected events: IEvents;
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLElement;
	protected cardIndex: HTMLElement;
	protected deleteButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);

		this.events = events;
		this.cardTitle = this.container.querySelector('.card__title');
		this.cardPrice = this.container.querySelector('.card__price');
		this.cardIndex = this.container.querySelector('.basket__item-index');

		this.deleteButton = this.container.querySelector('.basket__item-delete');
		this.deleteButton.addEventListener('click', () =>
			this.events.emit('cardBasket:deleteItem', { card: this })
		);
	}

	set index(value: number) {
		this.cardIndex.textContent = value.toString();
	}

	set _id(id: string) {
		this._id = id;
	}

	set title(title: string) {
		this.cardTitle.textContent = title;
	}

	set price(price: string) {
		this.cardPrice.textContent = `${price} синапсов`;
	}
}
