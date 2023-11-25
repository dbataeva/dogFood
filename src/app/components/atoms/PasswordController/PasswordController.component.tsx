import { TextField } from '@mui/material';
import { FC, memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TestIdType } from '../../../../types';

type PasswordControllerProps = {
	label: string;
	error?: boolean;
	control: Control<any>;
} & TestIdType;

export const PasswordController: FC<PasswordControllerProps> = memo(
	({ label, error, control, testId }) => (
		<Controller
			name='password'
			control={control}
			render={({ field }) => (
				<TextField
					margin='normal'
					required
					fullWidth
					label={label}
					type='password'
					id='password'
					autoComplete='current-password'
					error={error}
					data-testid={testId}
					{...field}
				/>
			)}
		/>
	)
);

PasswordController.displayName = 'PasswordController';
