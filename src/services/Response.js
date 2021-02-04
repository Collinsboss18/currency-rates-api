/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @action Handles api response
 */

class Response {
	/**
	 * @description Method that handles response data
	 * @param base Currency base gotten from exchange api
	 * @param data Date updated gotten from exchange api
	 * @param rates Object's
	 * @returns Object
	 */
	static async dataResponse(base, date, rates) {
		return { base, date, rates };
	}

	/**
	 * @description Method that respond if error
	 * @param msg String error message
	 * @param url String route
	 * @returns Object
	 */
	static async errorResponse(msg, url, api = 'Currency-Rate-API') {
		console.log(msg);
		return { api, url, msg };
	}
}

module.exports = Response;
