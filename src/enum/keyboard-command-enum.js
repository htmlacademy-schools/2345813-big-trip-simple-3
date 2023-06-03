import Enum from './enum.js';

export default class KeyboardCommand extends Enum {
  static EXIT = ['Escape', 'Esc'];
  static NEXT = ['ArrowRight', 'ArrowDown'];
  static PREVIOUS = ['ArrowLeft', 'ArrowUp'];
  static CONFIRM = ['Enter'];
}
