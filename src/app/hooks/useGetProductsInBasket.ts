import { useEffect, useMemo } from 'react';

import {
	fetchUserInfo,
	selectUser,
	useAppDispatch,
	useAppSelector,
	selectBasket,
} from '../store';
import { ProductInBasket } from '../../types';

type UseGetProductsInBasketType = {
	commonSum: number;
	numberOfProductsInBasket: number;
	productsInBasket: ProductInBasket[];
};

export const useGetProductsInBasket = (): UseGetProductsInBasketType => {
	const { currentUser } = useAppSelector(selectUser);
	const { productsInBasket } = useAppSelector(selectBasket);
	const dispatch = useAppDispatch();

	const numberOfProductsInBasket = useMemo(() => {
		return productsInBasket.reduce(
			(accum, currentProduct) => accum + currentProduct.number,
			0
		);
	}, [productsInBasket]);

	const commonSum = useMemo(() => {
		return productsInBasket.reduce(
			(accum, currentProduct) =>
				accum + currentProduct.price * currentProduct.number,
			0
		);
	}, [productsInBasket]);

	useEffect(() => {
		!currentUser && dispatch(fetchUserInfo());
	}, []);

	return { commonSum, productsInBasket, numberOfProductsInBasket };
};
