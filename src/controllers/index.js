/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @file App Index Controller
 */

const { type } = require("os");

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

		return new Promise((resolve, reject) => {
            let currencyType = Index.getCurrencyType(currencies);
            console.log(currencyType);

        }).catch((err) => {
			console.log(err);
			return res.status(401).json(await Index.response('Server error try later', url));
		});

	}

	/**
	 * @description Get result
	 * @return Object {base, date, rates}
	 */
	static async getCurrencyType(req, res) {
		try {
			if (typeof currencies === 'string' || currencies instanceof String) return {type: String};
			if (Array.isArray(currencies)) return {type: Object};
		} catch (error) {
			console.log('error', error);
			return false;
		}
    }

    /**
	 * @description Method that respond if error
	 * @returns Object
	 */
	static async response(msg, url, api = 'Currency-Rate-API') {
		return { api, url, msg };
	}
}

module.exports = Index;
