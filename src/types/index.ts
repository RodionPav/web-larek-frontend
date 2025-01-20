export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
	index?: number;
	disable?: boolean;
}

export interface IProductsData {
	setProducts(items: IProduct[]): void;
	getProducts(): IProduct[];
	getProduct(id: string): IProduct;
}

export interface IOrder {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IOrderData {
	addProduct(product: IProduct): void;
	deleteProduct(id: string): void;
	getItems(): IProduct[];
	getLength(): number;
	getTotalPrice(): number;
	getOrderByKey(key: keyof IOrder): string;
	getOrderInfo(): IOrder;
	setOrderField(field: keyof IOrder, value: string): void;
	validateOrder(field: keyof IOrder): boolean;
	clearOrder(): void;
}

export type TotalOrderInfo = { total: number }; // !!!

export type TOrderPayInfo = Pick<IOrder, 'payment' | 'address'>;

export type TUserContactsInfo = Pick<IOrder, 'email' | 'phone'>; 

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export type FormErrors = Partial<Record<keyof IOrder, string>>;
