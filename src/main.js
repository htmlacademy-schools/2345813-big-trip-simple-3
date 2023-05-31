import BoardPresenter from './presenter.js';

const tripEventsSection = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter();


boardPresenter.init(tripEventsSection);
