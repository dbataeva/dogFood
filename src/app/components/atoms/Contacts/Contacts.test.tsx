import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { TEST_ID_MAP, TEXT_MAP } from './constants';
import { testProvidersFn } from '../../../testProviders';

describe('Contacts', () => {
	beforeEach(() => testProvidersFn());

	it('должны содержать номер телефона', () => {
		expect(screen.getByTestId(TEST_ID_MAP.phoneAndEmail)).toHaveTextContent(
			TEXT_MAP.phone
		);
	});

	it('должны содержать адрес электронной почты', () => {
		expect(screen.getByTestId(TEST_ID_MAP.phoneAndEmail)).toHaveTextContent(
			TEXT_MAP.email
		);
	});

	describe('ссылки на социальные сети', () => {
		it('должна быть ссылка на телеграм', () => {
			expect(screen.getByTestId(TEST_ID_MAP.telegram)).toBeInTheDocument();
		});

		it('должна быть ссылка на watsApp', () => {
			expect(screen.getByTestId(TEST_ID_MAP.watsApp)).toBeInTheDocument();
		});

		it('должна быть ссылка на instagram', () => {
			expect(screen.getByTestId(TEST_ID_MAP.instagram)).toBeInTheDocument();
		});

		it('должна быть ссылка на facebook', () => {
			expect(screen.getByTestId(TEST_ID_MAP.facebook)).toBeInTheDocument();
		});

		it('должна быть ссылка на twitter', () => {
			expect(screen.getByTestId(TEST_ID_MAP.twitter)).toBeInTheDocument();
		});
	});
});
