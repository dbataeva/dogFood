import { SerializedError } from '@reduxjs/toolkit';
import { FC, ReactNode, memo, useRef } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { Badge, IconButton } from '@mui/material';
import { DeleteForeverOutlined } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

import { PRODUCT_CARD_LIST_TEST_ID_MAP, TEXT_MAP } from './constants';
import { withQuery } from '../../../HOCs';
import { Product, TestIdType } from '../../../../types';
import { ErrorResponse } from '../../../../api';
import {
	useIntersectionObserver,
	useDeleteProductHandler,
} from '../../../hooks';
import { ProductMiniCard } from '../../molecules';

type ProductCardListProps = {
	cardsArr: Product[];
	isError?: boolean;
	isLastPage?: boolean;
	refetch?: () => void;
	onScrollEnd?: VoidFunction;
	renderSpinner?: () => ReactNode;
	error?: FetchBaseQueryError | SerializedError;
	renderError?: (errorMessage: string, refetch?: VoidFunction) => ReactNode;
} & TestIdType;

export const ProductCardList: FC<ProductCardListProps> = memo(
	({
		error,
		testId,
		isError,
		refetch,
		cardsArr,
		renderError,
		onScrollEnd,
		renderSpinner,
		isLastPage = true,
	}) => {
		const location = useLocation();
		const showsSpinner = !isError && !isLastPage;
		const observedElementRef = useRef<HTMLDivElement | null>(null);
		const { clickDeleteProductHandler, currentUserId } =
			useDeleteProductHandler();

		useIntersectionObserver(observedElementRef, isLastPage, onScrollEnd);

		return (
			<>
				<div
					style={{
						rowGap: 16,
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
					}}>
					{!!cardsArr.length &&
						cardsArr.map((item) => {
							const pageNumber = Math.floor(
								cardsArr.findIndex((card) => card._id === item._id) / 12
							);
							const onClickHandler = clickDeleteProductHandler(
								item._id,
								pageNumber
							);

							return (
								<Badge
									key={item._id}
									color={'error'}
									badgeContent={
										item.author._id === currentUserId ? (
											<IconButton
												onClick={onClickHandler}
												aria-label='delete product'
												data-testid={
													PRODUCT_CARD_LIST_TEST_ID_MAP.deleteProductButton
												}>
												<DeleteForeverOutlined />
											</IconButton>
										) : undefined
									}
									anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
									<ProductMiniCard
										cutHeader
										key={item._id}
										cardWidth={236}
										testId={testId}
										pageNumber={pageNumber}
										navTo={
											location.pathname === '/'
												? `products/${item._id}`
												: `../${item._id}`
										}
										{...item}
									/>
								</Badge>
							);
						})}
				</div>
				<div ref={observedElementRef}>{showsSpinner && renderSpinner?.()}</div>
				{isLastPage && !!cardsArr.length && (
					<p style={{ margin: '0 auto' }}>{TEXT_MAP.endOfList}</p>
				)}
				{isError &&
					renderError?.((error as ErrorResponse).data.message, refetch)}
			</>
		);
	}
);

ProductCardList.displayName = 'ProductCardList';

export const ProductCardListWithQuery = withQuery(ProductCardList);
