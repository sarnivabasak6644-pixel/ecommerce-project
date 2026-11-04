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
    // Slider Arrow Navigation
    const slideLeftBtn = document.getElementById('slideLeft');
    const slideRightBtn = document.getElementById('slideRight');

    if (slideLeftBtn && slideRightBtn && slider) {
        // Calculate the width of one item + gap for smooth step scrolling
        const scrollAmount = 165;

        slideLeftBtn.addEventListener('click', () => {
            slider.scrollBy({
                top: 0,
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        slideRightBtn.addEventListener('click', () => {
            slider.scrollBy({
                top: 0,
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
    // Categories Popup Toggle Logic
    const categoriesTrigger = document.getElementById('categoriesTrigger');
    const categoriesPopup = document.getElementById('categoriesPopup');

    if (categoriesTrigger && categoriesPopup) {
        categoriesTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            categoriesPopup.classList.toggle('d-none');

            // Auto-close user popup if it is open
            if (typeof userPopup !== 'undefined' && userPopup) {
                userPopup.classList.add('d-none');
            }
        });

        // Close categories popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!categoriesTrigger.contains(e.target) && !categoriesPopup.contains(e.target)) {
                categoriesPopup.classList.add('d-none');
            }
        });
    }

    // Update existing userTrigger event listener to auto-close categories popup
    if (typeof userTrigger !== 'undefined' && userTrigger) {
        userTrigger.addEventListener('click', () => {
            if (categoriesPopup) {
                categoriesPopup.classList.add('d-none');
            }
        });
    }
});
// User Popup Toggle Logic
const userTrigger = document.getElementById('userPopupTrigger');
const userPopup = document.getElementById('userPopup');

if (userTrigger && userPopup) {
    userTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        userPopup.classList.toggle('d-none');
    });

    // Close popup when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!userTrigger.contains(e.target) && !userPopup.contains(e.target)) {
            userPopup.classList.add('d-none');
        }
    });
}