import { FC, memo, useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { NotFound, ProductCardSpinner } from '../../atoms';
import { ProductDetailCard } from '../../organisms';
import {
	useAppDispatch,
	useAppSelector,
	selectUser,
	setUserData,
} from '../../../store';
import { withAccessProtection } from '../../../HOCs';
import { useGetProductByIdQuery, useGetUserInfoQuery } from '../../../../api';
import { useGoBachHandler } from '../../../hooks';
import { PAGES_TEST_ID_MAP } from '../constants';

const ProductPage: FC = memo(() => {
	const { productId } = useParams();
	const clickGoBachHandler = useGoBachHandler();

	const { currentUser } = useAppSelector(selectUser);
	const { data: userData, isSuccess } = useGetUserInfoQuery(undefined, {
		skip: !!currentUser,
	});
	const {
		isLoading,
		error,
		isError,
		data: productsData,
		refetch,
	} = useGetProductByIdQuery(productId, { skip: !productId });
	const dispatch = useAppDispatch();

	useEffect(() => {
		isSuccess && dispatch(setUserData(userData));
	}, [userData, dispatch, isSuccess]);

	return (
		<Box
			data-testid={PAGES_TEST_ID_MAP.productPage}
			sx={{
				maxWidth: '992px',
				marginInline: 'auto',
			}}>
			<IconButton
				aria-label='go back'
				onClick={clickGoBachHandler}
				data-testid={PAGES_TEST_ID_MAP.goBackButton}
				sx={{ alignSelf: 'flex-start', display: 'inline' }}>
				<ArrowBack />
			</IconButton>
			{productsData && (
				<ProductDetailCard
					error={error}
					product={productsData}
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
