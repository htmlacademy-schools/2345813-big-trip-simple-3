import OfferAdapter from './offer-adapter.js';

export default class OffersAdapter {
  /**
   * @param {OfferGroup} offerGroup
   */
  constructor(offerGroup) {

    this.id = offerGroup.type;
    this.items = offerGroup.offers.map((offer) => new OfferAdapter(offer));
  }
}
