import Enum from './enum.js';

export default class SortCompare extends Enum {
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
