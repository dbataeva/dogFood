import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL } from './api';
import { User } from '../types';

export type SignUpFormType = {
	group: string;
	email: string;
	password: string;
};

export type SignInFormType = Omit<SignUpFormType, 'group'>;

export type SignInResponse = {
	data: User;
	token: string;
};

export const authApi = createApi({
	reducerPath: 'signIn',
	baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
	endpoints: (builder) => ({
		signUp: builder.mutation<User, SignUpFormType>({
			query: (body) => ({
				url: 'signup',
				method: 'POST',
				body,
			}),
		}),

		signIn: builder.mutation<SignInResponse, SignInFormType>({
			query: (body) => ({
				url: 'signin',
				method: 'POST',
				body,
			}),
		}),
	}),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
