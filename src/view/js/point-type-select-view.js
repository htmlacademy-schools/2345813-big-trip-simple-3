import {KeyboardCommandEnum} from '../../utils/enums.js';
import View, {html} from './view.js';

export default class PointTypeSelectView extends View {
  get inputSelector() {
    return '[type="radio"]';
  }

  /**
   * @type {NodeListOf<HTMLInputElement>}
   */
  get inputViews() {
    return this.querySelectorAll(this.inputSelector);
  }


  getIndex() {
    return [...this.inputViews].findIndex((view) => view.checked);
  }


  /**
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    this.inputViews.forEach((view, index) => {
      view.disabled = flags[index];
    });

    return this;
  }

  constructor() {
    super(...arguments);

    /** @type {HTMLInputElement} */
    this.toggleView = this.querySelector('.event__type-toggle');

    this.classList.add('event__type-wrapper');

    this.addEventListener('click', this.onClick);
    this.addEventListener('change', this.onChange);
    this.addEventListener('focus', this.onFocus, true);
    this.addEventListener('blur', this.onBlur, true);
    this.addEventListener('pointerdown', this.onPointerDown);
    this.addEventListener('keydown', this.onKeyDown);
  }


  getValue() {
    /** @type {HTMLInputElement} */
    const checkedInputView = this.querySelector('[type="radio"]:checked');

    return checkedInputView.value;
  }

  /**
   * @param {string} type
   */
  setValue(type) {
    const inputView = this.querySelector(`${this.inputSelector}[value="${type}"]`);

    if (inputView) {
      // @ts-ignore
      inputView.checked = true;
    }


    this.setIcon(type);

    return this;
  }

  /**
   * @param {number} index
   */
  setIndex(index) {
    const views = this.inputViews;
    const rangeIndex = (views.length + index) % views.length;

    views.item(rangeIndex).checked = true;

    views.item(rangeIndex).dispatchEvent(new Event('change', { bubbles: true }));

    this.setIcon(this.getValue());

    return this;
  }

  /**
   * @override
   */
  createTemplate() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1" tabindex="0">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="" alt="Event type icon">
      </label>
      <input
        class="event__type-toggle  visually-hidden"
        id="event-type-toggle-1"
        type="checkbox"
        tabindex="-1"
      >
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
        </fieldset>
      </div>
    `;
  }

  /**
   * @param {PointTypeOptionState} state
   */
  createOptionTemplate(state) {
    const [label, value] = state;

    return html`
      <div class="event__type-item">
        <input
          id="event-type-${value}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${value}"
          tabindex="-1"
        >
        <label
          class="event__type-label event__type-label--${value}"
          for="event-type-${value}-1"
        >
          ${label}
        </label>
      </div>
    `;
  }

  /**
   * @param {string} type
   */
  setIcon(type) {
    this.querySelector('img').src = `img/icons/${type}.png`;

    return this;
  }

  /**
   * @param {PointTypeOptionState[]} states
   */
  setOptions(states) {
    const templates = states.map(this.createOptionTemplate);

    this.querySelector('.event__type-group')
      .insertAdjacentHTML('beforeend', templates.join(''));

    return this;
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  onClick(event) {
    if ([...this.inputViews].includes(event.target)) {
      this.setIcon(event.target.value);
      this.toggleView.checked = false;
    }
  }

  /**
   * @param {Event} event
   */
  onChange(event) {
    if (event.target === this.toggleView) {
      event.stopImmediatePropagation();
    }
  }

  /**
   * @param {FocusEvent} event
   */
  onFocus(event) {
    if (event.target === this.toggleView.labels.item(0)) {
      this.toggleView.checked = true;
    }
  }

  /**
   * @param {FocusEvent & {relatedTarget: Element}} event
   */
  onBlur(event) {
    if (!this.contains(event.relatedTarget)) {
      this.toggleView.checked = false;
    }
  }

  /**
   * @param {PointerEvent} event
   */
  onPointerDown(event) {
    event.preventDefault();
  }

  /**
   * @param {KeyboardEvent} event
   */
  onKeyDown(event) {
    if (KeyboardCommandEnum.EXIT.includes(event.key) && this.toggleView.checked) {
      event.stopPropagation();

      this.toggleView.checked = false;

      return;
    }

    if (KeyboardCommandEnum.NEXT.includes(event.key)) {
      event.preventDefault();

      this.setIndex(this.getIndex() + 1);

      return;
    }

    if (KeyboardCommandEnum.PREVIOUS.includes(event.key)) {
      event.preventDefault();

      this.setIndex(this.getIndex() - 1);

      return;
    }

    if (KeyboardCommandEnum.CONFIRM.includes(event.key)) {
      event.preventDefault();

      this.toggleView.checked = false;
    }
  }
}

customElements.define(String(PointTypeSelectView), PointTypeSelectView);
