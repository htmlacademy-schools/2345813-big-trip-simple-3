import {SaveButtonLabelEnum} from '../../utils/enums.js';
import View, {html} from './view.js';
import PointTypeSelectView from './point-type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationView from './destination-view.js';
import LoaderView from './loader-view.js';
import {KeyboardCommandEnum} from '../../utils/enums.js';

/**
 * @implements {EventListenerObject}
 */
export default class CreatorView extends View {
  constructor() {
    super();

    /** @type {PointTypeSelectView} */
    this.pointTypeSelectView = this.querySelector(String(PointTypeSelectView));

    /** @type {DestinationSelectView} */
    this.destinationSelectView = this.querySelector(String(DestinationSelectView));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {DatePickerView} */
    this.datePickerView = this.querySelector(String(DatePickerView));

    /** @type {OfferSelectView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /** @type {DestinationView} */
    this.destinationView = this.querySelector(String(DestinationView));

    /** @type {HTMLButtonElement} */
    this.submitButtonView = this.querySelector('.event__save-btn');

    /** @type {Element} */
    this.targetView = null;

    this.loaderView = new LoaderView();

    this.formView = this.querySelector('form');

    this.classList.add('trip-events__item', 'trip-events__item--reveal-alternate');
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    if (flag) {
      this.targetView.prepend(this);
    } else {
      this.remove();
    }

    return this;
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${PointTypeSelectView}
          ${DestinationSelectView}
          ${DatePickerView}
          ${PriceInputView}
          ${this.createButtonsTemplate()}
        </header>
        <section class="event__details">
          ${OfferSelectView}
          ${DestinationView}
        </section>
      </form>
    `;
  }

  createButtonsTemplate() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveButtonLabelEnum.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        Cancel
      </button>
    `;
  }

  /**
   * @param {boolean} flag
   */
  setLoading(flag) {
    this.loaderView.display(flag);

    [...this.formView].forEach((/** @type {HTMLInputElement} */ inputView) => {
      inputView.disabled = flag;
    });
  }

  /**
   * @param {boolean} flag
   */
  setSaving(flag) {
    /** @type {HTMLButtonElement} */
    const buttonView = this.querySelector('.event__save-btn');

    buttonView.textContent = flag ? SaveButtonLabelEnum.PRESSED : SaveButtonLabelEnum.DEFAULT;

    this.setLoading(flag);
  }

  /**
   * @param {Element} view
   */
  target(view) {
    this.targetView = view;

    return this;
  }

  open() {
    this.display(true);

    document.addEventListener('keydown', this);

    return this;
  }

  close(notify = true) {
    this.datePickerView.close();

    this.display(false);

    document.removeEventListener('keydown', this);

    if (notify) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (KeyboardCommandEnum.EXIT.includes(event.key)) {
      this.close();
    }
  }
}

customElements.define(String(CreatorView), CreatorView);
