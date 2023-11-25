import { useCallback, useContext, useEffect, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { PageContext } from '../providers';
import { useDebounce } from './useDebounce';
import { Products, useGetPaginatedProductsQuery } from '../../api';

type UseProductsListType = {
	data?: Products;
	isError: boolean;
	isLoading: boolean;
	isLastPage: boolean;
	refetch: VoidFunction;
	onScrollEnd: VoidFunction;
	error?: FetchBaseQueryError | SerializedError;
};

export const useProductsList = (): UseProductsListType => {
	const [pageNumber, setPageNumber] = useState(1);
	const { searchByValue } = useContext(PageContext);
	const searchByValueWithDelay = useDebounce(searchByValue);

	const onScrollEnd = useCallback(() => setPageNumber((prev) => prev + 1), []);

	const { data, error, isError, isLoading, refetch } =
		useGetPaginatedProductsQuery({
			query: searchByValueWithDelay,
			page: pageNumber,
		});

	useEffect(() => setPageNumber(1), [searchByValueWithDelay]);

	const isLastPage = data?.products?.length === data?.total;

	return {
		data,
		error,
		isError,
		refetch,
		isLoading,
		isLastPage,
		onScrollEnd,
	};
};
