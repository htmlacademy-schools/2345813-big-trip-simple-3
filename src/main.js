import FilterList from './view/filter-list.js';
import {render} from './render.js';
import BoardPresenter from './presenter/presenter.js';
import PointModel from './model/point-model.js';

const tripEventsSection = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');
const boardPresenter = new BoardPresenter();
const pointsModel = new PointModel();

render(new FilterList(), tripControlsFilters);
boardPresenter.init(tripEventsSection, pointsModel);
