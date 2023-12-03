import { PAGES_TEST_ID_MAP } from '../../src/app/components/pages/constants';
import { PRODUCT_CARD_ACTIONS_TEST_ID_MAP } from '../../src/app/components/atoms/ProductCardActions/constants';

describe('Проверка смены статуса избранных для тетьего и шестого продукта на странице', () => {
	beforeEach(() => cy.visit('/signIn'));

	it('должны ставиться лайки третьему и шестому продуктам', () => {
		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.emailTextField}]`).type(
			'79228526659@yandex.ru'
		);
		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.passwordTextField}]`).type(
			'12345678'
		);
		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.submitButton}]`).click();

		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.productMiniCard}]`)
			.eq(2)
			.within(() => {
				cy.get(
					`[data-testid=${PRODUCT_CARD_ACTIONS_TEST_ID_MAP.likeButton}]`
				).click();
			});

		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.productMiniCard}]`)
			.eq(5)
			.within(() => {
				cy.get(
					`[data-testid=${PRODUCT_CARD_ACTIONS_TEST_ID_MAP.likeButton}]`
				).click();
			});

		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.productMiniCard}]`)
			.eq(2)
			.within(() =>
				cy
					.get(`[data-testid=${PRODUCT_CARD_ACTIONS_TEST_ID_MAP.likedIcon}]`)
					.should('be.visible')
			);

		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.productMiniCard}]`)
			.eq(5)
			.within(() => {
				cy.get(
					`[data-testid=${PRODUCT_CARD_ACTIONS_TEST_ID_MAP.likedIcon}]`
				).should('be.visible');
			});

		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.productMiniCard}]`)
			.eq(2)
			.within(() => {
				cy.get(
					`[data-testid=${PRODUCT_CARD_ACTIONS_TEST_ID_MAP.likeButton}]`
				).click();
			});

		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.productMiniCard}]`)
			.eq(5)
			.within(() => {
				cy.get(
					`[data-testid=${PRODUCT_CARD_ACTIONS_TEST_ID_MAP.likeButton}]`
				).click();
			});

		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.productMiniCard}]`)
			.eq(2)
			.within(() =>
				cy
					.get(`[data-testid=${PRODUCT_CARD_ACTIONS_TEST_ID_MAP.nonLikedIcon}]`)
					.should('be.visible')
			);

		cy.get(`[data-testid=${PAGES_TEST_ID_MAP.productMiniCard}]`)
			.eq(5)
			.within(() => {
				cy.get(
					`[data-testid=${PRODUCT_CARD_ACTIONS_TEST_ID_MAP.nonLikedIcon}]`
				).should('be.visible');
			});
	});
});
