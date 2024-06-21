const dotenv = require('dotenv').config({ path: './config.env' });
const app = require('./app');
const { connect } = require('./utils/database');

process.on('uncaughtException', (err) => {
  console.log('uncaughtException:', err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  connect();
  //   console.log(`server running on ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection:', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM:singel Received');
  server.close(() => {
    process.exit(1);
  });
});
