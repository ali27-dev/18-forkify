import View from './View.js'; // Importing the base View class
import icons from 'url:../../img/icons.svg'; // Importing icons
import previewView from './previewView.js';

class resultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _Message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new resultsView();
