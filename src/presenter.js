import {render} from './render.js';
import Point from './view/point.js';
import SortList from './view/sort-list.js';
import TripList from './view/list-trip.js';
import NewPoint from './view/new-point.js';
import EditPoint from './view/edit-point.js';
import FilterList from './view/filter-list.js';

const filterList = document.querySelector('.trip-controls__filters');

export default class BoardPresenter {
  eventsList = new TripList();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;


    render(new FilterList(), filterList);
    render(new SortList(), this.boardContainer);
    render(this.eventsList, this.boardContainer);
    render(new EditPoint, this.eventsList.getElement());
    render(new NewPoint(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new Point(), this.eventsList.getElement());
    }
  };
}
