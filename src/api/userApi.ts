import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL, LOCAL_STORAGE_TOKEN_KEY } from './api';
import { User } from '../types';

export const userApi = createApi({
	reducerPath: 'userApi',
	tagTypes: ['User'],
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: (headers) => {
			const token = window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}

			return headers;
		},
	}),
	endpoints: (builder) => ({
		getUserInfo: builder.query<User, void>({
			query: () => ({
				url: 'users/me',
			}),
			providesTags: ['User'],
		}),
		updateUserInfo: builder.mutation<User, Pick<User, 'name' | 'about'>>({
			query: (newUserData) => ({
				url: 'users/me',
				method: 'PATCH',
				body: newUserData,
			}),
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useGetUserInfoQuery, useUpdateUserInfoMutation } = userApi;
