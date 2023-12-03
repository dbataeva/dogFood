import { PAGES_TEST_ID_MAP } from '../../src/app/components/pages/constants';
import { HEADER_TEST_ID_MAP } from '../../src/app/components/molecules/Header/constants';
import { PRODUCT_CARD_LIST_TEST_ID_MAP } from '../../src/app/components/organisms/ProductCardList/constants';
import { HEADER_ICON_BUTTONS_TEST_ID_MAP } from '../../src/app/components/atoms/HeaderIconButtons/constants';
import { CREATE_PRODUCT_FORM_TEST_ID_MAP } from '../../src/app/components/molecules/CreateProductForm/constants';

const productName = `платье ${Date.now()}`;
const productPrice = '1000';
const productDiscount = '10';
const productPicture =
	'https://spb.salon-love-forever.ru/upload/resize_cache/iblock/d65/120_180_2/Leda-midi.jpg';
const productStock = '10';
const productDescription = productName;

it('Создание и удаление продукта', () => {
	cy.visit('/signIn');

	cy.get(`[data-testid=${PAGES_TEST_ID_MAP.emailTextField}]`).type(
		'79228526659@yandex.ru'
	);
	cy.get(`[data-testid=${PAGES_TEST_ID_MAP.passwordTextField}]`).type(
		'12345678'
	);
	cy.get(`[data-testid=${PAGES_TEST_ID_MAP.submitButton}]`).click();
	cy.get(`[data-testid=${HEADER_ICON_BUTTONS_TEST_ID_MAP.profile}]`).click();

	cy.get(`[data-testid=${CREATE_PRODUCT_FORM_TEST_ID_MAP.form}]`).should(
		'be.visible'
	);

	cy.get(`[data-testid=${CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField}]`).type(
		productName
	);
	cy.get(`[data-testid=${CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField}]`).type(
		productPrice
	);
	cy.get(`[data-testid=${CREATE_PRODUCT_FORM_TEST_ID_MAP.discountField}]`).type(
		productDiscount
	);
	cy.get(`[data-testid=${CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField}]`).type(
		productPicture
	);
	cy.get(`[data-testid=${CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField}]`).type(
		productStock
	);
	cy.get(
		`[data-testid=${CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField}]`
	).type(productDescription);
	cy.get(
		`[data-testid=${CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton}]`
	).click();

	cy.get(`[data-testid=${HEADER_TEST_ID_MAP.logo}]`).click();
	cy.get(`[data-testid=${PAGES_TEST_ID_MAP.homePage}]`).should('be.visible');

	cy.get(`[data-testid=${HEADER_TEST_ID_MAP.searchBar}]`).type(productName);

	cy.get(`[data-testid=${PAGES_TEST_ID_MAP.productMiniCard}]`)
		.should('contain', productName)
		.parent()
		.parent()
		.within(() => {
			cy.get(
				`[data-testid=${PRODUCT_CARD_LIST_TEST_ID_MAP.deleteProductButton}]`
			).click();
		})
		.parent()
		.should('not.have.text', productName);
});
