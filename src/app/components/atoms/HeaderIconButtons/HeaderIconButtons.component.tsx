import { FC, memo } from 'react';
import Badge from '@mui/material/Badge';
import MoreIcon from '@mui/icons-material/MoreVert';
import {
	ExitToApp,
	FavoriteBorder,
	ShoppingBasketOutlined,
} from '@mui/icons-material';

import { Box, IconButton } from '@mui/material';
import { MENU_ID, TEST_ID_MAP } from './constants';
import { ReactComponent as ProfileImg } from '../../../images/profile.svg';
import { useGetFavoriteProducts, useGetProductsInBasket } from '../../../hooks';
import { TestIdType } from '../../../../types/testId';

type HeaderIconButtonsProps = TestIdType & {
	mobileMenuId: string;
	exitIconClickHandler: () => void;
	basketIconClickHandler: () => void;
	profileIconClickHandler: () => void;
	favoriteIconClickHandler: () => void;
	handleMobileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
};

export const HeaderIconButtons: FC<HeaderIconButtonsProps> = memo(
	({
		testId,
		mobileMenuId,
		handleMobileMenuOpen,
		exitIconClickHandler,
		basketIconClickHandler,
		profileIconClickHandler,
		favoriteIconClickHandler,
	}) => {
		const { numberOfFavoriteProducts } = useGetFavoriteProducts();
		const { numberOfProductsInBasket } = useGetProductsInBasket();

		return (
			<>
				<Box sx={{ display: { xs: 'none', md: 'flex' } }} data-testid={testId}>
					<IconButton
						size={'large'}
						color={'inherit'}
						aria-label={'favorites'}
						onClick={favoriteIconClickHandler}
						data-testid={TEST_ID_MAP.favorite}>
						<Badge badgeContent={numberOfFavoriteProducts} color={'error'}>
							<FavoriteBorder />
						</Badge>
					</IconButton>
					<IconButton
						size={'large'}
						color={'inherit'}
						onClick={basketIconClickHandler}
						aria-label={'basket'}
						data-testid={TEST_ID_MAP.basket}>
						<Badge badgeContent={numberOfProductsInBasket} color={'error'}>
							<ShoppingBasketOutlined />
						</Badge>
					</IconButton>
					<IconButton
						size={'large'}
						edge={'end'}
						aria-label={'account of current user'}
						aria-controls={MENU_ID}
						aria-haspopup={'true'}
						color={'inherit'}
						data-testid={TEST_ID_MAP.profile}
						onClick={profileIconClickHandler}>
						<ProfileImg style={{ color: 'white' }} />
					</IconButton>
					<IconButton
						size={'large'}
						color={'inherit'}
						onClick={exitIconClickHandler}
						data-testid={TEST_ID_MAP.quit}
						aria-label={'quit'}>
						<ExitToApp />
					</IconButton>
				</Box>
				<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						size={'large'}
						aria-label={'show more'}
						aria-controls={mobileMenuId}
						aria-haspopup={'true'}
						color={'inherit'}
						onClick={handleMobileMenuOpen}>
						<MoreIcon />
					</IconButton>
				</Box>
			</>
		);
	}
);

HeaderIconButtons.displayName = 'HeaderIconButtons';
