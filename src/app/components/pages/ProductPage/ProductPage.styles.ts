import { styled } from '@mui/material/styles';
import { CardHeader as CardHeaderBase } from '@mui/material';

const CardHeader = styled(CardHeaderBase)(() => ({
	'.MuiCardHeader-content': {
		maxWidth: 200,
	},
}));

export const Styled = {
	CardHeader,
};
