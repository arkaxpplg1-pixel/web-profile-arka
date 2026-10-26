document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.achievement-filter');
    const achievementLevels = document.querySelectorAll('.achievement-level[data-achievement-level]');

    if (!filterButtons.length || !achievementLevels.length) return;

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach((filterButton) => {
                const isActive = filterButton === button;
                filterButton.classList.toggle('is-active', isActive);
                filterButton.setAttribute('aria-pressed', String(isActive));
            });

            achievementLevels.forEach((level) => {
                level.hidden = selectedFilter !== 'all'
                    && level.dataset.achievementLevel !== selectedFilter;
            });
        });
    });
});
