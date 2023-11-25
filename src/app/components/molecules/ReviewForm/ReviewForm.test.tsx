import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import * as productsApi from '../../../../api/productsApi';
import ReactTestRenderer from 'react-test-renderer';

import { TEST_ID_MAP } from './constants';
import { testProvidersFn } from '../../../testProviders';
import { ReviewForm } from './ReviewForm.component';

const productId = '123';

const mockedProduct = {
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
	_id: productId,
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

describe('ReviewForm', () => {
	let sendReview: any;

	beforeEach(() => {
		sendReview = jest.fn();

		jest.spyOn(productsApi, 'useGetProductByIdQuery').mockReturnValue({
			isLoading: false,
			error: undefined,
			isError: false,
			data: mockedProduct,
			refetch: jest.fn(),
		});

		jest
			.spyOn(productsApi, 'useAddReviewMutation')
			.mockReturnValue([sendReview, {} as any]);

		testProvidersFn('/products/123', true);
	});

	it('должна рендериться на станице детальной карточки продукта', () => {
		expect(screen.getByTestId(TEST_ID_MAP.form)).toBeInTheDocument();
	});

	describe('поля формы', () => {
		it('должно рендериться поле рейтинга', () => {
			expect(screen.getByTestId(TEST_ID_MAP.ratingField)).toBeInTheDocument();
		});

		it('должно рендериться поле отзыва', () => {
			expect(screen.getByTestId(TEST_ID_MAP.reviewField)).toBeInTheDocument();
		});
	});

	it('должна рендериться кнопка добавления отзыва', () => {
		expect(screen.getByTestId(TEST_ID_MAP.submitButton)).toBeInTheDocument();
	});

	describe('работа формы', () => {
		it('не должен добавляться отзыв при слишком низком значении рейтинга', () => {
			const ratingField = screen.getByTestId(TEST_ID_MAP.ratingField);
			const reviewField = screen.getByTestId(TEST_ID_MAP.reviewField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(ratingField, '0');
			userEvent.type(reviewField, 'some review');
			userEvent.click(submitButton);

			waitFor(() => expect(sendReview).not.toHaveBeenCalled());
		});

		it('не должен добавляться отзыв при слишком высоком значении рейтинга', () => {
			const ratingField = screen.getByTestId(TEST_ID_MAP.ratingField);
			const reviewField = screen.getByTestId(TEST_ID_MAP.reviewField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(ratingField, '6');
			userEvent.type(reviewField, 'some review');
			userEvent.click(submitButton);

			waitFor(() => expect(sendReview).not.toHaveBeenCalled());
		});

		it('не должен добавляться отзыв при некорректном значении рейтинга', () => {
			const ratingField = screen.getByTestId(TEST_ID_MAP.ratingField);
			const reviewField = screen.getByTestId(TEST_ID_MAP.reviewField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(ratingField, 'ффф');
			userEvent.type(reviewField, 'some review');
			userEvent.click(submitButton);

			waitFor(() => expect(sendReview).not.toHaveBeenCalled());
		});

		it('не должен добавляться отзыв при незаполненном тексте отзыва', () => {
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.click(submitButton);

			waitFor(() => expect(sendReview).not.toHaveBeenCalled());
		});

		it('должен добавляться отзыв при правильно заполненной форме', () => {
			const reviewField = screen.getByTestId(TEST_ID_MAP.reviewField);
			const submitButton = screen.getByTestId(TEST_ID_MAP.submitButton);

			userEvent.type(reviewField, 'some review');
			userEvent.click(submitButton);

			waitFor(() => expect(sendReview).toHaveBeenCalled());
		});
	});

	it("должен соответствовать snapshot'у", () => {
		const tree = ReactTestRenderer.create(
			<ReviewForm productId={productId} />
		).toJSON();

		expect(tree).toMatchInlineSnapshot(`
		<form
		  className="MuiBox-root css-e740r8"
		  data-testid="form"
		  noValidate={true}
		  onSubmit={[Function]}
		>
		  <div
		    className="MuiFormControl-root MuiFormControl-marginNormal MuiTextField-root css-1rv3ei8-MuiFormControl-root-MuiTextField-root"
		    data-testid="ratingField"
		  >
		    <label
		      className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-sizeMedium MuiInputLabel-outlined css-1jy569b-MuiFormLabel-root-MuiInputLabel-root"
		      data-shrink={true}
		      htmlFor=":r0:"
		      id=":r0:-label"
		    >
		      Оценка
		      <span
		        aria-hidden={true}
		        className="MuiFormLabel-asterisk MuiInputLabel-asterisk css-wgai2y-MuiFormLabel-asterisk"
		      >
		         
		        *
		      </span>
		    </label>
		    <div
		      className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root"
		      onClick={[Function]}
		    >
		      <input
		        aria-invalid={false}
		        autoFocus={false}
		        className="MuiInputBase-input MuiOutlinedInput-input css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input"
		        disabled={false}
		        id=":r0:"
		        name="rating"
		        onAnimationStart={[Function]}
		        onBlur={[Function]}
		        onChange={[Function]}
		        onFocus={[Function]}
		        required={true}
		        type="text"
		        value={5}
		      />
		      <fieldset
		        aria-hidden={true}
		        className="MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline"
		      >
		        <legend
		          className="css-14lo706"
		        >
		          <span>
		            Оценка
		             
		            *
		          </span>
		        </legend>
		      </fieldset>
		    </div>
		  </div>
		  <div
		    className="MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-wb57ya-MuiFormControl-root-MuiTextField-root"
		    data-testid="reviewField"
		  >
		    <label
		      className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined MuiFormLabel-colorPrimary Mui-required MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-sizeMedium MuiInputLabel-outlined css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root"
		      data-shrink={false}
		      htmlFor=":r1:"
		      id=":r1:-label"
		    >
		      Отзыв
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
		        name="text"
		        onAnimationStart={[Function]}
		        onBlur={[Function]}
		        onChange={[Function]}
		        onFocus={[Function]}
		        required={true}
		        rows={4}
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
		            Отзыв
		             
		            *
		          </span>
		        </legend>
		      </fieldset>
		    </div>
		  </div>
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
		    Сохранить
		  </button>
		</form>
	`);
	});
});
