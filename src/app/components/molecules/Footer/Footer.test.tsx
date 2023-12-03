import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@testing-library/user-event';
import * as router from 'react-router';
import ReactTestRenderer from 'react-test-renderer';

import { TEST_ID_MAP, TEXT_MAP } from './constants';
import { testProvidersFn } from '../../../testProviders';
import { Footer } from './Footer.component';

describe('Компонент Footer', () => {
	it('должен рендериться', () => {
		testProvidersFn();
		expect(screen.getByTestId(TEST_ID_MAP.footer)).toBeInTheDocument();
	});

	describe("компоненты внутри Footer'а", () => {
		describe('logo', () => {
			it('должно рендериться', () => {
				testProvidersFn();
				expect(screen.getByTestId(TEST_ID_MAP.logo)).toBeInTheDocument();
			});

			it('должен быть переход на главную страницу при клике на лого', () => {
				const navigate = jest.fn();

				jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
				testProvidersFn('/basket', true);

				const logo = screen.getByTestId(TEST_ID_MAP.logo);

				userEvent.click(logo);

				waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
			});
		});

		describe('пунты меню', () => {
			beforeEach(() => testProvidersFn());

			Object.entries(TEXT_MAP).forEach(([key, value]) => {
				it(`должен рендериться пункт ${key}`, () => {
					expect(screen.getByTestId(TEST_ID_MAP.footer)).toHaveTextContent(
						value
					);
				});
			});
		});

		describe('контакты', () => {
			it('должны рендериться', () => {
				testProvidersFn();
				expect(screen.getByTestId(TEST_ID_MAP.contacts)).toBeInTheDocument();
			});
		});
	});

	it("должен соответствовать snapshot'у", () => {
		const tree = ReactTestRenderer.create(<Footer />).toJSON();

		expect(tree).toMatchSnapshot();
	});
});
