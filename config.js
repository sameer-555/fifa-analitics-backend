'use strict';
const dotenv = require('dotenv');

dotenv.config();
const {
    PORT,
    DBPASS
} = process.env;

module.exports = {
    port: PORT,
    dbpass: DBPASS
}