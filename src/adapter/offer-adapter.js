export default class OfferAdapter {
  /**
   * @param {Offer} data
   */
  constructor(data) {

    this.id = String(data.id);
    this.title = data.title;
    this.price = data.price;
  }
}
