import { useCallback } from 'react';

import {
	selectBasket,
	useAppDispatch,
	useAppSelector,
	addProductToBasket,
	decreaseNumberOfProductsInBasket,
	deleteProductFromBasket,
} from '../store';
import { Product } from '../../types';

type UseManageBasketType = {
	numberOfProducts: number;
	isProductInBasket: boolean;
	clickDeleteProductFromBasket: () => void;
	clickAddProductToBasketHandler: () => void;
	clickRemoveOneProductFromBasket: () => void;
};

export const useManageBasket = (
	_id: Product['_id'],
	priceWithDiscount: Product['price']
): UseManageBasketType => {
	const dispatch = useAppDispatch();
	const { productsInBasket } = useAppSelector(selectBasket);

	const clickAddProductToBasketHandler = useCallback(() => {
		dispatch(addProductToBasket({ _id, price: priceWithDiscount }));
	}, [_id, dispatch, priceWithDiscount]);

	const clickRemoveOneProductFromBasket = useCallback(() => {
		dispatch(decreaseNumberOfProductsInBasket(_id));
	}, [_id, dispatch]);

	const clickDeleteProductFromBasket = useCallback(() => {
		dispatch(deleteProductFromBasket(_id));
	}, [_id, dispatch]);

	const isProductInBasket = productsInBasket.find(
		(product) => product._id === _id
	);

	return {
		clickDeleteProductFromBasket,
		clickAddProductToBasketHandler,
		clickRemoveOneProductFromBasket,
		isProductInBasket: !!isProductInBasket,
		numberOfProducts: isProductInBasket?.number || 0,
	};
};
