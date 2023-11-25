import { ComponentType, FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { getIsUserAuthorized } from '../utils';

const routesForUnauthorized = ['/signIn', '/signUp'];

export type LocationStateType = {
	destination: string;
};

export const withAccessProtection = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<P> = (props) => {
		const isAuthorized = getIsUserAuthorized();

		const navigate = useNavigate();
		const { pathname } = useLocation();

		useEffect(() => {
			if (!isAuthorized && !routesForUnauthorized.includes(pathname)) {
				navigate('/signIn', { state: { destination: pathname } });
			}
		}, [isAuthorized, navigate, pathname]);

		return <WrappedComponent {...props} />;
	};

	return ReturnedComponent;
};
