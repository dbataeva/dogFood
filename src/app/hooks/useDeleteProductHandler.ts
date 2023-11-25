import { useCallback, useEffect } from 'react';
import {
	fetchUserInfo,
	selectUser,
	useAppDispatch,
	useAppSelector,
} from '../store';
import { useDeleteProductMutation } from '../../api';

type UseDeleteProductHandlerType = {
	clickDeleteProductHandler: (id: string) => () => Promise<any>;
	currentUserId?: string;
};

export const useDeleteProductHandler = (): UseDeleteProductHandlerType => {
	const [deleteProductFn] = useDeleteProductMutation();
	const { currentUser } = useAppSelector(selectUser);
	const dispatch = useAppDispatch();

	useEffect(() => {
		!currentUser && dispatch(fetchUserInfo());
	}, []);

	const clickDeleteProductHandler = useCallback(
		(id: string) => {
			return () => deleteProductFn(id);
		},
		[deleteProductFn]
	);

	return {
		clickDeleteProductHandler,
		currentUserId: currentUser?._id,
	};
};
