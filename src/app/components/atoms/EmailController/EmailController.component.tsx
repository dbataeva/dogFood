import { TextField } from '@mui/material';
import { FC, memo } from 'react';
import { Control, Controller } from 'react-hook-form';

import { TestIdType } from '../../../../types';

type EmailControllerProps = {
	label: string;
	error?: boolean;
	control: Control<any>;
} & TestIdType;

export const EmailController: FC<EmailControllerProps> = memo(
	({ label, error, control, testId }) => (
		<Controller
			name='email'
			control={control}
			render={({ field }) => (
				<TextField
					margin='normal'
					required
					fullWidth
					label={label}
					id='email'
					autoComplete='email'
					error={error}
					data-testid={testId}
					{...field}
				/>
			)}
		/>
	)
);

EmailController.displayName = 'EmailController';
