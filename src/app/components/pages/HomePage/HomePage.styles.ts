import { styled } from '@mui/material/styles';
import { Paper as PaperBase } from '@mui/material';

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 40px;
	max-width: 992px;
	margin-inline: auto;
`;

const Paper = styled(PaperBase)(({ theme }) => ({
	...theme.typography.body2,
	textAlign: 'start',
	color: theme.palette.text.secondary,
	height: 60,
	lineHeight: '60px',
	width: '100%',
	maxWidth: '992px',
	margin: '0 auto 10px',

	p: {
		display: 'inline',
	},
}));

export const Styled = {
	Container,
	Paper,
};
