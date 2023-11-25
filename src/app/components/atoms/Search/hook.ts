import { ChangeEvent, useCallback, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PageContext } from '../../../providers';
import { SEARCH_PARAM_KEY } from './constants';

type UseSearchWithURLSearchParamsType = {
	searchByValue: string;
	cleanSearchValueHandler: () => void;
	searchByValueChangeHandler: (
		event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
};

export const useSearchWithURLSearchParams =
	(): UseSearchWithURLSearchParamsType => {
		const { searchByValue, setSearchByValue } = useContext(PageContext);
		const [searchParams, setSearchParams] = useSearchParams();

		useEffect(() => {
			const urlSearchValue = searchParams.get(SEARCH_PARAM_KEY);

			urlSearchValue && setSearchByValue(urlSearchValue);
		}, []);

		const searchByValueChangeHandler = useCallback(
			(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				const value = event.target.value;

				setSearchByValue(value);
				value
					? setSearchParams({ [SEARCH_PARAM_KEY]: value })
					: setSearchParams({});
			},
			[setSearchByValue, setSearchParams]
		);

		const cleanSearchValueHandler = useCallback(() => {
			setSearchByValue('');
			setSearchParams('');
		}, [setSearchByValue, setSearchParams]);

		return {
			searchByValue,
			cleanSearchValueHandler,
			searchByValueChangeHandler,
		};
	};
