import { IProduct } from '../types';
import { IEvents } from './base/events';
import { Card } from './common/Card';

export class CardBasket extends Card<IProduct> {
	protected cardIndex: HTMLElement;
	protected deleteButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this.cardIndex = this.container.querySelector('.basket__item-index');
		this.deleteButton = this.container.querySelector('.basket__item-delete');

		this.deleteButton.addEventListener('click', () =>
			this.events.emit('cardBasket:deleteItem', { card: this })
		);
	}

	set index(value: number) {
		this.cardIndex.textContent = value.toString();
	}
}
