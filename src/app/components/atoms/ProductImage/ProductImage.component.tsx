import { CardMedia } from '@mui/material';
import { FC, memo } from 'react';
import { Product } from '../../../../types';

export const ProductImage: FC<Pick<Product, 'name' | 'pictures'>> = memo(
	({ name, pictures }) => (
		<CardMedia
			component='img'
			image={pictures}
			alt={name}
			width={236}
			height={236}
			sx={{ maxWidth: 236 }}
		/>
	)
);

ProductImage.displayName = 'ProductImage';
