import { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { NotFound, ProductCardSpinner } from '../../atoms';
import { ProductDetailCard } from '../../organisms';
import {
	fetchUserInfo,
	useAppDispatch,
	useAppSelector,
	selectUser,
} from '../../../store';
import { withAccessProtection } from '../../../HOCs';
import { useGetProductByIdQuery } from '../../../../api';
import { useGoBachHandler } from '../../../hooks';
import { TEST_ID_MAP } from '../constants';

const ProductPage: FC = memo(() => {
	const { productId } = useParams();
	const clickGoBachHandler = useGoBachHandler();

	const { currentUser } = useAppSelector(selectUser);
	const { isLoading, error, isError, data, refetch } = useGetProductByIdQuery(
		productId,
		{ skip: !productId }
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		!currentUser && dispatch(fetchUserInfo());
	}, []);

	return (
		<Box
			data-testid={TEST_ID_MAP.productPage}
			sx={{
				maxWidth: '992px',
				marginInline: 'auto',
			}}>
			<IconButton
				aria-label='go back'
				onClick={clickGoBachHandler}
				data-testid={TEST_ID_MAP.goBackButton}
				sx={{ alignSelf: 'flex-start', display: 'inline' }}>
				<ArrowBack />
			</IconButton>
			{data && (
				<ProductDetailCard
					error={error}
					product={data}
					isError={isError}
					refetch={refetch}
					isLoading={isLoading}
					renderError={() => <NotFound />}
					renderSpinner={() => <ProductCardSpinner />}
				/>
			)}
		</Box>
	);
});

ProductPage.displayName = 'ProductPage';

export const ProductPageWithAccessProtection =
	withAccessProtection(ProductPage);
