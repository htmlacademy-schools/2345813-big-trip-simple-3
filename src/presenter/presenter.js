import { render } from '../render.js';
import Point from '../view/point.js';
import SortList from '../view/sort-list.js';
import TripListView from '../view/trip-list.js';
// import NewPointView from '../view/new-point.js';
import EditPoint from '../view/edit-point.js';
import EmptyList from '../view/empty-list.js';

export default class BoardPresenter {
  eventsList = new TripListView();

  init = (boardContainer, pointsModel) => {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.boardPoints = this.pointsModel.points;

    render(new SortList(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    // render(new NewPointView(this.boardPoints[1]), this.eventsList.element);

    if (this.boardPoints.every((point) => point.isArchive)) {
      render(new EmptyList(), this.eventsList.element);
    } else {
      for (let i = 0; i < this.boardPoints.length; i++) {
        this.#renderPoint(this.boardPoints[i]);
      }
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new Point(point);
    const editPointComponent = new EditPoint(point);

    const replaceEditFormToPoint = () => {
      this.eventsList.element.replaceChild(pointComponent.element, editPointComponent.element);
    };

    const replacePointToEditForm = () => {
      this.eventsList.element.replaceChild(editPointComponent.element, pointComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEditFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefaul();
      replaceEditFormToPoint();
    });

    render(pointComponent, this.eventsList.element);
  };
}
