/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @action Handles api services
 */

let { errorResponse } = require('./Response');

class Index {
	/**
	 * @description Verify route params
	 * @return Success: next()
	 * @return Error: status 400
	 */
	static async verifyParams(req, res, next) {
		let url = `${req.headers.host}${req.originalUrl}`;
		try {
			if (req.query.base && req.query.currency) {
				if (await Index.verifyBaseQuery(req.query.base)) {
					(await Index.verifyCurrencyQuery(req.query.currency))
						? next()
						: res.status(400).json({ error: await errorResponse('Unable to verify currency params', url) });
				} else {
					return res.status(400).json({ error: await errorResponse('Unable to verify base param', url) });
				}
			} else {
				return res.status(405).json({ error: await errorResponse('Unable to verify query. Check that all query are set', url) });
			}
		} catch (err) {
			return res.status(405).json({ error: await errorResponse('Unable to verify query. Check that all query are set', url) });
		}
	}

	/**
	 * @description Method to verify currency query
	 * @param currencies String / Array
	 * @returns Boolean
	 */
	static async verifyCurrencyQuery(currencies) {
		try {
			if (typeof currencies === 'string' || currencies instanceof String) return true;
			if (Array.isArray(currencies)) return true;
			return false;
		} catch (error) {
			return false;
		}
	}

	/**
	 * @description Method to verify base query
	 * @param base String (base string e.g USD)
	 * @returns Boolean
	 */
	static async verifyBaseQuery(base) {
		try {
			if (base.length >= 1 && base.length <= 5) return true;
			return false;
		} catch (error) {
			return false;
		}
	}
}

module.exports = Index;
