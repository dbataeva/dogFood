import { User } from './User';

export type Review = {
	rating: number;
	_id: string;
	text: string;
	author: User;
	product: string;
	created_at: string;
	updated_at: string;
	__v: number;
};

export type Product = {
	available: boolean;
	pictures: string;
	likes: string[];
	reviews: Review[];
	tags: string[];
	isPublished: boolean;
	_id: string;
	name: string;
	author: User;
	price: number;
	discount: number;
	stock: number;
	weight: string;
	description: string;
	created_at: string;
	updated_at: string;
	__v: number;
};

export type ProductInBasket = {
	number: number;
	_id: Product['_id'];
	price: Product['price'];
};
