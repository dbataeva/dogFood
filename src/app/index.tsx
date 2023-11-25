import { FC, memo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './styles.css';
import { Provider } from 'react-redux';
import { store } from './store/appStore';
import { routerConfig } from './constants';

const router = createBrowserRouter(routerConfig);

export const App: FC = memo(() => (
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
));

App.displayName = 'App';
