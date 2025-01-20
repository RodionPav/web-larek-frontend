import { IOrder, IProduct } from '../types';
import { Api, ApiListResponse } from './base/api';

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IAuctionAPI {
	getProducts: () => Promise<IProduct[]>;
	orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

export class AuctionAPI extends Api implements IAuctionAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	orderProducts(order: IOrder): Promise<IOrderResult> {
		return this.post('/order/', order).then((data: IOrderResult) => data);
	}
}

// getProducts(): Promise<IProduct[]> {
// 	return this._baseApi
// 		.get<IProductList[]>(`/product`)
// 		.then((cards: IProductList[]) => cards.items);
// }

// setOrder(data: IOrder): Promise<IUser> {
// 	return this._baseApi
// 		.post<IOrder>(`/order/`, data, 'POST')
// 		.then((res: IOrder) => res);
// }
