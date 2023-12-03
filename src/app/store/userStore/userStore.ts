import { SerializedError, createSlice } from '@reduxjs/toolkit';

import { User } from '../../../types';

export const sliceName = 'user';

type UserState = {
	currentUser: User | null;
	isLoading: boolean;
	error: SerializedError | null;
};

const initialState: UserState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.currentUser = action.payload;
		},
	},
});

export const { setUserData } = userSlice.actions;

export const userReducer = userSlice.reducer;
