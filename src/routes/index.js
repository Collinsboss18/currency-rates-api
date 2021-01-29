/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @action Handles routes to '/api/rates'
 */

const router = require('express').Router();
const { getKeys } = require('../controllers');
const { verifyParams } = require('../services');

/**
 * @method GET
 * @route '/api/rates/'
 * @param base: The home currency rates to be quoted against (i.e. CZK)
 * @param currency: The specific exchange rates based on a comma-separated symbols parameter (i.e. EUR,GBP,USD).
 */
router.get('/', verifyParams, getKeys);

module.exports = router;
