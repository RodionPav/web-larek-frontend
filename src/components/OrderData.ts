import { IOrder, IProduct, FormErrors, IOrderData } from '../types';
import { IEvents } from './base/events';

export class OrderData implements IOrderData {
	// protected payment: string;
	// protected address: string;
	// protected email: string;
	// protected phone: string;
	protected order: IOrder = {
		email: '',
		phone: '',
		address: '',
		payment: 'card',
	};
	protected items: IProduct[] = [];
	protected formErrors: FormErrors = {};
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	addProduct(product: IProduct) {
		// if (this.items.find((item) => item.id !== product.id)) {
		// 	this.items = [product, ...this.items];
		// 	this.events.emit('order:change');
		// }
		this.items = [product, ...this.items];
		this.events.emit('order:change', { card: product });
	}

	deleteProduct(id: string) {
		this.items = this.items.filter((item) => item.id !== id);
		this.events.emit('order:change');
	}

	getItems() {
		return this.items;
	}

	getLength() {
		return this.items.length;
	}

	getTotalPrice() {
		return this.items.reduce((sum, product) => sum + product.price, 0);
	}

	getOrderByKey(key: keyof IOrder) {
		return this.order[key];
	}

	getOrderInfo(): IOrder {
		return {
			payment: this.order.payment,
			address: this.order.address,
			email: this.order.email,
			phone: this.order.phone,
		};
	}

	setOrderField(field: keyof IOrder, value: string) {
		if (field === 'payment') {
			this.order[field] = value;
			this.events.emit('payment:change', { value: value });
		} else {
			this.order[field] = value;
		}
		if (this.validateOrder(field)) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder(field: keyof IOrder) {
		const errors: typeof this.formErrors = {};
		if (field === 'address' || field === 'payment') {
			if (!this.order.address) {
				errors.address = 'Необходимо указать адресс';
			}
			this.events.emit('payFormErrors:change', errors);
		} else {
			if (!this.order.email) {
				errors.email = 'Необходимо указать email';
			}
			if (!this.order.phone) {
				errors.phone = 'Необходимо указать телефон';
			}
			this.events.emit('contactFormErrors:change', errors);
		}
		this.events.emit('formErrors:change', errors);
		return Object.keys(errors).length === 0;
	}

	clearOrder() {
		this.order.payment = 'card';
		this.order.address = null;
		this.order.email = null;
		this.order.phone = null;
		this.items = [];
		this.events.emit('order:change');
	}
}
