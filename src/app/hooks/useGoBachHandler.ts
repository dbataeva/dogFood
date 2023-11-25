import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';

export const useGoBachHandler = () => {
	const navigate = useNavigate();
	const { state } = useLocation();

	return useCallback(() => {
		navigate(state?.prev || '/');
	}, [navigate, state]);
};
