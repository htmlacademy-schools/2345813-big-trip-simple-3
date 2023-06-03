export default class DestinationAdapter {
  /**
   * @param {Destination} destination
   */
  constructor(destination) {

    this.id = String(destination.id);
    this.description = destination.description;
    this.name = destination.name;
    this.pictures = destination.pictures.map((picture) => ({...picture}));
  }
}
