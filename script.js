document.addEventListener('DOMContentLoaded', () => {
    // Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Scroll Reveal — skipped for visitors who prefer reduced motion
    // or browsers without IntersectionObserver, so content always shows.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;

    const style = document.createElement('style');
    style.textContent = `
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .reveal.visible { opacity: 1; transform: none; }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.grid-item, .resume-item, .tool-item, .pdf-wrapper').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
});
