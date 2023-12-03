import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import * as router from 'react-router';
import ReactTestRenderer from 'react-test-renderer';

import { HEADER_TEST_ID_MAP } from './constants';
import { testProvidersFn } from '../../../testProviders';
import { Header } from './Header.component';

describe('Компонент Header', () => {
	it('должен рендериться', () => {
		testProvidersFn();
		expect(screen.getByTestId(HEADER_TEST_ID_MAP.header)).toBeInTheDocument();
	});

	describe('компоненты внутри Header', () => {
		describe('Logo', () => {
			it('должно рендериться', () => {
				testProvidersFn();
				expect(screen.getByTestId(HEADER_TEST_ID_MAP.logo)).toBeInTheDocument();
			});

			it('должен быть переход на главную страницу при клике на лого', () => {
				const navigate = jest.fn();

				jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
				testProvidersFn('/basket', true);

				const logo = screen.getByTestId(HEADER_TEST_ID_MAP.logo);

				userEvent.click(logo);

				waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
			});
		});

		describe('строка поиска', () => {
			it('должна рендериться на главной странице', () => {
				testProvidersFn('/', true);
				expect(
					screen.getByTestId(HEADER_TEST_ID_MAP.searchBar)
				).toBeInTheDocument();
			});

			it('должна отсутствовать на странице регистрации', () => {
				testProvidersFn('/signUp');
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.searchBar)
				).not.toBeInTheDocument();
			});

			it('должна отсутствовать на странице входа', () => {
				testProvidersFn('/signIn');
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.searchBar)
				).not.toBeInTheDocument();
			});

			it('должна отсутствовать на странице детальной карточки продукта', () => {
				testProvidersFn('/products/123', true);
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.searchBar)
				).not.toBeInTheDocument();
			});

			it('должна отсутствовать на странице избранных продуктво', () => {
				testProvidersFn('/products/favorite', true);
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.searchBar)
				).not.toBeInTheDocument();
			});

			it('должна отсутствовать на странице детальной карточки пользователя', () => {
				testProvidersFn('/users/me', true);
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.searchBar)
				).not.toBeInTheDocument();
			});

			it('должна отсутствовать на странице корзины', () => {
				testProvidersFn('/basket', true);
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.searchBar)
				).not.toBeInTheDocument();
			});

			it('должна отсутствовать на странице ошибки', () => {
				testProvidersFn('/qqq');
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.searchBar)
				).not.toBeInTheDocument();
			});
		});

		describe('иконки навигации', () => {
			it('должны рендериться на главной странице', () => {
				testProvidersFn('/', true);
				expect(
					screen.getByTestId(HEADER_TEST_ID_MAP.navIcons)
				).toBeInTheDocument();
			});

			it('должны отсутствовать на странице регистрации', () => {
				testProvidersFn('/signUp');
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.navIcons)
				).not.toBeInTheDocument();
			});

			it('должны отсутствовать на странице входа', () => {
				testProvidersFn('/signIn');
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.navIcons)
				).not.toBeInTheDocument();
			});

			it('должны рендериться на странице детальной карточки продукта', () => {
				testProvidersFn('/products/123', true);
				expect(
					screen.getByTestId(HEADER_TEST_ID_MAP.navIcons)
				).toBeInTheDocument();
			});

			it('должны рендериться на странице избранных продуктво', () => {
				testProvidersFn('/products/favorite', true);
				expect(
					screen.getByTestId(HEADER_TEST_ID_MAP.navIcons)
				).toBeInTheDocument();
			});

			it('должны рендериться на странице детальной карточки пользователя', () => {
				testProvidersFn('/users/me', true);
				expect(
					screen.getByTestId(HEADER_TEST_ID_MAP.navIcons)
				).toBeInTheDocument();
			});

			it('должны рендериться на странице корзины', () => {
				testProvidersFn('/basket', true);
				expect(
					screen.getByTestId(HEADER_TEST_ID_MAP.navIcons)
				).toBeInTheDocument();
			});

			it('должны отсутствовать на странице ошибки', () => {
				testProvidersFn('/qqq');
				expect(
					screen.queryByTestId(HEADER_TEST_ID_MAP.navIcons)
				).not.toBeInTheDocument();
			});
		});
	});

	describe("должен соответствовать snapshot'ам", () => {
		beforeEach(() => {
			const navigate = jest.fn();

			jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
		});

		it("должен соответствовать snapshot'у на странице авторизации", () => {
			jest.spyOn(router, 'useLocation').mockReturnValue({
				hash: '',
				key: 'signUp',
				pathname: '/signUp',
				search: '',
				state: null,
			});

			const tree = ReactTestRenderer.create(<Header />).toJSON();

			expect(tree).toMatchSnapshot();
		});

		it("должен соответствовать snapshot'у на странице входа в приложение", () => {
			jest.spyOn(router, 'useLocation').mockReturnValue({
				hash: '',
				key: 'signIn',
				pathname: '/signIn',
				search: '',
				state: null,
			});

			const tree = ReactTestRenderer.create(<Header />).toJSON();

			expect(tree).toMatchSnapshot();
		});

		it("должен соответствовать snapshot'у на главной странице", () => {
			jest.spyOn(router, 'useLocation').mockReturnValue({
				hash: '',
				key: 'default',
				pathname: '/',
				search: '',
				state: null,
			});

			const tree = ReactTestRenderer.create(<Header />).toJSON();

			expect(tree).toMatchSnapshot();
		});

		it("должен соответствовать snapshot'у на детальной странице продукта", () => {
			jest.spyOn(router, 'useLocation').mockReturnValue({
				hash: '',
				key: 'default',
				pathname: '/products/123',
				search: '',
				state: null,
			});

			const tree = ReactTestRenderer.create(<Header />).toJSON();

			expect(tree).toMatchSnapshot();
		});

		it("должен соответствовать snapshot'у на странице избранных продуктов", () => {
			jest.spyOn(router, 'useLocation').mockReturnValue({
				hash: '',
				key: 'default',
				pathname: '/products/favorite',
				search: '',
				state: null,
			});

			const tree = ReactTestRenderer.create(<Header />).toJSON();

			expect(tree).toMatchSnapshot();
		});

		it("должен соответствовать snapshot'у на странице пользователя", () => {
			jest.spyOn(router, 'useLocation').mockReturnValue({
				hash: '',
				key: 'default',
				pathname: '/users/me',
				search: '',
				state: null,
			});

			const tree = ReactTestRenderer.create(<Header />).toJSON();

			expect(tree).toMatchSnapshot();
		});

		it("должен соответствовать snapshot'у на странице корзины", () => {
			jest.spyOn(router, 'useLocation').mockReturnValue({
				hash: '',
				key: 'default',
				pathname: '/basket',
				search: '',
				state: null,
			});

			const tree = ReactTestRenderer.create(<Header />).toJSON();

			expect(tree).toMatchSnapshot();
		});
	});
});
