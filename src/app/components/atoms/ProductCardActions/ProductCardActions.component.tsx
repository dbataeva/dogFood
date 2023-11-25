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
import { TEXT_MAP } from './textMap';
import { useClickFavoriteHandler, useManageBasket } from '../../../hooks';
import {
	fetchUserInfo,
	selectUser,
	useAppDispatch,
	useAppSelector,
} from '../../../store';
import { Product } from '../../../../types';

type ProductCardActions = Pick<Product, '_id' | 'likes' | 'stock'> & {
	priceWithDiscount: Product['price'];
};

export const ProductCardActions: FC<ProductCardActions> = memo(
	({ likes, _id, priceWithDiscount, stock }) => {
		const { currentUser } = useAppSelector(selectUser);

		const dispatch = useAppDispatch();

		useEffect(() => {
			!currentUser && dispatch(fetchUserInfo());
		}, []);

		const isLiked = useMemo(
			() => getIsLiked(likes, currentUser?._id),
			[currentUser?._id, likes]
		);

		const clickFavoriteHandler = useClickFavoriteHandler({
			likes,
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
						{TEXT_MAP.addToBasket}
					</Button>
				)}
				<IconButton
					aria-label='add to favorites'
					onClick={clickFavoriteHandler}>
					{isLiked ? <Favorite /> : <FavoriteBorder />}
				</IconButton>
			</CardActions>
		);
	}
);

ProductCardActions.displayName = 'ProductCardActions';
