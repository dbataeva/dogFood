import { FC, memo } from 'react';
import { Box, LinearProgress } from '@mui/material';

export const UserPageSpinner: FC = memo(() => (
	<Box sx={{ width: '100%' }}>
		<LinearProgress />
	</Box>
));

UserPageSpinner.displayName = 'UserPageSpinner';
