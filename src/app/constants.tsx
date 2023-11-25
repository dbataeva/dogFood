import { AppComponent } from './App.component';
import {
	NotFoundPage,
	HomePage,
	UserPage,
	ErrorPage,
	ProductPage,
	FavoriteProductsPage,
	SignUpPage,
	SignInPage,
	ShoppingBasketPage,
} from './components';

export const routerConfig = [
	{
		path: '/',
		element: <AppComponent />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: 'signUp',
				element: <SignUpPage />,
			},
			{
				path: 'signIn',
				element: <SignInPage />,
			},
			{
				path: 'products/:productId',
				element: <ProductPage />,
			},
			{
				path: 'products/favorite',
				element: <FavoriteProductsPage />,
			},
			{
				path: 'users/me',
				element: <UserPage />,
			},
			{
				path: 'basket',
				element: <ShoppingBasketPage />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
];
