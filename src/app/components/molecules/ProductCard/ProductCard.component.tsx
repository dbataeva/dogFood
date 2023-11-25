import { FC, memo, useMemo } from 'react';
import { Box, Card } from '@mui/material';

import { getPriceWithDiscount } from '../../../utils';
import {
	ProductCardActions,
	ProductImage,
	ProductPrice,
	ProductCardContentWithLink,
} from '../../atoms';
import { Product } from '../../../../types';
import { withQuery } from '../../../HOCs';

type ProductCardProps = Product & {
	navTo?: string;
};

export const ProductCard: FC<ProductCardProps> = memo(
	({
		_id,
		name,
		price,
		likes,
		stock,
		navTo,
		discount,
		pictures,
		description,
	}) => {
		const priceWithDiscount = useMemo(
			() => getPriceWithDiscount(price, discount),
			[discount, price]
		);

		return (
			<Card sx={{ display: 'flex' }}>
				<ProductImage name={name} pictures={pictures} />
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<ProductCardContentWithLink
						name={name}
						navTo={navTo}
						description={description}
						productPrice={
							<ProductPrice
								paddingLeft={0}
								price={price}
								discount={discount}
								priceWithDiscount={priceWithDiscount}
							/>
						}
					/>
					<Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
						<ProductCardActions
							_id={_id}
							likes={likes}
							stock={stock}
							priceWithDiscount={priceWithDiscount}
						/>
					</Box>
				</Box>
			</Card>
		);
	}
);

ProductCard.displayName = 'ProductCard';

export const ProductCardWithQuery = withQuery(ProductCard);
