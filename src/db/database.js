import mysql from 'mysql2/promise';
import cnfg from '../config.js';

const conn = mysql.createConnection({
  host: cnfg.dbhost,
  user: cnfg.dbuser,
  password: cnfg.dbpass,
  database: cnfg.dbname,
  port: cnfg.dbport,
});

const getConnSQL = () => {
  return conn;
};

export { getConnSQL };
