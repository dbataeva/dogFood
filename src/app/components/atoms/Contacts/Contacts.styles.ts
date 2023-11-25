import { styled } from 'styled-components';
import { ListItemText as ListItemTextBase } from '@mui/material';

const ContactsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-left: 40px;
`;

const ListItemText = styled(ListItemTextBase)`
	& p {
		color: white;
	}
`;

const IconsContainer = styled.div`
	display: flex;
	gap: 12px;
`;

export const Styled = {
	ContactsContainer,
	ListItemText,
	IconsContainer,
};
