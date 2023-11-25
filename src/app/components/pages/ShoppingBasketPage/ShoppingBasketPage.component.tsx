import { FC, memo } from 'react';
import { Box } from '@mui/material';

import { useGetProductsInBasket } from '../../../hooks';
import { ProductCardInBasket } from '../../organisms';
import { withAccessProtection } from '../../../HOCs';
import { TEXT_MAP } from './textMap';
import { BasketSummary } from '../../atoms';
import { TEST_ID_MAP } from '../constants';

export const ShoppingBasketPage: FC = memo(() => {
	const { commonSum, productsInBasket, numberOfProductsInBasket } =
		useGetProductsInBasket();

	return (
		<Box
			data-testid={TEST_ID_MAP.basketPage}
			sx={{
				maxWidth: '992px',
				marginInline: 'auto',
			}}>
			{numberOfProductsInBasket ? (
				productsInBasket.map((productInBasket) => {
					return (
						<ProductCardInBasket
							key={productInBasket._id}
							{...productInBasket}
						/>
					);
				})
			) : (
				<div>{TEXT_MAP.noProducts}</div>
			)}
			{numberOfProductsInBasket && (
				<BasketSummary
					commonSum={commonSum}
					numberOfProductsInBasket={numberOfProductsInBasket}
				/>
			)}
		</Box>
	);
});

ShoppingBasketPage.displayName = 'ShoppingBasketPage';

export const ShoppingBasketPageWithAccessProtection =
	withAccessProtection(ShoppingBasketPage);
