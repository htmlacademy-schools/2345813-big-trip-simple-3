import FiltersView from './view/filters-view.js';
import {render} from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointModel from './model/point-model.js';
import {generateFilter} from './utils/filter.js';

const tripEventsSection = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const pointsModel = new PointModel();

const filters = generateFilter(pointsModel.points);

render(new FiltersView(filters), tripControlsFilters);

const boardPresenter = new BoardPresenter(tripEventsSection, pointsModel);
boardPresenter.init();
