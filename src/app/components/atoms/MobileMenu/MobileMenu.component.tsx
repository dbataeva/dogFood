import { FC, memo, useMemo } from 'react';
import { Menu, MenuItem } from '@mui/material';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import {
	ExitToApp,
	FavoriteBorder,
	ShoppingBasketOutlined,
} from '@mui/icons-material';

import { ReactComponent as ProfileImg } from '../../../images/profile.svg';
import { TEXT_MAP } from './textMap';
import { useGetFavoriteProducts, useGetProductsInBasket } from '../../../hooks';

type MobileMenuProps = {
	mobileMenuId: string;
	exitIconClickHandler: () => void;
	handleMobileMenuClose: () => void;
	basketIconClickHandler: () => void;
	profileIconClickHandler: () => void;
	favoriteIconClickHandler: () => void;
	mobileMoreAnchorEl: HTMLElement | null;
};

export const MobileMenu: FC<MobileMenuProps> = memo(
	({
		mobileMenuId,
		mobileMoreAnchorEl,
		exitIconClickHandler,
		handleMobileMenuClose,
		basketIconClickHandler,
		profileIconClickHandler,
		favoriteIconClickHandler,
	}) => {
		const isMobileMenuOpen = useMemo(
			() => Boolean(mobileMoreAnchorEl),
			[mobileMoreAnchorEl]
		);
		const { numberOfFavoriteProducts } = useGetFavoriteProducts();
		const { numberOfProductsInBasket } = useGetProductsInBasket();

		return (
			<Menu
				anchorEl={mobileMoreAnchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				id={mobileMenuId}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={isMobileMenuOpen}
				onClose={handleMobileMenuClose}>
				<MenuItem onClick={favoriteIconClickHandler}>
					<IconButton
						size='large'
						aria-label='show 4 new mails'
						color='inherit'>
						<Badge badgeContent={numberOfFavoriteProducts} color='error'>
							<FavoriteBorder />
						</Badge>
					</IconButton>
					<p>{TEXT_MAP.favorite}</p>
				</MenuItem>
				<MenuItem onClick={basketIconClickHandler}>
					<IconButton
						size='large'
						aria-label='show 17 new notifications'
						color='inherit'>
						<Badge badgeContent={numberOfProductsInBasket} color='error'>
							<ShoppingBasketOutlined />
						</Badge>
					</IconButton>
					<p>{TEXT_MAP.basket}</p>
				</MenuItem>
				<MenuItem onClick={profileIconClickHandler}>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='primary-search-account-menu'
						aria-haspopup='true'
						color='inherit'>
						<ProfileImg />
					</IconButton>
					<p>{TEXT_MAP.profile}</p>
				</MenuItem>
				<MenuItem onClick={exitIconClickHandler}>
					<IconButton
						size={'large'}
						color={'inherit'}
						aria-label={'show 17 new notifications'}>
						<ExitToApp />
					</IconButton>
					<p>{TEXT_MAP.quit}</p>
				</MenuItem>
			</Menu>
		);
	}
);

MobileMenu.displayName = 'MobileMenu';
