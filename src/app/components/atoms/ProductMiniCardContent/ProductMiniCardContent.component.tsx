import { FC, ReactElement, memo } from 'react';
import CardContent from '@mui/material/CardContent';

import { withLink } from '../../../HOCs';
import { Styled } from './ProductMiniCardContent.styles';
import { Product } from '../../../../types';

type ProductMiniCardContentProps = Pick<
	Product,
	'name' | 'discount' | 'stock' | 'price'
> & {
	cutHeader?: boolean;
	productPrice: ReactElement;
	productImage: ReactElement;
	priceWithDiscount: Product['price'];
};

const ProductMiniCardContent: FC<ProductMiniCardContentProps> = memo(
	({ name, stock, cutHeader, productImage, productPrice }) => {
		return (
			<>
				{productImage}
				<CardContent sx={{ padding: 0 }}>
					{productPrice}
					<Styled.CardHeader
						title={name}
						titleTypographyProps={{ noWrap: cutHeader, variant: 'h6' }}
						subheader={`${stock} шт.`}
					/>
				</CardContent>
			</>
		);
	}
);

ProductMiniCardContent.displayName = 'ProductMiniCardContent';

export const ProductMiniCardContentWithLink = withLink(ProductMiniCardContent);
