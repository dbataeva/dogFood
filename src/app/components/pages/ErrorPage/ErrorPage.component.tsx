import { FC, memo } from 'react';
import { useRouteError } from 'react-router-dom';
import { ErrorComponent } from '../../atoms';
import { TEXT_MAP } from './textMap';

type ErrorType = {
	message?: string;
	statusText?: string;
};

export const ErrorPage: FC = memo(() => {
	const error = useRouteError() as ErrorType;

	return (
		<ErrorComponent
			errorMessage={error.statusText || error.message || TEXT_MAP.errorMessage}
		/>
	);
});

ErrorPage.displayName = 'ErrorPage';
