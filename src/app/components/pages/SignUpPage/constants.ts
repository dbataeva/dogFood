import { object, string } from 'yup';

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from '../constants';

export const signUpSchema = object({
	group: string().required(),
	email: string().email().required(),
	password: string()
		.min(MIN_PASSWORD_LENGTH)
		.max(MAX_PASSWORD_LENGTH)
		.required(),
});
