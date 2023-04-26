/* eslint-disable import/no-extraneous-dependencies */
const { Pool } = require('pg');

require('dotenv').config();

const { DB_URL } = process.env;
const option = {
  connectionString: DB_URL,
  ssl: true,
};

const connection = new Pool(option);
module.exports = connection;
