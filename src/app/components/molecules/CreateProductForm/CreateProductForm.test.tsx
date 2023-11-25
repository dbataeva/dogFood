import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import ReactTestRenderer from 'react-test-renderer';

import * as productsApi from '../../../../api/productsApi';
import { TEST_ID_MAP } from './constants';
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
		expect(screen.getByTestId(TEST_ID_MAP.form)).toBeInTheDocument();
	});

	describe('поля формы', () => {
		it('должно рендериться поле имени продукта', () => {
			expect(screen.getByTestId(TEST_ID_MAP.nameField)).toBeInTheDocument();
		});

		it('должно рендериться поле цены продукта', () => {
			expect(screen.getByTestId(TEST_ID_MAP.priceField)).toBeInTheDocument();
		});

		it('должно рендериться поле скидки на продукт', () => {
			expect(screen.getByTestId(TEST_ID_MAP.discountField)).toBeInTheDocument();
		});

		it('должно рендериться поле изображений продукта', () => {
			expect(screen.getByTestId(TEST_ID_MAP.picturesField)).toBeInTheDocument();
		});

		it('должно рендериться поле кол-ва продукта в наличии', () => {
			expect(screen.getByTestId(TEST_ID_MAP.stockField)).toBeInTheDocument();
		});

		it('должно рендериться поле описания продукта', () => {
			expect(
				screen.getByTestId(TEST_ID_MAP.descriptionField)
			).toBeInTheDocument();
		});
	});

	it('должна рендериться кнопка добавления продукта', () => {
		expect(screen.getByTestId(TEST_ID_MAP.submitButton)).toBeInTheDocument();
	});

	describe('работа формы', () => {
		it('не должен добавляться продукт при незаполненном названии продукта', () => {
			const priceField = screen.getByTestId(TEST_ID_MAP.priceField);
			const picturesField = screen.getByTestId(TEST_ID_MAP.picturesField);
			const stockField = screen.getByTestId(TEST_ID_MAP.stockField);
			const descriptionField = screen.getByTestId(TEST_ID_MAP.descriptionField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(picturesField, correctPictures);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при незаполненном поле цены продукта', () => {
			const nameField = screen.getByTestId(TEST_ID_MAP.nameField);
			const picturesField = screen.getByTestId(TEST_ID_MAP.picturesField);
			const stockField = screen.getByTestId(TEST_ID_MAP.stockField);
			const descriptionField = screen.getByTestId(TEST_ID_MAP.descriptionField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(picturesField, correctPictures);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при некрректно заполненном поле цены продукта', () => {
			const nameField = screen.getByTestId(TEST_ID_MAP.nameField);
			const picturesField = screen.getByTestId(TEST_ID_MAP.picturesField);
			const stockField = screen.getByTestId(TEST_ID_MAP.stockField);
			const descriptionField = screen.getByTestId(TEST_ID_MAP.descriptionField);
			const priceField = screen.getByTestId(TEST_ID_MAP.priceField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(priceField, 'aaa');
			userEvent.type(picturesField, correctPictures);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при незаполненном поле кол-ва продукта в наличии', () => {
			const nameField = screen.getByTestId(TEST_ID_MAP.nameField);
			const picturesField = screen.getByTestId(TEST_ID_MAP.picturesField);
			const priceField = screen.getByTestId(TEST_ID_MAP.priceField);
			const descriptionField = screen.getByTestId(TEST_ID_MAP.descriptionField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(picturesField, correctPictures);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при некорректно заполненном поле кол-ва продукта в наличии', () => {
			const nameField = screen.getByTestId(TEST_ID_MAP.nameField);
			const picturesField = screen.getByTestId(TEST_ID_MAP.picturesField);
			const priceField = screen.getByTestId(TEST_ID_MAP.priceField);
			const descriptionField = screen.getByTestId(TEST_ID_MAP.descriptionField);
			const stockField = screen.getByTestId(TEST_ID_MAP.stockField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(stockField, 'aaa');
			userEvent.type(picturesField, correctPictures);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при незаполненном поле ссылки на изображение продукта', () => {
			const nameField = screen.getByTestId(TEST_ID_MAP.nameField);
			const stockField = screen.getByTestId(TEST_ID_MAP.stockField);
			const priceField = screen.getByTestId(TEST_ID_MAP.priceField);
			const descriptionField = screen.getByTestId(TEST_ID_MAP.descriptionField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при некорректно заполненном поле ссылки на изображение продукта', () => {
			const nameField = screen.getByTestId(TEST_ID_MAP.nameField);
			const stockField = screen.getByTestId(TEST_ID_MAP.stockField);
			const priceField = screen.getByTestId(TEST_ID_MAP.priceField);
			const descriptionField = screen.getByTestId(TEST_ID_MAP.descriptionField);
			const picturesField = screen.getByTestId(TEST_ID_MAP.picturesField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(descriptionField, correctNameAndDescription);
			userEvent.type(picturesField, '123');
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('не должен добавляться продукт при незаполненном описании продукта', () => {
			const nameField = screen.getByTestId(TEST_ID_MAP.nameField);
			const stockField = screen.getByTestId(TEST_ID_MAP.stockField);
			const priceField = screen.getByTestId(TEST_ID_MAP.priceField);
			const picturesField = screen.getByTestId(TEST_ID_MAP.picturesField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(nameField, correctNameAndDescription);
			userEvent.type(stockField, correctPriceAndStockField);
			userEvent.type(priceField, correctPriceAndStockField);
			userEvent.type(picturesField, correctPictures);
			userEvent.click(submitButton);

			waitFor(() => expect(addProduct).not.toHaveBeenCalled());
		});

		it('должен добавляться продукт при корректно заполненной форме', () => {
			const nameField = screen.getByTestId(TEST_ID_MAP.nameField);
			const stockField = screen.getByTestId(TEST_ID_MAP.stockField);
			const priceField = screen.getByTestId(TEST_ID_MAP.priceField);
			const descriptionField = screen.getByTestId(TEST_ID_MAP.descriptionField);
			const picturesField = screen.getByTestId(TEST_ID_MAP.picturesField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

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

		expect(tree).toMatchInlineSnapshot(`
		<form
		  className="MuiBox-root css-1z13ce1"
		  data-testid="form"
		  noValidate={true}
		  onSubmit={[Function]}
		>
		  <div
		    className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-17vbkzs-MuiFormControl-root-MuiTextField-root"
		    data-testid="nameField"
		  >
		    <label
		      className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root"
		      data-shrink={false}
		      htmlFor=":r0:"
		      id=":r0:-label"
		    >
		      Наименование:
		      <span
		        aria-hidden={true}
		        className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
		      >
		         
		        *
		      </span>
		    </label>
		    <div
		      className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root"
		      onClick={[Function]}
		    >
		      <input
		        aria-invalid={false}
		        autoFocus={false}
		        className="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
		        disabled={false}
		        id=":r0:"
		        name="name"
		        onAnimationStart={[Function]}
		        onBlur={[Function]}
		        onChange={[Function]}
		        onFocus={[Function]}
		        required={true}
		        type="text"
		        value=""
		      />
		      <fieldset
		        aria-hidden={true}
		        className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
		      >
		        <legend
		          className="css-yjsfm1"
		        >
		          <span>
		            Наименование:
		             
		            *
		          </span>
		        </legend>
		      </fieldset>
		    </div>
		  </div>
		  <div
		    className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-17vbkzs-MuiFormControl-root-MuiTextField-root"
		    data-testid="priceField"
		  >
		    <label
		      className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root"
		      data-shrink={false}
		      htmlFor=":r1:"
		      id=":r1:-label"
		    >
		      Цена:
		      <span
		        aria-hidden={true}
		        className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
		      >
		         
		        *
		      </span>
		    </label>
		    <div
		      className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root"
		      onClick={[Function]}
		    >
		      <input
		        aria-invalid={false}
		        autoFocus={false}
		        className="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
		        disabled={false}
		        id=":r1:"
		        name="price"
		        onAnimationStart={[Function]}
		        onBlur={[Function]}
		        onChange={[Function]}
		        onFocus={[Function]}
		        required={true}
		        type="text"
		      />
		      <fieldset
		        aria-hidden={true}
		        className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
		      >
		        <legend
		          className="css-yjsfm1"
		        >
		          <span>
		            Цена:
		             
		            *
		          </span>
		        </legend>
		      </fieldset>
		    </div>
		  </div>
		  <div
		    className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-17vbkzs-MuiFormControl-root-MuiTextField-root"
		    data-testid="discountField"
		  >
		    <label
		      className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1jy569b-MuiFormLabel-root-MuiInputLabel-root"
		      data-shrink={true}
		      htmlFor=":r2:"
		      id=":r2:-label"
		    >
		      Скидка:
		      <span
		        aria-hidden={true}
		        className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
		      >
		         
		        *
		      </span>
		    </label>
		    <div
		      className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root"
		      onClick={[Function]}
		    >
		      <input
		        aria-invalid={false}
		        autoFocus={false}
		        className="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
		        disabled={false}
		        id=":r2:"
		        name="discount"
		        onAnimationStart={[Function]}
		        onBlur={[Function]}
		        onChange={[Function]}
		        onFocus={[Function]}
		        required={true}
		        type="text"
		        value={0}
		      />
		      <fieldset
		        aria-hidden={true}
		        className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
		      >
		        <legend
		          className="css-14lo706"
		        >
		          <span>
		            Скидка:
		             
		            *
		          </span>
		        </legend>
		      </fieldset>
		    </div>
		  </div>
		  <div
		    className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-17vbkzs-MuiFormControl-root-MuiTextField-root"
		    data-testid="picturesField"
		  >
		    <label
		      className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root"
		      data-shrink={false}
		      htmlFor=":r3:"
		      id=":r3:-label"
		    >
		      Ссылка на изображение:
		      <span
		        aria-hidden={true}
		        className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
		      >
		         
		        *
		      </span>
		    </label>
		    <div
		      className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root"
		      onClick={[Function]}
		    >
		      <input
		        aria-invalid={false}
		        autoFocus={false}
		        className="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
		        disabled={false}
		        id=":r3:"
		        name="pictures"
		        onAnimationStart={[Function]}
		        onBlur={[Function]}
		        onChange={[Function]}
		        onFocus={[Function]}
		        required={true}
		        type="text"
		        value=""
		      />
		      <fieldset
		        aria-hidden={true}
		        className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
		      >
		        <legend
		          className="css-yjsfm1"
		        >
		          <span>
		            Ссылка на изображение:
		             
		            *
		          </span>
		        </legend>
		      </fieldset>
		    </div>
		  </div>
		  <div
		    className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-17vbkzs-MuiFormControl-root-MuiTextField-root"
		    data-testid="stockField"
		  >
		    <label
		      className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root"
		      data-shrink={false}
		      htmlFor=":r4:"
		      id=":r4:-label"
		    >
		      Количество в наличии:
		      <span
		        aria-hidden={true}
		        className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
		      >
		         
		        *
		      </span>
		    </label>
		    <div
		      className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root"
		      onClick={[Function]}
		    >
		      <input
		        aria-invalid={false}
		        autoFocus={false}
		        className="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
		        disabled={false}
		        id=":r4:"
		        name="stock"
		        onAnimationStart={[Function]}
		        onBlur={[Function]}
		        onChange={[Function]}
		        onFocus={[Function]}
		        required={true}
		        type="text"
		      />
		      <fieldset
		        aria-hidden={true}
		        className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
		      >
		        <legend
		          className="css-yjsfm1"
		        >
		          <span>
		            Количество в наличии:
		             
		            *
		          </span>
		        </legend>
		      </fieldset>
		    </div>
		  </div>
		  <div
		    className="MuiFormControl-root MuiFormControl-marginNormal MuiFormControl-fullWidth MuiTextField-root css-17vbkzs-MuiFormControl-root-MuiTextField-root"
		    data-testid="descriptionField"
		  >
		    <label
		      className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root"
		      data-shrink={false}
		      htmlFor=":r5:"
		      id=":r5:-label"
		    >
		      Описание товара:
		      <span
		        aria-hidden={true}
		        className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
		      >
		         
		        *
		      </span>
		    </label>
		    <div
		      className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl css-md26zr-MuiInputBase-root-MuiOutlinedInput-root"
		      onClick={[Function]}
		    >
		      <input
		        aria-invalid={false}
		        autoFocus={false}
		        className="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
		        disabled={false}
		        id=":r5:"
		        name="description"
		        onAnimationStart={[Function]}
		        onBlur={[Function]}
		        onChange={[Function]}
		        onFocus={[Function]}
		        required={true}
		        type="text"
		        value=""
		      />
		      <fieldset
		        aria-hidden={true}
		        className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
		      >
		        <legend
		          className="css-yjsfm1"
		        >
		          <span>
		            Описание товара:
		             
		            *
		          </span>
		        </legend>
		      </fieldset>
		    </div>
		  </div>
		  <div
		    className="MuiCardActions-root css-1rwjz6-MuiCardActions-root"
		  >
		    <button
		      className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium css-1e6y48t-MuiButtonBase-root-MuiButton-root"
		      data-testid="submitButton"
		      disabled={false}
		      onBlur={[Function]}
		      onContextMenu={[Function]}
		      onDragLeave={[Function]}
		      onFocus={[Function]}
		      onKeyDown={[Function]}
		      onKeyUp={[Function]}
		      onMouseDown={[Function]}
		      onMouseLeave={[Function]}
		      onMouseUp={[Function]}
		      onTouchEnd={[Function]}
		      onTouchMove={[Function]}
		      onTouchStart={[Function]}
		      tabIndex={0}
		      type="submit"
		    >
		      Добавить продукт
		    </button>
		  </div>
		</form>
	`);
	});
});
