import { FC, memo, useCallback } from 'react';

import { ReactComponent as LogoImg } from '../../../images/logo.svg';
import { useNavigate } from 'react-router';
import { TestIdType } from '../../../../types/testId';

export const Logo: FC<TestIdType> = memo(({ testId }) => {
	const navigate = useNavigate();

	const logoClickHandler = useCallback(() => navigate('/'), [navigate]);

	return (
		<LogoImg
			data-testid={testId}
			style={{ color: 'white' }}
			onClick={logoClickHandler}
		/>
	);
});

Logo.displayName = 'Logo';
