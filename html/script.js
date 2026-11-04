document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById('productSlider');
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events for drag-to-scroll functionality on desktop
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast modifier
        slider.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile swiping are natively handled by overflow-x: auto and CSS scroll-snap
});