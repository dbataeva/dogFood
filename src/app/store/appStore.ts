import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import { api, authApi, productsApi } from '../../api';
import { userSliceName, userReducer } from './userStore';
import { basketReducer, basketSliceName } from './basketStore';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
	reducer: {
		user: userReducer,
		basket: basketReducer,
		[authApi.reducerPath]: authApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: {
				extraArgument: api,
			},
		}).concat(authApi.middleware, productsApi.middleware),
	devTools: true,
});

export const selectUser = (state: RootState) => state[userSliceName];
export const selectBasket = (state: RootState) => state[basketSliceName];
