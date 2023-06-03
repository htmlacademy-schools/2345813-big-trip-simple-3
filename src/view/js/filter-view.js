import View, {html} from './view.js';

export default class FilterView extends View {
  get inputSelector() {
    return '[type="radio"]';
  }

  /**
   * @type {NodeListOf<HTMLInputElement>}
   */
  get inputViews() {
    return this.querySelectorAll(this.inputSelector);
  }

  getValue() {
    /** @type {HTMLInputElement} */
    const inputCheckedView = this.querySelector(`${this.inputSelector}:checked`);

    if (inputCheckedView) {
      return inputCheckedView.value;
    }

    return '';
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    /** @type {HTMLInputElement} */
    const inputView = this.querySelector(`${this.inputSelector}[value="${value}"]`);

    if (inputView) {
      inputView.checked = true;
    }

    return this;
  }

  getIndex() {
    return [...this.inputViews].findIndex((view) => view.checked);
  }

  /**
   * @param {number} index
   */
  setIndex(index, notify = true) {
    const views = this.inputViews;
    const rangeIndex = (views.length + index) % views.length;

    views.item(rangeIndex).checked = true;

    if (notify) {
      views.item(rangeIndex).dispatchEvent(new Event('change', {bubbles: true}));
    }

    return this;
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
  /**
   * @override
   */

  createTemplate() {
    return html`
    <form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
  }

  /**
   * @param {FilterOptionState} state
   */
  createOptionTemplate(state) {
    const [label, value] = state;

    return html`
      <div class="trip-filters__filter">
        <input
          id="filter-${value}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${value}"
        >
        <label
          class="trip-filters__filter-label"
          for="filter-${value}"
        >
          ${label}
        </label>
      </div>
    `;
  }

  /**
   * @param {FilterOptionState[]} states
   */
  setOptions(states) {
    const templates = states.map(this.createOptionTemplate);

    this.querySelector('.trip-filters')
      .insertAdjacentHTML('afterbegin', templates.join(''));

    return this;
  }
}

customElements.define(String(FilterView), FilterView);
