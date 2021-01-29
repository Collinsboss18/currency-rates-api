/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @file App Index Controller
 */

let base;
let currencies;

class Index {
	/**
	 * @description Get result
	 * @return Object {base, date, rates}
	 */
	static async getKeys(req, res) {
		base = req.query.base;
		currencies = req.query.currency;
	}
}

module.exports = Index;
