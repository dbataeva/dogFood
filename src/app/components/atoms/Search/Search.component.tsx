import { FC, memo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { CancelOutlined } from '@mui/icons-material';

import { Styled } from './Search.styles';
import { TEXT_MAP } from './textMap';
import { useSearchWithURLSearchParams } from './hook';
import { TestIdType } from '../../../../types/testId';

export const Search: FC<TestIdType> = memo(({ testId }) => {
	const { searchByValue, cleanSearchValueHandler, searchByValueChangeHandler } =
		useSearchWithURLSearchParams();

	return (
		<Styled.Search data-testid={testId}>
			<Styled.SearchIconWrapper>
				<SearchIcon />
			</Styled.SearchIconWrapper>
			{searchByValue && (
				<Styled.SearchIconWrapper
					sx={{ right: 0, zIndex: 1 }}
					onClick={cleanSearchValueHandler}>
					<CancelOutlined />
				</Styled.SearchIconWrapper>
			)}
			<Styled.Input
				value={searchByValue}
				placeholder={TEXT_MAP.productName}
				inputProps={{ 'aria-label': 'search' }}
				onChange={searchByValueChangeHandler}
			/>
		</Styled.Search>
	);
});

Search.displayName = 'Search';
