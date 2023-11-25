import { MutableRefObject, useLayoutEffect } from 'react';

export const useIntersectionObserver = (
	observedElementRef: MutableRefObject<HTMLDivElement | null>,
	isLastPage?: boolean,
	onScrollEnd?: VoidFunction
) => {
	useLayoutEffect(() => {
		const options = { threshold: 0.1 };
		const callback = (entries: IntersectionObserverEntry[]) => {
			if (entries[0].isIntersecting) {
				onScrollEnd?.();
			}
		};

		let observer: IntersectionObserver | undefined = undefined;

		if (!isLastPage) {
			observer = new IntersectionObserver(callback, options);
			observedElementRef.current &&
				observer.observe(observedElementRef.current);
		}

		return () => observer?.disconnect();
	}, [isLastPage, observedElementRef, onScrollEnd]);
};
