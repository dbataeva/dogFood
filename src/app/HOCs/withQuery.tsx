import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ComponentType, FC, ReactNode } from 'react';

import { ErrorResponse } from '../../api';

type WithQueryProps = {
	isError: boolean;
	isLoading: boolean;
	refetch: () => void;
	renderSpinner: () => ReactNode;
	error?: FetchBaseQueryError | SerializedError;
	renderError: (errorMessage: string, refetch?: VoidFunction) => ReactNode;
};

export const withQuery = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<P & WithQueryProps> = (props) => {
		const {
			error,
			refetch,
			isError,
			isLoading,
			renderError,
			renderSpinner,
			...restProps
		} = props;

		if (isLoading) {
			return renderSpinner();
		}

		if (isError) {
			return renderError((error as ErrorResponse).data.message, refetch);
		}

		return (
			<WrappedComponent
				error={error}
				refetch={refetch}
				isError={isError}
				renderError={renderError}
				renderSpinner={renderSpinner}
				{...(restProps as P)}
			/>
		);
	};

	return ReturnedComponent;
};
