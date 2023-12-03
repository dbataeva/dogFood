import CardActions from '@mui/material/CardActions';
import { FC, memo } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
	TEXT_MAP,
	createProductScheme,
	CREATE_PRODUCT_FORM_TEST_ID_MAP,
} from './constants';
import {
	AddNewProductRequest,
	ErrorResponse,
	useAddProductMutation,
} from '../../../../api';
import { Feedback } from '../../atoms';
import { useFeedback } from '../../../hooks';

export const CreateProductForm: FC = memo(() => {
	const {
		feedbackVisibility,
		setFeedbackVisibility,
		feedbackMessage,
		feedbackState,
		showSuccessfulFeedback,
		showFailureMessage,
	} = useFeedback();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<AddNewProductRequest>({
		defaultValues: {
			name: '',
			pictures: '',
			description: '',
		},
		resolver: yupResolver(createProductScheme),
	});

	const [addProductFn] = useAddProductMutation();

	const submitHandler: SubmitHandler<AddNewProductRequest> = async (data) => {
		try {
			await addProductFn(data).unwrap();
			showSuccessfulFeedback(TEXT_MAP.successfulAdding);
		} catch (error) {
			showFailureMessage((error as ErrorResponse).data.message);
		}
	};

	return (
		<>
			<Box
				noValidate
				component='form'
				sx={{ width: 400 }}
				data-testid={CREATE_PRODUCT_FORM_TEST_ID_MAP.form}
				onSubmit={handleSubmit(submitHandler)}>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<TextField
							required
							fullWidth
							margin='normal'
							error={!!errors.name}
							data-testid={CREATE_PRODUCT_FORM_TEST_ID_MAP.nameField}
							label={!!errors.name ? TEXT_MAP.nameError : TEXT_MAP.name}
							{...field}
						/>
					)}
				/>
				<Controller
					name='price'
					control={control}
					render={({ field }) => (
						<TextField
							required
							fullWidth
							margin='normal'
							error={!!errors.price}
							data-testid={CREATE_PRODUCT_FORM_TEST_ID_MAP.priceField}
							label={!!errors.price ? TEXT_MAP.priceError : TEXT_MAP.price}
							{...field}
						/>
					)}
				/>
				<Controller
					name='discount'
					control={control}
					render={({ field }) => (
						<TextField
							required
							fullWidth
							margin='normal'
							error={!!errors.discount}
							data-testid={CREATE_PRODUCT_FORM_TEST_ID_MAP.discountField}
							label={
								!!errors.discount ? TEXT_MAP.discountError : TEXT_MAP.discount
							}
							{...field}
						/>
					)}
				/>
				<Controller
					name='pictures'
					control={control}
					render={({ field }) => (
						<TextField
							required
							fullWidth
							margin='normal'
							error={!!errors.pictures}
							data-testid={CREATE_PRODUCT_FORM_TEST_ID_MAP.picturesField}
							label={
								!!errors.pictures ? TEXT_MAP.picturesError : TEXT_MAP.pictures
							}
							{...field}
						/>
					)}
				/>
				<Controller
					name='stock'
					control={control}
					render={({ field }) => (
						<TextField
							required
							fullWidth
							margin='normal'
							error={!!errors.stock}
							data-testid={CREATE_PRODUCT_FORM_TEST_ID_MAP.stockField}
							label={!!errors.stock ? TEXT_MAP.stockError : TEXT_MAP.stock}
							{...field}
						/>
					)}
				/>
				<Controller
					name='description'
					control={control}
					render={({ field }) => (
						<TextField
							required
							fullWidth
							margin='normal'
							error={!!errors.description}
							data-testid={CREATE_PRODUCT_FORM_TEST_ID_MAP.descriptionField}
							label={
								!!errors.description
									? TEXT_MAP.descriptionError
									: TEXT_MAP.description
							}
							{...field}
						/>
					)}
				/>
				<CardActions disableSpacing>
					<Button
						type='submit'
						variant='text'
						disabled={isSubmitting}
						data-testid={CREATE_PRODUCT_FORM_TEST_ID_MAP.submitButton}>
						{TEXT_MAP.finish}
					</Button>
				</CardActions>
			</Box>
			<Feedback
				state={feedbackState}
				message={feedbackMessage}
				isVisible={feedbackVisibility}
				setIsVisible={setFeedbackVisibility}
			/>
		</>
	);
});

CreateProductForm.displayName = 'CreateProductForm';
