import { useCallback, useEffect } from 'react';

export function useModalDismiss({
    isOpen,
    onClose,
    closeOnEsc = true,
    closeOnBackdrop = true,
}) {
    const handleBackdropMouseDown = useCallback(
        (event) => {
            if (!closeOnBackdrop || !onClose) {
                return;
            }

            if (event.target === event.currentTarget) {
                onClose();
            }
        },
        [closeOnBackdrop, onClose]
    );

    useEffect(() => {
        if (!isOpen || !closeOnEsc || !onClose) {
            return;
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, closeOnEsc, onClose]);

    return {
        handleBackdropMouseDown,
    };
}
