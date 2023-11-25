export const getIsLiked = (likes?: string[], currentUserId?: string): boolean =>
	!!likes?.some((like) => like === currentUserId);
