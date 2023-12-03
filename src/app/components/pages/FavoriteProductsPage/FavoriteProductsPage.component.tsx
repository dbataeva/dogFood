import { FC, memo } from 'react';
import { Box } from '@mui/material';
import { Masonry } from '@mui/lab';

import { MiniCardSpinner, ErrorComponent } from '../../atoms';
import { ProductCardListWithQuery } from '../../organisms';
import { useGetFavoriteProducts } from '../../../hooks';
import { withAccessProtection } from '../../../HOCs';
import { TEXT_MAP } from './testMap';
import { PAGES_TEST_ID_MAP } from '../constants';

const FavoriteProductsPage: FC = memo(() => {
	const {
		error,
		isError,
		refetch,
		isLoading,
		favoriteProducts,
		numberOfFavoriteProducts,
	} = useGetFavoriteProducts();

	return (
		<Box
			data-testid={PAGES_TEST_ID_MAP.favoritePage}
			sx={{ width: '992px', marginInline: 'auto' }}>
			<ProductCardListWithQuery
				error={error}
				isError={isError}
				refetch={refetch}
				isLoading={isLoading}
				cardsArr={favoriteProducts}
				testId={PAGES_TEST_ID_MAP.productMiniCard}
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
			{!isLoading && !numberOfFavoriteProducts && (
				<div>{TEXT_MAP.noneOfFavorites}</div>
			)}
		</Box>
	);
});

FavoriteProductsPage.displayName = 'FavoriteProductsPage';

export const FavoriteProductsPageWithAccessProtection =
	withAccessProtection(FavoriteProductsPage);
