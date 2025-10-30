import { config } from 'dotenv';
config();

export default {
  dbport: process.env.PORT,
  dbuser: process.env.DB_USER,
  dbpass: process.env.DB_PASSWORD,
  dbhost: process.env.DB_HOST,
  dbport: process.env.DB_PORT,
  dbname: process.env.DB_NAME,
};
export { config };

