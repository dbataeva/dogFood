import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import ReactTestRenderer from 'react-test-renderer';

import * as productsApi from '../../../../api/productsApi';
import { TEST_ID_MAP } from './testIdMap';
import { TestProvidersFC, testProvidersFn } from '../../../testProviders';
import * as appStore from '../../../store/appStore';
import { ProductReviews } from './ProductReviews.component';

const mockedProductWithoutReview = {
	discount: 0,
	stock: 10,
	available: true,
	pictures: 'https://react-learning.ru/image-compressed/12.jpg',
	likes: ['64107e09aa397121838f2926'],
	reviews: [],
	tags: [],
	isPublished: true,
	_id: '456',
	name: 'Печенья с яблоком (печень говяжья, сердце)',
	author: {
		name: 'Максим',
		about: 'Ментор',
		avatar:
			'https://nankeluxuryhomesprescott.com/wp-content/uploads/2019/03/PlaceholderImageMale.jpg',
		_id: '622bd81b06c7d323b8ae4614',
		email: 'someEmail@inbox.ru',
		__v: 0,
	},
	price: 340,
	wight: '14 шт',
	description: 'Описание demo',
	created_at: '2022-03-12T10:38:04.499Z',
	updated_at: '2023-11-19T13:16:33.364Z',
	__v: 0,
};

const mockedProductWithCurrentUserReview = {
	discount: 0,
	stock: 10,
	available: true,
	pictures: 'https://react-learning.ru/image-compressed/12.jpg',
	likes: ['64107e09aa397121838f2926'],
	reviews: [
		{
			rating: 5,
			_id: '645182088fbc473fa8a23e42',
			text: 'Понравилось',
			author: {
				name: 'Александр Филимонов',
				about: 'Frontend10-student',
				avatar:
					'https://images.unsplash.com/photo-1552944150-6dd1180e5999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
				_id: '123',
				email: 'somaEmail.av@ya.ru',
				group: 'group-10',
				__v: 0,
			},
			product: '622c780c77d63f6e70967d27',
			created_at: '2023-05-02T21:35:04.343Z',
			updated_at: '2023-05-02T21:35:04.343Z',
			__v: 0,
		},
	],
	tags: [],
	isPublished: true,
	_id: '456',
	name: 'Печенья с яблоком (печень говяжья, сердце)',
	author: {
		name: 'Максим',
		about: 'Ментор',
		avatar:
			'https://nankeluxuryhomesprescott.com/wp-content/uploads/2019/03/PlaceholderImageMale.jpg',
		_id: '622bd81b06c7d323b8ae4614',
		email: 'someEmail@inbox.ru',
		__v: 0,
	},
	price: 340,
	wight: '14 шт',
	description: 'Описание demo',
	created_at: '2022-03-12T10:38:04.499Z',
	updated_at: '2023-11-19T13:16:33.364Z',
	__v: 0,
};

const mockedProductWithAnotherUserReview = {
	discount: 0,
	stock: 10,
	available: true,
	pictures: 'https://react-learning.ru/image-compressed/12.jpg',
	likes: ['64107e09aa397121838f2926'],
	reviews: [
		{
			rating: 3,
			_id: '645182088fbc473fa8a23e41',
			text: 'Не понравилось',
			author: {
				name: 'Александра Филимонова',
				about: 'Frontend10-student',
				avatar:
					'https://images.unsplash.com/photo-1552944150-6dd1180e5999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
				_id: '63fdee524ee419975fbd29e3',
				email: 'someEmail.av@ya.ru',
				group: 'group-10',
				__v: 0,
			},
			product: '622c780c77d63f6e70967d27',
			created_at: '2023-05-02T21:35:04.343Z',
			updated_at: '2023-05-02T21:35:04.343Z',
			__v: 0,
		},
	],
	tags: [],
	isPublished: true,
	_id: '456',
	name: 'Печенья с яблоком (печень говяжья, сердце)',
	author: {
		name: 'Максим',
		about: 'Ментор',
		avatar:
			'https://nankeluxuryhomesprescott.com/wp-content/uploads/2019/03/PlaceholderImageMale.jpg',
		_id: '622bd81b06c7d323b8ae4614',
		email: 'someEmail@inbox.ru',
		__v: 0,
	},
	price: 340,
	wight: '14 шт',
	description: 'Описание demo',
	created_at: '2022-03-12T10:38:04.499Z',
	updated_at: '2023-11-19T13:16:33.364Z',
	__v: 0,
};

const productIdWIthNumberOfReview = '456';

