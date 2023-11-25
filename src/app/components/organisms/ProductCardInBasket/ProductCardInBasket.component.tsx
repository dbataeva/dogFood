import { FC, memo, useState } from 'react';

import { useGetProductByIdQuery } from '../../../../api';
import { ProductInBasket } from '../../../../types';
import { Feedback, ProductCardSpinner } from '../../atoms';
import { ProductCardWithQuery } from '../../molecules';
import { TEXT_MAP } from './textMap';

export const ProductCardInBasket: FC<Pick<ProductInBasket, '_id'>> = memo(
	({ _id }) => {
		const { isLoading, error, isError, data, refetch } =
			useGetProductByIdQuery(_id);
		const [isErrorVisible, setIsErrorVisible] = useState(true);

		return (
			<ProductCardWithQuery
				error={error}
				isError={isError}
				refetch={refetch}
				isLoading={isLoading}
				renderError={() => (
					<Feedback
						state='error'
						isVisible={isErrorVisible}
						message={TEXT_MAP.errorText}
						setIsVisible={setIsErrorVisible}
					/>
				)}
				renderSpinner={() => <ProductCardSpinner />}
				navTo={`/products/${_id}`}
				{...data!}
			/>
		);
	}
);

ProductCardInBasket.displayName = 'ProductCardInBasket';
