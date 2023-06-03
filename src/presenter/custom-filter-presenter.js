import {ModeEnum} from '../utils/enums.js';
import {FilterTypeEnum} from '../utils/enums.js';
import {FilterLabelEnum} from '../utils/enums.js';
import {FilterPredicateEnum} from '../utils/enums.js';
import Presenter from './presenter.js';

/**
 * @template {TripPlannerModel} Model
 * @template {FilterView} View
 * @extends {Presenter<Model,View>}
 */
export default class CustomFilterPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildView();

    this.view.addEventListener('change', this.handleViewChange.bind(this));
    this.model.addEventListener('mode', this.handleModelMode.bind(this));

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'update'],
      this.handlePointsModelChange.bind(this)
    );
  }

  buildView() {
    /** @type {FilterOptionState[]} */
    const options = Object.keys(FilterTypeEnum).map(
      (key) => [FilterLabelEnum[key], FilterTypeEnum[key]]
    );

    this.view.setOptions(options);
    this.updateViewOptionsDisabled();
    this.updateViewValue();
  }

  updateViewValue() {
    const predicate = this.model.pointsModel.getFilter();
    const type = FilterTypeEnum[Object.keys(FilterPredicateEnum).find((key) => FilterPredicateEnum[key] === predicate)];

    this.view.setValue(type);
  }

  updateViewOptionsDisabled() {
    const predicates = Object.values(FilterPredicateEnum);
    const states = predicates.map((predicate) =>
      !this.model.pointsModel.list(predicate).length);

    this.view.setOptionsDisabled(states);
  }

  handleViewChange() {
    const value = this.view.getValue();
    const predicate = FilterPredicateEnum[Object.keys(FilterTypeEnum).find((key) => FilterTypeEnum[key] === value)];

    this.model.setMode(ModeEnum.VIEW);
    this.model.pointsModel.setFilter(predicate);
  }

  handlePointsModelChange() {
    this.updateViewOptionsDisabled();
  }

  handleModelMode() {
    if (this.model.getMode() === ModeEnum.CREATE) {
      this.model.pointsModel.setFilter(FilterPredicateEnum.EVERYTHING);

      this.updateViewValue();
    }
  }
}