const mockedProductWithNumberOfReview = {
	discount: 0,
	stock: 10,
	available: true,
	pictures: 'https://react-learning.ru/image-compressed/12.jpg',
	likes: ['64107e09aa397121838f2926'],
	reviews: [
		{
			rating: 3,
			_id: '645182088fbc473fa8a23e41',
			text: 'Не понравилось',
			author: {
				name: 'Александра Филимонова',
				about: 'Frontend10-student',
				avatar:
					'https://images.unsplash.com/photo-1552944150-6dd1180e5999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
				_id: '63fdee524ee419975fbd29e3',
				email: 'someEmail.av@ya.ru',
				group: 'group-10',
				__v: 0,
			},
			product: '622c780c77d63f6e70967d27',
			created_at: '2023-05-02T21:35:04.343Z',
			updated_at: '2023-05-02T21:35:04.343Z',
			__v: 0,
		},
		{
			rating: 3,
			_id: '645182088fbc473fa8a23e41',
			text: 'Не понравилось',
			author: {
				name: 'Александра Филимонова',
				about: 'Frontend10-student',
				avatar:
					'https://images.unsplash.com/photo-1552944150-6dd1180e5999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
				_id: '63fdee524ee419975fbd29e3',
				email: 'someEmail.av@ya.ru',
				group: 'group-10',
				__v: 0,
			},
			product: '622c780c77d63f6e70967d27',
			created_at: '2023-05-02T21:35:04.343Z',
			updated_at: '2023-05-02T21:35:04.343Z',
			__v: 0,
		},
	],
	tags: [],
	isPublished: true,
	_id: productIdWIthNumberOfReview,
	name: 'Печенья с яблоком (печень говяжья, сердце)',
	author: {
		name: 'Максим',
		about: 'Ментор',
		avatar:
			'https://nankeluxuryhomesprescott.com/wp-content/uploads/2019/03/PlaceholderImageMale.jpg',
		_id: '622bd81b06c7d323b8ae4614',
		email: 'someEmail@inbox.ru',
		__v: 0,
	},
	price: 340,
	wight: '14 шт',
	description: 'Описание demo',
	created_at: '2022-03-12T10:38:04.499Z',
	updated_at: '2023-11-19T13:16:33.364Z',
	__v: 0,
};

describe('Отзывы о продукте', () => {
	beforeEach(() => {
		jest.spyOn(appStore, 'selectUser').mockReturnValue({
			isLoading: false,
			error: null,
			currentUser: {
				name: 'Александр Филимонов',
				about: 'Frontend10-student',
				avatar:
					'https://images.unsplash.com/photo-1552944150-6dd1180e5999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80',
				_id: '123',
				email: 'somaEmail.av@ya.ru',
				group: 'group-10',
				__v: 0,
			},
		});
	});

	it('должны рендериться', () => {
		jest.spyOn(productsApi, 'useGetProductByIdQuery').mockReturnValue({
			isLoading: false,
			error: undefined,
			isError: false,
			data: mockedProductWithoutReview,
			refetch: jest.fn(),
		});

		testProvidersFn('/products/123', true);

		expect(screen.getByTestId(TEST_ID_MAP.reviewsList)).toBeInTheDocument();
	});

	it('должно рендериться соответствующее кол-во отзывов', () => {
		jest.spyOn(productsApi, 'useGetProductByIdQuery').mockReturnValue({
			isLoading: false,
			error: undefined,
			isError: false,
			data: mockedProductWithNumberOfReview,
			refetch: jest.fn(),
		});

		testProvidersFn('/products/123', true);

		expect(screen.getAllByTestId(TEST_ID_MAP.review).length).toEqual(
			mockedProductWithNumberOfReview.reviews.length
		);
	});

	describe('удаление отзыва', () => {
		it('должно быть доступно, если отзыв принадлежит текущему пользователю', () => {
			jest.spyOn(productsApi, 'useGetProductByIdQuery').mockReturnValue({
				isLoading: false,
				error: undefined,
				isError: false,
				data: mockedProductWithCurrentUserReview,
				refetch: jest.fn(),
			});

			testProvidersFn('/products/123', true);

			expect(
				screen.getByTestId(TEST_ID_MAP.deleteReviewButton)
			).toBeInTheDocument();
		});

		it('должно быть недоступно, если отзыв принадлежит другому пользователю', () => {
			jest.spyOn(productsApi, 'useGetProductByIdQuery').mockReturnValue({
				isLoading: false,
				error: undefined,
				isError: false,
				data: mockedProductWithAnotherUserReview,
				refetch: jest.fn(),
			});

			testProvidersFn('/products/123', true);

			expect(
				screen.queryByTestId(TEST_ID_MAP.deleteReviewButton)
			).not.toBeInTheDocument();
		});

		it('должен удаляться отзыв при клике на кнопку удаления', () => {
			const deleteReview = jest.fn();

			jest
				.spyOn(productsApi, 'useDeleteReviewMutation')
				.mockReturnValue([deleteReview, {} as any]);

			jest.spyOn(productsApi, 'useGetProductByIdQuery').mockReturnValue({
				isLoading: false,
				error: undefined,
				isError: false,
				data: mockedProductWithCurrentUserReview,
				refetch: jest.fn(),
			});

			testProvidersFn('/products/123', true);

			const deleteReviewButton = screen.getByTestId(
				TEST_ID_MAP.deleteReviewButton
			);

			userEvent.click(deleteReviewButton);

			waitFor(() => expect(deleteReview).toHaveBeenCalled());
		});
	});

	it("должен соответствовать snapshot'у", () => {
		const tree = ReactTestRenderer.create(
			<TestProvidersFC>
				<ProductReviews
					productId={productIdWIthNumberOfReview}
					reviews={mockedProductWithNumberOfReview.reviews}
				/>
			</TestProvidersFC>
		).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
