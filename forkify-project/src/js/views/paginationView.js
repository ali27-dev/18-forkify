import View from './View.js'; // Importing the base View class
import icons from 'url:../../img/icons.svg'; // Importing icons

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return ` 
          <button class="btn--inline pagination__btn--next">
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
          <span>Page ${curPage + 1}</span>
          </button>
      `;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
         <button class="btn--inline pagination__btn--prev">
            <span>Page ${curPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          </button>
      `;
    }

    // Other page
    if (curPage < numPages) {
      return `
          <button class="btn--inline pagination__btn--prev">
            <span>Page ${curPage - 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
          </button>
          <button class="btn--inline pagination__btn--next">
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
          </svg>
          <span>Page ${curPage + 1}</span>
          </button>
          `;
    }

    // Page 1, and there are NO other pages
    return '';
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closetest('.btn--inline');
      console.log(btn);
      handler();
    });
  }
}

export default new paginationView();
