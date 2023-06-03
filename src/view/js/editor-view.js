import {DeleteButtonLabelEnum} from '../../utils/enums.js';
import {SaveButtonLabelEnum} from '../../utils/enums.js';

import {html} from './view.js';
import CreatorView from './creator-view.js';

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
        ${SaveButtonLabelEnum.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        ${DeleteButtonLabelEnum.DEFAULT}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  `;
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    this.id = this.targetView?.id;

    (flag ? this.targetView : this).replaceWith(flag ? this : this.targetView);

    return this;
  }

  /**
   * @param {boolean} flag
   */
  setDeleting(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__reset-btn');

    buttonView.textContent = flag ? DeleteButtonLabelEnum.PRESSED : DeleteButtonLabelEnum.DEFAULT;

    this.setLoading(flag);
  }

  /**
   * @param {Event & {target: HTMLButtonElement}} event
   */
  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(EditorView), EditorView);
