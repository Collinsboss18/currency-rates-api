/**
 * @author Collins Charles (abadaikecollins@gmail.com)
 * @action Handles / Starts Server
 */

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

/** Set Server Port */
app.set('PORT', process.env.PORT || 5000);
/** Init Middleware */
app.use(bodyParser.json());
app.use(express.json({ extended: false }));

/** @action Define Routes */
app.use('/api/rates', require('./routes'));

/** Start Server */
const server = app.listen(app.get('PORT'), () => console.log(`Server running on PORT → ${server.address().port}`));
