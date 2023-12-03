import { FC, memo, useEffect, useMemo } from 'react';
import { Button, IconButton } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import {
	Add,
	DeleteForever,
	Favorite,
	FavoriteBorder,
	Remove,
} from '@mui/icons-material';

import { getIsLiked } from '../../../utils';
import {
	PRODUCT_CARD_ACTIONS_TEXT_MAP,
	PRODUCT_CARD_ACTIONS_TEST_ID_MAP,
} from './constants';
import { useClickFavoriteHandler, useManageBasket } from '../../../hooks';
import {
	selectUser,
	setUserData,
	useAppDispatch,
	useAppSelector,
} from '../../../store';
import { Product } from '../../../../types';
import { useGetUserInfoQuery } from '../../../../api';

type ProductCardActions = Pick<Product, '_id' | 'likes' | 'stock'> & {
	priceWithDiscount: Product['price'];
	pageNumber?: number;
};

export const ProductCardActions: FC<ProductCardActions> = memo(
	({ likes, _id, priceWithDiscount, stock, pageNumber = 0 }) => {
		const { currentUser } = useAppSelector(selectUser);
		const { data, isSuccess } = useGetUserInfoQuery(undefined, {
			skip: !!currentUser,
		});

		const dispatch = useAppDispatch();

		useEffect(() => {
			isSuccess && dispatch(setUserData(data));
		}, [data, dispatch, isSuccess]);

		const isLiked = useMemo(
			() => getIsLiked(likes, currentUser?._id),
			[currentUser?._id, likes]
		);

		const clickFavoriteHandler = useClickFavoriteHandler({
			likes,
			pageNumber,
			productId: _id,
			currentUserId: currentUser?._id,
		});

		const {
			numberOfProducts,
			isProductInBasket,
			clickDeleteProductFromBasket,
			clickAddProductToBasketHandler,
			clickRemoveOneProductFromBasket,
		} = useManageBasket(_id, priceWithDiscount);

		return (
			<CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
				{isProductInBasket ? (
					<>
						<IconButton
							color={'inherit'}
							aria-label={'remove product'}
							onClick={clickDeleteProductFromBasket}>
							<DeleteForever />
						</IconButton>
						<IconButton
							color={'inherit'}
							aria-label={'remove one product'}
							onClick={clickRemoveOneProductFromBasket}>
							<Remove />
						</IconButton>
						{numberOfProducts}
						<IconButton
							color={'inherit'}
							aria-label={'add one more product'}
							disabled={numberOfProducts === stock}
							onClick={clickAddProductToBasketHandler}>
							<Add />
						</IconButton>
					</>
				) : (
					<Button
						disabled={!stock}
						variant='contained'
						onClick={clickAddProductToBasketHandler}>
						{PRODUCT_CARD_ACTIONS_TEXT_MAP.addToBasket}
					</Button>
				)}
				<IconButton
					aria-label='add to favorites'
					onClick={clickFavoriteHandler}
					data-testid={PRODUCT_CARD_ACTIONS_TEST_ID_MAP.likeButton}>
					{isLiked ? (
						<Favorite
							data-testid={PRODUCT_CARD_ACTIONS_TEST_ID_MAP.likedIcon}
						/>
					) : (
						<FavoriteBorder
							data-testid={PRODUCT_CARD_ACTIONS_TEST_ID_MAP.nonLikedIcon}
						/>
					)}
				</IconButton>
			</CardActions>
		);
	}
);

ProductCardActions.displayName = 'ProductCardActions';
