export const DeleteButtonLabelEnum = {
  DEFAULT: 'Delete',
  PRESSED: 'Deleting...',
};
export const FilterEmptyEnum = {
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
};
export const FilterLabelEnum = {
  EVERYTHING: 'Everything',
  FUTURE: 'Future',
};
export const FilterTypeEnum = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  getKeyByValue: function(value) {
    return Object.keys(this).find((key) => this[key] === value);
  }
};
export const KeyboardCommandEnum = {
  EXIT: ['Escape', 'Esc'],
  NEXT: ['ArrowRight', 'ArrowDown'],
  PREVIOUS: ['ArrowLeft', 'ArrowUp'],
  CONFIRM: ['Enter'],
};
export const ModeEnum = {
  VIEW: 0,
  CREATE: 1,
  EDIT: 2,
};
export const PointLabelEnum = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECK_IN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTAURANT: 'Restaurant',
};
export const PointTypeEnum = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
  getKeyByValue: function(value) {
    return Object.keys(this).find((key) => this[key] === value);
  }
};
export const SaveButtonLabelEnum = {
  DEFAULT: 'Save',
  PRESSED: 'Saving...',
};
export const SortDisabledEnum = {
  DAY: false,
  EVENT: true,
  TIME: true,
  PRICE: false,
  OFFER: true,
};
export const SortLabelEnum = {
  DAY: 'Day',
  EVENT: 'Event',
  TIME: 'Time',
  PRICE: 'Price',
  OFFER: 'Offer',
};
export const SortTypeEnum = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
  getKeyByValue: function(value) {
    return Object.keys(this).find((key) => this[key] === value);
  }
};

/**
 * @template Item
 * @typedef {(item: Item) => boolean} Predicate
 */

/**
 * @template Item
 * @typedef {(item: Item, nextItem: Item) => number} Compare
 */


class Enum {
  /**
   * @param {*} value
   */
  static getKeyByValue(value) {
    return Object.keys(this).find((key) => this[key] === value);
  }
}

export class FilterPredicateEnum extends Enum {
  /**
   * @type {Predicate<PointAdapter>}
   */
  static EVERYTHING = () => true;

  /**
   * @type {Predicate<PointAdapter>}
   */
  static FUTURE = (point) => Date.parse(point.endDate) > Date.now();
}

export class SortCompareEnum extends Enum {
  /**
   * @type {Compare<PointAdapter>}
   */
  static DAY = (point, nextPoint) =>
    Date.parse(point.startDate) - Date.parse(nextPoint.startDate);

  /**
   * @type {Compare<PointAdapter>}
   */
  static PRICE = (point, nextPoint) => nextPoint.basePrice - point.basePrice;
}
