import View from './View.js'; // Importing the base View class
import icons from 'url:../../img/icons.svg'; // Importing icons
import previewView from './previewView.js';

class bookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find  nice recipw and bookmark it ;)';
  _Message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarkView();
