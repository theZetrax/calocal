/**
 * @typedef {Object} FoodType
 *
 * @param {string} name Name of the food.
 * @param {Date} created_date Date of food consumed.
 * @param {number} calories Amount of calories of the food.
 * @param {number} price Price of the food.
 * @param {string} userId Id of the user
 */

/**
 * @typedef {Object} UserStateType
 *
 * @param {Array<FoodType>} foodList List of foods of the user.
 * @param {boolean} loading Is user loading something.
 * @param {undefined|string} error Error for user, from the reducer(store).
 */

/**
 * @typedef {Object} ActionType
 *
 * @param {string} type Type of action.
 * @param {undefined|any} payload Payload of the dispatched action.
 * @param {undefined|string} error Error that occured while processing action.
 */
