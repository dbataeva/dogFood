import { FC, memo } from 'react';
import { ListItem, Typography } from '@mui/material';
import {
	Facebook,
	Instagram,
	Telegram,
	Twitter,
	WhatsApp,
} from '@mui/icons-material';

import { Styled } from './Contacts.styles';
import { TEST_ID_MAP, TEXT_MAP } from './constants';
import { TestIdType } from '../../../../types/testId';

export const Contacts: FC<TestIdType> = memo(({ testId }) => (
	<Styled.ContactsContainer data-testid={testId}>
		<Typography variant='h5' component='h5'>
			{TEXT_MAP.contactUs}
		</Typography>
		<ListItem sx={{ padding: 0 }} data-testid={TEST_ID_MAP.phoneAndEmail}>
			<Styled.ListItemText
				primary={TEXT_MAP.phone}
				secondary={TEXT_MAP.email}
			/>
		</ListItem>
		<Styled.IconsContainer>
			<Telegram data-testid={TEST_ID_MAP.telegram} />
			<WhatsApp data-testid={TEST_ID_MAP.watsApp} />
			<Instagram data-testid={TEST_ID_MAP.instagram} />
			<Facebook data-testid={TEST_ID_MAP.facebook} />
			<Twitter data-testid={TEST_ID_MAP.twitter} />
		</Styled.IconsContainer>
	</Styled.ContactsContainer>
));

Contacts.displayName = 'Contacts';
