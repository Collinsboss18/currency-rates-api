/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @file App Index Controller
 */

const axios = require('axios');
let fullResponse;
let currencies;
let rates;
let base;

class Index {
	/**
	 * @description Get result
	 * @return Object {base, date, rates}
	 */
	static async getKeys(req, res) {
		base = req.query.base;
		currencies = req.query.currency;

		return new Promise((resolve, reject) => {
			axios({ method: 'get', url: `https://api.exchangeratesapi.io/latest?base=${base}` })
				.then(function (response) {
					rates = response.data.rates;
					fullResponse = response.data;
				})
				.catch((error) => reject(new Error(error)));
		}).catch((err) => {
			console.log(err);
			return res.status(500).json({ message: 'Error. Try again...' });
		});
	}

	/**
	 * @description Get result
	 * @return Object {base, date, rates}
	 */
	static async getCurrencyType(req, res) {
		try {
			if (typeof currencies === 'string' || currencies instanceof String) return { type: 'STRING' };
			if (Array.isArray(currencies)) return { type: 'OBJECT' };
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
