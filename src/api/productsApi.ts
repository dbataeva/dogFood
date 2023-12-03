import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL, LOCAL_STORAGE_TOKEN_KEY } from './api';
import {
	AddNewProductRequest,
	AddReviewRequest,
	ChangeLikeProductStatus,
	DeleteProductRequest,
	DeleteReviewRequest,
	PaginatedProductsRequest,
	Products,
} from './types';
import { Product } from '../types';

const ITEMS_ON_PAGE = 12;

export const productsApi = createApi({
	reducerPath: 'productsApi',
	tagTypes: ['Products'],
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({
		getProducts: builder.query<Products, void>({
			query: () => ({
				url: 'products',
			}),
			providesTags: (result) =>
				result
					? [
							...result.products.map(({ _id }) => ({
								type: 'Products' as const,
								id: _id,
							})),
							{ type: 'Products', id: 'PARTIAL-LIST' },
					  ]
					: [{ type: 'Products', id: 'PARTIAL-LIST' }],
		}),

		getPaginatedProducts: builder.query<Products, PaginatedProductsRequest>({
			query: ({ page, query = '' }) => ({
				url: `products?page=${page}&limit=${ITEMS_ON_PAGE}&query=${query}`,
			}),
			providesTags: (result) =>
				result
					? [
							...result.products.map(({ _id }) => ({
								type: 'Products' as const,
								id: _id,
							})),
							{ type: 'Products', id: 'PARTIAL-LIST' },
					  ]
					: [{ type: 'Products', id: 'PARTIAL-LIST' }],
			serializeQueryArgs: ({ endpointName, queryArgs: { query } }) => {
				return endpointName + query;
			},
			merge: (currentCache, newItems, { arg: { page } }) => {
				page > 1 && currentCache?.products.push(...newItems.products);
			},
			forceRefetch({ currentArg, previousArg }) {
				return currentArg !== previousArg;
			},
		}),

		changeLikeStatus: builder.mutation<Product, ChangeLikeProductStatus>({
			query: (args) => ({
				url: `products/likes/${args.productId}`,
				method: args.like ? 'DELETE' : 'PUT',
			}),

			async onQueryStarted(
				{ productId, like, pageNumber, searchByValue, currentUserId },
				{ dispatch, queryFulfilled }
			) {
				const getPaginatedProductsPatchResult = dispatch(
					productsApi.util.updateQueryData(
						'getPaginatedProducts',
						{ page: pageNumber!, query: searchByValue },
						(cachedProducts) => {
							cachedProducts.products.forEach((product) => {
								if (product._id === productId) {
									like
										? (product.likes = product.likes.filter(
												(like) => like !== currentUserId
										  ))
										: product.likes.push(currentUserId!);
								}
							});
						}
					)
				);

				const getProductsPatchResult = dispatch(
					productsApi.util.updateQueryData(
						'getProducts',
						undefined,
						(cachedProducts) => {
							cachedProducts.products.forEach((product) => {
								if (product._id === productId) {
									like
										? (product.likes = product.likes.filter(
												(like) => like !== currentUserId
										  ))
										: product.likes.push(currentUserId!);
								}
							});
						}
					)
				);

				const getProductByIdPatchResult = dispatch(
					productsApi.util.updateQueryData(
						'getProductById',
						productId,
						(cachedProduct) => {
							like
								? (cachedProduct.likes = cachedProduct.likes.filter(
										(like) => like !== currentUserId
								  ))
								: cachedProduct.likes.push(currentUserId!);
						}
					)
				);

				try {
					await queryFulfilled;
				} catch {
					getPaginatedProductsPatchResult.undo();
					getProductsPatchResult.undo();
					getProductByIdPatchResult.undo();
				}
			},
		}),

		getProductById: builder.query<Product, string | undefined>({
			query: (productId) => ({
				url: `products/${productId}`,
			}),
			providesTags: (result) => [{ type: 'Products', id: result?._id }],
		}),

		deleteProduct: builder.mutation<Product, DeleteProductRequest>({
			query: (args) => ({
				url: `products/${args.productId}`,
				method: 'DELETE',
			}),

			invalidatesTags: (result) => [{ type: 'Products', id: result?._id }],

			async onQueryStarted(
				{ productId, pageNumber, searchByValue },
				{ dispatch, queryFulfilled }
			) {
				try {
					await queryFulfilled;

					dispatch(
						productsApi.util.updateQueryData(
							'getPaginatedProducts',
							{ page: pageNumber!, query: searchByValue },
							(cachedProducts) => {
								cachedProducts.total -= 1;
								cachedProducts.products = cachedProducts.products.filter(
									(product) => product._id !== productId
								);
							}
						)
					);

					dispatch(
						productsApi.util.updateQueryData(
							'getProducts',
							undefined,
							(cachedProducts) => {
								cachedProducts.total -= 1;
								cachedProducts.products = cachedProducts.products.filter(
									(product) => product._id !== productId
								);
							}
						)
					);
				} catch {}
			},
		}),

		addReview: builder.mutation<Product, AddReviewRequest>({
			query: ({ productId, review }) => ({
				url: `/products/review/${productId}`,
				body: review,
				method: 'POST',
			}),
			invalidatesTags: (result) => [{ type: 'Products', id: result?._id }],
		}),

		deleteReview: builder.mutation<Product, DeleteReviewRequest>({
			query: ({ productId, reviewId }) => ({
				url: `/products/review/${productId}/${reviewId}`,
				method: 'DELETE',
			}),
			invalidatesTags: (result) => [{ type: 'Products', id: result?._id }],
		}),

		addProduct: builder.mutation<Product, AddNewProductRequest>({
			query: (newProductData) => ({
				url: 'products',
				method: 'POST',
				body: newProductData,
			}),
			invalidatesTags: [{ type: 'Products', id: 'PARTIAL-LIST' }],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useAddReviewMutation,
	useAddProductMutation,
	useGetProductByIdQuery,
	useDeleteReviewMutation,
	useDeleteProductMutation,
	useChangeLikeStatusMutation,
	useGetPaginatedProductsQuery,
} = productsApi;
