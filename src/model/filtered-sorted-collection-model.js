import ItemCollectionModel from './item-collection-model.js';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends ItemCollectionModel<Item,ItemAdapter>
 */
export default class FilteredSortedCollectionModel extends ItemCollectionModel {

  /** @type {Predicate<ItemAdapter>} */
  #filter = () => true;

  /** @type {Compare<ItemAdapter>} */
  #sort = () => 0;

  getFilter() {
    return this.#filter;
  }

  /**
   * @param {Predicate<ItemAdapter>} predicate
   */
  setFilter(predicate, notify = true) {
    this.#filter = predicate;

    if (notify) {
      this.dispatchEvent(new CustomEvent('filter'));
    }

    return this;
  }

  getSort() {
    return this.#sort;
  }

  /**
   * @param {Compare<ItemAdapter>} compare
   */
  setSort(compare, notify = true) {
    this.#sort = compare;

    if (notify) {
      this.dispatchEvent(new CustomEvent('sort'));
    }

    return this;
  }

  list(predicate = this.getFilter(), compare = this.getSort()) {
    return this.listAll().filter(predicate).sort(compare);
  }
}
