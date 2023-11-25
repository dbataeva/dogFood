import { useState, useEffect } from 'react';

const DEBOUNCE_DELAY = 500;

export const useDebounce = <T>(value: T): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, DEBOUNCE_DELAY);

		return () => {
			clearTimeout(handler);
		};
	}, [value]);

	return debouncedValue;
};
