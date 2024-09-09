import type { ReactNode } from 'react';
import { useSwipeable } from 'react-swipeable';

type PostSetNavSwipeProps = {
	children: ReactNode,
	nextPageUrl: string | null,
	prevPageUrl?: string | null
}

export default function PostSetNavSwipe({
	children,
	nextPageUrl,
	prevPageUrl
}: Readonly<PostSetNavSwipeProps>) {
	const handlers = useSwipeable({
		onSwipedLeft: () => {
			if (nextPageUrl) {
				window.location.href = nextPageUrl
			}
		},
		onSwipedRight: () => {
			if (prevPageUrl) {
				window.location.href = prevPageUrl;
			}
		},
		trackMouse: true
	});

	return (
		<div {...handlers}>
			{children}
		</div>
	);
};
