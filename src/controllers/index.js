/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @file App Index Controller
 */

const request = require('axios');
let { dataResponse, errorResponse } = require('../services/Response');
let currencies;
let base;

class Index {
	/**
	 * @description Gets Response
	 * @return Object {base, date, rates}
	 */
	static async getResponse(req, res) {
		let url = `${req.headers.host}${req.originalUrl}`;
		base = req.query.base;
		currencies = req.query.currency;

		return new Promise((resolve, reject) => {
			request({ method: 'get', url: `https://api.exchangeratesapi.io/latest?base=${base}` })
				.then(async (response) => {
					let data = await Index.prepareData(response.data);
					if (data) return resolve(res.status(200).json({ results: data }));
					return res.status(500).json({ error: await errorResponse('Response unavailable try a different query', url) });
				})
				.catch((error) => reject(error));
		}).catch((err) => {
			errorResponse(err.message, url).then((result) => {
				return res.status(400).json({ error: result });
			});
		});
	}

	/**
	 * @description Get Query Type
	 * @return Object {base, date, rates}
	 */
	static async getCurrencyType(req, res) {
		try {
			if (typeof currencies === 'string' || currencies instanceof String) return { type: 'STRING' };
			if (Array.isArray(currencies)) return { type: 'OBJECT' };
		} catch (error) {
			return false;
		}
	}

	/**
	 * @description Prepare for response
	 * @param data Object {{}}
	 * @return Object {base, date, rates{}}
	 */
	static async prepareData(data) {
		try {
			let currencyType = await Index.getCurrencyType();
			let dataRates = data.rates;

			if (currencyType.type == 'OBJECT') {
				const getRates = (rates, currencies) => {
					let obj = {};
					currencies.forEach((data) => {
						obj[data] = rates[data] || 'Currency is not supported';
					});
					return obj;
				};
				let rates = await getRates(dataRates, currencies);
				return await dataResponse(data.base, data.date, rates);
			}

			if (currencyType.type == 'STRING') {
				let currency = Object.keys(dataRates).filter((key) => key == currencies);
				let value = currency.reduce((r, k) => r.concat(dataRates[k]), []);
				let concat = currency.concat(value);
				function toObject(arr) {
					var rv = {};
					for (var i = 0; i < 1; ++i) rv[currency] = arr[1] || 'currency is not supported';
					return rv;
				}
				return await dataResponse(data.base, data.date, toObject(concat));
			}
		} catch (error) {
			return false;
		}
	}
}

module.exports = Index;
