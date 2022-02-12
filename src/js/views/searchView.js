class SearchView {
    #parentEl = document.querySelector('.search');

    // Query
    getQuery() {
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput();
        return query;
    }

    // Clearing input
    #clearInput() {
        this.#parentEl.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {
        this.#parentEl.addEventListener('submit', function(e) {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();