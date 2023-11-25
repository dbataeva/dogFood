import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import * as router from 'react-router';

import { TEST_ID_MAP } from './constants';
import { testProvidersFn } from '../../../testProviders';

describe('Иконки навигации', () => {
	describe('иконка избанных продуктов', () => {
		it('должна рендериться', () => {
			testProvidersFn('/', true);
			expect(screen.getByTestId(TEST_ID_MAP.favorite)).toBeInTheDocument();
		});

		it('должнен быть переход на страницу избранных продуктов при клике на иконку', async () => {
			const navigate = jest.fn();

			jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
			testProvidersFn('/', true);

			const favoriteIcon = screen.getByTestId(TEST_ID_MAP.favorite);

			await userEvent.click(favoriteIcon);
			expect(navigate).toHaveBeenCalledWith('products/favorite');
		});
	});

	describe('иконка корзины', () => {
		it('должна рендериться', () => {
			testProvidersFn('/', true);
			expect(screen.getByTestId(TEST_ID_MAP.basket)).toBeInTheDocument();
		});

		it('должнен быть переход на страницу корзины при клике на иконку', async () => {
			const navigate = jest.fn();

			jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
			testProvidersFn('/', true);

			const basketIcon = screen.getByTestId(TEST_ID_MAP.basket);

			await userEvent.click(basketIcon);

			expect(navigate).toHaveBeenCalledWith('basket');
		});
	});

	describe('иконка личного кабинета пользователя', () => {
		it('должна рендериться', () => {
			testProvidersFn('/', true);
			expect(screen.getByTestId(TEST_ID_MAP.profile)).toBeInTheDocument();
		});

		it('должнен быть переход на страницу личного кабинета пользователя при клике на иконку', async () => {
			const navigate = jest.fn();

			jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
			testProvidersFn('/', true);

			const profileIcon = screen.getByTestId(TEST_ID_MAP.profile);

			await userEvent.click(profileIcon);

			expect(navigate).toHaveBeenCalledWith('users/me');
		});
	});

	describe('иконка выхода из профиля', () => {
		it('должна рендериться', () => {
			testProvidersFn('/', true);
			expect(screen.getByTestId(TEST_ID_MAP.quit)).toBeInTheDocument();
		});

		it('должнен быть переход на страницу входа при клике на иконку', async () => {
			const navigate = jest.fn();

			jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
			testProvidersFn('/', true);

			const quitIcon = screen.getByTestId(TEST_ID_MAP.quit);

			await userEvent.click(quitIcon);

			expect(navigate).toHaveBeenCalledWith('signIn');
		});
	});
});
