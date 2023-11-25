import { FC, memo } from 'react';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';

import { Footer, Header } from './components';
import { PageProvider } from './providers';

export const AppComponent: FC = memo(() => {
	return (
		<PageProvider>
			<Header />
			<Box sx={{ minHeight: 'calc(100% - 274px)' }}>
				<Outlet />
			</Box>
			<Footer />
		</PageProvider>
	);
});

AppComponent.displayName = 'AppComponent';
