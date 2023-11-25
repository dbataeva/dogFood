import { Product, Review, User } from '../types';

export type UpdateUser = Pick<User, 'name' | 'about'>;

export type Products = {
	total: number;
	products: Product[];
};

export type ChangeLikeProductStatus = {
	productId: Product['_id'];
	like: boolean;
};

export type AddNewProductRequest = Pick<
	Product,
	'name' | 'price' | 'discount' | 'pictures' | 'stock' | 'description'
>;

export type ErrorResponse = {
	data: {
		message: string;
		err: {
			statusCode: number;
		};
	};
	status: number;
};

export type PaginatedProductsRequest = {
	page: number;
	query?: string;
};

export type AddReviewRequest = {
	productId: Product['_id'];
	review: Partial<Review>;
};

export type ReviewFormType = {
	rating: number;
	text: string;
};

export type DeleteReviewRequest = {
	productId: Product['_id'];
	reviewId: Review['_id'];
};
