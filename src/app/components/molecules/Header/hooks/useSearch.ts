import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { PageContext } from '../../../../providers';

export const useSearch = (): boolean => {
	const [showSearch, setShowSearch] = useState(false);
	const { setSearchByValue } = useContext(PageContext);
	const { pathname } = useLocation();

	const isHomePage = pathname === '/';

	useEffect(() => {
		if (isHomePage) {
			setShowSearch(true);

			return;
		}

		setShowSearch(false);
		setSearchByValue('');
	}, [isHomePage, pathname, setSearchByValue]);

	return showSearch;
};
