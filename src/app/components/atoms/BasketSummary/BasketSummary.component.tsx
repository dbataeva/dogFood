import { FC, memo } from 'react';

type BasketSummaryProps = {
	commonSum: number;
	numberOfProductsInBasket: number;
};

export const BasketSummary: FC<BasketSummaryProps> = memo(
	({ commonSum, numberOfProductsInBasket }) => (
		<div>{`Количество продуктов: ${numberOfProductsInBasket} на общую сумму ${commonSum} рублей`}</div>
	)
);

BasketSummary.displayName = 'BasketSummary';
