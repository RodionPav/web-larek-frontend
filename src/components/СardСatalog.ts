import { IProduct } from '../types';
import { Component } from './base/Component';
import { IEvents } from './base/events';


export class СardСatalog extends Component<IProduct> {
	protected events: IEvents;
	protected cardImage: HTMLImageElement;
	protected cardTitle: HTMLElement;
	protected cardCategory: HTMLElement;
	protected cardPrice: HTMLElement;
	protected cardId: string;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);

		this.events = events;
		this.cardImage = this.container.querySelector('.card__image');
		this.cardTitle = this.container.querySelector('.card__title');
		this.cardCategory = this.container.querySelector('.card__category');
		this.cardPrice = this.container.querySelector('.card__price');
		this.container.addEventListener('click', () =>
			this.events.emit('cardPreview:open', { card: this })
		);
	}
	set image(src: string) {
		this.cardImage.src = src;
	}

	set title(title: string) {
		this.cardTitle.textContent = title;
	}

	set price(price: string) {
		this.cardPrice.textContent = `${price} синапсов`;
	}

	set category(category: string) {
		this.cardCategory.textContent = category;
	}

	set id(id) {
		this.cardId = id;
	}
	get id() {
		return this.cardId;
	}
}
