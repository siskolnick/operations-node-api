const dotenv = require('dotenv');
dotenv.config();
const env = process.env;
const config = {
  db: { /* don’t expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'db_host',
    user: env.DB_USER || 'db_user',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'db_name',
    port: env.DB_PORT || '3000',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
  listeningPort: env.PORT
};
  
module.exports = config;
