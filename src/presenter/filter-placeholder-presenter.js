import {FilterEmptyEnum} from '../utils/enums.js';
import {FilterPredicateEnum} from '../utils/enums.js';
import {ModeEnum} from '../utils/enums.js';
import Presenter from './presenter.js';

/**
 * @template {TripPlannerModel} Model
 * @template {HTMLParagraphElement} View
 * @extends {Presenter<Model,View>}
 */
export default class FilterPlaceholderPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.updateView();

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'update', 'filter'],
      this.handlePointsModelChange.bind(this)
    );

    this.model.addEventListener('mode', this.handleModelMode.bind(this));
  }

  updateView() {
    const { length } = this.model.pointsModel.list();
    const newKey = Object.keys(FilterPredicateEnum).find((key) => FilterPredicateEnum[key] === this.model.pointsModel.getFilter());
    const isHidden = Boolean(length) || this.model.getMode() === ModeEnum.CREATE;

    this.view.textContent = isHidden ? '' : FilterEmptyEnum[newKey];
    this.view.hidden = isHidden;
  }

  handlePointsModelChange() {
    this.updateView();
  }

  handleModelMode() {
    this.updateView();
  }
}
