import { LOCAL_STORAGE_TOKEN_KEY } from '../../api';

export const getIsUserAuthorized = (): boolean => {
	return !!window.localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
};
