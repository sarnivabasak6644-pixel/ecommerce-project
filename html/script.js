document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById('productSlider');
    const searchForm = document.getElementById('productSearchForm');
    const searchInput = document.getElementById('productSearch');
    const searchStatus = document.getElementById('searchStatus');

    if (!slider || !searchForm || !searchInput || !searchStatus) return;

    const products = Array.from(slider.querySelectorAll('.slide-item'));

    const filterProducts = () => {
        const query = searchInput.value.trim().toLocaleLowerCase();
        let visibleCount = 0;

        products.forEach((product) => {
            const imageAlt = product.querySelector('img')?.alt || '';
            const searchableText = `${product.textContent} ${imageAlt}`.toLocaleLowerCase();
            const matches = searchableText.includes(query);

            product.hidden = !matches;
            if (matches) visibleCount += 1;
        });

        slider.scrollLeft = 0;
        searchStatus.textContent = query
            ? visibleCount === 0
                ? `No products found for "${searchInput.value.trim()}".`
                : `${visibleCount} result${visibleCount === 1 ? '' : 's'} found.`
            : '';
    };

    searchInput.addEventListener('input', filterProducts);
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        filterProducts();
    });

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
});
