import { FC, memo } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';

import { Contacts, Logo, MenuItemsList } from '../../atoms';
import { Styled } from './Footer.styles';
import { TEST_ID_MAP, LEFT_MENU_ITEMS, RIGHT_MENU_ITEMS } from './constants';

export const Footer: FC = memo(() => {
	return (
		<Box sx={{ flexGrow: 1 }} data-testid={TEST_ID_MAP.footer}>
			<AppBar
				color='primary'
				position='sticky'
				sx={{ top: 'auto', bottom: 0, height: '194px' }}>
				<Toolbar>
					<IconButton color='inherit' aria-label='open drawer'>
						<Logo testId={TEST_ID_MAP.logo} />
					</IconButton>
					<Box sx={{ flexGrow: 1 }} />
					<Styled.Container>
						<MenuItemsList textArr={LEFT_MENU_ITEMS} />
						<MenuItemsList textArr={RIGHT_MENU_ITEMS} />
						<Contacts testId={TEST_ID_MAP.contacts} />
					</Styled.Container>
				</Toolbar>
			</AppBar>
		</Box>
	);
});

Footer.displayName = 'Footer';
