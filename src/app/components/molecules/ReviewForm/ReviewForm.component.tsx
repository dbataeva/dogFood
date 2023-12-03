import { Box, Button, TextField } from '@mui/material';
import { FC, memo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { Product } from '../../../../types';
import {
	useAddReviewMutation,
	ReviewFormType,
	ErrorResponse,
} from '../../../../api';
import { reviewScheme, TEST_ID_MAP, TEXT_MAP } from './constants';
import { Feedback } from '../../atoms';
import { useFeedback } from '../../../hooks';

export const ReviewForm: FC<{ productId: Product['_id'] }> = memo(
	({ productId }) => {
		const {
			control,
			handleSubmit,
			formState: { errors, isSubmitting },
		} = useForm<ReviewFormType>({
			defaultValues: {
				rating: 5,
				text: '',
			},
			resolver: yupResolver(reviewScheme),
		});

		const {
			feedbackVisibility,
			setFeedbackVisibility,
			feedbackMessage,
			feedbackState,
			showSuccessfulFeedback,
			showFailureMessage,
		} = useFeedback();

		const [addReviewFn] = useAddReviewMutation();

		const submitHandler: SubmitHandler<ReviewFormType> = async (data) => {
			try {
				await addReviewFn({
					productId,
					review: data,
				}).unwrap();
				showSuccessfulFeedback(TEXT_MAP.successAddReview);
			} catch (error) {
				showFailureMessage((error as ErrorResponse).data.message);
			}
		};

		return (
			<>
				<Box
					noValidate
					component='form'
					sx={{
						width: '100%',
						maxWidth: '992px',
						marginInline: 'auto',
						marginBottom: 3,
					}}
					data-testid={TEST_ID_MAP.form}
					onSubmit={handleSubmit(submitHandler)}>
					<Controller
						name='rating'
						control={control}
						render={({ field }) => (
							<TextField
								required
								margin='normal'
								error={!!errors.rating}
								data-testid={TEST_ID_MAP.ratingField}
								label={!!errors.rating ? TEXT_MAP.ratingError : TEXT_MAP.rating}
								{...field}
							/>
						)}
					/>
					<Controller
						name='text'
						control={control}
						render={({ field }) => (
							<TextField
								rows={4}
								required
								fullWidth
								error={!!errors.rating}
								data-testid={TEST_ID_MAP.reviewField}
								label={!!errors.text ? TEXT_MAP.textError : TEXT_MAP.text}
								{...field}
							/>
						)}
					/>
					<Button
						variant='text'
						type='submit'
						disabled={isSubmitting}
						data-testid={TEST_ID_MAP.submitButton}>
						{TEXT_MAP.save}
					</Button>
				</Box>
				<Feedback
					state={feedbackState}
					message={feedbackMessage}
					isVisible={feedbackVisibility}
					setIsVisible={setFeedbackVisibility}
				/>
			</>
		);
	}
);

ReviewForm.displayName = 'ReviewForm';
