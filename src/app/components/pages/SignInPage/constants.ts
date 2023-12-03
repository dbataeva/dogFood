import { object, string } from 'yup';

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../constants';

export const signInSchema = object({
	email: string().email().required(),
	password: string()
		.min(MIN_PASSWORD_LENGTH)
		.max(MAX_PASSWORD_LENGTH)
		.required(),
});

export const SIGN_IN_PAGE_TEXT_MAP = {
	signIn: 'Войти',
	password: 'Пароль',
	email: 'Email',
	required: 'Обязательное поле',
	emailError: 'Невалидный email',
	passwordError: 'Пароль должен быть длиной 6 до 24 символов',
	successSignIn: 'Вы успешно вошли в свой аккаунт!',
	signUpPageLink: 'Еще не зарегистрированы? Зарегистрироваться',
};
