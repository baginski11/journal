import { useEffect } from 'react';

interface UseSwipeBackProps {
    onSwipeBack: () => void;
}

export function useSwipeBack({ onSwipeBack }: UseSwipeBackProps) {
    useEffect(() => {
        // Add a new entry to the history stack for the current page
        window.history.pushState(null, '', window.location.href);

        const handlePopState = (event: PopStateEvent) => {
            event.preventDefault();
            // Trigger the callback function instead of going back
            onSwipeBack();
            // Push state again to avoid leaving the page
            window.history.pushState(null, '', window.location.href);
        };

        // Add listener for popstate events
        window.addEventListener('popstate', handlePopState);

        return () => {
            // Clean up the event listener on component unmount
            window.removeEventListener('popstate', handlePopState);
        };
    }, [onSwipeBack]);
}
