import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export abstract class Card<T> extends Component<T> {
	protected events: IEvents;
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLElement;
	protected cardId: string;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;

		this.cardTitle = this.container.querySelector('.card__title');
		this.cardPrice = this.container.querySelector('.card__price');
	}

	set title(title: string) {
		this.cardTitle.textContent = title;
	}

	// set price(price: string) {
	// 	if (price) {
	// 		this.cardPrice.textContent = `${price} синапсов`;
	// 	} else {
	//
	// 			this.events.emit('buyButton:buyItem', { card: this });
	// 	}
	// }

	set price(price: string) {
		if (price) {
			this.cardPrice.textContent = `${price} синапсов`;
		} else {
			this.cardPrice.textContent = `Бесценно`;
		}
	}

	set id(id) {
		this.cardId = id;
	}
	get id() {
		return this.cardId;
	}
}
