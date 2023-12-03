import { useCallback, useState } from 'react';
import { FeedbackProps } from '../components';

export const useFeedback = () => {
	const [feedbackVisibility, setFeedbackVisibility] = useState(false);
	const [feedbackMessage, setFeedbackMessage] = useState('');
	const [feedbackState, setFeedbackState] =
		useState<FeedbackProps['state']>('success');

	const showSuccessfulFeedback = useCallback((successfulMassage: string) => {
		setFeedbackVisibility(true);
		setFeedbackMessage(successfulMassage);
	}, []);

	const showFailureMessage = useCallback((failureMassage: string) => {
		setFeedbackState('error');
		setFeedbackVisibility(true);
		setFeedbackMessage(failureMassage);
	}, []);

	return {
		feedbackVisibility,
		setFeedbackVisibility,
		feedbackMessage,
		setFeedbackMessage,
		feedbackState,
		setFeedbackState,
		showSuccessfulFeedback,
		showFailureMessage,
	};
};
