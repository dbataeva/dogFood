import { FC, memo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Card } from '@mui/material';

export const MiniCardSpinner: FC = memo(() => (
	<Card
		sx={{
			width: 236,
			height: 359,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
		<CircularProgress />
	</Card>
));

MiniCardSpinner.displayName = 'MiniCardSpinner';
