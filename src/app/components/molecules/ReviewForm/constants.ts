import { object, number, string } from 'yup';

const MIN_RATING = 1;
const MAX_RATING = 5;

export const reviewScheme = object({
	rating: number().min(MIN_RATING).max(MAX_RATING).required(),
	text: string().required(),
});

export const TEXT_MAP = {
	addReview: 'Добавьте свой отзыв:',
	rating: 'Оценка',
	cancel: 'Отменить',
	save: 'Сохранить',
	successAddReview: 'Отзыв успешно добавлен!',
	ratingError: 'Рейтинг долже быть числом от 1 до 5',
	textError: 'Отзыв должен состоять как минимум из одного симовла',
	text: 'Отзыв',
};

export const TEST_ID_MAP = {
	form: 'form',
	ratingField: 'ratingField',
	reviewField: 'reviewField',
	submitButton: 'submitButton',
};
