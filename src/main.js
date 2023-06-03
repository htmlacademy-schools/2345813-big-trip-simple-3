import FilterPredicateEnum from './enum/filter-predicate-enum.js';
import SortCompareEnum from './enum/sort-compare-enum.js';

import Store from './store/store.js';

import ItemCollectionModel from './model/item-collection-model.js';
import FilteredSortedCollectionModel from './model/filtered-sorted-collection-model.js';
import TripPlannerModel from './model/trip-planner-model.js';

import PointAdapter from './adapter/point-adapter.js';
import DestinationAdapter from './adapter/destination-adapter.js';
import OffersAdapter from './adapter/offers-adapter.js';

import FilterView from './view/js/filter-view.js';
import SortView from './view/js/sort-view.js';
import ListView from './view/js/list-view.js';
import CreatorView from './view/js/creator-view.js';
import EditorView from './view/js/editor-view.js';

import CustomFilterPresenter from './presenter/custom-filter-presenter.js';
import SortManagerPresenter from './presenter/sort-manager-presenter.js';
import CustomListPresenter from './presenter/custom-list-presenter.js';
import PointEditorPresenter from './presenter/point-editor-presenter.js';
import FilterPlaceholderPresenter from './presenter/filter-placeholder-presenter.js';
import CustomCreateButtonPresenter from './presenter/custom-create-button-presenter.js';
import PointCreatorPresenter from './presenter/point-creator-presenter.js';


const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const AUTH = 'Basic bo1080bdzbgg';


/** @type {Store<Point>} */
const pointsStore = new Store(POINTS_URL, AUTH);

/** @type {Store<Destination>} */
const destinationsStore = new Store(DESTINATIONS_URL, AUTH);

/** @type {Store<OfferGroup>} */
const offerGroupsStore = new Store(OFFERS_URL, AUTH);


const pointsModel = new FilteredSortedCollectionModel(pointsStore, (item) => new PointAdapter(item))
  .setFilter(FilterPredicateEnum.EVERYTHING)
  .setSort(SortCompareEnum.DAY);

const destinationsModel = new ItemCollectionModel(destinationsStore, (item) => new DestinationAdapter(item));

const offerGroupsModel = new ItemCollectionModel(offerGroupsStore, (item) => new OffersAdapter(item));

const applicationModel = new TripPlannerModel(pointsModel, destinationsModel, offerGroupsModel);


/** @type {SortView} */
const sortView = document.querySelector(String(SortView));

/** @type {HTMLParagraphElement} */
const placeholderView = document.querySelector('.trip-events__msg');

/** @type {ListView} */
const listView = document.querySelector(String(ListView));

/** @type {HTMLButtonElement} */
const createButtonView = document.querySelector('.trip-main__event-add-btn');

/** @type {FilterView} */
const filterView = document.querySelector(String(FilterView));


applicationModel.ready().then(() => {
  new CustomFilterPresenter(applicationModel, filterView);
  new SortManagerPresenter(applicationModel, sortView);
  new CustomListPresenter (applicationModel, listView);
  new PointEditorPresenter(applicationModel, new EditorView());
  new PointCreatorPresenter(applicationModel, new CreatorView().target(listView));
  new FilterPlaceholderPresenter (applicationModel, placeholderView);
  new CustomCreateButtonPresenter (applicationModel, createButtonView);

}).catch((exception) => {
  placeholderView.textContent = exception;
});
