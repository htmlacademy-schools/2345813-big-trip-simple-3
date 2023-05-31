import BoardPresenter from './presenter.js';
import PointModel from './model/point-model.js';
const tripEventsSection = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter();
const pointsModel = new PointModel();


boardPresenter.init(tripEventsSection, pointsModel);
