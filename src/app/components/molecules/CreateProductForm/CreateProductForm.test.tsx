import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import ReactTestRenderer from 'react-test-renderer';

import * as productsApi from '../../../../api/productsApi';
import { CREATE_PRODUCT_FORM_TEST_ID_MAP } from './constants';
import { testProvidersFn } from '../../../testProviders';
import * as appStore from '../../../store/appStore';
import { CreateProductForm } from './CreateProductForm.component';

const correctPictures =
	'https://spb.salon-love-forever.ru/upload/resize_cache/iblock/d65/120_180_2/Leda-midi.jpg';
const correctPriceAndStockField = '10';
const correctNameAndDescription = 'платье';

describe('CreateProductForm', () => {
	let addProduct: any;

	beforeEach(() => {
		addProduct = jest.fn();

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

		jest
			.spyOn(productsApi, 'useAddProductMutation')
			.mockReturnValue([addProduct, {} as any]);

		testProvidersFn('/users/me', true);
	});

	it('должна рендериться на странице личного кабинета пользователя', () => {
		expect(
			screen.getByTestId(CREATE_PRODUCT_FORM_TEST_ID_MAP.form)
		).toBeInTheDocument();
	});

	describe('поля формы', () => {
		it('должно рендериться поле имени продукта', () => {
			expect(
				screen.getByTestId(CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField)
			).toBeInTheDocument();
		});

		it('должно рендериться поле цены продукта', () => {
			expect(
				screen.getByTestId(CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField)
			).toBeInTheDocument();
		});

		it('должно рендериться поле скидки на продукт', () => {
			expect(
				screen.getByTestId(CREATE_PRODUCT_FORM_TEST_ID_MAP.discountField)
			).toBeInTheDocument();
		});

		it('должно рендериться поле изображений продукта', () => {
			expect(
				screen.getByTestId(CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField)
			).toBeInTheDocument();
		});

		it('должно рендериться поле кол-ва продукта в наличии', () => {
			expect(
				screen.getByTestId(CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField)
			).toBeInTheDocument();
		});

		it('должно рендериться поле описания продукта', () => {
			expect(
				screen.getByTestId(CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField)
			).toBeInTheDocument();
		});
	});

	it('должна рендериться кнопка добавления продукта', () => {
		expect(
			screen.getByTestId(CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton)
		).toBeInTheDocument();
	});

	describe('работа формы', () => {
		it('не должен добавляться продукт при незаполненном названии продукта', () => {
			const priceField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField
			);
			const picturesField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField
			);
			const stockField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField
			);
			const descriptionField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField
			);
			const submitButton = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton
			);

			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(picturesField, correctPictures);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при незаполненном поле цены продукта', () => {
			const nameField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField
			);
			const picturesField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField
			);
			const stockField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField
			);
			const descriptionField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField
			);
			const submitButton = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton
			);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(picturesField, correctPictures);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при некрректно заполненном поле цены продукта', () => {
			const nameField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField
			);
			const picturesField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField
			);
			const stockField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField
			);
			const descriptionField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField
			);
			const priceField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField
			);
			const submitButton = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton
			);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(priceField, 'aaa');
			userEvent.type(picturesField, correctPictures);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при незаполненном поле кол-ва продукта в наличии', () => {
			const nameField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField
			);
			const picturesField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField
			);
			const priceField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField
			);
			const descriptionField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField
			);
			const submitButton = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton
			);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(picturesField, correctPictures);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при некорректно заполненном поле кол-ва продукта в наличии', () => {
			const nameField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField
			);
			const picturesField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField
			);
			const priceField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField
			);
			const descriptionField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField
			);
			const stockField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField
			);
			const submitButton = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton
			);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(stockField, 'aaa');
			userEvent.type(picturesField, correctPictures);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при незаполненном поле ссылки на изображение продукта', () => {
			const nameField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField
			);
			const stockField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField
			);
			const priceField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField
			);
			const descriptionField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField
			);
			const submitButton = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton
			);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при некорректно заполненном поле ссылки на изображение продукта', () => {
			const nameField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField
			);
			const stockField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField
			);
			const priceField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField
			);
			const descriptionField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField
			);
			const picturesField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField
			);
			const submitButton = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton
			);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.type(picturesField, '123');
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при незаполненном описании продукта', () => {
			const nameField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField
			);
			const stockField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField
			);
			const priceField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField
			);
			const picturesField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField
			);
			const submitButton = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton
			);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(picturesField, correctPictures);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('должен добавляться продукт при корректно заполненной форме', () => {
			const nameField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField
			);
			const stockField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField
			);
			const priceField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField
			);
			const descriptionField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField
			);
			const picturesField = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField
			);
			const submitButton = screen.getByTestId(
				CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton
			);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.type(picturesField, correctPictures);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).toHaveBeenCalled());
		});
	});

	it("должен соответствовать snapshot'у", () => {
		const tree = ReactTestRenderer.create(<CreateProductForm />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
