import React, { useEffect, useState } from 'react';

const FOOTER_ID = 'app-footer';

export default function FooterHintArrow({ hidden = false }) {
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const updateVisibility = () => {
            const footer = document.getElementById(FOOTER_ID);

            if (!footer) {
                const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;
                setShowHint(!nearBottom);
                return;
            }

            const rect = footer.getBoundingClientRect();
            const isFooterVisible = rect.top < window.innerHeight && rect.bottom > 0;
            setShowHint(!isFooterVisible);
        };

        updateVisibility();
        window.addEventListener('scroll', updateVisibility, { passive: true });
        window.addEventListener('resize', updateVisibility);

        return () => {
            window.removeEventListener('scroll', updateVisibility);
            window.removeEventListener('resize', updateVisibility);
        };
    }, []);

    if (hidden || !showHint) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.75, behavior: 'smooth' })}
            className="fixed bottom-6 left-1/2 z-[55] -translate-x-1/2 rounded-full border border-accent-300/60 bg-primary-700/75 p-3 text-accent-300 shadow-xl backdrop-blur-md transition hover:bg-primary-600/85"
            aria-label="Bajar para ver más contenido"
            title="Hay más contenido abajo"
        >
            <i className="fas fa-chevron-down animate-bounce text-base"></i>
        </button>
    );
}
