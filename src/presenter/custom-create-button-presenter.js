import ModeEnum from '../enum/mode-enum.js';
import Presenter from './presenter.js';

/**
 * @template {TripPlannerModel} Model
 * @template {HTMLButtonElement} View
 * @extends {Presenter<Model,View>}
 */
export default class CustomCreateButtonPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} args
   */
  constructor(...args) {
    super(...args);

    this.view.addEventListener('click', this.onViewClick.bind(this));
    this.model.addEventListener('mode', this.onModelMode.bind(this));
  }

  onViewClick() {
    this.model.setMode(ModeEnum.CREATE);
  }

  onModelMode() {
    this.view.disabled = (this.model.getMode() === ModeEnum.CREATE);
  }
}
