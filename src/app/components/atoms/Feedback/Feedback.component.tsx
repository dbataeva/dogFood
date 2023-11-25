import { Alert, Snackbar } from '@mui/material';
import { Dispatch, FC, SetStateAction, memo, useCallback } from 'react';
import { SNACK_BAR_VISIBILITY_TIME } from './constants';

export type FeedbackProps = {
	message: string;
	isVisible: boolean;
	state: 'success' | 'error';
	setIsVisible: Dispatch<SetStateAction<boolean>>;
};

export const Feedback: FC<FeedbackProps> = memo(
	({ message, isVisible, state, setIsVisible }) => {
		const closeClickHandler = useCallback(
			() => setIsVisible(false),
			[setIsVisible]
		);
		const isError = state === 'error';

		return (
			<Snackbar
				open={isVisible}
				autoHideDuration={
					isError ? SNACK_BAR_VISIBILITY_TIME * 2 : SNACK_BAR_VISIBILITY_TIME
				}
				onClose={closeClickHandler}>
				{isError ? (
					<Alert severity='error' onClose={closeClickHandler}>
						{message}
					</Alert>
				) : (
					<Alert
						onClose={closeClickHandler}
						severity='success'
						sx={{ width: '100%' }}>
						{message}
					</Alert>
				)}
			</Snackbar>
		);
	}
);

Feedback.displayName = 'Feedback';
