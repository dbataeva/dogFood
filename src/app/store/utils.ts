import { AnyAction, createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
	extra: typeof api;
}>();

const hasPrefix = (action: AnyAction, prefix: string): boolean =>
	action.type.startsWith(prefix);

const isPending = (action: AnyAction): boolean =>
	action.type.endsWith('/pending');
const isFulfilled = (action: AnyAction): boolean =>
	action.type.endsWith('/fulfilled');
const isRejected = (action: AnyAction): boolean =>
	action.type.endsWith('/rejected');

export const isActionPending = (prefix: string) => (action: AnyAction) => {
	return hasPrefix(action, prefix) && isPending(action);
};
export const isActionRejected = (prefix: string) => (action: AnyAction) => {
	return hasPrefix(action, prefix) && isRejected(action);
};
export const isActionFulfilled = (prefix: string) => (action: AnyAction) => {
	return hasPrefix(action, prefix) && isFulfilled(action);
};
