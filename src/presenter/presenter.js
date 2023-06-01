import { render } from '../framework/render.js';
import SortList from '../view/sort-list.js';
import TripList from '../view/trip-list.js';
import EmptyList from '../view/empty-list.js';
import PointPresenter from './presenter.js';
import { updateItem } from '../utils/utils.js';
import { sortPointOffers, sortPointTime, sortPointEvent, sortPointPrice, SortType, sortPointDay } from '../utils/sort-module.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #boardPoints = [];
  #sortComponent = new SortList();
  #emptyViewComponent = new EmptyList();
  #eventsList = new TripList();
  #pointPresenter = new Map();
  #currentSortType = SortType.DAY;

  constructor(boardContainer, pointsModel) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#boardPoints = this.#pointsModel.points;

    this.#renderBoard();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearPointsList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.DAY:
        this.#boardPoints.sort(sortPointDay);
        break;
      case SortType.EVENT:
        this.#boardPoints.sort(sortPointEvent);
        break;
      case SortType.TIME:
        this.#boardPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointPrice);
        break;
      case SortType.OFFERS:
        this.#boardPoints.sort(sortPointOffers);
        break;

      default:
        this.#boardPoints = this.#boardPoints.sort(sortPointDay);
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);

    this.#clearPointsList();
    this.#renderBoardPoints();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEmptyView = () => render(this.#emptyViewComponent, this.#eventsList.element);

  #renderEventList = () => render(this.#eventsList, this.#boardContainer);

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsList.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderBoardPoints = () => this.#boardPoints.length ? this.#boardPoints.forEach((point) => this.#renderPoint(point)) : this.#renderEmptyView();

  // #renderNewPoint = () => render(new NewPointView(this.#boardPoints[1]), this.#eventsList.element);

  #renderBoard = () => {
    this.#renderSort();
    this.#renderEventList();
    this.#renderBoardPoints();
    this.#boardPoints.sort(sortPointDay);
  };
}
