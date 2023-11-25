import { SerializedError, createSlice } from '@reduxjs/toolkit';

import { UpdateUser } from '../../../api';
import { User } from '../../../types';
import {
	createAppAsyncThunk,
	isActionFulfilled,
	isActionPending,
	isActionRejected,
} from '../utils';

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

export const fetchUserInfo = createAppAsyncThunk<User>(
	`${sliceName}/fetchUserInfo`,
	async (_, { fulfillWithValue, rejectWithValue, extra: api }) => {
		try {
			const response = await api.getUserInfo();

			return fulfillWithValue(response);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const updateUserInfo = createAppAsyncThunk<User, UpdateUser>(
	`${sliceName}/updateUserInfo`,
	async (userData, { fulfillWithValue, rejectWithValue, extra: api }) => {
		try {
			const response = await api.updateUserInfo(userData);

			return fulfillWithValue(response);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const userSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.currentUser = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(isActionPending(sliceName), (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addMatcher(isActionFulfilled(sliceName), (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload;
			})
			.addMatcher(isActionRejected(sliceName), (state, action) => {
				state.isLoading = false;
				state.error = action.error;
			});
	},
});

export const { setUserData } = userSlice.actions;

export const userReducer = userSlice.reducer;
