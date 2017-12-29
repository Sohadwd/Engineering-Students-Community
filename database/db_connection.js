const { Pool } = require('pg');
const url = require('url');
require('env2')('./config.env');

if (!process.env.DB_URL) throw new Error('Enviroment variable DB_URL must be set');

process.env.NODE_ENV = process.env.DB_URL;

module.exports = new Pool({connectionString: process.env.NODE_ENV, ssl: true});
