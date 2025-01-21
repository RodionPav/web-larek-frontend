import { IProduct } from '../types';
import { IEvents } from './base/events';
import { Card } from './common/Card';

export class СardСatalog<T> extends Card<IProduct> {
	protected cardImage: HTMLImageElement;
	protected cardCategory: HTMLElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);

		this.cardImage = this.container.querySelector('.card__image');
		this.cardCategory = this.container.querySelector('.card__category');
		this.container.addEventListener('click', () =>
			this.events.emit('cardPreview:open', { card: this })
		);
	}
	set image(src: string) {
		this.cardImage.src = src;
	}

	set category(category: string) {
		this.cardCategory.textContent = category;
	}
}
