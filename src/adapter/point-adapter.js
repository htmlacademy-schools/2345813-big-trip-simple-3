export default class PointAdapter {
  /**
   * @param {Partial<Point>} point
   */
  constructor(point = {}) {

    this.basePrice = point.base_price;
    this.startDate = point.date_from;
    this.endDate = point.date_to;
    this.destinationId = String(point.destination);
    this.id = point.id;
    this.offerIds = point.offers?.map(String);
    this.type = point.type;
    this.isFavorite = point.is_favorite;
  }

  /**

   * @return {Partial<Point>}
   */
  toJSON() {
    return {
      'base_price': this.basePrice,
      'date_from': this.startDate,
      'date_to': this.endDate,
      'destination': Number(this.destinationId),
      'id': this.id,
      'offers': this.offerIds?.map(Number),
      'type': this.type,
      'is_favorite': this.isFavorite
    };
  }
}
