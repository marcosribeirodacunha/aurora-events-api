import { createConnection } from 'typeorm';

createConnection().then(() =>
  console.log('---------- Database connection sucessful ----------')
);
