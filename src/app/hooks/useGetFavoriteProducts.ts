import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useMemo, useEffect } from 'react';

import {
	selectUser,
	useAppDispatch,
	useAppSelector,
	fetchUserInfo,
} from '../store';
import { Product } from '../../types';
import { useGetProductsQuery } from '../../api';

type UseGetFavoriteProductsType = {
	isError: boolean;
	isLoading: boolean;
	refetch: VoidFunction;
	favoriteProducts: Product[];
	numberOfFavoriteProducts: number;
	error?: FetchBaseQueryError | SerializedError;
};

export const useGetFavoriteProducts = (): UseGetFavoriteProductsType => {
	const dispatch = useAppDispatch();
	const { currentUser } = useAppSelector(selectUser);
	const { data, error, isError, refetch, isLoading } = useGetProductsQuery();

	useEffect(() => {
		!currentUser && dispatch(fetchUserInfo());
	}, []);

	const favoriteProducts = useMemo(
		() =>
			data?.products.filter((product) =>
				product.likes.some((like) => like === currentUser?._id)
			),
		[currentUser?._id, data?.products]
	);

	return {
		error,
		isError,
		refetch,
		isLoading,
		favoriteProducts: favoriteProducts || [],
		numberOfFavoriteProducts: favoriteProducts?.length || 0,
	};
};
