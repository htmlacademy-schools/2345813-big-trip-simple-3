import FilterEmpty from '../enum/filter-empty.js';
import FilterPredicate from '../enum/filter-predicate.js';
import Mode from '../enum/mode.js';
import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLParagraphElement} View
 * @extends {Presenter<Model,View>}
 */
export default class PlaceholderPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.updateView();

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'update', 'filter'],
      this.onPointsModelChange.bind(this)
    );

    this.model.addEventListener('mode', this.onModelMode.bind(this));
  }

  updateView() {
    const {length} = this.model.pointsModel.list();
    const key = FilterPredicate.findKey(this.model.pointsModel.getFilter());
    const isHidden = Boolean(length) || this.model.getMode() === Mode.CREATE;

    this.view.textContent = isHidden ? '' : FilterEmpty[key];
    this.view.hidden = isHidden;
  }

  onPointsModelChange() {
    this.updateView();
  }

  onModelMode() {
    this.updateView();
  }
}
