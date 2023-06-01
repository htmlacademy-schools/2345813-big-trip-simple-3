import DeleteButtonLabel from '../enum/delete-button-label.js';
import {html} from './view.js';
import CreatorView from './creator-view.js';
import SaveButtonLabel from '../enum/save-button-label.js';

export default class EditorView extends CreatorView {
  constructor() {
    super();

    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   */
  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveButtonLabel.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        ${DeleteButtonLabel.DEFAULT}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  `;
  }

  /**
   * @param {boolean} flag
   */
  setDeleteButtonPressed(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__reset-btn');

    buttonView.disabled = flag;
    buttonView.textContent = flag ? DeleteButtonLabel.PRESSED : DeleteButtonLabel.DEFAULT;
  }


  /**
   * @override
   */
  connect() {
    this.targetView.replaceWith(this);
  }

  /**
   * @override
   */
  disconnect() {
    this.replaceWith(this.targetView);
  }

  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(EditorView), EditorView);
