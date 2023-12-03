import { useCallback, useContext, useEffect } from 'react';
import {
	selectUser,
	setUserData,
	useAppDispatch,
	useAppSelector,
} from '../store';
import { useDeleteProductMutation, useGetUserInfoQuery } from '../../api';
import { PageContext } from '../providers';

type UseDeleteProductHandlerType = {
	currentUserId?: string;
	clickDeleteProductHandler: (
		id: string,
		pageNumber?: number
	) => () => Promise<any>;
};

export const useDeleteProductHandler = (): UseDeleteProductHandlerType => {
	const [deleteProductFn] = useDeleteProductMutation();
	const { currentUser } = useAppSelector(selectUser);
	const { searchByValue } = useContext(PageContext);
	const { data: userData, isSuccess } = useGetUserInfoQuery(undefined, {
		skip: !!currentUser,
	});
	const dispatch = useAppDispatch();

	useEffect(() => {
		isSuccess && dispatch(setUserData(userData));
	}, [userData, dispatch, isSuccess]);

	const clickDeleteProductHandler = useCallback(
		(id: string, pageNumber?: number) => {
			return () =>
				deleteProductFn({ productId: id, pageNumber, searchByValue });
		},
		[deleteProductFn, searchByValue]
	);

	return {
		clickDeleteProductHandler,
		currentUserId: currentUser?._id,
	};
};
