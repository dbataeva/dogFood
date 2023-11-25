import { FC, memo, useMemo } from 'react';
import { Badge, Card } from '@mui/material';

import { withQuery } from '../../../HOCs';
import { Product, TestIdType } from '../../../../types';
import { getPriceWithDiscount } from '../../../utils';
import {
	ProductImage,
	ProductCardActions,
	ProductMiniCardContent,
	ProductPrice,
} from '../../atoms';

type ProductMiniCardProps = Product &
	TestIdType & {
		navTo?: string;
		cutHeader?: boolean;
		cardWidth?: number;
	};

export const ProductMiniCard: FC<ProductMiniCardProps> = memo(
	({
		_id,
		name,
		price,
		likes,
		stock,
		navTo,
		testId,
		discount,
		pictures,
		cutHeader,
		cardWidth,
	}) => {
		const priceWithDiscount = useMemo(
			() => getPriceWithDiscount(price, discount),
			[discount, price]
		);

		return (
			<Badge
				key={_id}
				color={'warning'}
				badgeContent={discount ? `-${discount}%` : 0}
				anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
				<Card
					data-testid={testId}
					sx={{ width: cardWidth ?? '100%', height: 'fit-content' }}>
					<ProductMiniCardContent
						name={name}
						price={price}
						stock={stock}
						navTo={navTo}
						discount={discount}
						cutHeader={cutHeader}
						priceWithDiscount={priceWithDiscount}
						productImage={<ProductImage name={name} pictures={pictures} />}
						productPrice={
							<ProductPrice
								price={price}
								paddingLeft={2}
								discount={discount}
								priceWithDiscount={priceWithDiscount}
							/>
						}
					/>
					<ProductCardActions
						_id={_id}
						likes={likes}
						stock={stock}
						priceWithDiscount={priceWithDiscount}
					/>
				</Card>
			</Badge>
		);
	}
);

ProductMiniCard.displayName = 'ProductMiniCard';

export const ProductMiniCardWithQuery = withQuery(ProductMiniCard);
