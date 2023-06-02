import Enum from './enum.js';

export default class FilterPredicate extends Enum {
  /**
   * @type {Predicate<PointAdapter>}
   */
  static EVERYTHING = () => true;

  /**
   * @type {Predicate<PointAdapter>}
   */
  static FUTURE = (point) => Date.parse(point.endDate) > Date.now();
}
