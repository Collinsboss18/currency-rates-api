/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @action Handles api services
 */

class Index {
	/**
	 * @description Verify route params
	 * @return Success: next()
	 * @return Error: status 401
	 */
	static async verifyParams(req, res, next) {
		try {
			if (req.query.base && req.query.currency) {
				if (await Index.verifyBaseQuery(req.query.base)) {
					if (await Index.verifyCurrencyQuery(req.query.currency)) {
						console.log('Verified');
					}
					res.status(401).json({ msg: 'Unable to verify currency params' });
				} else {
					res.status(401).json({ msg: 'Unable to verify base param' });
				}
			}
			res.status(401).json({ msg: 'Unable to verify params' });
		} catch (err) {
			res.status(401).json({ msg: 'Unable to verify param' });
		}
	}

	/**
	 * @description Method to verify base query
	 * @returns Boolean
	 */
	static async verifyBaseQuery(base) {
		try {
			if (base.length >= 1 && base.length <= 5) return true;
			return false;
		} catch (error) {
			console.log('error', error);
			return false;
		}
	}

	/**
	 * @description Method to verify currency query
	 * @returns Boolean
	 */
	static async verifyCurrencyQuery(currencies) {
		try {
			if (typeof currencies === 'string' || currencies instanceof String) return true;
			if (Array.isArray(currencies)) return true;
			return false;
		} catch (error) {
			console.log('error', error);
			return false;
		}
	}
}

module.exports = Index;
