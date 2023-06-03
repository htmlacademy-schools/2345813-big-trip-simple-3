import Enum from './enum.js';

export default class KeyboardCommandEnum extends Enum {
  static EXIT = ['Escape', 'Esc'];
  static NEXT = ['ArrowRight', 'ArrowDown'];
  static PREVIOUS = ['ArrowLeft', 'ArrowUp'];
  static CONFIRM = ['Enter'];
}
