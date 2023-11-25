import { FC, memo, useContext } from 'react';
import { Typography } from '@mui/material';
import { Masonry } from '@mui/lab';

import { Sort, MiniCardSpinner, ErrorComponent } from '../../atoms';
import { ProductCardListWithQuery } from '../../organisms';
import { Styled } from './HomePage.styles';
import { PageContext } from '../../../providers';
import { useProductsList } from '../../../hooks';
import { withAccessProtection } from '../../../HOCs';
import { TEST_ID_MAP } from '../constants';

const HomePage: FC = memo(() => {
	const { searchByValue } = useContext(PageContext);
	const { data, error, isError, isLoading, isLastPage, refetch, onScrollEnd } =
		useProductsList();

	return (
		<>
			{!!searchByValue && (
				<Styled.Paper elevation={0}>
					<Typography>
						{`По запросу ${searchByValue} найдено ${data?.total} товаров`}
					</Typography>
				</Styled.Paper>
			)}
			<Styled.Container data-testid={TEST_ID_MAP.homePage}>
				<Sort />
				<ProductCardListWithQuery
					error={error}
					isError={isError}
					refetch={refetch}
					isLoading={isLoading}
					isLastPage={isLastPage}
					onScrollEnd={onScrollEnd}
					cardsArr={data?.products || []}
					testId={TEST_ID_MAP.productMiniCard}
					renderError={(errorMessage: string, refetch?: VoidFunction) => (
						<ErrorComponent refetch={refetch} errorMessage={errorMessage} />
					)}
					renderSpinner={() => (
						<Masonry columns={4} spacing={4}>
							<MiniCardSpinner />
							<MiniCardSpinner />
							<MiniCardSpinner />
							<MiniCardSpinner />
						</Masonry>
					)}
				/>
			</Styled.Container>
		</>
	);
});

HomePage.displayName = 'HomePage';

export const HomePageWithAccessProtection = withAccessProtection(HomePage);
