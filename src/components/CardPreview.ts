import { IProduct } from '../types';
import { IEvents } from './base/events';
import { СardСatalog } from './СardСatalog';

export class CardPreview extends СardСatalog<IProduct> {
	protected cardDescription: HTMLElement;
	protected buyButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this.cardDescription = this.container.querySelector('.card__text');
		this.buyButton = this.container.querySelector('.card__button');

		this.buyButton.addEventListener('click', () =>
			this.events.emit('buyButton:buyItem', { card: this })
		);
	}

	render(data: Partial<IProduct>, disable?: boolean) {
		if (disable) {
			super.disableBasketButton(this.buyButton);
		} else super.unDisableBasketButton(this.buyButton);
		return super.render(data);
	}

	set description(description: string) {
		this.cardDescription.textContent = description;
	}
}
