import { FC, memo } from 'react';

import { TEXT_MAP } from './textMap';
import { TestIdType } from '../../../../types';

export const NotFound: FC<TestIdType> = memo(({ testId }) => (
	<div
		data-testid={testId}
		id='error-page'
		style={{
			maxWidth: '992px',
			marginInline: 'auto',
			height: 'calc(100vh - 192px)',
		}}>
		<p style={{ textAlign: 'center' }}>{TEXT_MAP.errorText}</p>
	</div>
));

NotFound.displayName = 'NotFound';
