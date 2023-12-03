import { FC, memo } from 'react';
import { Box } from '@mui/material';

import { UserPageSpinner } from '../../atoms';
import { CreateProductForm, UserCard } from '../../molecules';
import { selectUser, useAppSelector } from '../../../store';
import { withAccessProtection } from '../../../HOCs';
import { PAGES_TEST_ID_MAP } from '../constants';

const UserPage: FC = memo(() => {
	const { currentUser } = useAppSelector(selectUser);

	return (
		<Box
			data-testid={PAGES_TEST_ID_MAP.userPage}
			sx={{ display: 'flex', justifyContent: 'center', gap: '120px' }}>
			<UserCard spinnerSlot={<UserPageSpinner />} />
			{currentUser && <CreateProductForm />}
		</Box>
	);
});

UserPage.displayName = 'UserPage';

export const UserPageWithAccessProtection = withAccessProtection(UserPage);
