import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {
	ChangeEvent,
	FC,
	ReactNode,
	memo,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { Button, TextField } from '@mui/material';

import {
	selectUser,
	useAppDispatch,
	useAppSelector,
	fetchUserInfo,
	updateUserInfo,
} from '../../../store';
import { stringAvatar } from '../../../utils';
import { TEXT_MAP } from './textMap';

type UserCardProps = {
	spinnerSlot: ReactNode;
};

export const UserCard: FC<UserCardProps> = memo(({ spinnerSlot }) => {
	const { currentUser, isLoading } = useAppSelector(selectUser);
	const [editMode, setEditMode] = useState(false);

	const [nameTextFieldValue, setNameTextFieldValue] = useState<
		string | undefined
	>('');

	const nameTextFieldValueChangeHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) =>
			setNameTextFieldValue(event.target.value),
		[]
	);

	const [aboutTextFieldValue, setAboutTextFieldValue] = useState<
		string | undefined
	>('');

	const aboutTextFieldValueChangeHandler = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setAboutTextFieldValue(event.target.value);
		},
		[]
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		!currentUser && dispatch(fetchUserInfo());
	}, []);

	useEffect(() => {
		setNameTextFieldValue(currentUser?.name);
		setAboutTextFieldValue(currentUser?.about);
	}, [currentUser?.about, currentUser?.name]);

	const editButtonClickHandler = useCallback(
		() => setEditMode((prev) => !prev),
		[]
	);

	const finishEditButtonClickHandler = useCallback(() => {
		setEditMode(false);
		nameTextFieldValue &&
			dispatch(
				updateUserInfo({
					name: nameTextFieldValue,
					about: aboutTextFieldValue || '',
				})
			).then();
	}, [aboutTextFieldValue, dispatch, nameTextFieldValue]);

	return (
		<Card sx={{ maxWidth: 345, height: 'fit-content' }}>
			{isLoading ? (
				<>{spinnerSlot}</>
			) : (
				<>
					<CardHeader
						avatar={
							<Avatar
								{...stringAvatar(currentUser?.name, currentUser?.avatar)}
							/>
						}
						title={currentUser?.name}
					/>
					{editMode && (
						<CardContent>
							<TextField
								required
								label='Required'
								id='outlined-required'
								value={nameTextFieldValue}
								onChange={nameTextFieldValueChangeHandler}
							/>
						</CardContent>
					)}
					<CardContent>
						<Typography variant='body1' color='text.primary'>
							{TEXT_MAP.about}
						</Typography>
						{editMode ? (
							<TextField
								multiline
								value={aboutTextFieldValue}
								id='outlined-multiline-flexible'
								onChange={aboutTextFieldValueChangeHandler}
							/>
						) : (
							<Typography variant='body2' color='text.secondary'>
								{currentUser?.about}
							</Typography>
						)}
					</CardContent>
					<CardContent>
						<Typography variant='body1' color='text.primary'>
							{TEXT_MAP.email}
						</Typography>
						<Typography variant='body2' color='text.secondary'>
							{currentUser?.email}
						</Typography>
					</CardContent>
					<CardActions disableSpacing>
						<Button variant='text' onClick={editButtonClickHandler}>
							{editMode ? TEXT_MAP.cancel : TEXT_MAP.edit}
						</Button>
						{editMode && (
							<Button variant='text' onClick={finishEditButtonClickHandler}>
								{TEXT_MAP.finish}
							</Button>
						)}
					</CardActions>
				</>
			)}
		</Card>
	);
});

UserCard.displayName = 'UserCard';
