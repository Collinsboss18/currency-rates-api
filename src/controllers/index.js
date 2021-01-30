/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @file App Index Controller
 */

const request = require('axios');
let currencies;
let base;

// console.log(fullResponse);

class Index {
	/**
	 * @description Get result
	 * @return Object {base, date, rates}
	 */
	static async getKeys(req, res) {
		let url = `${req.headers.host}${req.originalUrl}`;
		base = req.query.base;
		currencies = req.query.currency;

		return new Promise((resolve, reject) => {
			request({ method: 'get', url: `https://api.exchangeratesapi.io/latest?base=${base}` })
				.then(async (response) => {
					let data = await Index.prepareData(response.data);
					console.log(data);
				})
				.catch((error) => reject(new Error(error)));
		}).catch((err) => {
			console.log(err);
			return Index.response('An error occurred. Try again...', url);
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
	 * @description Get result
	 * @param data Object {{}}
	 * @return Object {base, date, rates}
	 */
	static async prepareData(data) {
		try {
			let currencyType = await Index.getCurrencyType();
			let dataRates = data.rates;

			if (currencyType.type == 'OBJECT') {
				const getRates = (rates, currencies) => {
					let obj = {};
					currencies.forEach((data) => {
						obj[data] = rates[data];
					});
					return obj;
				};
				let rates = await getRates(dataRates, currencies);
				return await Index.dataResponse(data.base, data.date, rates);
			}

			if (currencyType.type == 'STRING') {
				let currency = Object.keys(dataRates).filter((key) => key == currencies);
				let value = currency.reduce((r, k) => r.concat(dataRates[k]), []);
				let concat = currency.concat(value);
				function toObject(arr) {
					var rv = {};
					for (var i = 0; i < 1; ++i) rv[currency] = arr[1];
					return rv;
				}
				return await Index.dataResponse(data.base, data.date, toObject(concat));
			}
		} catch (error) {
			console.log('error', error);
			return false;
		}
	}

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
	static async response(msg, url, api = 'Currency-Rate-API') {
		return { api, url, msg };
	}
}

module.exports = Index;
