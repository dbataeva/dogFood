import { createSlice } from '@reduxjs/toolkit';

import { ProductInBasket } from '../../../types';

export const sliceName = 'basket';

const getInitialState = () => {
	const stateFromLocalStorage = window.localStorage.getItem(sliceName);

	return stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : [];
};

const setState = (state: ProductInBasket[]) => {
	window.localStorage.setItem(sliceName, JSON.stringify(state));
};

type BasketSlice = {
	productsInBasket: ProductInBasket[];
};

const initialState: BasketSlice = {
	productsInBasket: getInitialState(),
};

export const basketSlice = createSlice({
	name: sliceName,
	initialState,
	reducers: {
		addProductToBasket: (state, action) => {
			const isProductInBasket = state.productsInBasket.find(
				(productInBasket) => productInBasket._id === action.payload._id
			);

			if (isProductInBasket) {
				state.productsInBasket = state.productsInBasket.map((productInBasket) =>
					productInBasket._id === action.payload._id
						? {
								_id: productInBasket._id,
								price: productInBasket.price,
								number: productInBasket.number + 1,
						  }
						: productInBasket
				);
			} else {
				state.productsInBasket = [
					...state.productsInBasket,
					{ ...action.payload, number: 1 },
				];
			}
			setState(state.productsInBasket);
		},
		decreaseNumberOfProductsInBasket: (state, action) => {
			const productInBasket = state.productsInBasket.find(
				(productInBasket) => productInBasket._id === action.payload
			);

			if (productInBasket)
				if (productInBasket.number > 1) {
					state.productsInBasket = state.productsInBasket.map(
						(productInBasket) =>
							productInBasket._id === action.payload
								? {
										_id: productInBasket._id,
										price: productInBasket.price,
										number: productInBasket.number - 1,
								  }
								: productInBasket
					);
				} else {
					state.productsInBasket = state.productsInBasket.filter(
						(productInBasket) => productInBasket._id !== action.payload
					);
				}
			setState(state.productsInBasket);
		},
		deleteProductFromBasket: (state, action) => {
			state.productsInBasket = state.productsInBasket.filter(
				(productInBasket) => productInBasket._id !== action.payload
			);
			setState(state.productsInBasket);
		},
	},
});

export const {
	addProductToBasket,
	deleteProductFromBasket,
	decreaseNumberOfProductsInBasket,
} = basketSlice.actions;

export const basketReducer = basketSlice.reducer;
