import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router';
import { PageContext } from '../../../../providers';
import { getIsUserAuthorized } from '../../../../utils';
import { LOCAL_STORAGE_TOKEN_KEY } from '../../../../../api';

type UseIconButtonsType = {
	showIconButtons: boolean;
	exitIconClickHandler: () => void;
	basketIconClickHandler: () => void;
	profileIconClickHandler: () => void;
	favoriteIconClickHandler: () => void;
};

export const useIconButtons = (
	handleMobileMenuClose: () => void
): UseIconButtonsType => {
	const { setSearchByValue } = useContext(PageContext);
	const navigate = useNavigate();

	const profileIconClickHandler = useCallback(() => {
		navigate('users/me');
		handleMobileMenuClose();
		setSearchByValue('');
	}, [handleMobileMenuClose, navigate, setSearchByValue]);

	const favoriteIconClickHandler = useCallback(() => {
		navigate('products/favorite');
		handleMobileMenuClose();
		setSearchByValue('');
	}, [handleMobileMenuClose, navigate, setSearchByValue]);

	const basketIconClickHandler = useCallback(() => {
		navigate('basket');
		handleMobileMenuClose();
		setSearchByValue('');
	}, [handleMobileMenuClose, navigate, setSearchByValue]);

	const exitIconClickHandler = useCallback(() => {
		setSearchByValue('');
		window.localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
		window.localStorage.removeItem('basket');
		navigate('signIn');
	}, [navigate, setSearchByValue]);

	return {
		exitIconClickHandler,
		basketIconClickHandler,
		profileIconClickHandler,
		favoriteIconClickHandler,
		showIconButtons: getIsUserAuthorized(),
	};
};
