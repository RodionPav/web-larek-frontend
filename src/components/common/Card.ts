import { IProduct } from '../../types';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';

export class Card extends Component<IProduct> {
	protected events: IEvents;
	protected cardImage: HTMLImageElement;
	protected cardTitle: HTMLElement;
	protected cardCategory: HTMLElement;
	protected cardDescription?: HTMLElement;
	protected buyButton?: HTMLButtonElement;
	protected cardPrice: HTMLElement;

	protected cardId: string;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;

		this.cardImage = this.container.querySelector('.card__image');
		this.cardTitle = this.container.querySelector('.card__title');
		this.cardDescription = this.container.querySelector('.card__text');
		this.cardCategory = this.container.querySelector('.card__category');
		this.buyButton = this.container.querySelector('.card__button');
		this.cardPrice = this.container.querySelector('.card__price');

		this.cardImage.addEventListener('click', () =>
			this.events.emit('card:select', { card: this })
		);
	}

	set image(src: string) {
		this.cardImage.src = src;
	}

	set title(title: string) {
		this.cardTitle.textContent = title;
	}

	set description(description: string) {
		this.cardDescription.textContent = description;
	}

	set price(price: string) {
		this.cardPrice.textContent = `${price} синапсов`;
	}

	set category(category: string) {
		this.cardCategory.textContent = category;
	}

	set name(name: string) {
		this.cardTitle.textContent = name;
	}

	set id(id) {
		this.cardId = id;
	}
	get id() {
		return this.cardId;
	}
}
