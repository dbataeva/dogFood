import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';

import { PAGES_TEST_ID_MAP } from './constants';
import { testProvidersFn } from '../../testProviders';
import * as productsApi from '../../../api/productsApi';
import * as getFavoriteProducts from '../../hooks/useGetFavoriteProducts';
import * as productsList from '../../hooks/useProductsList';

const mockedProduct = {
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
	weight: '14 шт',
	description: 'Описание demo',
	created_at: '2022-03-12T10:38:04.499Z',
	updated_at: '2023-11-19T13:16:33.364Z',
	__v: 0,
};

describe('Роутер', () => {
	it('должен рендерить страницу singIn для неавторизованного пользователя', () => {
		testProvidersFn();
		expect(
			screen.getByTestId(PAGES_TEST_ID_MAP.signInPage)
		).toBeInTheDocument();
	});

	it('должен перенаправлять на страницу singUp при клике на предложение авторизоваться на странице входа', () => {
		testProvidersFn();

		const navToSingUp = screen.getByTestId(PAGES_TEST_ID_MAP.navToSingUp);

		userEvent.click(navToSingUp);

		waitFor(() =>
			expect(
				screen.getByTestId(PAGES_TEST_ID_MAP.signUpPage)
			).toBeInTheDocument()
		);
	});

	it('должен перенаправлять на страницу singIn при клике на предложение войти на странице входа', () => {
		testProvidersFn('/signUp');

		const navToSingIn = screen.getByTestId(PAGES_TEST_ID_MAP.navToSingIn);

		userEvent.click(navToSingIn);

		waitFor(() =>
			expect(
				screen.getByTestId(PAGES_TEST_ID_MAP.signInPage)
			).toBeInTheDocument()
		);
	});

	it('должен перенаправлять на страницу singIn после успешной авторизации', () => {
		testProvidersFn('/signUp');

		const groupTextField = screen.getByTestId(PAGES_TEST_ID_MAP.groupTextField);
		const emailTextField = screen.getByTestId(PAGES_TEST_ID_MAP.emailTextField);
		const passwordTextField = screen.getByTestId(
			PAGES_TEST_ID_MAP.passwordTextField
		);
		const submitButton = screen.getByTestId(PAGES_TEST_ID_MAP.submitButton);

		userEvent.type(groupTextField, 'sb-3');
		userEvent.type(emailTextField, 'some_email@gmail.com');
		userEvent.type(passwordTextField, '12345678');
		userEvent.click(submitButton);

		waitFor(() =>
			expect(
				screen.getByTestId(PAGES_TEST_ID_MAP.signInPage)
			).toBeInTheDocument()
		);
	});

	it('должен перенаправлять на главную страницу со страницы singIn после успешного входа', () => {
		testProvidersFn();

		const emailTextField = screen.getByTestId(PAGES_TEST_ID_MAP.emailTextField);
		const passwordTextField = screen.getByTestId(
			PAGES_TEST_ID_MAP.passwordTextField
		);
		const submitButton = screen.getByTestId(PAGES_TEST_ID_MAP.submitButton);

		userEvent.type(emailTextField, 'some_email@gmail.com');
		userEvent.type(passwordTextField, '12345678');
		userEvent.click(submitButton);

		waitFor(() =>
			expect(screen.getByTestId(PAGES_TEST_ID_MAP.homePage)).toBeInTheDocument()
		);
	});

	it('должен перенаправлять на первоначальную страницу со страницы singIn после успешного входа', () => {
		testProvidersFn('/users/me');

		const emailTextField = screen.getByTestId(PAGES_TEST_ID_MAP.emailTextField);
		const passwordTextField = screen.getByTestId(
			PAGES_TEST_ID_MAP.passwordTextField
		);
		const submitButton = screen.getByTestId(PAGES_TEST_ID_MAP.submitButton);

		userEvent.type(emailTextField, 'some_email@gmail.com');
		userEvent.type(passwordTextField, '12345678');
		userEvent.click(submitButton);

		waitFor(() =>
			expect(screen.getByTestId(PAGES_TEST_ID_MAP.userPage)).toBeInTheDocument()
		);
	});

	it('должен перенаправлять на страницу продукта с главной страницы при клике на мини-карточку продукта', () => {
		jest.spyOn(productsList, 'useProductsList').mockReturnValue({
			isLoading: false,
			error: undefined,
			isError: false,
			refetch: jest.fn(),
			data: { total: 1, products: [mockedProduct] },
			isLastPage: true,
			onScrollEnd: jest.fn(),
		});

		testProvidersFn('/', true);

		const productMiniCard = screen.getByTestId(
			PAGES_TEST_ID_MAP.productMiniCard
		);

		userEvent.click(productMiniCard);

		waitFor(() =>
			expect(
				screen.getByTestId(PAGES_TEST_ID_MAP.productPage)
			).toBeInTheDocument()
		);
	});

	it('должен рендерить страницу NotFound при переходе не несуществующий роут', () => {
		testProvidersFn('/balbalbla', true);
		expect(
			screen.getByTestId(PAGES_TEST_ID_MAP.notFoundPage)
		).toBeInTheDocument();
	});

	it('должен перенаправлять на страницу продукта со страницы избранных продуктов при клике на мини-карточку продука', () => {
		jest.spyOn(getFavoriteProducts, 'useGetFavoriteProducts').mockReturnValue({
			isLoading: false,
			error: undefined,
			isError: false,
			refetch: jest.fn(),
			numberOfFavoriteProducts: 1,
			favoriteProducts: [mockedProduct],
		});

		testProvidersFn('/products/favorite', true);

		const productMiniCard = screen.getByTestId(
			PAGES_TEST_ID_MAP.productMiniCard
		);

		userEvent.click(productMiniCard);

		waitFor(() =>
			expect(
				screen.getByTestId(PAGES_TEST_ID_MAP.productPage)
			).toBeInTheDocument()
		);
	});

	it('должен перенаправлять на предыдущую страницу со страницы продукта при клике на кнопку Назад, если в истории есть предыдущая страница', () => {
		jest.spyOn(getFavoriteProducts, 'useGetFavoriteProducts').mockReturnValue({
			isLoading: false,
			error: undefined,
			isError: false,
			refetch: jest.fn(),
			numberOfFavoriteProducts: 1,
			favoriteProducts: [mockedProduct],
		});

		jest.spyOn(productsApi, 'useGetProductByIdQuery').mockReturnValue({
			isLoading: false,
			error: undefined,
			isError: false,
			data: mockedProduct,
			refetch: jest.fn(),
		});

		testProvidersFn('/products/favorite', true);

		const productMiniCard = screen.getByTestId(
			PAGES_TEST_ID_MAP.productMiniCard
		);

		userEvent.click(productMiniCard);

		waitFor(() => {
			const goBackButton = screen.getByTestId(PAGES_TEST_ID_MAP.goBackButton);

			userEvent.click(goBackButton);
			expect(
				screen.getByTestId(PAGES_TEST_ID_MAP.favoritePage)
			).toBeInTheDocument();
		});
	});

	it('должен перенаправлять на главную страницу со страницы продукта при клике на кнопку Назад, если нет предыдущей страницы в истории', () => {
		jest.spyOn(productsApi, 'useGetProductByIdQuery').mockReturnValue({
			isLoading: false,
			error: undefined,
			isError: false,
			data: mockedProduct,
			refetch: jest.fn(),
		});

		testProvidersFn('/products/456', true);

		const goBackButton = screen.getByTestId(PAGES_TEST_ID_MAP.goBackButton);

		userEvent.click(goBackButton);

		waitFor(() =>
			expect(screen.getByTestId(PAGES_TEST_ID_MAP.userPage)).toBeInTheDocument()
		);
	});
});
