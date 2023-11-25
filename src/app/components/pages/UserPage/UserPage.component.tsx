import { FC, memo } from 'react';
import { Box } from '@mui/material';

import { UserPageSpinner, UserCard } from '../../atoms';
import { CreateProductForm } from '../../molecules';
import { selectUser, useAppSelector } from '../../../store';
import { withAccessProtection } from '../../../HOCs';
import { TEST_ID_MAP } from '../constants';

const UserPage: FC = memo(() => {
	const { currentUser } = useAppSelector(selectUser);

	return (
		<Box
			data-testid={TEST_ID_MAP.userPage}
			sx={{ display: 'flex', justifyContent: 'center', gap: '120px' }}>
			<UserCard spinnerSlot={<UserPageSpinner />} />
			{currentUser && <CreateProductForm />}
		</Box>
	);
});

UserPage.displayName = 'UserPage';

export const UserPageWithAccessProtection = withAccessProtection(UserPage);
