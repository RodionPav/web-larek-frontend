import './scss/styles.scss';

import { EventEmitter, IEvents } from './components/base/events';
import { ProductsData } from './components/ProductsData';

import { API_URL, CDN_URL } from './utils/constants';
import { AuctionAPI } from './components/AppApi';
import { Card } from './components/common/Card';
import { cloneTemplate, ensureElement } from './utils/utils';

import { Basket } from './components/Basket';
import { СardСatalog } from './components/СardСatalog';
import { Modal } from './components/base/Modal';
import { CardPreview } from './components/CardPreview';
import { IOrder, IProduct } from './types';
import { OrderData } from './components/OrderData';
import { Page } from './components/Page';
import { CardBasket } from './components/CardBasket';
import { PayForm } from './components/PayForm';
import { ContactsForm } from './components/ContactsForm';
import { Success } from './components/Success';

const events: IEvents = new EventEmitter();

const page = new Page(document.body, events);
const modal = new Modal(document.querySelector('.modal'), events);

const cardСatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const basket = new Basket(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#basket')),
	events
);

const payForm = new PayForm(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#order')),
	events
);
const contactsForm = new ContactsForm(
	cloneTemplate(ensureElement<HTMLTemplateElement>('#contacts')),
	events
);

const productsData = new ProductsData(events);
const orderData = new OrderData(events);

const api = new AuctionAPI(CDN_URL, API_URL);
api
	.getProducts()
	.then((result) => {
		productsData.setProducts(result);
		events.emit('initalData:loaded');
	})
	.catch((err) => {
		console.error(err);
	});

events.on('contacts:submit', () => {
	const order = {
		...orderData.getOrderInfo(),
		total: orderData.getTotalPrice(),
		items: orderData.getItems().map((item) => {
			return item.id;
		}),
	};
	api
		.orderProducts(order)
		.then((result) => {
			const success = new Success(cloneTemplate(successTemplate), events);
			modal.render({
				content: success.render({
					total: result.total,
				}),
			});
		})
		.then(() => {
			orderData.clearOrder();
		})
		.catch((err) => {
			console.error(err);
		});
});

events.on('initalData:loaded', () => {
	const cardsArray = productsData.getProducts().map((card) => {
		const cardСatalog = new СardСatalog(
			cloneTemplate(cardСatalogTemplate),
			events
		);
		return cardСatalog.render(card);
	});
	page.render({ catalog: cardsArray });
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render({}),
	});
});

events.on('cardPreview:open', (data: { card: IProduct }) => {
	const cardPrev = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
	const { card } = data;
	const product = productsData.getProduct(card.id);
	if (orderData.getItems().includes(product)) {
		modal.render({
			content: cardPrev.render(product, true),
		});
	} else {
		modal.render({
			content: cardPrev.render(product, false),
		});
	}
});

events.on('buyButton:buyItem', (data: { card: IProduct }) => {
	const { card } = data;
	const product = productsData.getProduct(card.id);
	orderData.addProduct(product);
	modal.close();
});

events.on('cardBasket:deleteItem', (data: { card: IProduct }) => {
	const { card } = data;
	const product = productsData.getProduct(card.id);
	orderData.deleteProduct(product.id);
});

events.on('order:change', () => {
	const basketList = orderData.getItems().map((item, index) => {
		// const cardBasket = new CardBasket(
		// 	cloneTemplate(cardBasketTemplate),
		// 	{onClick: ()=>{ events.emit(basket:deleteItem, item)}}
		// );
		const cardBasket = new CardBasket(
			cloneTemplate(cardBasketTemplate),
			events
		);
		return cardBasket.render({
			id: item.id,
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});
	basket.render({
		basketItems: basketList,
		basketTotal: orderData.getTotalPrice(),
	});

	page.counter = orderData.getLength();
});

events.on('payForm:open', () => {
	modal.render({
		content: payForm.render({
			address: orderData.getOrderByKey('address'),
			payment: orderData.getOrderByKey('payment'),
			valid: false,
			errors: [],
		}),
	});
});

events.on('paymentButton:click', (data: { payment: string }) => {
	orderData.setOrderField('payment', data.payment);
});

events.on('payment:change', (data: { value: string }) => {
	payForm.togglePayButton(data.value);
});

// Изменилось состояние валидации формы
events.on('payFormErrors:change', (errors: Partial<IOrder>) => {
	const { address } = errors;
	payForm.valid = !address;
	payForm.errors = Object.values({ address })
		.filter((i) => !!i)
		.join('; ');
});

// Изменилось одно из полей в payFormpayFormErrors
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrder; value: string }) => {
		orderData.setOrderField(data.field, data.value);
	}
);

events.on('contactFormErrors:change', (errors: Partial<IOrder>) => {
	const { email, phone } = errors;
	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

// Изменилось одно из полей в contactsForm
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrder; value: string }) => {
		orderData.setOrderField(data.field, data.value);
	}
);

events.on('order:submit', () => {
	modal.render({
		content: contactsForm.render({
			phone: orderData.getOrderByKey('phone'),
			email: orderData.getOrderByKey('email'),
			valid: false,
			errors: [],
		}),
	});
});

events.on('successButton:click', () => {
	modal.close();
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// разблокируем прокрутку страницы если открыта модалка
events.on('modal:close', () => {
	page.locked = false;
});
