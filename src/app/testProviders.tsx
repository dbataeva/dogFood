import { RouterProvider, createMemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { routerConfig } from './constants';
import { store } from './store/appStore';
import * as AuthorizedUtils from './utils/getIsUserAuthorized';
import { FC, ReactNode } from 'react';

export const testProvidersFn = (initialPath = '/', isAuthorized?: boolean) => {
	const router = createMemoryRouter(routerConfig, {
		initialEntries: [initialPath],
	});

	jest
		.spyOn(AuthorizedUtils, 'getIsUserAuthorized')
		.mockReturnValue(isAuthorized ? true : false);

	render(
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	);

	return router;
};

export const TestProvidersFC: FC<{ children: ReactNode }> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
