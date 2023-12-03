import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { memo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { signInSchema, SIGN_IN_PAGE_TEXT_MAP } from './constants';
import {
	ErrorResponse,
	SignInFormType,
	useSignInMutation,
	LOCAL_STORAGE_TOKEN_KEY,
} from '../../../../api';
import { EmailController, Feedback, PasswordController } from '../../atoms';
import { setUserData, useAppDispatch } from '../../../store';
import { PAGES_TEST_ID_MAP } from '../constants';
import { useFeedback } from '../../../hooks';

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

	const {
		feedbackVisibility,
		setFeedbackVisibility,
		feedbackMessage,
		feedbackState,
		showSuccessfulFeedback,
		showFailureMessage,
	} = useFeedback();

	const [signInFn] = useSignInMutation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { state } = useLocation();
	const submitHandler: SubmitHandler<SignInFormType> = async (data) => {
		try {
			const response = await signInFn(data).unwrap();

			dispatch(setUserData(response.data));
			showSuccessfulFeedback(SIGN_IN_PAGE_TEXT_MAP.successSignIn);
			window.localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, response.token);
			navigate(state?.destination || '/');
		} catch (error) {
			showFailureMessage((error as ErrorResponse).data?.message);
		}
	};

	return (
		<>
			<Container
				maxWidth='xs'
				component='main'
				data-testid={PAGES_TEST_ID_MAP.signInPage}>
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
							testId={PAGES_TEST_ID_MAP.emailTextField}
							label={
								!!errors.email
									? SIGN_IN_PAGE_TEXT_MAP.emailError
									: SIGN_IN_PAGE_TEXT_MAP.email
							}
						/>
						<PasswordController
							control={control}
							error={!!errors.password}
							testId={PAGES_TEST_ID_MAP.passwordTextField}
							label={
								!!errors.email
									? SIGN_IN_PAGE_TEXT_MAP.passwordError
									: SIGN_IN_PAGE_TEXT_MAP.password
							}
						/>
						<Button
							fullWidth
							type='submit'
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							disabled={isSubmitting}
							data-testid={PAGES_TEST_ID_MAP.submitButton}>
							{SIGN_IN_PAGE_TEXT_MAP.signIn}
						</Button>
						<NavLink to='/signUp' data-testid={PAGES_TEST_ID_MAP.navToSingUp}>
							{SIGN_IN_PAGE_TEXT_MAP.signUpPageLink}
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
