/**
 * @template Item
 * @typedef {import('./store').default<Item>} Store
 */

/** @typedef {string | number} ItemId */

/**
 * @typedef BadRequestErrorCause
 * @prop {InvalidField[]} [error]
 * @prop {InvalidField[]} [errors]
 * @prop {string} message
 */

/**
 * @typedef InvalidField
 * @prop {string} errorMessage
 * @prop {string} fieldName
 * @prop {*} fieldValue
 */
