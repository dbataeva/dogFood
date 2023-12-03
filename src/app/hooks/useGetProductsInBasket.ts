import { useEffect, useMemo } from 'react';

import {
	selectUser,
	useAppDispatch,
	useAppSelector,
	selectBasket,
	setUserData,
} from '../store';
import { ProductInBasket } from '../../types';
import { useGetUserInfoQuery } from '../../api';

type UseGetProductsInBasketType = {
	commonSum: number;
	numberOfProductsInBasket: number;
	productsInBasket: ProductInBasket[];
};

export const useGetProductsInBasket = (): UseGetProductsInBasketType => {
	const { currentUser } = useAppSelector(selectUser);
	const { data: userData, isSuccess } = useGetUserInfoQuery(undefined, {
		skip: !!currentUser,
	});
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
		isSuccess && dispatch(setUserData(userData));
	}, [userData, dispatch, isSuccess]);

	return { commonSum, productsInBasket, numberOfProductsInBasket };
};
