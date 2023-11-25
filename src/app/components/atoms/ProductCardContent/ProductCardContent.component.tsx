import { FC, ReactElement, memo } from 'react';
import { CardContent, Typography } from '@mui/material';

import { withLink } from '../../../HOCs';
import { Product } from '../../../../types';

type ProductCardContentProps = Pick<Product, 'name' | 'description'> & {
	productPrice: ReactElement;
};

export const ProductCardContent: FC<ProductCardContentProps> = memo(
	({ name, description, productPrice }) => (
		<CardContent sx={{ flex: '1 0 auto', paddingLeft: 3 }}>
			<Typography component='div' variant='h5'>
				{name}
			</Typography>
			<Typography variant='subtitle1' color='text.secondary' component='div'>
				{description}
			</Typography>
			{productPrice}
		</CardContent>
	)
);

ProductCardContent.displayName = 'ProductCardContent';

export const ProductCardContentWithLink = withLink(ProductCardContent);
