import { FC, memo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import { Logo, MobileMenu, Search, HeaderIconButtons } from '../../atoms';
import { MOBILE_MENU_ID, TEST_ID_MAP } from './constants';
import { useIconButtons, useSearch } from './hooks';

export const Header: FC = memo(() => {
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		useState<null | HTMLElement>(null);

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const showSearch = useSearch();
	const {
		showIconButtons,
		exitIconClickHandler,
		basketIconClickHandler,
		profileIconClickHandler,
		favoriteIconClickHandler,
	} = useIconButtons(handleMobileMenuClose);

	return (
		<Box
			data-testid={TEST_ID_MAP.header}
			sx={{ flexGrow: 1, marginBottom: '20px' }}>
			<AppBar position={'static'}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<IconButton
						size={'large'}
						edge={'start'}
						color={'inherit'}
						aria-label={'open drawer'}
						sx={{ mr: 2 }}>
						<Logo testId={TEST_ID_MAP.logo} />
					</IconButton>
					{showSearch && <Search testId={TEST_ID_MAP.searchBar} />}
					{showIconButtons && (
						<HeaderIconButtons
							testId={TEST_ID_MAP.navIcons}
							mobileMenuId={MOBILE_MENU_ID}
							exitIconClickHandler={exitIconClickHandler}
							handleMobileMenuOpen={handleMobileMenuOpen}
							basketIconClickHandler={basketIconClickHandler}
							profileIconClickHandler={profileIconClickHandler}
							favoriteIconClickHandler={favoriteIconClickHandler}
						/>
					)}
				</Toolbar>
			</AppBar>
			{showIconButtons && (
				<MobileMenu
					mobileMenuId={MOBILE_MENU_ID}
					mobileMoreAnchorEl={mobileMoreAnchorEl}
					exitIconClickHandler={exitIconClickHandler}
					handleMobileMenuClose={handleMobileMenuClose}
					basketIconClickHandler={basketIconClickHandler}
					profileIconClickHandler={profileIconClickHandler}
					favoriteIconClickHandler={favoriteIconClickHandler}
				/>
			)}
		</Box>
	);
});

Header.displayName = 'Header';
