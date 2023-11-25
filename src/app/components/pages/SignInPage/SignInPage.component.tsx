import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { memo, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { TEXT_MAP } from './textMap';
import { signInSchema } from './constants';
import {
	ErrorResponse,
	SignInFormType,
	useSignInMutation,
	LOCAL_STORAGE_TOKEN_KEY,
} from '../../../../api';
import {
	EmailController,
	Feedback,
	FeedbackProps,
	PasswordController,
} from '../../atoms';
import { setUserData, useAppDispatch } from '../../../store';
import { TEST_ID_MAP } from '../constants';

export const SignInPage = memo(() => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormType>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(signInSchema),
	});

	const [feedbackVisibility, setFeedbackVisibility] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState('');
	const [feedbackState, setFeedbackState] =
		useState<FeedbackProps['state']>('success');

	const [signInFn] = useSignInMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { state } = useLocation();
	const submitHandler: SubmitHandler<SignInFormType> = async (data) => {
		try {
			const response = await signInFn(data).unwrap();

			dispatch(setUserData(response.data));
			setFeedbackVisibility(true);
			setFeedbackMessage(TEXT_MAP.successSignIn);
			window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.token);
			navigate(state.destination || '/');
		} catch (error) {
			setFeedbackState('error');
			setFeedbackVisibility(true);
			setFeedbackMessage((error as ErrorResponse).data?.message);
		}
	};

	return (
		<>
			<Container
				maxWidth='xs'
				component='main'
				data-testid={TEST_ID_MAP.signInPage}>
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
							{TEXT_MAP.signIn}
						</Button>
						<NavLink to='/signUp' data-testid={TEST_ID_MAP.navToSingUp}>
							{TEXT_MAP.signUpPageLink}
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

SignInPage.displayName = 'SignInPage';
