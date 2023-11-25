import { number, object, string } from 'yup';

export const TEXT_MAP = {
	name: 'Наименование:',
	price: 'Цена:',
	discount: 'Скидка:',
	pictures: 'Ссылка на изображение:',
	stock: 'Количество в наличии:',
	description: 'Описание товара:',
	finish: 'Добавить продукт',
	successfulAdding: 'Продукт успешно добавлен',
	nameError: 'Имя должно быть заполнено',
	priceError: 'Цена должна быть заполнена',
	discountError: 'Скидка должна быть заполнена',
	picturesError: 'Добавьте ссылку на изобржения продукта',
	stockError: 'Количество в наличии должно быть заполнено',
	descriptionError: 'Добавьте описание продукта',
};

export const createProductScheme = object({
	name: string().required(),
	price: number().required(),
	discount: number().required(),
	pictures: string().url().required(),
	stock: number().required(),
	description: string().required(),
});

export const TEST_ID_MAP = {
	form: 'form',
	nameField: 'nameField',
	priceField: 'priceField',
	discountField: 'discountField',
	picturesField: 'picturesField',
	stockField: 'stockField',
	descriptionField: 'descriptionField',
	submitButton: 'submitButton',
};
