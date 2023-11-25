import { useMemo } from 'react';

import { getIsLiked } from '../utils';
import { useChangeLikeStatusMutation } from '../../api';

type ClickFavoriteHandlerType = {
	likes?: string[];
	productId?: string;
	currentUserId?: string;
};

export const useClickFavoriteHandler = ({
	likes,
	productId,
	currentUserId,
}: ClickFavoriteHandlerType): (() => void) => {
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

	return () => changeLikeStatusFn({ productId, like });
};
