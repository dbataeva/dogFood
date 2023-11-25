import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { memo, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useNavigate } from 'react-router-dom';

import { TEXT_MAP } from './textMap';
import { signUpSchema } from './constants';
import {
	ErrorResponse,
	SignUpFormType,
	useSignUpMutation,
} from '../../../../api';
import {
	EmailController,
	Feedback,
	FeedbackProps,
	PasswordController,
} from '../../atoms';
import { TEST_ID_MAP } from '../constants';

export const SignUpPage = memo(() => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormType>({
		defaultValues: {
			group: '',
			email: '',
			password: '',
		},
		resolver: yupResolver(signUpSchema),
	});

	const [feedbackVisibility, setFeedbackVisibility] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState('');
	const [feedbackState, setFeedbackState] =
		useState<FeedbackProps['state']>('success');

	const [signUpFn] = useSignUpMutation();
	const navigate = useNavigate();
	const submitHandler: SubmitHandler<SignUpFormType> = async (data) => {
		try {
			await signUpFn(data).unwrap();
			setFeedbackVisibility(true);
			setFeedbackMessage(TEXT_MAP.successSignUp);
			navigate('/signIn');
		} catch (error) {
			setFeedbackState('error');
			setFeedbackVisibility(true);
			setFeedbackMessage((error as ErrorResponse).data.message);
		}
	};

	return (
		<>
			<Container
				maxWidth='xs'
				component='main'
				data-testid={TEST_ID_MAP.signUpPage}>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Box
						noValidate
						sx={{ mt: 1 }}
						component='form'
						onSubmit={handleSubmit(submitHandler)}>
						<Controller
							name='group'
							control={control}
							render={({ field }) => (
								<TextField
									margin='normal'
									required
									fullWidth
									id='group'
									data-testid={TEST_ID_MAP.groupTextField}
									label={!!errors.group ? TEXT_MAP.required : TEXT_MAP.group}
									error={!!errors.group}
									{...field}
								/>
							)}
						/>
						<EmailController
							control={control}
							error={!!errors.email}
							testId={TEST_ID_MAP.emailTextField}
							label={!!errors.email ? TEXT_MAP.emailError : TEXT_MAP.email}
						/>
						<PasswordController
							control={control}
							error={!!errors.password}
							testId={TEST_ID_MAP.passwordTextField}
							label={
								!!errors.email ? TEXT_MAP.passwordError : TEXT_MAP.password
							}
						/>
						<Button
							fullWidth
							type='submit'
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							disabled={isSubmitting}
							data-testid={TEST_ID_MAP.submitButton}>
							{TEXT_MAP.signUp}
						</Button>
						<NavLink to='/signIn' data-testid={TEST_ID_MAP.navToSingIn}>
							{TEXT_MAP.signInPageLink}
						</NavLink>
					</Box>
				</Box>
			</Container>
			<Feedback
				state={feedbackState}
				message={feedbackMessage}
				isVisible={feedbackVisibility}
				setIsVisible={setFeedbackVisibility}
			/>
		</>
	);
});

SignUpPage.displayName = 'SignUpPage';
