import { Button } from '@mui/material';
import { FC, memo } from 'react';

import { TEXT_MAP } from './textMap';

type ErrorComponentType = {
	errorMessage: string;
	refetch?: () => void;
};

export const ErrorComponent: FC<ErrorComponentType> = memo(
	({ errorMessage, refetch }) => {
		return (
			<div id='error-page' style={{ height: 'calc(100vh - 192px)' }}>
				<h1>{TEXT_MAP.title}</h1>
				<p>
					<i>{errorMessage}</i>
				</p>
				{refetch && (
					<Button variant='contained' onClick={refetch}>
						{TEXT_MAP.repeatRequest}
					</Button>
				)}
			</div>
		);
	}
);

ErrorComponent.displayName = 'ErrorComponent';
