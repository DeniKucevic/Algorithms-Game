import { useEffect, useRef } from 'react';

// custom hook by Dan Abramov

export default function useInterval(callback, delay) {
	const savedCallback = useRef();
	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	// eslint-disable-next-line
  useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => {
				clearInterval(id);
			};
		}
	}, [delay]);
}
