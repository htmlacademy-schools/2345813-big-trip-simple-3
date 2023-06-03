import {SortTypeEnum} from '../enum/enums.js';
import {SortLabelEnum} from '../enum/enums.js';
import {SortDisabledEnum} from '../enum/enums.js';
import Presenter from './presenter.js';
import {SortCompareEnum} from '../enum/enums.js';
import {ModeEnum} from '../enum/enums.js';

/**
 * @template {TripPlannerModel} Model
 * @template {SortView} View
 * @extends {Presenter<Model,View>}
 */
export default class SortManagerPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.buildView();

    this.view.addEventListener('change', this.handleViewChange.bind(this));

    this.model.pointsModel.addEventListener(
      ['add', 'remove', 'filter'],
      this.handlePointsModelChange.bind(this)
    );
  }

  buildView() {
    /** @type {SortOptionState[]} */
    const options = Object.keys(SortTypeEnum).map(
      (key) => [SortLabelEnum[key], SortTypeEnum[key]]
    );

    this.view
      .setOptions(options)
      .setOptionsDisabled(Object.values(SortDisabledEnum));

    this.updateViewValue();
    this.updateViewDisplay();
  }

  updateViewValue() {
    const compare = this.model.pointsModel.getSort();
    const type = SortTypeEnum[SortCompareEnum.getKeyByValue(compare)];

    this.view.setValue(type);
  }

  updateViewDisplay() {
    const { length } = this.model.pointsModel.list();

    this.view.display(Boolean(length));
  }

  handleViewChange() {
    const value = this.view.getValue();
    const compare = SortCompareEnum[SortTypeEnum.getKeyByValue(value)];

    this.model.setMode(ModeEnum.VIEW);
    this.model.pointsModel.setSort(compare);
  }

  /**
   * @param {CustomEvent} event
   */
  handlePointsModelChange(event) {
    if (event.type === 'filter') {
      this.model.pointsModel.setSort(SortCompareEnum.DAY, false);

      this.updateViewValue();
    }

    this.updateViewDisplay();
  }
}
