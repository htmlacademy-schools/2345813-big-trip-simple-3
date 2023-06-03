import Enum from './enum.js';

export default class SortDisabledEnum extends Enum {
  static DAY = false;
  static EVENT = true;
  static TIME = true;
  static PRICE = false;
  static OFFER = true;
}
