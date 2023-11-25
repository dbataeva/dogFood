import { FC, Fragment, memo, useEffect, useCallback } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Typography, IconButton } from '@mui/material';
import { DeleteForever } from '@mui/icons-material';

import { Product } from '../../../../types';
import {
	fetchUserInfo,
	selectUser,
	useAppDispatch,
	useAppSelector,
} from '../../../store';
import { useDeleteReviewMutation } from '../../../../api';
import { TEST_ID_MAP } from './testIdMap';

type ProductReviewsProps = {
	reviews?: Product['reviews'];
	productId: string;
};

export const ProductReviews: FC<ProductReviewsProps> = memo(
	({ productId, reviews }) => {
		const dispatch = useAppDispatch();
		const { currentUser } = useAppSelector(selectUser);
		const [deleteReviewFn] = useDeleteReviewMutation();

		const clickDeleteReviewHandler = useCallback(
			(id: string) => {
				return () => deleteReviewFn({ productId, reviewId: id });
			},
			[deleteReviewFn, productId]
		);

		useEffect(() => {
			!currentUser && dispatch(fetchUserInfo());
		}, []);

		return (
			<List
				data-testid={TEST_ID_MAP.reviewsList}
				sx={{
					width: '100%',
					maxWidth: '992px',
					marginInline: 'auto',
					bgcolor: 'background.paper',
				}}>
				{reviews?.map((review) => {
					const deleteReview = clickDeleteReviewHandler(review._id);

					return (
						<Fragment key={review._id}>
							<ListItem
								alignItems='flex-start'
								data-testid={TEST_ID_MAP.review}>
								<ListItemAvatar>
									<Avatar alt='Remy Sharp' src={review.author.avatar} />
								</ListItemAvatar>
								<ListItemText
									primary={review.author.name}
									secondary={
										<>
											<Typography
												sx={{ display: 'inline' }}
												component='span'
												variant='body2'
												color='text.primary'>
												{review.text}
											</Typography>
										</>
									}
								/>
								{review.author._id === currentUser?._id && (
									<IconButton
										onClick={deleteReview}
										data-testid={TEST_ID_MAP.deleteReviewButton}>
										<DeleteForever />
									</IconButton>
								)}
							</ListItem>
							<Divider variant='inset' component='li' />
						</Fragment>
					);
				})}
			</List>
		);
	}
);

ProductReviews.displayName = 'ProductReviews';
