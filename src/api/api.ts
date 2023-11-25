//ПРО ПРОДУКТЫ
// GET https://api.react-learning.ru/products // получение всех товаров
// GET https://api.react-learning.ru/products/paginate?page=<номер страницы>&limit=<число ограничивающее вывод на страницу>&query=<строка фильтрации по title>
// GET https://api.react-learning.ru/products/search?query=запрос // для поиска товаров
// GET https://api.react-learning.ru/products/:id // получение товaра по id
// POST https://api.react-learning.ru/products // создание нового товара
// PATCH https://api.react-learning.ru/products/:productId //редактирование товара по id
// DELETE https://api.react-learning.ru/products/:productId //удаление товара по id
// PUT https://api.react-learning.ru/products/likes/:productId // установка лайка по id
// DELETE https://api.react-learning.ru/products/likes/:productId // снятие лайка по id
// POST https://api.react-learning.ru/products/review/:productId // добавление отзыва по id
// DELETE https://api.react-learning.ru/products/review/:productId/:reviewId // удаление отзыва по id
// GET https://api.react-learning.ru/products/review/ // получение всех отзывов
// GET https://api.react-learning.ru/products/review/:productId // получение отзывов конкрентного товара.

//ПРО ПОЛЬЗОВАТЕЛЯ
// GET https://api.react-learning.ru/users //получение всех пользователей
// GET https://api.react-learning.ru/users/me // получение информации о пользователе по токену в заголовках
// GET https://api.react-learning.ru/users/:userId // получение информации о пользователе по его id
// PATCH https://api.react-learning.ru/users/me // изменение name и about
// PATCH https://api.react-learning.ru/users/me/avatar // изменение avatar

//ПРО РЕГИСТРАЦИЮ
// POST https://api.react-learning.ru/signup // регистрация { ...data, group: 'group-id'}
// POST https://api.react-learning.ru/signin // авторизация
// POST https://api.react-learning.ru/forgot-password // сброс пароля на почту
// PATCH https://api.react-learning.ru/password-reset/:token // смена пароля после подтвержения токеном

import { User } from '../types';

export const BASE_URL = 'https://api.react-learning.ru';
export const LOCAL_STORAGE_TOKEN_KEY = 'token';

const getConfig = () => ({
	apiUrl: 'https://api.react-learning.ru/v2/sb-3',
	apiToken: window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
});

type TConfigApi = {
	baseUrl: string;
	headers: HeadersInit;
};

class Api {
	private baseUrl;
	private headers;

	constructor({ baseUrl, headers }: TConfigApi) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	private onResponse(res: Response) {
		return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
	}

	private getApiUrl(path: string) {
		return `${this.baseUrl}${path}`;
	}

	getUserInfo() {
		return fetch(this.getApiUrl('/users/me'), {
			headers: {
				...this.headers,
				authorization: `Bearer ${getConfig().apiToken}`,
			},
		}).then(this.onResponse);
	}

	updateUserInfo(data: Pick<User, 'name' | 'about'>) {
		return fetch(this.getApiUrl('/users/me'), {
			method: 'PATCH',
			headers: {
				...this.headers,
				authorization: `Bearer ${getConfig().apiToken}`,
			},
			body: JSON.stringify(data),
		}).then(this.onResponse);
	}
}

export const api = new Api({
	baseUrl: getConfig().apiUrl,
	headers: {
		'content-type': 'application/json',
		authorization: `Bearer ${getConfig().apiToken}`,
	},
});
