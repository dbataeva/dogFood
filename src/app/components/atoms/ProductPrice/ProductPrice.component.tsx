import { CardHeader } from '@mui/material';
import { FC, memo } from 'react';
import { Product } from '../../../../types';

type ProductPriceProps = Pick<Product, 'discount' | 'price'> & {
	paddingLeft: number;
	priceWithDiscount: Product['price'];
};

export const ProductPrice: FC<ProductPriceProps> = memo(
	({ discount, price, paddingLeft, priceWithDiscount }) => (
		<CardHeader
			title={`${priceWithDiscount} ₽`}
			titleTypographyProps={{
				sx: {
					color: discount ? 'red' : undefined,
					marginBottom: discount ? 0 : 3,
				},
				paragraph: discount ? false : true,
			}}
			subheader={discount ? `${price}₽` : <></>}
			subheaderTypographyProps={{
				sx: {
					textDecoration: discount ? 'line-through' : 'none',
				},
			}}
			sx={{ paddingBottom: 0, paddingLeft }}
		/>
	)
);

ProductPrice.displayName = 'ProductPrice';
