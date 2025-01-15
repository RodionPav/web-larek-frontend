export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export interface IProductsData {
	items: IProduct[];
	preview: string | null;
	setProducts(items: IProduct[]): void;
	getProducts(): IProduct[];
	getProduct(id: string): IProduct;
}

export interface ICartData {
	products: IProduct[];
	total: TCartTotal;
	getTotalPrice(): TCartTotal;
	getCartList(): IProduct[];
	addProduct: (product: IProduct) => void;
	deleteProduct: (id: string) => void;
	clearCart: () => void;
}

export interface IUser {
	payment: string;
	address: string;
	email: string;
	phone: string;
	total: number;
	items: [];
}

export interface IUserData {
	setOrderInfo(UserData: IUser): void;
	setContactsInfo(UserData: IUser): void;
	checkOrderValidation(data: Record<keyof TUserOrderInfo, string>): boolean;
	checkContactsValidation(data: Record<keyof TUserContactsInfo, string>): boolean; 
	clearUser(): void;
}

export type TCartTotal = Pick<IUser, 'total'>;

export type TUserOrderInfo = Pick<IUser, 'payment' | 'address'>;

export type TUserContactsInfo = Pick<IUser, 'email' | 'phone'>;
