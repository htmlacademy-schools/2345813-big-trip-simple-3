import {ModeEnum} from '../enum/enums.js';
import PointCreatorPresenter from './point-creator-presenter.js';
import PointView from '../view/js/point-view.js';

/**
 * @template {TripPlannerModel} Model
 * @template {EditorView} View
 * @extends {PointCreatorPresenter<Model,View>}
 */
export default class PointEditorPresenter extends PointCreatorPresenter {
  /**
   * @override
   */
  saveActivePoint() {
    const { activePoint } = this.model;

    return this.model.pointsModel.update(activePoint.id, activePoint);
  }

  /**
   * @override
   */
  onModelMode() {
    this.point = this.model.activePoint;

    this.view.close(false);

    if (this.model.getMode() === ModeEnum.EDIT) {
      const pointView = PointView.findById(this.model.activePoint.id);

      this.updateView();
      this.view.target(pointView).open();
    }
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.view.setDeleting(true);

    try {
      await this.deleteActivePoint();
      this.view.close();
    } catch (exception) {
      this.view.shake();
    }

    this.view.setDeleting(false);
  }

  deleteActivePoint() {
    return this.model.pointsModel.remove(this.model.activePoint.id);
  }
}
