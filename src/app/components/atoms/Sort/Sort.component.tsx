import { FC, memo, MouseEvent, useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SORT_BY } from './constants';

export const Sort: FC = memo(() => {
	const [sortBy, setSortBy] = useState(SORT_BY.popular);

	const handleChange = (
		event: MouseEvent<HTMLElement>,
		newAlignment: SORT_BY
	) => {
		setSortBy(newAlignment);
	};

	return (
		<ToggleButtonGroup
			color='primary'
			value={sortBy}
			exclusive
			onChange={handleChange}
			aria-label='Platform'
			sx={{ alignSelf: 'start' }}>
			<ToggleButton value={SORT_BY.popular}>{SORT_BY.popular}</ToggleButton>
			<ToggleButton value={SORT_BY.latest}>{SORT_BY.latest}</ToggleButton>
			<ToggleButton value={SORT_BY.cheapest}>{SORT_BY.cheapest}</ToggleButton>
			<ToggleButton value={SORT_BY.mostExpensive}>
				{SORT_BY.mostExpensive}
			</ToggleButton>
			<ToggleButton value={SORT_BY.rating}>{SORT_BY.rating}</ToggleButton>
			<ToggleButton value={SORT_BY.discount}>{SORT_BY.discount}</ToggleButton>
		</ToggleButtonGroup>
	);
});

Sort.displayName = 'Sort';
