import {createElement} from '../render.js';
import { humanizeDateTime } from '../utils.js';
import { cities } from '../mock/point.js';
import { getOffers } from '../mock/offers.js';
import { pointType } from '../mock/point.js';

const offerTemplate = (id, title, price, checked) => (
  `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" ${checked}>

    <label class="event__offer-label" for="event-offer-${title}-${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>
  `
);

const getAllOffersId = (type) => {
  const listOfAllOffers = getOffers().find((offer) => offer.type === type).offers;
  const finalListOfOffers = listOfAllOffers.length ? listOfAllOffers.map((offer) => offerTemplate(offer.id, offer.title, offer.price)) : listOfAllOffers;
  return finalListOfOffers.join('');
};

const offersTemplateContainer = (allOffers) => {
  if (allOffers !== '') {
    return (
      `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${allOffers}
          </div>
        </section>
      `
    );
  }
  return '';
};

const iconsTypesMarking = (typeInner, checked) => (
  `
    <div class="event__type-item">
      <input id="event-type-${typeInner}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeInner}" ${checked}>
      <label class="event__type-label  event__type-label--${typeInner}" for="event-type-${typeInner}-1">${typeInner}</label>
    </div>
  `
);


export default class NewPoint {
  #element = null;

  constructor(point) {
    this.point = point;
  }


  get element() {
    if (!this.#element) {
      this.#element = createElement(createNewPointTemplate(this.point));
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
