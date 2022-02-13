// Imports
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
    module.hot.accept();
}

const controlRecipes = async function() {
    try {
        const id = window.location.hash.slice(1);

        if (!id) return;
        recipeView.renderSpinner();

        // Loading recipe
        await model.loadRecipe(id);

        // Rendering recipe
        recipeView.render(model.state.recipe);

    }   catch (err) {
        recipeView.renderError();
    }
}

// Search results controler
const controlSearchResults = async function() {
    try {
        resultsView.renderSpinner();

        // Get search query
        const query = searchView.getQuery();
        if (!query) return;

        // Load search results
        await model.loadSearchResults(query);

        // Render results per page
        resultsView.render(model.getSearchResultsPage());

        // Render initial pagination buttons
        paginationView.render(model.state.search);

    }   catch(err) {
        console.error(err);
    }
}

// Pagination buttons / results update
const controlPagination = function(goToPage) {
    // Render new results
    resultsView.render(model.getSearchResultsPage(goToPage));

    // Render new pagination buttons
    paginationView.render(model.state.search);
}

// Publisher-Subscriber pattern.
const init = function() {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
}

init();