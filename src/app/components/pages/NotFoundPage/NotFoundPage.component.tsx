import { FC, memo } from 'react';

import { NotFound } from '../../atoms';
import { withAccessProtection } from '../../../HOCs';
import { PAGES_TEST_ID_MAP } from '../constants';

const NotFoundPage: FC = memo(() => (
	<NotFound testId={PAGES_TEST_ID_MAP.notFoundPage} />
));

NotFoundPage.displayName = 'NotFoundPage';

export const NotFoundPageWithAccessProtection =
	withAccessProtection(NotFoundPage);
