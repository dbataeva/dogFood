import { FC, memo } from 'react';

import { ProductReviews } from '../../atoms';
import { withQuery } from '../../../HOCs';
import { Product } from '../../../../types';
import { ProductCard, ReviewForm } from '../../molecules';

export const ProductDetailCard: FC<{ product: Product }> = memo(
	({ product }) => (
		<>
			<ProductCard {...product} />
			<ProductReviews productId={product._id} reviews={product.reviews} />
			<ReviewForm productId={product._id} />
		</>
	)
);

ProductDetailCard.displayName = 'ProductDetailCard';

export const ProductDetailCardWithQuery = withQuery(ProductDetailCard);
