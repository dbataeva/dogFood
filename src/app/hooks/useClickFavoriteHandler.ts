import { useContext, useMemo } from 'react';

import { getIsLiked } from '../utils';
import { useChangeLikeStatusMutation } from '../../api';
import { PageContext } from '../providers';

type ClickFavoriteHandlerType = {
	likes?: string[];
	productId?: string;
	pageNumber?: number;
	currentUserId?: string;
};

export const useClickFavoriteHandler = ({
	likes,
	productId,
	pageNumber = 0,
	currentUserId,
}: ClickFavoriteHandlerType): (() => void) => {
	const { searchByValue } = useContext(PageContext);
	const like = useMemo(
		() => getIsLiked(likes, currentUserId),
		[currentUserId, likes]
	);

	const [changeLikeStatusFn] = useChangeLikeStatusMutation();

	if (!productId || !likes) {
		return () => {
			return;
		};
	}

	return () =>
		changeLikeStatusFn({
			productId,
			like,
			currentUserId,
			pageNumber,
			searchByValue,
		});
};
