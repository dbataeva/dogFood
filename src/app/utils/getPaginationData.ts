export const getPaginationData = <T>(
	array: T[],
	currentPage: number,
	itemsOnPage: number
): T[] => {
	const from = itemsOnPage * (currentPage - 1);
	const to = itemsOnPage * currentPage;

	return array.slice(from, to > array.length ? undefined : to);
};
