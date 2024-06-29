document.addEventListener('DOMContentLoaded', function() {
    const highlightSelectedLink = (selectedHref) => {
        document.querySelectorAll('.categories a').forEach(link => {
            link.classList.toggle('selected', link.href === selectedHref);
        });
    };

    const categorySelect = document.getElementById('categorySelect');
    const selectedValue = sessionStorage.getItem('selectedCategory');

    if (selectedValue) {
        categorySelect.value = selectedValue;
        highlightSelectedLink(selectedValue);
    }

    const handleCategorySelect = (selectedValue) => {
        sessionStorage.setItem('selectedCategory', selectedValue);
        highlightSelectedLink(selectedValue);
        window.location.href = selectedValue;
    };

    categorySelect.addEventListener('change', function() {
        handleCategorySelect(this.value);
    });

    document.querySelectorAll('.categories a').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            handleCategorySelect(link.href);
        });
    });
});