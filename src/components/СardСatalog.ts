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
		switch (category) {
			case 'софт-скил':
				this.cardCategory.classList.add('card__category_soft');
				break;
			case 'другое':
				this.cardCategory.classList.add('card__category_other');
				break;
			case 'дополнительное':
				this.cardCategory.classList.add('card__category_additional');
				break;
			case 'кнопка':
				this.cardCategory.classList.add('card__category_button');
				break;
			case 'хард-скил':
				this.cardCategory.classList.add('card__category_hard');
				break;
		}
	}
}
