import { IProductsData, IProduct } from '../types';
import { IEvents } from './base/events';

export class ProductsData implements IProductsData {
	protected items: IProduct[];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	setProducts(items: IProduct[]) {
		this.items = items;
		this.events.emit('initalData:loaded');
	}

	getProducts() {
		return this.items;
	}

	getProduct(id: string) {
		return this.items.find((item) => item.id == id);
	}
}
