const { Pool } = require("pg");

const PG_URI =
  "postgres://gcbjnsin:Y8lM_AHzvHd-oyp7cgxwZRU1DYCNF71C@heffalump.db.elephantsql.com/gcbjnsin";
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text);
    return pool.query(text, params, callback);
  },
};
