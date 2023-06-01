import CollectionModel from './collection-model.js';

/**
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends CollectionModel<Item,ItemAdapter>
 */
export default class DataTableModel extends CollectionModel {

  /** @typedef {(item: ItemAdapter) => boolean} FilterPredicate */
  /** @typedef {(item: ItemAdapter, nextItem: ItemAdapter) => number} SortCompare */

  /** @type {FilterPredicate} */
  #filter = () => true;

  /** @type {SortCompare} */
  #sort = () => 0;

  getFilter() {
    return this.#filter;
  }

  /**
   * @param {FilterPredicate} predicate
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
   * @param {SortCompare} compare
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
